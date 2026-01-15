"use client";

import { Code2, Globe, Cpu, Smartphone, ShieldCheck, Zap } from "lucide-react";

const services = [
  {
    title: "Full-Stack Web Development",
    description: "End-to-end web applications built with the MERN stack, focusing on scalability and performance.",
    icon: Globe,
  },
  {
    title: "Custom API Development",
    description: "Robust and secure RESTful & GraphQL APIs built with Node.js and Express to power your applications.",
    icon: Code2,
  },
  {
    title: "Performance Optimization",
    description: "Optimizing your web applications for lightning-fast load times and smooth user experiences.",
    icon: Zap,
  },
  {
    title: "Database Architecture",
    description: "Designing efficient data models and managing high-availability databases with MongoDB and PostgreSQL.",
    icon: Cpu,
  },
  {
    title: "Security & Authentication",
    description: "Implementing advanced security protocols and multi-factor authentication systems for data protection.",
    icon: ShieldCheck,
  },
  {
    title: "Mobile-First Design",
    description: "Creating responsive and intuitive user interfaces that work perfectly across all devices and screen sizes.",
    icon: Smartphone,
  }
];

const Services = () => {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto" id="services">
      <div className="mb-24 text-center">
        <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
          My Services
        </span>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          <span className="text-white">How I can</span> <span className="accent-gradient">help you</span>
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Specialized in modern web technologies to transform your ideas into high-performance digital products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={service.title}
            className="glass p-10 group hover:border-blue-500/30 transition-all duration-500 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500">
              <service.icon className="w-8 h-8 text-blue-500" />
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-zinc-500 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
