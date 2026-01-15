"use client";

import { Mail, Github, Linkedin, Instagram, Copy, Check } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "abhinan888@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="contact">
      <div className="glass p-12 relative overflow-hidden rounded-[2.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              <span className="text-white">Let&apos;s build something</span> <span className="accent-gradient">exceptional</span>.
            </h2>
            <p className="text-zinc-400 text-xl leading-relaxed mb-12">
              Currently available for new opportunities. Whether you have a project in mind or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="flex flex-col gap-4">
              <a 
                href={`mailto:${email}`}
                className="inline-flex items-center gap-4 text-2xl font-bold text-white hover:text-blue-400 transition-colors group"
                aria-label="Send email to Abhinandan"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                {email}
              </a>
              
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors w-fit ml-20"
                aria-label="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">Click to copy email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a 
              href="https://github.com/abhishekyadav-96" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 transition-all group"
              title="GitHub"
            >
              <Github className="w-8 h-8 text-zinc-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/abhinandan-yadav-644006378/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 transition-all group"
              title="LinkedIn"
            >
              <Linkedin className="w-8 h-8 text-zinc-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/abhishekyadav___018/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 transition-all group"
              title="Instagram"
            >
              <Instagram className="w-8 h-8 text-zinc-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Instagram</span>
            </a>
            <div className="glass p-8 flex flex-col items-center justify-center gap-4 border-dashed border-zinc-800 opacity-50">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">More Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
