import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Cpu, Terminal } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const scrollToCapabilities = () => {
    const element = document.querySelector("#capabilities");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
      {/* Background Decorative Grid Line Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 z-10">
        {/* Security Compliance Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-green-deep text-brand-lime text-[11px] font-mono font-bold tracking-widest rounded-full uppercase shadow-sm border border-brand-green-light"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-lime"></span>
          </span>
          <span>⚡ ISO 27001 COMPLIANT ENGINEERING</span>
        </motion.div>

        {/* Master Heading */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-brand-green-deep leading-[1.1]"
          >
            Precision Engineering <br className="hidden sm:inline" />
            for the <span className="text-[#a1db46] bg-brand-green-deep px-4 py-1 inline-block mt-2 rounded">Next Era</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-sans pt-3"
          >
            We architect high-integrity software, specialized embedded systems, and autonomous AI agents for industries where failure is not an option.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-brand-lime hover:bg-[#a9db50] text-brand-green-deep font-sans font-bold text-sm rounded shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 group cursor-pointer border border-brand-lime-dark/15"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={scrollToCapabilities}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans font-semibold text-sm rounded transition-all duration-200 cursor-pointer"
          >
            VIEW PORTFOLIO
          </button>
        </motion.div>
      </div>
    </section>
  );
}
