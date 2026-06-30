import PostCard from "@/components/PostCard";
import { getLatestPosts } from "@/lib/firestore";
import Link from "next/link";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getLatestPosts(6);

  return (
    <div>
      <section className="mb-10 text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900">
          정부 지원 정책 모음
        </h1>
        <p className="mt-2 text-gray-500">
          최신 정책과 혜택을 쉽게 확인하세요. 매일 자동 업데이트됩니다.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-lg">아직 등록된 정책이 없습니다.</p>
          <p className="mt-1 text-sm">
            크롤러를 실행하거나 관리자에서 직접 추가해 주세요.
          </p>
          <Link
            href="/admin"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline"
          >
            관리자로 이동
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/posts"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 inline-block"
            >
              전체 정책 보기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
