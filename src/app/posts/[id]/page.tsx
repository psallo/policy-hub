import { getPost, getPosts } from "@/lib/firestore";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import AiDisclaimer from "@/components/AiDisclaimer";
import ViewCounter from "@/components/ViewCounter";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { posts } = await getPosts({ pageSize: 50 });
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.summary.slice(0, 160),
    },
  };
}

function splitIntoParagraphs(text: string, sentencesPerParagraph = 3): string[] {
  const sentences = text
    .split(/(?<=[.!?。])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(" "));
  }
  return paragraphs;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const paragraphs = post.content ? splitIntoParagraphs(post.content) : [];
  const [heroImage, ...extraImages] = post.images ?? [];

  return (
    <article className="mx-auto max-w-2xl pb-16">

      {/* 뒤로가기 */}
      <Link
        href="/posts"
        className="mb-8 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← 목록으로
      </Link>

      {/* 뱃지 */}
      <div className="mt-2 mb-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
          {post.category}
        </span>
        {post.isAiSummary && (
          <span className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-600">
            AI 요약
          </span>
        )}
        {post.deadline && (
          <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-600">
            마감 {new Date(post.deadline).toLocaleDateString("ko-KR")}
          </span>
        )}
      </div>

      {/* 제목 */}
      <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
        {post.title}
      </h1>

      {/* 메타 */}
      <div className="mb-8 flex items-center gap-3 text-sm text-gray-400">
        <span>{post.sourceName} · {new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
        <ViewCounter postId={post.id} initialViews={post.views} />
      </div>

      {post.isAiSummary && <AiDisclaimer />}

      {/* 핵심 요약 */}
      <div className="mb-8 rounded-2xl bg-blue-50 px-6 py-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
          핵심 요약
        </p>
        <p className="text-[15px] leading-7 text-gray-700">{post.summary}</p>
      </div>

      {/* 대표 이미지 */}
      {heroImage && (
        <figure className="mb-8 overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="w-full object-cover"
          />
          {heroImage.alt && (
            <figcaption className="px-4 py-2 text-center text-xs text-gray-400">
              {heroImage.alt}
            </figcaption>
          )}
        </figure>
      )}

      {/* 본문 */}
      {paragraphs.length > 0 && (
        <section className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">원문 내용</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="space-y-5 text-[15px] leading-8 text-gray-700">
            {paragraphs.map((p, i) => {
              const img = extraImages[Math.floor(i / 2)];
              const showImg = img && i % 2 === 1 && i < extraImages.length * 2;
              return (
                <div key={i}>
                  <p>{p}</p>
                  {showImg && (
                    <figure className="mt-4 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full object-cover"
                      />
                      {img.alt && (
                        <figcaption className="px-3 py-1.5 text-xs text-gray-400">
                          {img.alt}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 태그 */}
      {post.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 원문 링크 */}
      <a
        href={post.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm shadow-sm transition hover:shadow-md"
      >
        <div>
          <p className="font-semibold text-gray-800">공식 원문 보기</p>
          <p className="mt-0.5 text-xs text-gray-400">{post.sourceName}</p>
        </div>
        <span className="text-lg text-gray-400">→</span>
      </a>

    </article>
  );
}
