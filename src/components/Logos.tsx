import React from "react";
import { CLIENT_LOGOS } from "../types";
import { Cpu, Atom, Activity, Shield, Factory } from "lucide-react";

export default function Logos() {
  // Map index to high-integrity styled icon
  const getLogoIcon = (index: number) => {
    switch (index) {
      case 0: return Factory;
      case 1: return Cpu;
      case 2: return Atom;
      case 3: return Activity;
      case 4: default: return Shield;
    }
  };

  return (
    <section id="clients" className="py-12 sm:py-16 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-8 sm:mb-10">
          TRUSTED BY INDUSTRY LEADERS
        </h3>
        
        {/* Responsive row/grid of industrial leaders */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
          {CLIENT_LOGOS.map((logo, index) => {
            const IconComponent = getLogoIcon(index);
            return (
              <div
                key={logo.name}
                className="flex flex-col items-center justify-center text-center p-4 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 group select-none"
              >
                <IconComponent className="w-6 h-6 text-slate-300 group-hover:text-brand-green-deep transition-colors duration-300 mb-2" />
                <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-slate-400 group-hover:text-brand-green-deep transition-colors duration-300">
                  {logo.name}
                </span>
                <span className="text-[9px] font-mono font-medium text-slate-300 group-hover:text-slate-500 tracking-wider transition-colors duration-300 uppercase mt-0.5">
                  {logo.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
