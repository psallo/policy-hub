import {
  collection,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  doc,
  getDoc,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Post, Category } from "./types";

export const PAGE_SIZE = 12;

function toPost(id: string, data: Record<string, unknown>): Post {
  return {
    ...data,
    id,
    images: Array.isArray(data.images) ? data.images : [],  // 구 데이터 호환
    deadline: data.deadline
      ? (data.deadline as { toDate(): Date }).toDate()
      : null,
    createdAt: (data.createdAt as { toDate(): Date }).toDate(),
    updatedAt: (data.updatedAt as { toDate(): Date }).toDate(),
  } as Post;
}

export async function getPosts(options?: {
  category?: Category;
  pageSize?: number;
}): Promise<{ posts: Post[]; hasMore: boolean }> {
  const { category, pageSize = PAGE_SIZE } = options ?? {};
  const constraints: QueryConstraint[] = [
    orderBy("createdAt", "desc"),
    limit(pageSize + 1),
  ];
  if (category) constraints.unshift(where("category", "==", category));

  const snap = await getDocs(query(collection(db, "posts"), ...constraints));
  const hasMore = snap.docs.length > pageSize;
  const docs = hasMore ? snap.docs.slice(0, pageSize) : snap.docs;

  return { posts: docs.map((d) => toPost(d.id, d.data())), hasMore };
}

export async function searchPosts(
  q: string,
  category?: Category
): Promise<Post[]> {
  const constraints: QueryConstraint[] = [
    orderBy("createdAt", "desc"),
    limit(200),
  ];
  if (category) constraints.unshift(where("category", "==", category));

  const snap = await getDocs(query(collection(db, "posts"), ...constraints));
  const keyword = q.toLowerCase();

  return snap.docs
    .map((d) => toPost(d.id, d.data()))
    .filter(
      (p) =>
        p.title.toLowerCase().includes(keyword) ||
        p.summary.toLowerCase().includes(keyword) ||
        p.tags.some((t) => t.toLowerCase().includes(keyword))
    );
}

export async function getPost(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, "posts", id));
  if (!snap.exists()) return null;
  return toPost(snap.id, snap.data());
}

export async function getLatestPosts(n = 6): Promise<Post[]> {
  const { posts } = await getPosts({ pageSize: n });
  return posts;
}

export async function getAllPostIds(): Promise<
  { id: string; updatedAt: Date }[]
> {
  const snap = await getDocs(
    query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(1000))
  );
  return snap.docs.map((d) => ({
    id: d.id,
    updatedAt: d.data().updatedAt?.toDate() ?? new Date(),
  }));
}
