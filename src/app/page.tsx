import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";

import Contact from "@/components/Contact";

import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Experience />
        <Services />
        <TechStack />
        <Projects />
        <Contact />
        
        {/* Footer */}
        <footer className="py-12 border-t border-zinc-900/50 flex flex-col items-center justify-center gap-6 bg-[#020617]/95">
          <div className="flex gap-8">
            <a href="https://github.com/abhishekyadav-96" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm font-medium">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/abhinandan-yadav-644006378/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm font-medium">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/abhishekyadav___018/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm font-medium">
              Instagram
            </a>
          </div>
          <hr className="w-full border-zinc-800" />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <span className="text-xs font-bold accent-gradient">AY</span>
            </div>
            <p className="text-zinc-500 text-sm">© 2026 Abhinandan. Built with precision.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}