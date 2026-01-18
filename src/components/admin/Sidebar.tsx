"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Briefcase, Cpu, LogOut, User, FileText, History, MessageSquare } from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
          A
        </div>
        <span className="text-xl font-bold tracking-tight">Admin Panel</span>
      </div>

      <nav className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link
          href="/admin/hero"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin/hero" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Hero Section</span>
        </Link>
        <Link
          href="/admin/about"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin/about" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">About Section</span>
        </Link>
        <Link
          href="/admin/experience"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin/experience" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <History className="w-5 h-5" />
          <span className="font-medium">Experience</span>
        </Link>
        <Link
          href="/admin/projects"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin/projects" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="font-medium">Projects</span>
        </Link>
        <Link
          href="/admin/services"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin/services" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="font-medium">Services</span>
        </Link>
        <Link
          href="/admin/tech"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin/tech" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <Cpu className="w-5 h-5" />
          <span className="font-medium">Tech Stack</span>
        </Link>
        <Link
          href="/admin/messages"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            pathname === "/admin/messages" ? "bg-blue-600/10 text-blue-400" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">Messages</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors text-zinc-400 hover:text-red-500 group"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
