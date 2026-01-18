"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
  href: string;
}

const StatCard = ({ title, count, icon: Icon, color, href }: StatCardProps) => (
  <Link href={href}>
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
      <h3 className="text-zinc-400 font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{count}</p>
    </motion.div>
  </Link>
);

export default StatCard;
