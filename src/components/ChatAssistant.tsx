import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Terminal, Shield, Sparkles, AlertCircle, Settings, Save } from "lucide-react";

interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}

const SYSTEM_INSTRUCTION = `You are the Emerald Codelines Interactive Assistant, an elegant, highly knowledgeable, and deeply professional engineering representative.
Your purpose is to answer user questions about Emerald Codelines, our high-integrity engineering practices, and our core capabilities:

1. Custom Software Development: High-performance cloud-native microservices and real-time pipelines built on languages like Rust and Python.
2. Embedded Systems Architecture: Low-latency firmware, RTOS, and custom hardware/PCB design.
3. AI Agent Automation: Production-ready LLM fine-tuning and computer vision pipelines.
4. Capacity Building: Custom engineering workshops for enterprises to upskill their teams.

Tone guidelines:
- Highly professional, precise, direct, and elite yet helpful.
- Avoid low-quality filler text or marketing fluff. Speak as an experienced Principal Systems Engineer.
- Keep responses compact, elegant, and informative, utilizing clear Markdown lists or bullet points if needed.
- If asked, you can also help with technical queries, explaining complex systems engineering, or answering questions on code quality.`;

const getOfflineResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("software") || q.includes("custom") || q.includes("rust") || q.includes("go") || q.includes("python") || q.includes("backend") || q.includes("cloud")) {
    return "Our Custom Software Development capability focuses on architecting high-performance cloud-native microservices and real-time data pipelines. We primarily develop in Rust and Python for memory safety, concurrency, and minimal memory footprint. We also build custom event-driven architectures with Apache Kafka or Redpanda.";
  }
  if (q.includes("embedded") || q.includes("firmware") || q.includes("rtos") || q.includes("freertos") || q.includes("pcb") || q.includes("hardware") || q.includes("iot") || q.includes("robotics")) {
    return "Our Embedded Systems Architecture team specializes in low-latency firmware design, real-time operating systems (RTOS) like FreeRTOS, and custom PCB engineering. We build safety-critical automation, IoT nodes, and hardware integrations with fully deterministic execution characteristics.";
  }
  if (q.includes("ai") || q.includes("agent") || q.includes("llm") || q.includes("fine-tune") || q.includes("automation") || q.includes("vision") || q.includes("gpt")) {
    return "Our AI Agent Automation offerings focus on productionizing autonomous LLM agents (fine-tuning, tool calling, RAG) and real-time computer vision pipelines. We help enterprises automate complex workflows using domain-specific open models deployed locally or in high-availability cloud setups.";
  }
  if (q.includes("training") || q.includes("workshop") || q.includes("upskill") || q.includes("capacity") || q.includes("learn") || q.includes("course")) {
    return "Our Capacity Building service offers standard and customized technical workshops for corporate engineering teams. Modules include Advanced Rust Systems Programming, FreeRTOS Firmware Architecture, and LLM Agent deployment. They feature hands-on labs and are taught by veteran systems engineers.";
  }
  if (q.includes("audit") || q.includes("consult") || q.includes("consultation") || q.includes("safety") || q.includes("security")) {
    return "We conduct full technical audits spanning code quality (especially in C/C++/Rust/Python), database indexing topologies, cloud scaling architectures, and embedded firmware safety. You can schedule an audit or consulting session using our booking widget on the homepage.";
  }
  if (q.includes("price") || q.includes("cost") || q.includes("hire") || q.includes("rate") || q.includes("contract")) {
    return "Our consulting services are structured around two flexible models: fixed-price milestone delivery or dedicated sprint-based engineering retainers. Please use the booking form above to request an initial diagnostic consult so we can scope your requirements and provide a detailed quote.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("whatsapp") || q.includes("schedule") || q.includes("book")) {
    return "You can get in touch with us in three ways:\n1. Fill out the Consultation Booking Form above.\n2. Email our engineering desk at solutions@emeraldcodelines.tech.\n3. Send us a message on WhatsApp at +2348085040146.";
  }
  if (q.includes("joel") || q.includes("odufu") || q.includes("who is") || q.includes("team") || q.includes("creator") || q.includes("founder")) {
    return "Joel Odufu is the Principal Systems Engineer at Emerald Codelines. He holds deep expertise in high-integrity software engineering, embedded firmware, and AI-driven workflow automations. Under his leadership, Emerald Codelines delivers elite engineering services globally.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings")) {
    return "Greetings. I am the Emerald Codelines Interactive Representative. How may I assist you with our systems engineering, firmware architecture, or enterprise training programs today?";
  }
  
  return "I am currently running in offline demonstration mode. Emerald Codelines provides high-availability services including Rust software development, embedded RTOS systems, AI automation, and training. For live AI responses, click the Settings (gear) icon in the chat header and enter a Gemini API Key! How else can I help you today?";
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem("emerald_gemini_api_key") || "");
  const [web3formsKey, setWeb3formsKey] = useState(() => localStorage.getItem("emerald_web3forms_key") || "");
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Greetings. I am the Emerald Codelines Interactive Representative. How may I assist you with our systems engineering, firmware architecture, or enterprise training programs today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<{ isError: boolean; message: string; isConfigError?: boolean } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const quickPrompts = [
    "Tell me about Custom Software Development",
    "How does the RTOS/Embedded training work?",
    "Do you offer safety audit consultations?",
    "What technologies are in your AI agent stack?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setErrorStatus(null);

    const activeGeminiKey = localStorage.getItem("emerald_gemini_api_key") || geminiKey || "";

    if (activeGeminiKey) {
      try {
        const historyPayload = [
          ...messages.map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          })),
          {
            role: "user",
            parts: [{ text: textToSend }]
          }
        ];

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeGeminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: historyPayload,
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            generationConfig: {
              temperature: 0.7
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
        return;
      } catch (err: any) {
        console.error("Gemini Direct API Error:", err);
        setErrorStatus({
          isError: true,
          message: err.message || "Failed to communicate with live Gemini API. Using fallback offline responder."
        });
      }
    }

    // Offline / Simulated Fallback
    setTimeout(() => {
      const simulatedReply = getOfflineResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: simulatedReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="chat-assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-brand-lime hover:bg-[#a9db50] text-brand-green-deep rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-brand-green-deep/10 cursor-pointer group"
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-deep opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green-deep"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-assistant-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[400px] h-[580px] bg-white rounded-xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-green-deep p-4 text-white flex items-center justify-between border-b border-brand-green-light">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-brand-lime flex items-center justify-center text-brand-green-deep font-bold font-mono">
                  EC
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm leading-tight tracking-tight">
                    {showSettings ? "Console Settings" : "Emerald AI Representative"}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${showSettings ? "bg-amber-400 animate-pulse" : "bg-brand-lime animate-pulse"}`}></span>
                    <span className="text-[11px] font-mono text-slate-300">
                      {showSettings ? "CONFIG MODE" : ((geminiKey || localStorage.getItem("emerald_gemini_api_key")) ? "GEMINI LIVE" : "DEMO / OFFLINE")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
                  title="Toggle Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Settings View */}
            {showSettings ? (
              <div className="flex-1 p-6 bg-slate-50 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                    <Shield className="w-4 h-4 text-brand-green-deep" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Client Settings</h4>
                  </div>
                  
                  {/* Gemini API Key */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold text-slate-500 uppercase">Gemini API Key</label>
                    <input
                      type="password"
                      placeholder="AI Studio / Google Cloud API Key"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full text-xs font-mono bg-white border border-slate-200 focus:border-brand-green-deep rounded px-3 py-2 outline-none text-slate-800"
                    />
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Stored locally in your browser. Enables live AI responses from <code>gemini-2.5-flash</code>.
                    </p>
                  </div>

                  {/* Web3Forms Access Key */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-[11px] font-mono font-semibold text-slate-500 uppercase">Web3Forms Access Key</label>
                    <input
                      type="text"
                      placeholder="e.g. 1a2b3c4d-5e6f-7a8b-..."
                      value={web3formsKey}
                      onChange={(e) => setWeb3formsKey(e.target.value)}
                      className="w-full text-xs font-mono bg-white border border-slate-200 focus:border-brand-green-deep rounded px-3 py-2 outline-none text-slate-800"
                    />
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Used for email notifications. Get a free key at <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-brand-green-deep hover:underline font-semibold">web3forms.com</a>.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => {
                      localStorage.setItem("emerald_gemini_api_key", geminiKey.trim());
                      localStorage.setItem("emerald_web3forms_key", web3formsKey.trim());
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 bg-brand-green-deep hover:bg-brand-green-light text-white text-xs font-mono font-semibold rounded cursor-pointer transition-colors duration-200"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Configuration</span>
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-mono rounded cursor-pointer transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Offline notification if needed */}
                {!geminiKey && !localStorage.getItem("emerald_gemini_api_key") && (
                  <div className="bg-amber-50 border-b border-amber-200 p-2 text-xs text-amber-800 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <strong>Demo Mode Enabled</strong>: Click the Gear icon above to configure a Gemini API key for live responses.
                    </div>
                  </div>
                )}

                {/* Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${
                          msg.role === "user"
                            ? "bg-brand-green-deep text-white rounded-br-none"
                            : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none"
                        }`}
                      >
                        <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                        <div
                          className={`text-[10px] mt-1 text-right ${
                            msg.role === "user" ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing simulation */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 rounded-bl-none shadow-sm space-y-1">
                        <div className="flex space-x-1.5 items-center py-1">
                          <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Starter Chips */}
                {messages.length === 1 && (
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5 justify-start">
                    {quickPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-xs bg-white hover:bg-brand-green-deep hover:text-white border border-slate-200 text-slate-600 rounded-full px-3 py-1 transition-all duration-200 cursor-pointer text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask our systems engineers..."
                    className="flex-1 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-brand-green-deep rounded-md px-3 py-2 outline-none transition-all duration-200 text-slate-800"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-brand-green-deep hover:bg-brand-green-light text-white rounded-md transition-colors duration-200 cursor-pointer disabled:opacity-50"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
