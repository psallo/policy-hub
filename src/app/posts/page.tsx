import { getPosts, searchPosts } from "@/lib/firestore";
import SearchBar from "@/components/SearchBar";
import PostsListClient from "@/components/PostsListClient";
import type { Category } from "@/lib/types";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";

export const revalidate = 3600;

const CATEGORIES: Category[] = [
  "복지", "청년", "창업", "주거", "교육", "일자리", "기타",
];

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category, q } = await searchParams;
  const title = q
    ? `"${q}" 검색 결과`
    : category
    ? `${category} 정책`
    : "전체 정책";

  // 검색/필터 URL은 /posts를 canonical로 지정해 중복 색인 방지
  const canonical = category
    ? `https://policyhub.kr/posts?category=${category}`
    : "https://policyhub.kr/posts";

  return {
    title,
    alternates: { canonical },
    // 검색 결과 페이지는 색인 제외 (콘텐츠가 쿼리마다 달라짐)
    robots: q ? { index: false, follow: true } : undefined,
  };
}

export default async function PostsPage({ searchParams }: Props) {
  const { category: rawCategory, q: rawQ } = await searchParams;
  const category = rawCategory as Category | undefined;
  const q = rawQ?.trim();

  const { posts, hasMore } = q
    ? { posts: await searchPosts(q, category), hasMore: false }
    : await getPosts({ category });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        {category ? `${category} 정책` : "전체 정책"}
      </h1>

      <Suspense>
        <SearchBar />
      </Suspense>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={q ? `/posts?q=${q}` : "/posts"}
          className={`rounded-full border px-4 py-1 text-sm transition ${
            !category
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          전체
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={q ? `/posts?q=${q}&category=${c}` : `/posts?category=${c}`}
            className={`rounded-full border px-4 py-1 text-sm transition ${
              category === c
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {q && (
        <p className="mb-4 text-sm text-gray-500">
          <span className="font-medium text-gray-800">"{q}"</span> 검색 결과{" "}
          {posts.length}개
        </p>
      )}

      <PostsListClient
        key={`${category ?? "all"}-${q ?? ""}`}
        initialPosts={posts}
        initialHasMore={!q && hasMore}
        category={category}
      />
    </div>
  );
}
