import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CAPABILITIES, Capability } from "../types";
import { Check, X, ArrowRight, Layers, FileText, Cpu, Eye } from "lucide-react";

export default function Capabilities() {
  const [selectedCap, setSelectedCap] = useState<Capability | null>(null);

  return (
    <section id="capabilities" className="py-20 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-widest text-brand-green-deep uppercase">
            CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
            The Core Ecosystem
          </h2>
        </div>

        {/* Stack of Cards matching the screen layout exactly */}
        <div className="space-y-12">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Header with Label Overlay */}
              <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                <img
                  src={cap.image}
                  alt={cap.seoAlt}
                  title={cap.seoTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                />
                {/* Category tag */}
                <div className="absolute top-4 left-4 bg-brand-green-deep/95 text-brand-lime text-[10px] font-mono font-bold px-3 py-1 rounded-sm uppercase tracking-wider border border-brand-green-light/50">
                  {cap.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-slate-900 hover:text-brand-green-deep transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Bullet Points with checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {cap.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center space-x-2.5 text-xs font-mono font-semibold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-brand-green-deep flex items-center justify-center border border-emerald-100">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedCap(cap)}
                    className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-slate-800 hover:text-brand-green-deep transition-colors duration-200 cursor-pointer group"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Explorer Modal */}
      <AnimatePresence>
        {selectedCap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCap(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-xl bg-white rounded-lg border border-slate-200 shadow-2xl z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-brand-green-deep p-6 text-white border-b border-brand-green-light">
                <span className="text-[10px] font-mono text-brand-lime uppercase tracking-widest font-semibold block">
                  SERVICE DETAILED PROFILE
                </span>
                <h3 className="text-lg font-display font-bold mt-1">
                  {selectedCap.title}
                </h3>
                <button
                  onClick={() => setSelectedCap(null)}
                  className="absolute top-5 right-5 p-1 text-slate-300 hover:text-white rounded hover:bg-brand-green-light transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    Overview
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {selectedCap.details}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    Technical Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedCap.features.map((feat, index) => (
                      <li key={index} className="flex items-start text-xs text-slate-700 font-sans">
                        <Check className="w-4 h-4 text-brand-green-deep shrink-0 mr-2.5 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedCap(null)}
                  className="px-4 py-2 text-xs font-mono font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Close Explorer
                </button>
                <a
                  href="#audit"
                  onClick={() => setSelectedCap(null)}
                  className="px-4 py-2 bg-brand-green-deep hover:bg-brand-green-light text-white text-xs font-mono font-bold tracking-wider rounded uppercase transition-colors"
                >
                  Request Audit Spec
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
