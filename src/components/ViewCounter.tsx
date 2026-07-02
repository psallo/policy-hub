"use client";

import { useEffect, useState } from "react";
import { incrementViews } from "@/lib/firestore";

export default function ViewCounter({ postId, initialViews }: { postId: string; initialViews: number }) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    incrementViews(postId).then(() => setViews((v) => v + 1));
  }, [postId]);

  return (
    <span className="flex items-center gap-1 text-gray-400 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      {views.toLocaleString()}
    </span>
  );
}
