"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { IExperience } from "@/types";

const Experience = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/experience");
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setExperiences(data.data);
        } else {
          // Fallback data if DB is empty
          setExperiences([
            {
              title: "Senior MERN Stack Developer",
              company: "flowerage.pvt.ltd",
              period: "2023 - Present",
              description: "Architecting scalable web applications using MongoDB, Express, React, and Node.js. Leading a team of 5 developers to deliver high-quality products.",
              tags: ["MongoDB", "Express", "React", "Node.js", "Redux"],
              image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
            },
            {
              title: "Full Stack Developer",
              company: "Digital Innovations",
              period: "2021 - 2023",
              description: "Developed and maintained complex web systems. Implemented real-time features using Socket.io and optimized database performance.",
              tags: ["JavaScript", "TypeScript", "Next.js", "PostgreSQL", "AWS"],
              image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
            }
          ]);
        }
      } catch (error) {
        // Fallback on error
        setExperiences([
          {
            title: "Senior MERN Stack Developer",
            company: "flowerage.pvt.ltd",
            period: "2023 - Present",
            description: "Architecting scalable web applications using MongoDB, Express, React, and Node.js. Leading a team of 5 developers to deliver high-quality products.",
            tags: ["MongoDB", "Express", "React", "Node.js", "Redux"],
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
          },
          {
            title: "Full Stack Developer",
            company: "Digital Innovations",
            period: "2021 - 2023",
            description: "Developed and maintained complex web systems. Implemented real-time features using Socket.io and optimized database performance.",
            tags: ["JavaScript", "TypeScript", "Next.js", "PostgreSQL", "AWS"],
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          }
        ]);
      }
    };

    fetchExperience();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="experience">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">Experience</h2>
        <div className="w-20 h-1 bg-blue-500 rounded-full" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-12"
      >
        {experiences.map((exp, index) => (
          <motion.article
            key={index}
            variants={itemVariants}
            className="glass p-6 md:p-8 group relative overflow-hidden flex flex-col md:flex-row gap-8 items-start hover:border-blue-500/30 transition-all duration-500"
          >
            {/* Subtle Gradient Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Experience Image */}
            <div className="relative w-full md:w-72 h-48 md:h-64 shrink-0 rounded-2xl overflow-hidden border border-zinc-800/50">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="relative z-10 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-zinc-400 font-medium">{exp.company}</p>
                </div>
                <span className="text-zinc-500 font-mono text-sm bg-zinc-800/50 px-4 py-1 rounded-full border border-zinc-700/30 w-fit">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {exp.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold text-zinc-500 bg-zinc-800/30 px-3 py-1 rounded-lg border border-zinc-700/20 group-hover:border-zinc-600 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
