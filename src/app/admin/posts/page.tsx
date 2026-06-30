"use client";

import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deletePost } from "@/lib/admin-firestore";
import Link from "next/link";
import type { Post } from "@/lib/types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    const snap = await getDocs(
      query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(100))
    );
    setPosts(
      snap.docs.map((d) => ({
        ...d.data(),
        id: d.id,
        deadline: d.data().deadline?.toDate() ?? null,
        createdAt: d.data().createdAt?.toDate() ?? new Date(),
        updatedAt: d.data().updatedAt?.toDate() ?? new Date(),
      } as Post))
    );
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}"을 삭제할까요?`)) return;
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">포스트 관리</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          새 포스트
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">불러오는 중...</p>
      ) : posts.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center text-gray-400 shadow-sm">
          <p>등록된 포스트가 없습니다.</p>
          <Link
            href="/admin/posts/new"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
          >
            첫 포스트 등록하기
          </Link>
        </div>
      ) : (
        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">카테고리</th>
                <th className="px-4 py-3 font-medium">등록일</th>
                <th className="px-4 py-3 font-medium">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 max-w-xs">
                    <p className="line-clamp-1 font-medium">{post.title}</p>
                    {post.isAiSummary && (
                      <span className="text-xs text-purple-500">AI 요약</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{post.category}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {post.createdAt?.toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-red-500 hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
