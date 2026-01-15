"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center relative">
      
      <div className="flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-2">
          <div className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            Available for new opportunities
          </span>
        </div>

        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl bg-zinc-900 overflow-hidden border border-zinc-800/50 glow-accent relative z-10">
            <Image
              src="/unnamed.jpg" 
              alt="Abhinandan"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
          <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl -z-0 group-hover:bg-blue-500/20 transition-colors" />
        </div>

        <div className="space-y-4 max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="text-gradient">Abhinandan</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 h-12">
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
              className="text-xl md:text-2xl font-mono font-medium tracking-[0.2em] uppercase"
            >
              MERN Stack Developer
            </motion.p>
            <div className="h-px w-8 bg-blue-500/50 hidden sm:block" />
          </div>
        </div>

        <p className="max-w-xl text-zinc-500 text-lg leading-relaxed">
          Building scalable, high-performance web applications with a focus on clean architecture and exceptional user experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full sm:w-auto px-4">
          <a 
            href="#projects"
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 text-center flex items-center justify-center gap-2"
          >
            View Projects
          </a>
          <a 
            href="/resume.pdf"
            download="Abhinandan_CV.pdf"
            className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 px-8 py-4 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-2 group"
          >
            <Download className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-white">Download Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
