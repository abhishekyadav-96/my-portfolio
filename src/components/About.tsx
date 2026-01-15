"use client";

import Image from "next/image";

const About = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="about">
      <div className="glass p-8 md:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-8 tracking-tight text-white">About Me</h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                I am a dedicated <span className="text-zinc-200 font-medium">MERN Stack Developer</span> with a passion for creating high-performance, scalable web applications. With a strong foundation in MongoDB, Express, React, and Node.js, I bridge the gap between complex back-end logic and intuitive front-end interfaces.
              </p>
              <p>
                My journey into full-stack development was driven by a desire to build complete products from the ground up. I thrive in environments that challenge me to think critically and solve problems efficiently.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative aspect-square max-w-md mx-auto w-full group">
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-zinc-800/50 glow-accent z-10">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
                alt="Working on code"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            {/* Accent elements */}
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl -z-0 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
