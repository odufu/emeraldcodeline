import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, ChevronRight, CheckCircle, ArrowRight, ShieldCheck, Database, Cpu } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    notes: ""
  });

  const services = [
    { id: "software", label: "Custom Software Development", icon: Database, description: "Rust & cloud-native architecture audit" },
    { id: "hardware", label: "Embedded Systems Architecture", icon: Cpu, description: "RTOS, firmware, and PCB validation" },
    { id: "ai", label: "AI Agent Automation", icon: ShieldCheck, description: "Fine-tuning models & industrial pipeline integration" }
  ];

  // Generate next 5 business days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    while (count < 5) {
      today.setDate(today.getDate() + 1);
      if (today.getDay() !== 0 && today.getDay() !== 6) { // Mon-Fri
        dates.push(new Date(today));
        count++;
      }
    }
    return dates;
  };

  const dates = getDates();
  const times = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store in localStorage
    const newBooking = {
      id: "book_" + Math.random().toString(36).substr(2, 9),
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      ...form,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("emerald_bookings") || "[]");
    localStorage.setItem("emerald_bookings", JSON.stringify([...existing, newBooking]));

    try {
      const accessKey = (import.meta.env.VITE_WEB3FORMS_KEY as string) || localStorage.getItem("emerald_web3forms_key") || "00000000-0000-0000-0000-000000000000";
      
      if (accessKey === "00000000-0000-0000-0000-000000000000") {
        console.warn("Web3Forms Access Key is not configured. Email dispatch skipped, but booking saved to local storage.");
      } else {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Emerald Codelines: ${selectedService} Booking Request`,
            from_name: "Emerald Codelines Website",
            name: form.name,
            email: form.email,
            company: form.company,
            message: `
Emerald Codelines Solutions Request Detail Profile
--------------------------------------------------
Inquirer Name: ${form.name || "Not Provided"}
Inquirer Email: ${form.email || "Not Provided"}
Organization: ${form.company || "Not Provided"}
Requested Service Core: ${selectedService || "Not Provided"}
Proposed Slot: ${selectedDate} at ${selectedTime}
Proposed Details / Notes: ${form.notes || "None provided."}
            `
          })
        });
      }
    } catch (err) {
      console.error("Failed to send email via Web3Forms API", err);
    } finally {
      setIsSubmitting(false);
      handleNext(); // Go to step 4 (Success)
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setForm({ name: "", email: "", company: "", notes: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-brand-green-deep p-6 text-white flex justify-between items-center border-b border-brand-green-light">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-brand-lime uppercase font-semibold">
                  Technical Consultation
                </span>
                <h3 className="text-xl font-display font-semibold mt-1">
                  Schedule Solutions Audit
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded bg-brand-green-light hover:bg-brand-green-light/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper indicators */}
            {step < 4 && (
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className={`${step >= 1 ? "text-brand-green-deep font-semibold" : ""}`}>
                  1. Focus Category
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className={`${step >= 2 ? "text-brand-green-deep font-semibold" : ""}`}>
                  2. Slots Allocation
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className={`${step >= 3 ? "text-brand-green-deep font-semibold" : ""}`}>
                  3. Contact Details
                </span>
              </div>
            )}

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Select your corporate development focus. Our system architects will conduct an in-depth preliminary review of your request.
                  </p>
                  <div className="grid gap-3">
                    {services.map((srv) => {
                      const IconComp = srv.icon;
                      return (
                        <button
                          key={srv.id}
                          onClick={() => {
                            setSelectedService(srv.label);
                            handleNext();
                          }}
                          className={`flex items-start text-left p-4 rounded border transition-all duration-200 group cursor-pointer ${
                            selectedService === srv.label
                              ? "bg-emerald-50/50 border-brand-green-deep shadow-sm"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                          }`}
                        >
                          <div className={`p-2.5 rounded mr-4 ${
                            selectedService === srv.label ? "bg-brand-green-deep text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-display font-medium text-slate-900 text-sm">
                              {srv.label}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">
                              {srv.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 self-center transition-transform group-hover:translate-x-1" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" /> Choose Date
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {dates.map((d) => {
                        const dateString = d.toLocaleDateString([], { month: "short", day: "numeric" });
                        const dayName = d.toLocaleDateString([], { weekday: "short" });
                        const fullDate = d.toISOString().split("T")[0];
                        return (
                          <button
                            key={fullDate}
                            onClick={() => setSelectedDate(fullDate)}
                            className={`p-3 rounded border text-center transition-all cursor-pointer ${
                              selectedDate === fullDate
                                ? "bg-brand-green-deep text-white border-brand-green-deep"
                                : "bg-white border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <span className="block text-xs font-mono font-medium opacity-80">{dayName}</span>
                            <span className="block font-display text-sm font-bold mt-1">{dateString}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" /> Select Available Time (UTC-7)
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {times.map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`p-2.5 rounded border font-mono text-xs text-center transition-all cursor-pointer ${
                              selectedTime === t
                                ? "bg-brand-green-deep text-white border-brand-green-deep"
                                : "bg-white border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <button
                      onClick={handlePrev}
                      className="text-xs font-mono text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      &larr; Focus Category
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!selectedDate || !selectedTime}
                      className="px-4 py-2 bg-brand-green-deep hover:bg-brand-green-light text-white text-xs font-mono font-semibold rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Contact Information &rarr;
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-brand-green-deep outline-none text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                        Business Email
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@enterprise.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-brand-green-deep outline-none text-slate-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      Company Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-brand-green-deep outline-none text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      Project Goals / Systems Challenges (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief description of high-availability, RTOS, or pipeline challenges..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-brand-green-deep outline-none text-slate-800"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded border border-slate-100 flex justify-between text-xs font-mono text-slate-600">
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400">SERVICE</span>
                      <strong>{selectedService}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400">SCHEDULE</span>
                      <strong>{selectedDate} at {selectedTime}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="text-xs font-mono text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      &larr; Back to Slot
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 bg-brand-green-deep hover:bg-brand-green-light text-white text-xs font-mono font-semibold rounded cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <span>Confirm Booking &rarr;</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-brand-green-deep animate-bounce">
                    <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-semibold text-slate-900">
                      Consultation Request Confirmed
                    </h4>
                    <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, {form.name}. A drafted email has been generated to dispatch to <strong>joelodufu@gmail.com</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md text-xs font-mono text-slate-700 max-w-sm mx-auto text-left space-y-2 border border-slate-200 shadow-sm">
                    <div><strong>Session Focus:</strong> {selectedService}</div>
                    <div><strong>Target Recipient:</strong> joelodufu@gmail.com</div>
                    <div><strong>Date:</strong> {selectedDate}</div>
                    <div><strong>Time:</strong> {selectedTime} (UTC-7)</div>
                  </div>

                  {/* WhatsApp Direct Action Button */}
                  <div className="pt-2 max-w-sm mx-auto">
                    <a
                      href={`https://wa.me/2348085040146?text=${encodeURIComponent(`Hello, I have just scheduled a consultation regarding "${selectedService}" for "${form.company}". Looking forward to our call!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2.5 px-5 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-sans font-bold text-xs rounded uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>Connect via WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-2 px-6 py-2.5 bg-brand-green-deep hover:bg-brand-green-light text-white font-mono text-xs rounded uppercase font-semibold tracking-wider cursor-pointer"
                  >
                    Close Session
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
