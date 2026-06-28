import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, CheckCircle, Send, ArrowRight, ShieldAlert, Cpu, Terminal } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    interest: "Software Development"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Persist to localStorage
    const newInquiry = {
      id: "inq_" + Math.random().toString(36).substr(2, 9),
      ...form,
      timestamp: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("emerald_inquiries") || "[]");
    localStorage.setItem("emerald_inquiries", JSON.stringify([...existing, newInquiry]));

    try {
      const accessKey = (import.meta.env.VITE_WEB3FORMS_KEY as string) || localStorage.getItem("emerald_web3forms_key") || "00000000-0000-0000-0000-000000000000";
      
      if (accessKey === "00000000-0000-0000-0000-000000000000") {
        console.warn("Web3Forms Access Key is not configured. Email dispatch skipped, but inquiry saved to local storage.");
      } else {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Emerald Codelines: ${form.interest} Audit Consultation Request`,
            from_name: "Emerald Codelines Website",
            name: form.name,
            email: form.email,
            company: "Inquiry Client",
            message: `
Emerald Codelines Solutions Request Detail Profile
--------------------------------------------------
Inquirer Name: ${form.name || "Not Provided"}
Inquirer Email: ${form.email || "Not Provided"}
Requested Service Core: ${form.interest || "Not Provided"}
Notes: Requested general systems audit profile diagnostic for focus: ${form.interest}.
            `
          })
        });
      }
    } catch (err) {
      console.error("Failed to send email via Web3Forms API in ContactForm", err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setForm({ name: "", email: "", interest: "Software Development" });
  };

  return (
    <section id="audit" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#003527] rounded-lg text-white p-8 sm:p-12 shadow-xl border border-brand-green-light">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Context details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-brand-lime uppercase font-semibold block">
                  SYSTEM AUDIT
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight">
                  Ready to Automate Your Future?
                </h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Contact our solution architects today for a technical audit of your current infrastructure. We conduct diagnostic profiling across codebases, hardware bottlenecks, and data schemas.
              </p>

              {/* Direct indicators */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3 text-slate-200 hover:text-white transition-colors duration-250">
                  <div className="w-9 h-9 bg-brand-green-light rounded flex items-center justify-center border border-brand-green-light/80">
                    <Mail className="w-4 h-4 text-brand-lime" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400">CORP INQUIRIES</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono">solutions@emeraldcodelines.tech</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/2348085040146?text=${encodeURIComponent("Hello Emerald Codelines, I would like to inquire about system optimization and custom software development.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-200 hover:text-[#25D366] transition-colors duration-250 group cursor-pointer"
                >
                  <div className="w-9 h-9 bg-brand-green-light rounded flex items-center justify-center border border-brand-green-light/80 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/40 transition-all">
                    <svg className="w-4 h-4 text-brand-lime group-hover:text-[#25D366] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400">DIRECT WHATSAPP LINE</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono tracking-wide">+234 808 504 0146</span>
                  </div>
                </a>

                <div className="flex items-center space-x-3 text-slate-200 hover:text-white transition-colors duration-250">
                  <div className="w-9 h-9 bg-brand-green-light rounded flex items-center justify-center border border-brand-green-light/80">
                    <MapPin className="w-4 h-4 text-brand-lime" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400">HQ POSITION</span>
                    <span className="text-xs sm:text-sm font-semibold">Innovation Hub, Level 42</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction Form */}
            <div className="bg-white text-slate-800 p-6 rounded-md shadow-lg border border-slate-200 relative overflow-hidden min-h-[340px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-semibold">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full text-xs font-sans border border-slate-200 focus:border-brand-green-deep rounded p-2.5 outline-none transition-colors duration-200 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-semibold">
                        Business Email
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@enterprise.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full text-xs font-mono border border-slate-200 focus:border-brand-green-deep rounded p-2.5 outline-none transition-colors duration-200 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-semibold">
                        Interest Focus
                      </label>
                      <select
                        value={form.interest}
                        onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        className="w-full text-xs font-sans border border-slate-200 focus:border-brand-green-deep rounded p-2.5 outline-none bg-white text-slate-700"
                      >
                        <option value="Software Development">Software Development</option>
                        <option value="Embedded Systems">Embedded Systems</option>
                        <option value="AI Automation">AI Automation</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-brand-green-deep hover:bg-brand-green-light text-white font-mono text-xs font-bold tracking-wider rounded uppercase transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>PROCESSING...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-brand-green-deep">
                      <CheckCircle className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-base">
                        Audit Request Logged
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Excellent, <strong>{form.name}</strong>. Your inquiry for <strong>{form.interest}</strong> has been cataloged in our engineering queue. We will contact you at <strong>{form.email}</strong> within 12 business hours.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-mono uppercase font-semibold rounded tracking-wider cursor-pointer transition-colors"
                    >
                      New Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
