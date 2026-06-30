"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          사이트는 서비스 개선 및 맞춤형 광고(Google AdSense) 제공을 위해 쿠키를 사용합니다.{" "}
          <Link href="/privacy" className="text-blue-600 underline">
            자세히 보기
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded-lg border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            거부
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
}
