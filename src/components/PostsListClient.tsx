"use client";

import { useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import PostCard from "./PostCard";
import type { Post, Category } from "@/lib/types";
import { PAGE_SIZE } from "@/lib/firestore";

interface Props {
  initialPosts: Post[];
  initialHasMore: boolean;
  category?: Category;
}

export default function PostsListClient({
  initialPosts,
  initialHasMore,
  category,
}: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    const lastPost = posts[posts.length - 1];
    if (!lastPost || loading) return;

    setLoading(true);
    try {
      const constraints: QueryConstraint[] = [
        orderBy("createdAt", "desc"),
        startAfter(new Date(lastPost.createdAt)),
        limit(PAGE_SIZE + 1),
      ];
      if (category) constraints.unshift(where("category", "==", category));

      const snap = await getDocs(
        query(collection(db, "posts"), ...constraints)
      );
      const newHasMore = snap.docs.length > PAGE_SIZE;
      const newDocs = newHasMore ? snap.docs.slice(0, PAGE_SIZE) : snap.docs;

      const newPosts = newDocs.map((d) => {
        const data = d.data();
        return {
          ...data,
          id: d.id,
          deadline: data.deadline?.toDate() ?? null,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Post;
      });

      setPosts((prev) => [...prev, ...newPosts]);
      setHasMore(newHasMore);
    } finally {
      setLoading(false);
    }
  }

  if (posts.length === 0) {
    return (
      <p className="py-20 text-center text-gray-400">
        검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-lg border px-6 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? "불러오는 중..." : "더 보기"}
          </button>
        </div>
      )}

      {!hasMore && posts.length >= PAGE_SIZE && (
        <p className="mt-8 text-center text-sm text-gray-400">
          모든 정책을 불러왔습니다.
        </p>
      )}
    </div>
  );
}
