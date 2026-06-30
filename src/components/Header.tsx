import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          정책허브
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-600">
          <Link href="/posts" className="hover:text-blue-600">정책 목록</Link>
          <Link href="/about" className="hover:text-blue-600 hidden sm:block">소개</Link>
          <Link
            href="/contact"
            className="rounded-lg border border-blue-600 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
          >
            문의
          </Link>
        </nav>
      </div>
    </header>
  );
}
