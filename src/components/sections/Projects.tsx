"use client";

import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IProject } from "@/types";

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects([
            {
              title: "Modern E-Commerce Platform",
              description: "A high-performance storefront with real-time inventory and secure payments.",
              image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop",
              github: "https://github.com/abhishekyadav-96",
              demo: "https://github.com/abhishekyadav-96",
              tags: ["Next.js", "Stripe", "MongoDB"]
            },
            {
              title: "Task Management SaaS",
              description: "Collaborative platform for teams with real-time updates and analytics.",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
              github: "https://github.com/abhishekyadav-96",
              demo: "https://github.com/abhishekyadav-96",
              tags: ["React", "Node.js", "Socket.io"]
            }
          ]);
        }
      } catch (error) {
        setProjects([
          {
            title: "Modern E-Commerce Platform",
            description: "A high-performance storefront with real-time inventory and secure payments.",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop",
            github: "https://github.com/abhishekyadav-96",
            demo: "https://github.com/abhishekyadav-96",
            tags: ["Next.js", "Stripe", "MongoDB"]
          },
          {
            title: "Task Management SaaS",
            description: "Collaborative platform for teams with real-time updates and analytics.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            github: "https://github.com/abhishekyadav-96",
            demo: "https://github.com/abhishekyadav-96",
            tags: ["React", "Node.js", "Socket.io"]
          }
        ]);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="projects">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-blue-500/50" />
          <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">Selected Works</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
          Designing and engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">modern full-stack</span> solutions.
        </h2>
        <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed border-l-2 border-zinc-800 pl-6">
          A curated collection of production-grade applications where complex logic meets 
          scalable architecture and seamless user experiences.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {projects.map((project, index) => (
          <motion.article
            key={index}
            variants={itemVariants}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative"
          >
            <div 
              className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-zinc-800/50 glass glow-accent mb-8 group/img"
            >
              <div
                className="w-full h-full"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 group-hover/img:scale-105"
                />
              </div>
              
              <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400 border-blue-500/20 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={hoveredIndex === index ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    <a href={project.liveUrl} className="p-3 rounded-full bg-white text-black hover:bg-blue-500 hover:text-white transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a href={project.githubUrl} className="p-3 rounded-full bg-zinc-900/80 text-white border border-zinc-800 hover:border-blue-500 transition-all">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="px-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map(t => (
                  <span key={t} className="text-[10px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-lg group-hover:border-zinc-700 transition-colors">
                    {t}
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

export default Projects;
