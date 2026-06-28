export interface Capability {
  id: string;
  title: string;
  description: string;
  details: string;
  category: "SOFTWARE" | "HARDWARE" | "INTELLIGENCE";
  image: string;
  seoAlt: string;
  seoTitle: string;
  bullets: string[];
  features: string[];
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  level: string;
  topics: string[];
  description: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "software",
    title: "Custom Software & Mobile App Development",
    category: "SOFTWARE",
    description: "Scalable cloud-native architectures and premium mobile app solutions engineered for high performance.",
    details: "We build tailored software architectures using high-integrity languages such as Rust, Go, and Python, alongside native and cross-platform mobile apps (React Native, Flutter). Our services span from ultra-efficient microservices to highly resilient decentralized stream pipelines and fluid, premium user interfaces that run seamlessly across Android, iOS, and Web environments.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    seoAlt: "Precision Custom Software Development workspace showing modern IDE with high-integrity Rust and Python source code structures on an ultrawide screen.",
    seoTitle: "Emerald Codelines Custom Software Engineering & Mobile App Development",
    bullets: ["Cloud & Microservices", "iOS & Android Mobile Apps"],
    features: [
      "Distributed consensus engines & Raft-based systems",
      "Native & cross-platform mobile solutions (React Native, Flutter) with offline sync",
      "Asynchronous high-throughput message brokers (Kafka/Redpanda)",
      "Memory-safe execution architectures in Rust & type-safe TypeScript"
    ]
  },
  {
    id: "hardware",
    title: "Embedded & IoT Systems Architecture",
    category: "HARDWARE",
    description: "Low-latency firmware, real-time operating systems (RTOS), and interconnected IoT hardware arrays.",
    details: "Our hardware engineering team bridges the gap between physical elements and digital networks. We design and manufacture highly reliable, low-power PCBs, and develop custom bare-metal and RTOS-based firmware that runs safely under extreme conditions, connecting physical sensors to secure enterprise IoT cloud management hubs.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    seoAlt: "Microchip on an advanced green printed circuit board with glowing copper traces and miniature electronic components illustrating high-integrity Embedded Systems Architecture.",
    seoTitle: "Emerald Codelines Embedded Hardware Engineering and IoT Systems Development",
    bullets: ["RTOS Development", "IoT Fleet & PCB Design"],
    features: [
      "Bare-metal low-overhead drivers & hardware abstraction layers (HAL)",
      "Real-time preemptive scheduling via FreeRTOS / Zephyr RTOS",
      "Secure over-the-air (OTA) update frameworks for distributed IoT fleets",
      "Multi-layer PCB layout, signal integrity routing, and low-power circuit optimization"
    ]
  },
  {
    id: "intelligence",
    title: "Autonomous Systems & AI Agents",
    category: "INTELLIGENCE",
    description: "Next-gen self-governing controllers, custom vision pilots, and LLM-powered workflow automation.",
    details: "We deploy state-of-the-art autonomous agents powered by fine-tuned LLMs and local vision systems. These agents operate within secure environments to automate complex analytical pipelines, control self-healing industrial system loops, and navigate custom robotic hardware safely using edge-quantized vision pilots.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    seoAlt: "An abstract networking mesh with glowing green and silver nodes representing neural networks and automated AI Agents coordinating complex decisions.",
    seoTitle: "Emerald Codelines Autonomous Systems and LLM-Powered Workflow Automation",
    bullets: ["Autonomous Process Loops", "Edge-Based Vision Autopilots"],
    features: [
      "Domain-specific model fine-tuning with custom LoRA adapters",
      "Edge-based computer vision for automated robotics & defect detection",
      "Self-governing, self-healing system loop controllers and orchestrators",
      "Secure on-premise model execution setups & API sandboxes"
    ]
  }
];

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "mod-1",
    title: "Advanced Systems Programming with Rust",
    duration: "4 Weeks",
    level: "Advanced",
    topics: ["Memory safety & ownership", "Concurrency primitives", "Async runtime tuning", "FFI boundaries"],
    description: "Deep dive into constructing highly concurrent, memory-safe services without a garbage collector."
  },
  {
    id: "mod-2",
    title: "RTOS Firmware Development",
    duration: "3 Weeks",
    level: "Intermediate-Advanced",
    topics: ["Preemptive task management", "Interrupt service routines", "Mutexes & Semaphores", "Memory management"],
    description: "Mastering firmware design for microcontrollers using real-time operating systems."
  },
  {
    id: "mod-3",
    title: "AI Agent Engineering & Fine-tuning",
    duration: "4 Weeks",
    level: "Intermediate",
    topics: ["Prompt engineering frameworks", "RAG vector pipelines", "Parameter efficient fine-tuning", "Edge deployment"],
    description: "Bridging foundational deep learning models with reliable production automation systems."
  }
];

export const CLIENT_LOGOS = [
  { name: "TECHTRON", subtitle: "Industrial Robotics" },
  { name: "VORTEXAI", subtitle: "Edge Automation" },
  { name: "QUANTUMSYS", subtitle: "Computing Co." },
  { name: "NEUROCORE", subtitle: "Biometric Hardware" },
  { name: "CYBERLINK", subtitle: "Secure Comms" }
];
