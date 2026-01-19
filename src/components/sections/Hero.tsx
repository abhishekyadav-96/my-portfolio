"use client";

import { Download, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { IHero } from "@/types";

const Hero = () => {
  const [hero, setHero] = useState<IHero | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHero(data.data);
        } else {
          setHero({
            name: "Abhinandan",
            role: "MERN Stack Developer",
            availability: "Available for new opportunities",
            avatar: "/unnamed.jpg",
            resumeUrl: "/resume.pdf",
            skills: "MERN Stack | Next.js | TypeScript",
            description: "Passionate about building high-performance web applications with modern technologies."
          });
        }
      })
      .catch(() => {
        setHero({
          name: "Abhinandan",
          role: "MERN Stack Developer",
          availability: "Available for new opportunities",
          avatar: "/unnamed.jpg",
          resumeUrl: "/resume.pdf",
          skills: "MERN Stack | Next.js | TypeScript",
          description: "Passionate about building high-performance web applications with modern technologies."
        });
      });
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px] -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-8 relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm mb-2"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            {hero?.availability || "Available for new opportunities"}
          </span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-32 h-32 rounded-3xl bg-zinc-900 overflow-hidden border border-zinc-800/50 glow-accent relative z-10"
          >
            <Image
              src={hero?.avatar || "/unnamed.jpg"} 
              alt={hero?.name || "Abhinandan"}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              priority
            />
          </motion.div>
          <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl -z-0 group-hover:bg-blue-500/20 transition-colors" />
        </motion.div>

        <div className="space-y-4 max-w-3xl">
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold tracking-tight"
          >
            <span className="text-gradient">{hero?.name || "Abhinandan"}</span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-3 h-12"
          >
            <div className="h-px w-8 bg-blue-500/50 hidden sm:block" />
            <motion.p 
              animate={{ 
                y: [0, -8, 0],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                backgroundPosition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                background: "linear-gradient(90deg, #ffffff 0%, #a1a1aa 50%, #ffffff 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-xl md:text-2xl font-medium tracking-wide"
            >
              {hero?.role || "MERN Stack Developer"}
            </motion.p>
            <div className="h-px w-8 bg-blue-500/50 hidden sm:block" />
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-blue-500/80 pt-2"
          >
            {hero?.skills || "MERN Stack · REST APIs · Authentication · Cloud Deployment"}
          </motion.p>
        </div>

        <motion.p 
          variants={itemVariants}
          className="max-w-xl text-zinc-500 text-lg leading-relaxed"
        >
          {hero?.description || "I architect production-grade web applications focusing on high-performance architecture, scalable systems, and seamless user experiences."}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-6 mt-4"
        >
          <a 
            href="#projects"
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 active:scale-95"
          >
            View My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href={hero?.resumeUrl || "/resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            download="Abhinandan_CV.pdf"
            className="flex items-center gap-2 text-white px-8 py-4 rounded-2xl font-bold border border-zinc-800 hover:bg-zinc-800/50 transition-all duration-300 active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download CV
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
