"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, User, Calendar, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="text-zinc-400 mt-2">Manage contact form submissions</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-zinc-400 text-sm">
          Total: {messages.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800"
            >
              <MessageSquare className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500">No messages found</p>
            </motion.div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors relative group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{msg.name}</h3>
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${msg.email}`} className="hover:text-blue-400 transition-colors">
                          {msg.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="p-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Delete message"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/50">
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
