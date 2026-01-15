"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Enterprise ERP System",
    description: "A comprehensive MERN-based resource planning system with real-time inventory tracking and automated invoicing.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tech: ["MongoDB", "Express", "React", "Node.js", "Redis"],
    demo: "#",
    github: "#",
    category: "Full Stack"
  },
  {
    title: "AI Analytics Dashboard",
    description: "Real-time data visualization platform integrating OpenAI API for predictive sales analytics and customer behavior modeling.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    tech: ["Next.js", "Python", "Tailwind", "D3.js", "OpenAI"],
    demo: "#",
    github: "#",
    category: "AI/ML Integration"
  },
  {
    title: "E-commerce Engine",
    description: "Scalable marketplace with complex filtering, secure Stripe integration, and an advanced administrative control panel.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    tech: ["React", "Redux", "Stripe", "PostgreSQL", "AWS"],
    demo: "#",
    github: "#",
    category: "E-commerce"
  },
  {
    title: "Collaborative Workspace",
    description: "Real-time document editing and project management tool with live presence indicators and nested comment systems.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    tech: ["Node.js", "Socket.io", "React", "Prisma", "Zustand"],
    demo: "#",
    github: "#",
    category: "SaaS"
  }
];

const Projects = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="projects">
      <div className="mb-20">
        <span className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-4 block">Selected Works</span>
        <h2 className="text-5xl font-bold tracking-tight mb-4 text-white">Crafting digital <span className="accent-gradient">excellence</span>.</h2>
        <p className="text-zinc-500 max-w-2xl text-lg">A collection of production-grade applications focusing on scalability, performance, and user-centric design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <div
            key={index}
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
              <div className="absolute top-6 left-6 z-20">
                <span className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400 border-blue-500/20">
                  {project.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10" />
            </div>

            <div className="px-2">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-8 text-sm line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map(t => (
                  <span key={t} className="text-[10px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <a 
                  href={project.demo}
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white hover:text-blue-400 transition-colors group/link"
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
                <a 
                  href={project.github}
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
                >
                  Source Code
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
