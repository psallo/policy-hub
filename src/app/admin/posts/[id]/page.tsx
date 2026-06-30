"use client";

import { useEffect, useState } from "react";
import { getPost } from "@/lib/firestore";
import PostForm from "@/components/admin/PostForm";
import type { Post } from "@/lib/types";
import { use } from "react";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPost(id).then((p) => {
      if (!p) setNotFound(true);
      else setPost(p);
    });
  }, [id]);

  if (notFound)
    return <p className="text-gray-400">포스트를 찾을 수 없습니다.</p>;
  if (!post) return <p className="text-gray-400">불러오는 중...</p>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">포스트 수정</h1>
      <PostForm initialData={post} />
    </div>
  );
}
