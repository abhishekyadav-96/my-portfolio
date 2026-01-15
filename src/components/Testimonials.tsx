"use client";

import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO @ TechFlow",
    content: "Abhinandan's ability to architect scalable MERN solutions is exceptional. He delivered our ERP system 2 weeks ahead of schedule with zero critical bugs.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Sarah Chen",
    role: "Senior Product Manager",
    content: "The attention to detail in the UI/UX implementation of our analytics dashboard was impressive. A developer who truly understands business needs.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "James Wilson",
    role: "Founder of CloudScale",
    content: "Working with Abhinandan was a breeze. His technical depth in Node.js and React helped us solve complex real-time synchronization issues effortlessly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto" id="testimonials">
      <div className="mb-20 text-center">
        <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
          Success Stories
        </span>
        <h2 className="text-5xl font-bold tracking-tight mb-6">
          <span className="text-white">Client</span> <span className="accent-gradient">Feedback</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            className="glass p-8 relative group hover:border-blue-500/30 transition-all duration-500"
          >
            <Quote className="absolute top-6 right-8 w-10 h-10 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
            
            <p className="text-zinc-400 leading-relaxed mb-8 italic relative z-10">
              "{t.content}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-800 relative">
                <Image 
                  src={t.image} 
                  alt={t.name} 
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{t.name}</h4>
                <p className="text-zinc-500 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
