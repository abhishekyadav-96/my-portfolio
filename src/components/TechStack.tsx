"use client";

import { Layout, Server, Database, Wrench } from "lucide-react";

const TechStack = () => {
  const categories = [
    {
      title: "Frontend",
      description: "Building responsive, interactive, and high-performance user interfaces.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
      icon: Layout,
      color: "blue"
    },
    {
      title: "Backend",
      description: "Developing robust, scalable server-side logic and efficient RESTful APIs.",
      skills: ["Node.js", "Express.js", "PostgreSQL", "Socket.io", "JWT Auth", "REST APIs"],
      icon: Server,
      color: "indigo"
    },
    {
      title: "Database",
      description: "Designing and managing high-availability data storage and retrieval systems.",
      skills: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma", "Redis", "Firebase"],
      icon: Database,
      color: "emerald"
    },
    {
      title: "Tools & DevOps",
      description: "Streamlining development workflows and ensuring reliable deployment.",
      skills: ["Git", "Docker", "AWS", "Vercel", "Jest", "CI/CD"],
      icon: Wrench,
      color: "amber"
    }
  ];

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto" id="tech">
      <div className="mb-24 text-center">
        <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
          Core Capabilities
        </span>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          <span className="text-white">Technical</span> <span className="accent-gradient">Expertise</span>
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
          A comprehensive breakdown of my full-stack development skills, focusing on modern architectures and performance optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className="glass p-8 group hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full"
          >
            <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500`}>
              <cat.icon className="w-7 h-7 text-blue-500" />
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
