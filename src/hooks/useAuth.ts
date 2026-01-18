"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [pathname, router]);

  const login = (token: string) => {
    localStorage.setItem("admin_auth", token);
    setIsAuthenticated(true);
    router.push("/admin");
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  return { isAuthenticated, isLoading, login, logout };
};
