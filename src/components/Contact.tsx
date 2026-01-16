"use client";

import { Mail, Github, Linkedin, Instagram, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";

const initialState = {
  message: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "abhinan888@gmail.com";
  const [state, formAction] = useFormState(submitContactForm, initialState);

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
            
            <form action={formAction} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                  required 
                />
                {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                  required 
                />
                {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                  required 
                ></textarea>
                {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message}</p>}
              </div>
              <SubmitButton />
              {state.message && <p className="text-green-500 text-sm mt-4">{state.message}</p>}
            </form>

            <hr className="w-full border-zinc-800 my-12 lg:hidden" />
          </div>

          <div className="flex flex-col justify-between">
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
        </div>
      </div>
    </section>
  );
};

export default Contact;