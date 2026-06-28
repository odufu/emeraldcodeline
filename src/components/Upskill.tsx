import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TRAINING_MODULES, TrainingModule } from "../types";
import { BookOpen, Check, Play, RefreshCw, X, Award, Code, GraduationCap } from "lucide-react";

export default function Upskill() {
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("mod-1");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simCompleted, setSimCompleted] = useState(false);
  const [trainingFormSubmitted, setTrainingFormSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    selectedModule: "Advanced Systems Programming with Rust"
  });

  const codeString = `class EnterpriseWorkshop {
  constructor(target_team) {
    this.stack = ['Rust', 'Python', 'RTOS'];
    this.intensity = 'Production-Ready';
  }

  async upgradeSkills() {
    return await target_team.master(this.stack);
  }
}`;

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimCompleted(false);
    setSimulationLogs([]);

    const logs = [
      "⚡ [SYS] Bootstrapping EnterpriseWorkshop pipeline...",
      "🔍 [SYS] Target team identified: target_team.master()",
      "📦 [INFO] Loading syllabus modules: ['Rust', 'Python', 'RTOS']",
      "🛠️ [STAGE 1] Fuzzing and memory optimization constraints applied.",
      "🚀 [STAGE 2] Thread safety & async patterns calibrated in Rust.",
      "📟 [STAGE 3] Hard real-time scheduling simulations initiated on RTOS.",
      "🤖 [STAGE 4] Edge ML agents deployment workflows verified.",
      "🎓 [SUCCESS] Skill upgrade complete. Intensity state: PRODUCTION-READY."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimulationLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setIsSimulating(false);
          setSimCompleted(true);
        }
      }, (index + 1) * 600);
    });
  };

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrainingFormSubmitted(true);
    setTimeout(() => {
      setTrainingFormSubmitted(false);
      setShowCurriculum(false);
      setForm({ name: "", email: "", company: "", selectedModule: "Advanced Systems Programming with Rust" });
    }, 3000);
  };

  return (
    <section id="training" className="py-20 bg-brand-green-deep text-white border-b border-brand-green-light scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-brand-lime uppercase block">
                CAPACITY BUILDING
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
                Upskill Your Engineering Core
              </h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We don't just build tools; we build the teams that use them. Our training programs are designed by industry veterans to bridge the gap between academic theory and technical reality.
            </p>

            {/* Stats display */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-brand-green-light">
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-display font-bold text-brand-lime">
                  500+
                </span>
                <span className="block text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                  ENGINEERS TRAINED
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-display font-bold text-brand-lime">
                  15+
                </span>
                <span className="block text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                  ENTERPRISE MODULES
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setShowCurriculum(true)}
                className="px-6 py-3 bg-brand-lime hover:bg-[#a9db50] text-brand-green-deep font-sans font-bold text-xs rounded uppercase tracking-wider transition-colors cursor-pointer"
              >
                Learn About Training
              </button>
            </div>
          </div>

          {/* Interactive IDE Mockup */}
          <div className="space-y-4">
            <div className="bg-slate-950 border border-brand-green-light rounded-lg overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-brand-green-light/40">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  EnterpriseWorkshop.js
                </span>
                <div className="w-12"></div>
              </div>

              {/* Code display */}
              <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs text-brand-lime leading-relaxed">
                <pre className="text-left select-all">
                  <code>{codeString}</code>
                </pre>
              </div>

              {/* Simulation Terminal output */}
              <AnimatePresence>
                {simulationLogs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-brand-green-light/40 bg-slate-900 p-4 font-mono text-[11px] space-y-1 border-b border-brand-green-light/20 max-h-40 overflow-y-auto"
                  >
                    {simulationLogs.map((log, index) => (
                      <div
                        key={index}
                        className={
                          log.includes("[SUCCESS]")
                            ? "text-brand-lime font-bold"
                            : log.includes("[INFO]")
                            ? "text-slate-300"
                            : "text-slate-400"
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simulation Trigger bar */}
              <div className="p-4 bg-slate-900 flex items-center justify-between border-t border-brand-green-light/30">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${isSimulating ? "bg-amber-400 animate-pulse" : simCompleted ? "bg-brand-lime" : "bg-slate-500"}`} />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {isSimulating ? "COMPILING..." : simCompleted ? "EXECUTION SUCCESS" : "SANDBOX TERMINAL"}
                  </span>
                </div>
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded text-[11px] font-mono font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer border border-brand-green-light/20"
                >
                  {isSimulating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current text-brand-lime" />
                  )}
                  <span>{isSimulating ? "Upgrading..." : "Run Simulator"}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Training / Curriculum Modal */}
      <AnimatePresence>
        {showCurriculum && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCurriculum(false)}
              className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white text-slate-800 rounded-lg border border-slate-200 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-brand-green-deep p-6 text-white border-b border-brand-green-light">
                <span className="text-[10px] font-mono text-brand-lime uppercase tracking-widest font-semibold block">
                  CAPACITY BUILDING
                </span>
                <h3 className="text-xl font-display font-semibold mt-1">
                  Enterprise Syllabus & Modules
                </h3>
                <button
                  onClick={() => setShowCurriculum(false)}
                  className="absolute top-5 right-5 p-1 text-slate-300 hover:text-white rounded hover:bg-brand-green-light transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Curriculum explorer */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex border-b border-slate-100">
                  {TRAINING_MODULES.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setActiveTab(mod.id);
                        setForm((prev) => ({ ...prev, selectedModule: mod.title }));
                      }}
                      className={`flex-1 py-2.5 text-center font-mono text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                        activeTab === mod.id
                          ? "border-brand-green-deep text-brand-green-deep"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {mod.id.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Module Details */}
                {TRAINING_MODULES.map((mod) => {
                  if (mod.id !== activeTab) return null;
                  return (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-display font-semibold text-slate-900">
                            {mod.title}
                          </h4>
                          <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
                            {mod.duration} &bull; {mod.level}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans">
                        {mod.description}
                      </p>

                      <div className="space-y-2">
                        <h5 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                          Syllabus Core Highlights
                        </h5>
                        <div className="grid grid-cols-2 gap-2">
                          {mod.topics.map((topic) => (
                            <div
                              key={topic}
                              className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 font-mono"
                            >
                              <Check className="w-3.5 h-3.5 text-brand-green-deep shrink-0 stroke-[2.5]" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Inquire Form */}
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-display font-bold text-slate-900 mb-3 uppercase tracking-wide">
                    Request Corporate Workshop
                  </h4>
                  {trainingFormSubmitted ? (
                    <div className="bg-emerald-50 text-brand-green-deep text-xs font-mono p-4 rounded text-center border border-emerald-100">
                      👍 Curriculum request logged successfully. A Senior Architect will contact your team.
                    </div>
                  ) : (
                    <form onSubmit={handleTrainingSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          type="text"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="border border-slate-200 focus:border-brand-green-deep outline-none rounded p-2 text-xs"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Work Email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="border border-slate-200 focus:border-brand-green-deep outline-none rounded p-2 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          type="text"
                          placeholder="Company Name"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="border border-slate-200 focus:border-brand-green-deep outline-none rounded p-2 text-xs"
                        />
                        <select
                          value={form.selectedModule}
                          onChange={(e) => setForm({ ...form, selectedModule: e.target.value })}
                          className="border border-slate-200 focus:border-brand-green-deep outline-none rounded p-2 text-xs text-slate-600 bg-white"
                        >
                          {TRAINING_MODULES.map((m) => (
                            <option key={m.id} value={m.title}>
                              {m.id.toUpperCase()}: {m.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-brand-green-deep hover:bg-brand-green-light text-white text-xs font-mono font-bold tracking-wider rounded uppercase transition-colors cursor-pointer"
                      >
                        Request Training Brief
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
