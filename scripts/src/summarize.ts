import type { Category, ProcessedPost, RawPost } from "./types";

const CATEGORIES: Category[] = [
  "복지", "청년", "창업", "주거", "교육", "일자리", "기타",
];

const PROMPT_TEMPLATE = (raw: RawPost) => `다음은 대한민국 정부 정책 관련 기사입니다.

제목: ${raw.title}
출처: ${raw.sourceUrl}
내용:
${raw.content.slice(0, 2500)}

아래 JSON 형식으로만 응답하세요 (설명 없이 JSON만):
{
  "summary": "400~600자 분량의 읽기 쉬운 요약. 신청 대상, 혜택 내용, 신청 방법, 유의사항 포함",
  "category": "${CATEGORIES.join(" | ")} 중 하나",
  "tags": ["관련 키워드 3~5개"],
  "deadline": "마감일이 있으면 YYYY-MM-DD 형식, 없으면 null"
}`;

function extractJson(text: string): string {
  // 마크다운 코드블록 제거
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) return codeBlock[1].trim();
  // 코드블록 없으면 첫 { } 블록 추출
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) return jsonMatch[0];
  throw new Error("JSON 블록 없음");
}

function parseResult(
  text: string,
  raw: RawPost
): ProcessedPost {
  const jsonStr = extractJson(text);
  const parsed = JSON.parse(jsonStr);

  const category: Category = CATEGORIES.includes(parsed.category)
    ? parsed.category
    : "기타";

  const deadline = parsed.deadline ? new Date(parsed.deadline) : null;
  const validDeadline =
    deadline && !isNaN(deadline.getTime()) ? deadline : null;

  return {
    title: raw.title,
    summary: parsed.summary ?? basicProcess(raw).summary,
    content: raw.content,
    images: raw.images,
    sourceUrl: raw.sourceUrl,
    sourceName: raw.sourceName,
    category,
    tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : [],
    deadline: validDeadline,
    isAiSummary: true,
  };
}

function basicProcess(raw: RawPost): ProcessedPost {
  const summary = raw.content.slice(0, 500).replace(/\s+/g, " ").trim() + "...";
  return {
    title: raw.title,
    summary,
    content: raw.content,
    images: raw.images,
    sourceUrl: raw.sourceUrl,
    sourceName: raw.sourceName,
    category: "기타",
    tags: [],
    deadline: null,
    isAiSummary: false,
  };
}

async function summarizeWithGemini(raw: RawPost): Promise<ProcessedPost> {
  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: PROMPT_TEMPLATE(raw),
    config: {
      temperature: 0.3,
      maxOutputTokens: 2000,
      thinkingConfig: { thinkingBudget: 0 },  // 단순 요약에 thinking 불필요
    },
  });

  const text = response.text ?? "";
  return parseResult(text, raw);
}

async function summarizeWithOpenAI(raw: RawPost): Promise<ProcessedPost> {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: PROMPT_TEMPLATE(raw) }],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 1000,
  });

  const text = res.choices[0].message.content ?? "{}";
  return parseResult(text, raw);
}

export async function summarize(raw: RawPost): Promise<ProcessedPost> {
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log("  [Gemini] 요약 중...");
      return await summarizeWithGemini(raw);
    } catch (err) {
      console.error("  [Gemini 오류]", (err as Error).message);
    }
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      console.log("  [OpenAI] 요약 중...");
      return await summarizeWithOpenAI(raw);
    } catch (err) {
      console.error("  [OpenAI 오류]", (err as Error).message);
    }
  }

  console.log("  [LLM 키 없음] 기본 처리로 대체");
  return basicProcess(raw);
}
