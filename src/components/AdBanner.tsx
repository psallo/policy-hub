"use client";

import { useEffect } from "react";

interface Props {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
}: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  // AdSense publisher ID가 설정되지 않은 경우 개발 환경에서 플레이스홀더 표시
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400 ${className}`}
          style={{ minHeight: 90 }}
        >
          광고 영역 (AdSense 승인 후 활성화)
        </div>
      );
    }
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
