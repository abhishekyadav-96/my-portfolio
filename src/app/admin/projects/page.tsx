
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Github, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IProject } from "@/types";

export default function AdminProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    liveUrl: "",
    githubUrl: "",
  });

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (data.success) setProjects(data.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project?: IProject) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        tags: project.tags.join(", "),
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        tags: "",
        liveUrl: "",
        githubUrl: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    const url = editingProject
      ? `/api/projects/${editingProject._id}`
      : "/api/projects";
    const method = editingProject ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchProjects();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
          <p className="text-zinc-400">Add, edit, or remove projects from your portfolio.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="glass p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="relative w-full md:w-64 aspect-[16/10] rounded-xl overflow-hidden border border-zinc-700">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id!)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-zinc-400 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-zinc-800 text-zinc-500 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-medium">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" className="text-zinc-400 hover:text-white flex items-center gap-1 text-sm font-medium">
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
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
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Title</label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Project Title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Tags (comma separated)</label>
                    <input
                      required
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Image URL</label>
                  <input
                    required
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="https://unsplash.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Describe the project..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Live URL</label>
                    <input
                      type="text"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="#"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="#"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
