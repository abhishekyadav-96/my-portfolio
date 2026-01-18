"use client";

import { Code2, Globe, Cpu, Smartphone, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IService } from "@/types";

const iconMap = {
  Globe,
  Code2,
  Zap,
  Cpu,
  ShieldCheck,
  Smartphone
};

const Services = () => {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setServices(data.data);
        } else {
          setServices([
            {
              title: "Full Stack Development",
              description: "End-to-end web applications built with the MERN stack, ensuring scalability and performance.",
              icon: "Code2"
            },
            {
              title: "Web Architecture",
              description: "Designing robust and maintainable system architectures for complex digital products.",
              icon: "Globe"
            },
            {
              title: "Performance Optimization",
              description: "Deep dive into application speed, Core Web Vitals, and server-side efficiency.",
              icon: "Zap"
            }
          ]);
        }
      } catch (error) {
        setServices([
          {
            title: "Full Stack Development",
            description: "End-to-end web applications built with the MERN stack, ensuring scalability and performance.",
            icon: "Code2"
          },
          {
            title: "Web Architecture",
            description: "Designing robust and maintainable system architectures for complex digital products.",
            icon: "Globe"
          },
          {
            title: "Performance Optimization",
            description: "Deep dive into application speed, Core Web Vitals, and server-side efficiency.",
            icon: "Zap"
          }
        ]);
      }
    };
    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto" id="services">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24 text-center"
      >
        <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
          My Services
        </span>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          <span className="text-white">How I can</span> <span className="accent-gradient">help you</span>
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Specialized in modern web technologies to transform your ideas into high-performance digital products.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, idx) => (
          <motion.article
            key={service.title}
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.3)"
            }}
            className="glass p-10 group transition-all duration-500 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500">
              {(() => {
                const Icon = iconMap[service.icon];
                return Icon ? <Icon className="w-8 h-8 text-blue-500" /> : <Globe className="w-8 h-8 text-blue-500" />;
              })()}
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-zinc-500 text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
