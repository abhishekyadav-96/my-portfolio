"use client";

import { Layout, Server, Database, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ITech } from "@/types";

const iconMap = {
  Layout,
  Server,
  Database,
  Wrench
};

const TechStack = () => {
  const [categories, setCategories] = useState<ITech[]>([]);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const res = await fetch('/api/tech');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategories(data.data);
        } else {
          setCategories([
            {
              title: "Frontend",
              icon: "Layout",
              description: "Building responsive and interactive user interfaces with modern frameworks.",
              skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
            },
            {
              title: "Backend",
              icon: "Server",
              description: "Developing robust server-side logic and scalable API architectures.",
              skills: ["Node.js", "Express", "Python", "GraphQL", "REST APIs"]
            },
            {
              title: "Database",
              icon: "Database",
              description: "Designing and optimizing data models for high-performance applications.",
              skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Mongoose"]
            },
            {
              title: "DevOps",
              icon: "Wrench",
              description: "Streamlining deployment pipelines and managing cloud infrastructure.",
              skills: ["Docker", "AWS", "CI/CD", "Vercel", "Git"]
            }
          ]);
        }
      } catch (error) {
        setCategories([
          {
            title: "Frontend",
            icon: "Layout",
            description: "Building responsive and interactive user interfaces with modern frameworks.",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
          },
          {
            title: "Backend",
            icon: "Server",
            description: "Developing robust server-side logic and scalable API architectures.",
            skills: ["Node.js", "Express", "Python", "GraphQL", "REST APIs"]
          },
          {
            title: "Database",
            icon: "Database",
            description: "Designing and optimizing data models for high-performance applications.",
            skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Mongoose"]
          },
          {
            title: "DevOps",
            icon: "Wrench",
            description: "Streamlining deployment pipelines and managing cloud infrastructure.",
            skills: ["Docker", "AWS", "CI/CD", "Vercel", "Git"]
          }
        ]);
      }
    };
    fetchTech();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto" id="tech">
      <motion.div   
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24 text-center"
      >
        <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
          Core Capabilities
        </span>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          <span className="text-white">Technical</span> <span className="accent-gradient">Expertise</span>
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
          A comprehensive breakdown of my full-stack development skills, focusing on modern architectures and performance optimization.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="glass p-8 group hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full"
          >
            <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500`}>
              {(() => {
                const Icon = iconMap[cat.icon];
                return Icon ? <Icon className="w-7 h-7 text-blue-500" /> : <Layout className="w-7 h-7 text-blue-500" />;
              })()}
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
              {cat.title}
            </h3>
            
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">
              {cat.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/50">
              {cat.skills.map(skill => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-wider uppercase hover:border-blue-500/30 hover:text-blue-400 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStack;
