import React from "react";
import { motion } from "motion/react";
import { Lightbulb, ShieldAlert, Binary, Award, Shield } from "lucide-react";

export default function ValueProps() {
  const cards = [
    {
      icon: Lightbulb,
      title: "Innovation",
      text: "We don't just build software; we pioneer new architectural paradigms to solve impossible problems.",
      accent: "text-amber-500",
      bgAccent: "bg-amber-50 border-amber-100"
    },
    {
      icon: Shield,
      title: "Reliability",
      text: "Military-grade protocols and testing suites ensure 99.99% uptime for mission-critical operations.",
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-50 border-emerald-100"
    },
    {
      icon: Binary,
      title: "Expertise",
      text: "Our team consists of senior engineers with deep experience in hardware-level optimization and ML research.",
      accent: "text-indigo-600",
      bgAccent: "bg-indigo-50 border-indigo-100"
    }
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded flex items-center justify-center border mb-6 transition-all duration-300 bg-slate-50 border-slate-200 text-slate-700 group-hover:bg-brand-green-deep group-hover:text-white group-hover:border-brand-green-deep`}>
                  <IconComp className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-slate-900 mb-3 group-hover:text-brand-green-deep transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
