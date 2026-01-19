
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Database, Globe, Cpu, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ITech } from "@/types";

const iconMap: Record<string, any> = {
  Database,
  Globe,
  Cpu,
  Layers
};

export default function AdminTech() {
  const [techItems, setTechItems] = useState<ITech[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<ITech | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    icon: "Globe",
    color: "blue",
  });

  const fetchTech = async () => {
    const res = await fetch("/api/tech");
    const data = await res.json();
    if (data.success) setTechItems(data.data);
  };

  useEffect(() => {
    fetchTech();
  }, []);

  const handleOpenModal = (tech?: ITech) => {
    if (tech) {
      setEditingTech(tech);
      setFormData({
        title: tech.title,
        description: tech.description,
        skills: tech.skills.join(", "),
        icon: tech.icon,
        color: tech.color || "blue",
      });
    } else {
      setEditingTech(null);
      setFormData({
        title: "",
        description: "",
        skills: "",
        icon: "Globe",
        color: "blue",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tech category?")) {
      const res = await fetch(`/api/tech/${id}`, { method: "DELETE" });
      if (res.ok) fetchTech();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    const url = editingTech
      ? `/api/tech/${editingTech._id}`
      : "/api/tech";
    const method = editingTech ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchTech();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Tech Stack</h1>
          <p className="text-zinc-400">Organize your technical skills and expertise.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techItems.map((tech) => {
          const IconComponent = iconMap[tech.icon] || Globe;
          return (
            <div
              key={tech._id}
              className="glass p-6 rounded-2xl border border-zinc-800 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-${tech.color}-500/10 text-${tech.color}-500`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(tech)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(tech._id!)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{tech.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {editingTech ? "Edit Tech Category" : "Add Tech Category"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Title</label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Frontend"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Color</label>
                    <select
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="emerald">Emerald</option>
                      <option value="amber">Amber</option>
                      <option value="rose">Rose</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Icon Type</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="Globe">Globe</option>
                    <option value="Database">Database</option>
                    <option value="Cpu">Cpu</option>
                    <option value="Layers">Layers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Skills (comma separated)</label>
                  <input
                    required
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="React, Next.js, Tailwind"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Describe this category..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  {editingTech ? "Update Tech" : "Create Tech"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
