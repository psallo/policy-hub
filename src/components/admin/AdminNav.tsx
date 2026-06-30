"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminLogout } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/posts", label: "포스트 관리" },
  { href: "/admin/posts/new", label: "새 포스트" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await adminLogout();
    router.push("/admin/login");
  }

  return (
    <aside className="w-52 min-h-screen border-r bg-white px-4 py-8 flex flex-col">
      <p className="mb-8 text-lg font-bold text-blue-600">정책허브 관리</p>
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-3 py-2 text-sm ${
              pathname === href
                ? "bg-blue-50 font-medium text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-4 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
      >
        로그아웃
      </button>
    </aside>
  );
}
