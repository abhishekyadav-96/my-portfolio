"use client";

const experiences = [
  {
    title: "Senior MERN Stack Developer",
    company: "flowerage.pvt.ltd",
    period: "2023 - Present",
    description: "Architecting scalable web applications using MongoDB, Express, React, and Node.js. Leading a team of 5 developers to deliver high-quality products.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Redux"]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations",
    period: "2021 - 2023",
    description: "Developed and maintained complex web systems. Implemented real-time features using Socket.io and optimized database performance.",
    tags: ["JavaScript", "TypeScript", "Next.js", "PostgreSQL", "AWS"]
  }
];

const Experience = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="experience">
      <div className="mb-16">
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">Experience</h2>
        <div className="w-20 h-1 bg-blue-500 rounded-full" />
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="glass p-8 group relative overflow-hidden"
          >
            {/* Subtle Gradient Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-zinc-400 font-medium">{exp.company}</p>
                </div>
                <span className="text-zinc-500 font-mono text-sm bg-zinc-800/50 px-4 py-1 rounded-full border border-zinc-700/30">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-zinc-400 leading-relaxed mb-8 max-w-3xl">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {exp.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold text-zinc-500 bg-zinc-800/30 px-3 py-1 rounded-lg border border-zinc-700/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
