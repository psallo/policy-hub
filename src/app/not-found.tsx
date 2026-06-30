import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-6xl font-bold text-blue-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-gray-500">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
        >
          홈으로 가기
        </Link>
        <Link
          href="/posts"
          className="rounded-lg border px-6 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          전체 정책 보기
        </Link>
      </div>
    </div>
  );
}
