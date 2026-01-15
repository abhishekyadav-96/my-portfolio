"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Beaker } from "lucide-react";

const experiments = [
  {
    title: "Shader Backgrounds",
    description: "Exploring WebGL and Three.js for immersive web experiences.",
    status: "In Progress",
  },
  {
    title: "AI Chat Interface",
    description: "A minimal, gesture-based interface for interacting with LLMs.",
    status: "Completed",
  },
  {
    title: "Custom Physics Engine",
    description: "Building a lightweight 2D physics engine for React components.",
    status: "Archived",
  },
];

export default function LabPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 md:p-24">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/30">
            <Beaker className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">The Lab</h1>
            <p className="text-zinc-400">Experimental projects and design explorations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {experiments.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 group hover:border-blue-500/30 transition-all"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-zinc-900 rounded-md mb-4 inline-block text-zinc-400 border border-zinc-800">
                {exp.status}
              </span>
              <h3 className="text-xl font-bold mb-2 text-zinc-100 group-hover:text-blue-400 transition-colors">{exp.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
