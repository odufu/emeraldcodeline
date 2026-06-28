import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Cpu, Database, BrainCircuit, CheckSquare, BarChart3, ArrowRight, RefreshCcw, Calendar } from "lucide-react";

interface Symptom {
  id: string;
  label: string;
  weight: number;
}

const DOMAINS = [
  {
    id: "cloud",
    title: "Software & Mobile Apps",
    icon: Database,
    description: "Cloud-native microservices, data streaming pipelines, and premium mobile app architectures.",
    symptoms: [
      { id: "c1", label: "System latency spikes under peak concurrency load", weight: 15 },
      { id: "c2", label: "Slow cross-platform mobile sync or sluggish app UI rendering", weight: 10 },
      { id: "c3", label: "Frequent memory leaks or concurrency deadlocks", weight: 15 },
      { id: "c4", label: "Database bottlenecks & slow-running complex queries", weight: 10 }
    ]
  },
  {
    id: "embedded",
    title: "Embedded & IoT Systems",
    icon: Cpu,
    description: "Low-latency firmware, real-time operating systems (RTOS), and interconnected IoT hardware fleets.",
    symptoms: [
      { id: "e1", label: "Intermittent, hard-to-reproduce firmware crashes in production", weight: 20 },
      { id: "e2", label: "Non-deterministic task execution or race conditions", weight: 15 },
      { id: "e3", label: "High power consumption or inefficient sensor polling in edge devices", weight: 10 },
      { id: "e4", label: "Unsecured over-the-air (OTA) updates or regulatory vulnerabilities", weight: 10 }
    ]
  },
  {
    id: "ai",
    title: "Autonomous Systems & AI",
    icon: BrainCircuit,
    description: "Autonomous agents, computer vision pipelines, and self-governing process loop orchestrators.",
    symptoms: [
      { id: "a1", label: "AI agent loops infinitely or fails to use tools reliably", weight: 15 },
      { id: "a2", label: "Excessive token costs or slow API response latencies", weight: 10 },
      { id: "a3", label: "Frequent hallucinations or data safety concerns", weight: 15 },
      { id: "a4", label: "Difficulties integrating vision pilots into local edge robotics/controllers", weight: 10 }
    ]
  }
];

export default function DiagnosticTool({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [step, setStep] = useState<number>(1);
  const [selectedDomainId, setSelectedDomainId] = useState<string>("cloud");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [report, setReport] = useState<{ score: number; recommendations: string[] } | null>(null);

  const selectedDomain = DOMAINS.find((d) => d.id === selectedDomainId)!;

  const handleToggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateResults = () => {
    let totalDeduction = 0;
    const activeSymptoms = selectedDomain.symptoms.filter((s) => selectedSymptoms.includes(s.id));
    
    activeSymptoms.forEach((s) => {
      totalDeduction += s.weight;
    });

    const score = Math.max(10, 100 - totalDeduction);
    
    // Generate tailored recommendations
    const recommendations: string[] = [];
    if (selectedDomainId === "cloud") {
      if (selectedSymptoms.includes("c1")) recommendations.push("Introduce highly concurrent Rust microservices for performance-critical path bottlenecks.");
      if (selectedSymptoms.includes("c2")) recommendations.push("Introduce state-slice query caching and optimize React Native/Flutter UI re-renders.");
      if (selectedSymptoms.includes("c3")) recommendations.push("Deploy advanced thread-safety fuzzing and static code analyzers.");
      if (selectedSymptoms.includes("c4")) recommendations.push("Introduce Redis caching layers and partition database indexes.");
      if (recommendations.length === 0) recommendations.push("Your systems look solid! Maintain regular architectural review schedules.");
    } else if (selectedDomainId === "embedded") {
      if (selectedSymptoms.includes("e1")) recommendations.push("Verify thread boundaries and utilize stack overflow safety hooks.");
      if (selectedSymptoms.includes("e2")) recommendations.push("Migrate critical sections to a preemptive priority RTOS scheduling architecture.");
      if (selectedSymptoms.includes("e3")) recommendations.push("Optimize low-power sleep states and transition to interrupt-driven polling.");
      if (selectedSymptoms.includes("e4")) recommendations.push("Integrate cryptographic signatures for firmware bundles and audit OTA fleet compliance.");
      if (recommendations.length === 0) recommendations.push("Your firmware is highly deterministic. Keep up the high code hygiene!");
    } else {
      if (selectedSymptoms.includes("a1")) recommendations.push("Implement strict JSON schemas and tool call confirmation retry structures.");
      if (selectedSymptoms.includes("a2")) recommendations.push("Transition to optimized local inference systems using vLLM or llama.cpp.");
      if (selectedSymptoms.includes("a3")) recommendations.push("Deploy vector-embedding semantic guardrails to prevent hallucinated outputs.");
      if (selectedSymptoms.includes("a4")) recommendations.push("Quantize vision models to INT8 and optimize for direct OpenVINO / TensorRT edge inference.");
      if (recommendations.length === 0) recommendations.push("Your AI workloads are highly optimized. Continue scaling safely!");
    }

    // Store in localStorage to prefill the Booking Modal
    const diagnosticSummary = {
      domain: selectedDomain.title,
      score,
      symptomsCount: activeSymptoms.length,
      recommendations
    };
    localStorage.setItem("emerald_latest_diagnostic", JSON.stringify(diagnosticSummary));

    setReport({ score, recommendations });
    setStep(3);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setReport(null);
    setStep(1);
  };

  const triggerCallToAction = () => {
    // Save state so BookingModal opens with predefined values
    const currentNotes = `[Diagnostic Funnel Results]\nSystem Domain: ${selectedDomain.title}\nIntegrity Score: ${report?.score}/100\nIdentified Challenges:\n${selectedDomain.symptoms
      .filter((s) => selectedSymptoms.includes(s.id))
      .map((s) => `- ${s.label}`)
      .join("\n")}\n\nSuggested audit review needed.`;
    
    localStorage.setItem("emerald_diagnostic_prefill_notes", currentNotes);
    localStorage.setItem("emerald_diagnostic_prefill_service", selectedDomainId === "cloud" ? "Software Development" : (selectedDomainId === "embedded" ? "Embedded Systems" : "AI Agent Automation"));
    
    // Dispatch a custom event to notify BookingModal of state changes
    window.dispatchEvent(new Event("emerald_diagnostic_updated"));
    
    onOpenBooking();
  };

  return (
    <section id="diagnostic" className="py-20 bg-slate-900 text-white border-b border-brand-green-light/20 scroll-mt-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lime/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green-light/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-[11px] font-mono font-bold tracking-widest text-brand-lime uppercase px-3 py-1 rounded bg-brand-green-deep/80 border border-brand-green-light/20 inline-block">
            Systems Audit Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Analyze Your System Integrity
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Answer a few quick questions about your codebase, hardware routines, or AI pipeline to receive an instant performance diagnostic score.
          </p>
        </div>

        {/* Diagnostic Wizard Box */}
        <div className="bg-slate-950 border border-brand-green-light/30 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Top Wizard Steps Bar */}
          <div className="bg-slate-900/60 px-6 py-4 flex items-center justify-between border-b border-brand-green-light/20">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? "bg-brand-lime animate-pulse" : "bg-slate-700"}`}></span>
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-300">
                STEP {step} OF 3
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {step === 1 && "Choose System Core"}
              {step === 2 && "Audit Symptoms"}
              {step === 3 && "Diagnostic Report"}
            </span>
          </div>

          <div className="p-6 sm:p-10 min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-display font-bold text-brand-lime">
                    Which core area of your engineering ecosystem experiences pain points?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {DOMAINS.map((domain) => {
                      const Icon = domain.icon;
                      const isSelected = selectedDomainId === domain.id;
                      return (
                        <button
                          key={domain.id}
                          onClick={() => setSelectedDomainId(domain.id)}
                          className={`text-left p-5 rounded-lg border transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer ${
                            isSelected
                              ? "bg-brand-green-deep/40 border-brand-lime shadow-lg"
                              : "bg-slate-900/40 border-slate-800 hover:border-brand-green-light hover:bg-slate-900/80"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className={`p-2.5 rounded ${isSelected ? "bg-brand-lime text-brand-green-deep" : "bg-slate-800 text-slate-300 group-hover:text-white"}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isSelected ? "text-brand-lime" : "text-slate-500"}`}>
                              {isSelected ? "Selected" : "Select"}
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            <h4 className="text-sm font-display font-bold text-white">
                              {domain.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300">
                              {domain.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center space-x-2 px-5 py-2.5 bg-brand-lime hover:bg-[#a9db50] text-brand-green-deep text-xs font-mono font-bold rounded uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Continue to Symptoms</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-display font-bold text-brand-lime">
                      Audit Symptoms: {selectedDomain.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Select all challenges that apply to your current system topology:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedDomain.symptoms.map((symptom) => {
                      const isTicked = selectedSymptoms.includes(symptom.id);
                      return (
                        <button
                          key={symptom.id}
                          onClick={() => handleToggleSymptom(symptom.id)}
                          className={`w-full text-left p-4 rounded-lg border flex items-center space-x-4 cursor-pointer transition-all duration-200 ${
                            isTicked
                              ? "bg-brand-green-deep/30 border-brand-lime text-white"
                              : "bg-slate-900/30 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${isTicked ? "bg-brand-lime border-brand-lime text-brand-green-deep" : "border-slate-600"}`}>
                            {isTicked && <CheckSquare className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm leading-relaxed">{symptom.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-mono rounded cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={calculateResults}
                      className="flex items-center space-x-2 px-5 py-2.5 bg-brand-lime hover:bg-[#a9db50] text-brand-green-deep text-xs font-mono font-bold rounded uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Analyze System Score</span>
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && report && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* Score Ring Display */}
                    <div className="text-center bg-slate-900/50 p-6 rounded-lg border border-slate-800 flex flex-col items-center space-y-3">
                      <h4 className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                        Integrity Score
                      </h4>
                      <div className="relative flex items-center justify-center w-28 h-28">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="56"
                            cy="56"
                            r="48"
                            className="stroke-slate-800"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r="48"
                            className={`transition-all duration-1000 ${
                              report.score > 75
                                ? "stroke-emerald-400"
                                : report.score > 40
                                ? "stroke-amber-400"
                                : "stroke-red-500"
                            }`}
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 48}
                            strokeDashoffset={2 * Math.PI * 48 * (1 - report.score / 100)}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>
                        <span className="absolute text-2xl font-display font-extrabold text-white">
                          {report.score}%
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        report.score > 75
                          ? "bg-emerald-500/20 text-emerald-300"
                          : report.score > 40
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-red-500/20 text-red-300"
                      }`}>
                        {report.score > 75 ? "Optimal Integrity" : report.score > 40 ? "Needs Review" : "Critical Priority"}
                      </span>
                    </div>

                    {/* Recommendations List */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center space-x-2">
                        <ShieldAlert className="w-4 h-4 text-brand-lime" />
                        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
                          Suggested Engineering Actions:
                        </h4>
                      </div>
                      <div className="space-y-2.5">
                        {report.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-start space-x-2 text-slate-300 text-xs sm:text-sm bg-slate-900/30 border border-slate-800/60 p-3 rounded-md">
                            <span className="text-brand-lime font-mono font-bold mr-1">{i + 1}.</span>
                            <p className="leading-relaxed">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                    <button
                      onClick={handleReset}
                      className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-mono rounded cursor-pointer transition-colors duration-200"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" />
                      <span>Start New Diagnostic</span>
                    </button>

                    <button
                      onClick={triggerCallToAction}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-brand-lime hover:bg-[#a9db50] text-brand-green-deep font-sans font-bold text-xs rounded uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Request Free Systems Audit</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
