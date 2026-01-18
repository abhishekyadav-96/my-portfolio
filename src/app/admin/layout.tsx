
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated && pathname !== "/admin/login") {
    return <div className="min-h-screen bg-black" />;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex">
      <Sidebar onLogout={logout} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

