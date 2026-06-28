import React from "react";
import { Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green-deep text-white border-t border-brand-green-light py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-brand-lime text-brand-green-deep font-mono font-bold text-lg">
                <Terminal className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-white">
                EMERALD CODELINES
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-sm leading-relaxed">
              Precision engineering for the next era of industrial and digital growth. We build resilient, high-integrity software, hardware firmware, and AI architectures.
            </p>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold tracking-widest text-brand-lime uppercase">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#capabilities" className="hover:text-white hover:underline transition-all">
                  Custom Software Development
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white hover:underline transition-all">
                  Embedded Systems Architecture
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white hover:underline transition-all">
                  AI Agent Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold tracking-widest text-brand-lime uppercase">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#" className="hover:text-white hover:underline transition-all">
                  About Us
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-white hover:underline transition-all">
                  Professional Training
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-all">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright / trademark info */}
        <div className="pt-8 border-t border-brand-green-light/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-400 tracking-wider text-center uppercase">
          <span>
            © {currentYear} EMERALD CODELINES. ALL RIGHTS RESERVED.
          </span>
          <span>
            PRECISION ENGINEERING FOR THE NEXT ERA.
          </span>
        </div>
      </div>
    </footer>
  );
}
