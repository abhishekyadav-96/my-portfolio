"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "@/hooks/useScroll";
import { IHero } from "@/types";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScroll(50);
  const [hero, setHero] = useState<IHero | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHero(data.data);
      });
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Profile */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Abhinandan Home">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden relative group-hover:border-blue-500/50 transition-colors"
          >
            <Image
              src={hero?.avatar || "/unnamed.jpg"}
              alt={hero?.name || "Abhinandan"}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
          <span className="text-xl font-bold tracking-tighter accent-gradient" aria-hidden="true">
            {hero?.name ? hero.name.split(' ').map(n => n[0]).join('') : "AY"}
          </span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className={`hidden md:flex items-center gap-8 px-8 py-3 rounded-2xl transition-all duration-300 ${
          isScrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
        }`} role="menubar">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors relative group/link"
              role="menuitem"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover/link:w-full" />
            </Link>
          ))}
        </div>

        {/* Lab & CV Button - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/lab" 
            className="border border-blue-500/30 bg-blue-500/5 px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/5 active:scale-95"
            aria-label="Visit the experimental lab"
          >
            Lab
          </Link>
          <a 
            href={hero?.resumeUrl || "/resume.pdf"} 
            target="_blank"
            rel="noopener noreferrer"
            download="Abhinandan_CV.pdf"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95"
            aria-label="Download Resume"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden glass p-3 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 bg-[#020617] backdrop-blur-xl md:hidden z-40"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-8 border-b border-zinc-900">
                <span className="text-xl font-bold tracking-tighter accent-gradient">
                  {hero?.name ? hero.name.split(' ').map(n => n[0]).join('') : "AY"}
                </span>
                <button
                  className="glass p-3 text-zinc-400"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col p-8 gap-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link
                      href={link.href}
                      className="text-4xl font-bold text-zinc-100 hover:text-blue-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto p-8 border-t border-zinc-900 flex flex-col gap-4">
                <Link 
                  href="/lab" 
                  className="w-full text-center border border-blue-500/30 bg-blue-500/5 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  Explore Lab
                </Link>
                <a 
                  href={hero?.resumeUrl || "/resume.pdf"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Abhinandan_CV.pdf"
                  className="w-full text-center bg-blue-600 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase text-white flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
