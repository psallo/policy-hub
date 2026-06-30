import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Post, Category } from "./types";

type NewPost = Omit<Post, "id" | "createdAt" | "updatedAt">;

export async function createPost(data: NewPost) {
  return addDoc(collection(db, "posts"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePost(id: string, data: Partial<NewPost>) {
  return updateDoc(doc(db, "posts", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id: string) {
  return deleteDoc(doc(db, "posts", id));
}

export async function getAdminStats() {
  const postsRef = collection(db, "posts");
  const categories: Category[] = [
    "복지",
    "청년",
    "창업",
    "주거",
    "교육",
    "일자리",
  ];

  const [totalSnap, recentSnap, ...categorySnaps] = await Promise.all([
    getCountFromServer(postsRef),
    getDocs(query(postsRef, orderBy("createdAt", "desc"), limit(5))),
    ...categories.map((cat) =>
      getCountFromServer(query(postsRef, where("category", "==", cat)))
    ),
  ]);

  return {
    total: totalSnap.data().count,
    recentPosts: recentSnap.docs.map((d) => ({
      id: d.id,
      title: d.data().title as string,
      category: d.data().category as string,
      isAiSummary: d.data().isAiSummary as boolean,
      createdAt: d.data().createdAt?.toDate() as Date | undefined,
    })),
    byCategory: categories.map((cat, i) => ({
      category: cat,
      count: categorySnaps[i].data().count,
    })),
  };
}
