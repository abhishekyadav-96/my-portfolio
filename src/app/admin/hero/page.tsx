"use client";

import React, { useState, useEffect } from "react";
import { Save, User, Link as LinkIcon, Image as ImageIcon, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { IHero } from "@/types";

export default function AdminHero() {
  const [hero, setHero] = useState<IHero | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    availability: "",
    avatar: "",
    resumeUrl: "",
    skills: "",
    description: "",
  });

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();
      if (data.success && data.data) {
        setHero(data.data);
        setFormData({
          name: data.data.name,
          role: data.data.role,
          availability: data.data.availability,
          avatar: data.data.avatar,
          resumeUrl: data.data.resumeUrl || "",
          skills: data.data.skills || "",
          description: data.data.description || "",
        });
      }
    } catch (error) {
      console.error("Error fetching hero:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const url = hero ? `/api/hero/${hero._id}` : "/api/hero";
      const method = hero ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setHero(data.data);
        setMessage({ type: "success", text: "Hero section updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update hero section." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
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
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Hero Section</h1>
        <p className="text-zinc-400">Manage your name, role, and main hero content.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="Abhishek Kumar"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Role
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="MERN Stack Developer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Availability Status
            </label>
            <input
              type="text"
              required
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="Available for new opportunities"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Avatar URL
            </label>
            <input
              type="text"
              required
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Resume URL
            </label>
            <input
              type="text"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Skills (e.g., MERN Stack · REST APIs)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="MERN Stack · REST APIs · Authentication"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Short Bio/Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none min-h-[100px] resize-y"
              placeholder="I architect production-grade web applications..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {message.text}
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save Changes
          </button>
        </div>
      </motion.form>
    </div>
  );
}
