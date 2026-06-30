import "dotenv/config";
import { FieldValue } from "firebase-admin/firestore";
import { initFirebase, isDuplicate } from "./firebase-admin";
import { crawlKoreaKr } from "./crawlers/koreaKr";
import { summarize } from "./summarize";

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  console.log("=".repeat(50));
  console.log(`정책허브 크롤러 시작 ${DRY_RUN ? "[DRY-RUN 모드]" : ""}`);
  console.log("=".repeat(50));

  // Firebase 초기화 (dry-run이면 스킵)
  const db = DRY_RUN ? null : initFirebase();

  // 1. 크롤링
  console.log("\n[1단계] RSS 수집 중...");
  const rawPosts = await crawlKoreaKr(5); // 피드당 최대 5개
  console.log(`  수집 완료: ${rawPosts.length}개`);

  if (rawPosts.length === 0) {
    console.log("  수집된 항목이 없습니다. 종료합니다.");
    return;
  }

  // 2. 중복 체크 + LLM 요약 + 저장
  console.log("\n[2단계] 요약 및 저장 중...");
  let saved = 0;
  let skipped = 0;
  let failed = 0;

  for (const raw of rawPosts) {
    console.log(`\n  처리 중: ${raw.title.slice(0, 50)}...`);

    // 중복 체크
    if (db && await isDuplicate(db, raw.sourceUrl)) {
      console.log("  → 중복 스킵");
      skipped++;
      continue;
    }

    // LLM 요약
    const processed = await summarize(raw);
    console.log(`  → 카테고리: ${processed.category} | 태그: ${processed.tags.join(", ")}`);

    if (DRY_RUN) {
      console.log(`  → [DRY-RUN] 저장 스킵`);
      console.log(`     요약: ${processed.summary.slice(0, 80)}...`);
      saved++;
      continue;
    }

    // Firestore 저장
    try {
      await db!.collection("posts").add({
        ...processed,
        deadline: processed.deadline ?? null,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      console.log("  → 저장 완료");
      saved++;
    } catch (err) {
      console.error("  → 저장 실패:", (err as Error).message);
      failed++;
    }

    // API rate limiting
    await sleep(800);
  }

  // 3. 결과 요약
  console.log("\n" + "=".repeat(50));
  console.log("크롤링 완료");
  console.log(`  저장: ${saved}개 | 중복 스킵: ${skipped}개 | 실패: ${failed}개`);
  console.log("=".repeat(50));
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

main().catch((err) => {
  console.error("\n치명적 오류:", err);
  process.exit(1);
});
