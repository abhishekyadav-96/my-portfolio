"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Calendar, Building2, Briefcase, Tag, Image as ImageIcon, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IExperience } from "@/types";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<IExperience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
    tags: "",
    image: "",
  });

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      if (data.success) setExperiences(data.data);
    } catch (error) {
      console.error("Error fetching experience:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenModal = (exp?: IExperience) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        title: exp.title,
        company: exp.company,
        period: exp.period,
        description: exp.description,
        tags: exp.tags.join(", "),
        image: exp.image,
      });
    } else {
      setEditingExp(null);
      setFormData({
        title: "",
        company: "",
        period: "",
        description: "",
        tags: "",
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) fetchExperiences();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    const url = editingExp ? `/api/experience/${editingExp._id}` : "/api/experience";
    const method = editingExp ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchExperiences();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Experience</h1>
          <p className="text-zinc-400">Add or update your professional work history.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {experiences.map((exp) => (
          <motion.div
            layout
            key={exp._id}
            className="glass p-6 flex flex-col md:flex-row gap-6 group relative"
          >
            <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden border border-zinc-800">
              <Image
                src={exp.image}
                alt={exp.company}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(exp)}
                    className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id!)}
                    className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-blue-400 font-medium">{exp.company}</p>
              <p className="text-sm text-zinc-500 font-mono">{exp.period}</p>
              <p className="text-zinc-400 text-sm line-clamp-2">{exp.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-800 text-zinc-500 rounded border border-zinc-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {editingExp ? "Edit Experience" : "Add New Experience"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Job Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:border-blue-500 transition-colors outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Company
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:border-blue-500 transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Period (e.g., 2021 - 2023)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:border-blue-500 transition-colors outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Company Logo URL
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:border-blue-500 transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:border-blue-500 transition-colors outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="React, Node.js, TypeScript"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:border-blue-500 transition-colors outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                  <Save className="w-5 h-5" />
                  {editingExp ? "Update Experience" : "Save Experience"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
