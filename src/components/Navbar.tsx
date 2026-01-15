"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Profile */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Abhinandan Home">
          <div 
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden relative group-hover:border-blue-500/50 transition-colors"
          >
            <Image
              src="/unnamed.jpg"
              alt="Abhinandan"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <span className="text-xl font-bold tracking-tighter accent-gradient" aria-hidden="true">
            AY
          </span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-2xl" role="menubar">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors"
              role="menuitem"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Lab & CV Button - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/lab" 
            className="border border-blue-500/30 bg-blue-500/5 px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/5"
            aria-label="Visit the experimental lab"
          >
            Lab
          </Link>
          <a 
            href="/resume.pdf" 
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
      {isOpen && (
        <div
          className="fixed inset-0 top-[88px] bg-[#020617]/95 backdrop-blur-xl md:hidden z-40 border-t border-zinc-900"
        >
          <div className="flex flex-col p-8 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl font-bold text-zinc-100 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-zinc-900 my-4" />
            
            <div className="flex flex-col gap-4">
              <Link 
                href="/lab" 
                className="border border-blue-500/30 bg-blue-500/5 p-6 text-center text-sm font-bold tracking-widest uppercase text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                Experimental Lab
              </Link>
              <a 
                href="/resume.pdf" 
                download="Abhinandan_CV.pdf"
                className="bg-blue-600 p-6 text-center text-white text-sm font-bold tracking-widest uppercase rounded-2xl flex items-center justify-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
