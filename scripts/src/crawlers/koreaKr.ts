import axios from "axios";
import * as cheerio from "cheerio";
import type { PostImage, RawPost } from "../types";

const BASE = "https://www.korea.kr";
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

// 수집할 목록 페이지
const LIST_PAGES = [
  {
    url: `${BASE}/news/policyNewsList.do`,
    linkPattern: /policyNewsView\.do/,
    sourceName: "정책브리핑 정책뉴스",
  },
  {
    url: `${BASE}/news/commonPolicyList.do`,
    linkPattern: /commonPolicyView\.do/,
    sourceName: "정책브리핑",
  },
];

// 목록 페이지에서 기사 링크 추출
async function fetchArticleLinks(
  listUrl: string,
  linkPattern: RegExp
): Promise<string[]> {
  try {
    const { data } = await axios.get(listUrl, {
      headers: HEADERS,
      timeout: 12000,
    });
    const $ = cheerio.load(data);
    const links = new Set<string>();

    $("a").each((_, el) => {
      const href = $(el).attr("href") ?? "";
      if (linkPattern.test(href) && href.includes("newsId")) {
        // newsId만 남기고 정규화
        const match = href.match(/newsId=(\d+)/);
        if (match) {
          const clean = href.split("?")[0] + `?newsId=${match[1]}`;
          links.add(BASE + clean);
        }
      }
    });

    return [...links];
  } catch (err) {
    console.error(`  목록 페이지 오류 (${listUrl}):`, (err as Error).message);
    return [];
  }
}

// 기사 본문 + 이미지 추출
async function fetchArticle(
  url: string
): Promise<{ title: string; content: string; images: PostImage[] } | null> {
  try {
    const { data } = await axios.get(url, {
      headers: HEADERS,
      timeout: 12000,
    });
    const $ = cheerio.load(data);

    // 제목 추출
    const title =
      $("#titleText").attr("value")?.trim() ||
      $("h1.title, .article_head h2, .news_title").first().text().trim() ||
      $("title").text().split("|")[0].trim();

    if (!title || title.length < 5) return null;

    // 이미지 추출 (본문 영역 내 콘텐츠 이미지만)
    const images: PostImage[] = [];
    $(".article_body img").each((_, el) => {
      const src = $(el).attr("src") ?? "";
      const alt = ($(el).attr("alt") ?? "").trim();
      if (
        src.includes("/attaches/") &&
        !alt.includes("정책기자단") &&
        images.length < 10
      ) {
        images.push({ src, alt });
      }
    });

    // 본문 텍스트 추출
    $("script, style, .tool, .sns_wrap, .related_news, .tag_area").remove();

    const contentSelectors = [
      ".article_body",
      ".view_body",
      ".news_body",
      ".cont_view",
    ];

    for (const sel of contentSelectors) {
      const el = $(sel);
      if (!el.length) continue;
      const text = el.text().replace(/\s+/g, " ").trim();
      if (text.length > 150) {
        return { title, content: text.slice(0, 10000), images };
      }
    }

    return null;
  } catch (err) {
    console.error(`  기사 fetch 오류:`, (err as Error).message);
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function crawlKoreaKr(limitPerSource = 5): Promise<RawPost[]> {
  const results: RawPost[] = [];
  const seen = new Set<string>();

  for (const source of LIST_PAGES) {
    console.log(`  목록 수집: ${source.url}`);
    const links = await fetchArticleLinks(source.url, source.linkPattern);
    console.log(`  발견된 링크: ${links.length}개`);

    let count = 0;
    for (const url of links) {
      if (count >= limitPerSource) break;
      if (seen.has(url)) continue;
      seen.add(url);

      const article = await fetchArticle(url);
      if (!article) {
        console.log(`    스킵 (본문 없음): ${url}`);
        continue;
      }

      console.log(`    수집: ${article.title.slice(0, 50)}... (이미지 ${article.images.length}개)`);
      results.push({
        title: article.title,
        content: article.content,
        images: article.images,
        sourceUrl: url,
        sourceName: source.sourceName,
        publishedAt: new Date(),
      });
      count++;

      await sleep(1500); // 서버 부하 방지
    }

    await sleep(2000);
  }

  return results;
}
