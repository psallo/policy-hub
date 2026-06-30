// 이미 저장된 포스트 중 AI 요약이 없는 것들을 업데이트
import "dotenv/config";
import { initFirebase } from "./firebase-admin";
import { summarize } from "./summarize";
import type { RawPost } from "./types";

async function main() {
  const db = initFirebase();

  const snap = await db
    .collection("posts")
    .where("isAiSummary", "==", false)
    .get();

  console.log(`AI 요약 없는 포스트: ${snap.size}개`);
  if (snap.size === 0) { console.log("없음, 종료"); return; }

  let updated = 0;
  for (const doc of snap.docs) {
    const data = doc.data();
    console.log(`\n처리: ${data.title?.slice(0, 50)}...`);

    const raw: RawPost = {
      title: data.title,
      content: data.content,
      images: Array.isArray(data.images) ? data.images : [],
      sourceUrl: data.sourceUrl,
      sourceName: data.sourceName,
      publishedAt: data.createdAt?.toDate() ?? new Date(),
    };

    let processed;
    try {
      processed = await summarize(raw);
    } catch {
      console.log("  → 요약 실패, 스킵");
      continue;
    }
    if (!processed.isAiSummary) {
      console.log("  → AI 요약 불가 (할당량 소진 또는 오류), 스킵");
      break; // 할당량 소진 시 더 이상 시도 안 함
    }

    await doc.ref.update({
      summary: processed.summary,
      category: processed.category,
      tags: processed.tags,
      deadline: processed.deadline ?? null,
      isAiSummary: true,
    });
    console.log(`  → 업데이트 완료 (카테고리: ${processed.category})`);
    updated++;

    await new Promise((r) => setTimeout(r, 13000)); // 무료 5 RPM 제한 대응
  }

  console.log(`\n완료: ${updated}/${snap.size}개 업데이트`);
}

main().catch((e) => { console.error(e); process.exit(1); });
