import React, { useState } from "react";
import { Menu, X, Terminal, Shield, BookOpen, MessageSquare, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "CAPABILITIES", href: "#capabilities" },
    { label: "TRAINING CORE", href: "#training" },
    { label: "CLIENTS", href: "#clients" },
    { label: "SOLUTIONS AUDIT", href: "#audit" }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded bg-brand-green-deep text-brand-lime font-mono font-bold text-lg overflow-hidden border border-brand-green-light">
            <div className="absolute inset-0 bg-brand-lime opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <Terminal className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-display font-bold text-base sm:text-lg tracking-wider text-brand-green-deep">
            EMERALD CODELINES
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="font-mono text-xs font-semibold tracking-wider text-slate-600 hover:text-brand-green-deep transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 bg-brand-green-deep hover:bg-brand-green-light text-white font-mono text-[11px] font-bold tracking-wider rounded uppercase transition-colors cursor-pointer"
          >
            Schedule Consultation
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 hover:text-brand-green-deep focus:outline-none p-2 rounded cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-slate-200 bg-white"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block px-3 py-2 font-mono text-xs font-bold tracking-wider text-slate-600 hover:text-brand-green-deep hover:bg-slate-50 rounded"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 px-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full text-center py-2.5 bg-brand-green-deep hover:bg-brand-green-light text-white font-mono text-xs font-bold tracking-wider rounded uppercase cursor-pointer"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
