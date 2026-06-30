"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`/posts?${params.toString()}`);
    setLoading(false);
  }

  function handleClear() {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/posts?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative mb-6 flex gap-2">
      <div className="relative flex-1">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="정책명, 키워드로 검색..."
          className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
      >
        검색
      </button>
    </form>
  );
}
