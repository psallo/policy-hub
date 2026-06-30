"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/admin-firestore";
import Link from "next/link";

type Stats = Awaited<ReturnType<typeof getAdminStats>>;

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(() => setError("통계를 불러올 수 없습니다."));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p className="text-gray-400">통계 불러오는 중...</p>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">대시보드</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">전체 포스트</p>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        {stats.byCategory.slice(0, 3).map(({ category, count }) => (
          <div key={category} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{category}</p>
            <p className="text-3xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold">카테고리 분포</h2>
        <div className="space-y-3">
          {stats.byCategory.map(({ category, count }) => (
            <div key={category} className="flex items-center gap-3">
              <span className="w-16 text-sm text-gray-600">{category}</span>
              <div className="flex-1 rounded-full bg-gray-100 h-2">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all"
                  style={{
                    width: `${stats.total ? (count / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="w-8 text-right text-sm text-gray-500">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">최근 포스트</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-blue-600 hover:underline"
          >
            전체 보기
          </Link>
        </div>
        <div className="divide-y">
          {stats.recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                <p className="text-xs text-gray-400">
                  {post.category} ·{" "}
                  {post.createdAt?.toLocaleDateString("ko-KR")}
                </p>
              </div>
              <Link
                href={`/admin/posts/${post.id}`}
                className="ml-4 text-xs text-blue-600 hover:underline"
              >
                수정
              </Link>
            </div>
          ))}
          {stats.recentPosts.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-400">
              등록된 포스트가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
