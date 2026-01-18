
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Code, Layout, Database, Server } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IService } from "@/types";

const iconMap: Record<string, any> = {
  Code,
  Layout,
  Database,
  Server
};

export default function AdminServices() {
  const [services, setServices] = useState<IService[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Code",
  });

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    if (data.success) setServices(data.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service?: IService) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        description: "",
        icon: "Code",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) fetchServices();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingService
      ? `/api/services/${editingService._id}`
      : "/api/services";
    const method = editingService ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchServices();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Services</h1>
          <p className="text-zinc-400">Manage the services you offer.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const IconComponent = iconMap[service.icon] || Code;
          return (
            <div
              key={service._id}
              className="glass p-6 rounded-2xl border border-zinc-800 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(service)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Icon: {service.icon}</span>
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
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Full-stack Development"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Icon Type</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="Code">Code</option>
                    <option value="Layout">Layout</option>
                    <option value="Database">Database</option>
                    <option value="Server">Server</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Describe the service..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  {editingService ? "Update Service" : "Create Service"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
