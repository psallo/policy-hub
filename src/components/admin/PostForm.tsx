"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/lib/admin-firestore";
import type { Post, Category } from "@/lib/types";

const CATEGORIES: Category[] = [
  "복지", "청년", "창업", "주거", "교육", "일자리", "기타",
];

type FormData = Omit<Post, "id" | "createdAt" | "updatedAt">;

interface Props {
  initialData?: Partial<FormData> & { id?: string };
}

export default function PostForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    title: initialData?.title ?? "",
    summary: initialData?.summary ?? "",
    content: initialData?.content ?? "",
    images: initialData?.images ?? [],
    sourceUrl: initialData?.sourceUrl ?? "",
    sourceName: initialData?.sourceName ?? "",
    category: initialData?.category ?? "복지",
    tags: initialData?.tags ?? [],
    deadline: initialData?.deadline ?? null,
    isAiSummary: initialData?.isAiSummary ?? false,
  });

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let postId = initialData?.id;
      if (isEdit) {
        await updatePost(postId!, form);
      } else {
        const ref = await createPost(form);
        postId = ref.id;
      }
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError("저장 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <p className="rounded bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <Field label="제목 *">
        <input
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          required
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="카테고리">
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value as Category)}
            className="input"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="출처 기관명 *">
          <input
            value={form.sourceName}
            onChange={(e) => set("sourceName", e.target.value)}
            required
            className="input"
          />
        </Field>
      </div>

      <Field label="출처 URL *">
        <input
          type="url"
          value={form.sourceUrl}
          onChange={(e) => set("sourceUrl", e.target.value)}
          required
          className="input"
        />
      </Field>

      <Field label="태그 (쉼표로 구분)">
        <input
          value={form.tags.join(", ")}
          onChange={(e) =>
            set(
              "tags",
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
          placeholder="청년, 전세, 무주택"
          className="input"
        />
      </Field>

      <Field label="마감일 (없으면 공백)">
        <input
          type="date"
          value={
            form.deadline
              ? new Date(form.deadline).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            set("deadline", e.target.value ? new Date(e.target.value) : null)
          }
          className="input"
        />
      </Field>

      <Field label="핵심 요약 *">
        <textarea
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          required
          rows={4}
          className="input resize-none"
        />
      </Field>

      <Field label="본문">
        <textarea
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          rows={8}
          className="input resize-none"
        />
      </Field>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={form.isAiSummary}
          onChange={(e) => set("isAiSummary", e.target.checked)}
        />
        AI 요약 표시
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "저장 중..." : isEdit ? "수정 완료" : "포스트 등록"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border px-6 py-2 text-sm hover:bg-gray-50"
        >
          취소
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}
