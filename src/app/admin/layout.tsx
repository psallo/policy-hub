"use client";

import { useAuth, AuthProvider } from "@/components/admin/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import AdminNav from "@/components/admin/AdminNav";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        로딩 중...
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") return null;

  return (
    <div className="flex min-h-screen">
      {user && <AdminNav />}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
