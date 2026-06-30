import Link from "next/link";
import type { Post } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  const deadlineStr = post.deadline
    ? new Date(post.deadline).toLocaleDateString("ko-KR")
    : null;

  return (
    <Link href={`/posts/${post.id}`}>
      <article className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md h-full flex flex-col">
        <div className="mb-2 flex items-center gap-2 flex-wrap">
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            {post.category}
          </span>
          {post.isAiSummary && (
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-600">
              AI 요약
            </span>
          )}
          {deadlineStr && (
            <span className="ml-auto text-xs text-red-500">
              마감 {deadlineStr}
            </span>
          )}
        </div>
        <h2 className="mb-1 line-clamp-2 font-semibold text-gray-900">{post.title}</h2>
        <p className="line-clamp-3 text-sm text-gray-500 flex-1">{post.summary}</p>
        <p className="mt-3 text-xs text-gray-400">
          {post.sourceName} ·{" "}
          {new Date(post.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </article>
    </Link>
  );
}
