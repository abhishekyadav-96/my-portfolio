
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Briefcase, Cpu, User, FileText, History, MessageSquare } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    tech: 0,
    experience: 0,
    messages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pRes, sRes, tRes, eRes, mRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/services'),
          fetch('/api/tech'),
          fetch('/api/experience'),
          fetch('/api/messages')
        ]);
        
        const [p, s, t, e, m] = await Promise.all([
          pRes.json(),
          sRes.json(),
          tRes.json(),
          eRes.json(),
          mRes.json()
        ]);

        setStats({
          projects: p.data?.length || 0,
          services: s.data?.length || 0,
          tech: t.data?.length || 0,
          experience: e.data?.length || 0,
          messages: m.data?.length || 0
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, Admin</h1>
        <p className="text-zinc-400">Manage your portfolio content and keep it up to date.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Projects"
          count={stats.projects}
          icon={FolderKanban}
          color="bg-blue-500"
          href="/admin/projects"
        />
        <StatCard
          title="Services"
          count={stats.services}
          icon={Briefcase}
          color="bg-purple-500"
          href="/admin/services"
        />
        <StatCard
          title="Experience"
          count={stats.experience}
          icon={History}
          color="bg-orange-500"
          href="/admin/experience"
        />
        <StatCard
          title="Tech Stack"
          count={stats.tech}
          icon={Cpu}
          color="bg-emerald-500"
          href="/admin/tech"
        />
        <StatCard
          title="Messages"
          count={stats.messages}
          icon={MessageSquare}
          color="bg-pink-500"
          href="/admin/messages"
        />
      </div>

      <div className="mt-12 p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/hero" className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-center font-medium flex items-center justify-center gap-2">
            <User className="w-4 h-4" /> Edit Hero Section
          </Link>
          <Link href="/admin/about" className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-center font-medium flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Update About Bio
          </Link>
          <Link href="/admin/experience" className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-center font-medium flex items-center justify-center gap-2">
            <History className="w-4 h-4" /> Add Experience
          </Link>
          <Link href="/admin/projects" className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-center font-medium flex items-center justify-center gap-2">
            <FolderKanban className="w-4 h-4" /> Add New Project
          </Link>
          <Link href="/admin/messages" className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-center font-medium flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" /> View Messages
          </Link>
          <Link href="/admin/services" className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-center font-medium flex items-center justify-center gap-2">
            <Briefcase className="w-4 h-4" /> Add New Service
          </Link>
          <Link href="/admin/tech" className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-center font-medium flex items-center justify-center gap-2">
            <Cpu className="w-4 h-4" /> Manage Tech Stack
          </Link>
        </div>
      </div>
    </div>
  );
}
