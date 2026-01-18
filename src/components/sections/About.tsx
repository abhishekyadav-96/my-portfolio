"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IAbout } from "@/types";

const About = () => {
  const [about, setAbout] = useState<IAbout | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAbout(data.data);
        }
      })
      .catch(() => {
        // Fallback is handled in the JSX
      });
  }, []);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="about">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass p-8 md:p-12 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold mb-8 tracking-tight text-white"
            >
              {about?.title || "About Me"}
            </motion.h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              {about?.description ? (
                about.description.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
                  >
                    {p}
                  </motion.p>
                ))
              ) : (
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    I am a dedicated <span className="text-zinc-200 font-medium">MERN Stack Developer</span> with a passion for creating high-performance, scalable web applications. With a strong foundation in MongoDB, Express, React, and Node.js, I bridge the gap between complex back-end logic and intuitive front-end interfaces.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    My journey into full-stack development was driven by a desire to build complete products from the ground up. I thrive in environments that challenge me to think critically and solve problems efficiently.
                  </motion.p>
                </>
              )}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative aspect-square max-w-md mx-auto w-full group"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-zinc-800/50 glow-accent z-10">
              <Image
                src={about?.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"}
                alt="Working on code"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            {/* Accent elements */}
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl -z-0 opacity-50" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
