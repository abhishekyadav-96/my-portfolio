"use client";

import React, { useState, useEffect } from "react";
import { Save, FileText, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { IAbout } from "@/types";

export default function AdminAbout() {
  const [about, setAbout] = useState<IAbout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    title: "About Me",
    description: ["", ""],
    image: "",
  });

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/about");
      const data = await res.json();
      if (data.success && data.data) {
        setAbout(data.data);
        setFormData({
          title: data.data.title,
          description: data.data.description,
          image: data.data.image,
        });
      }
    } catch (error) {
      console.error("Error fetching about:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleDescChange = (index: number, value: string) => {
    const newDesc = [...formData.description];
    newDesc[index] = value;
    setFormData({ ...formData, description: newDesc });
  };

  const addParagraph = () => {
    setFormData({ ...formData, description: [...formData.description, ""] });
  };

  const removeParagraph = (index: number) => {
    const newDesc = formData.description.filter((_, i) => i !== index);
    setFormData({ ...formData, description: newDesc });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const url = about ? `/api/about/${about._id}` : "/api/about";
      const method = about ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setAbout(data.data);
        setMessage({ type: "success", text: "About section updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update about section." });
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
        <h1 className="text-3xl font-bold text-white">About Section</h1>
        <p className="text-zinc-400">Manage your personal bio and profile image.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass p-8 space-y-6"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Section Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="About Me"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Profile/About Image URL
            </label>
            <input
              type="text"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">Bio Paragraphs</label>
              <button
                type="button"
                onClick={addParagraph}
                className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Paragraph
              </button>
            </div>
            
            {formData.description.map((p, index) => (
              <div key={index} className="relative group">
                <textarea
                  required
                  value={p}
                  onChange={(e) => handleDescChange(index, e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none min-h-[100px] resize-y"
                  placeholder={`Paragraph ${index + 1}`}
                />
                {formData.description.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(index)}
                    className="absolute top-3 right-3 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
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
