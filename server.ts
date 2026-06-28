import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client with telemetry header and error boundaries
let aiClient: GoogleGenAI | null = null;

function getAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing in secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Company knowledge context for Gemini Assistant
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

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { serviceType, company, clientName, clientEmail, notes, subject } = req.body;

    const smtpUser = process.env.SMTP_USER || "emeraldcodelines@gmail.com";
    const smtpPass = process.env.SMTP_PASS || "qhqg ugwk qtei zzep";
    const smtpTo = process.env.SMTP_TO || "joelodufu@gmail.com";

    // Build the requested subject
    const mailSubject = subject || `the solution type: ${serviceType || "System Consultation"}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Emerald Codelines" <${smtpUser}>`,
      to: smtpTo,
      replyTo: clientEmail || smtpUser,
      subject: mailSubject,
      text: `
Emerald Codelines Solutions Request Detail Profile
--------------------------------------------------
Inquirer Name: ${clientName || "Not Provided"}
Inquirer Email: ${clientEmail || "Not Provided"}
Organization: ${company || "Not Provided"}
Requested Service Core: ${serviceType || "Not Provided"}
Proposed Details / Notes: ${notes || "None provided."}

This message was dispatched automatically via Server-Side Nodemailer.
      `,
      html: `
        <div style="font-family: sans-serif; padding: 25px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
          <div style="background-color: #003527; padding: 15px 20px; border-radius: 8px 8px 0 0; margin: -25px -25px 20px -25px; text-align: center;">
            <h2 style="color: #bcf063; margin: 0; font-family: 'Montserrat', sans-serif; font-size: 20px; letter-spacing: 1px;">
              EMERALD CODELINES
            </h2>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 11px; font-family: monospace; letter-spacing: 2px;">
              PRECISION ENGINEERING CONSULTATION
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Greetings,
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            A new professional solutions inquiry has been received through the website portal. The profile has been logged in the active queue:
          </p>
          
          <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #0f172a; width: 35%;">Client Name:</td>
                <td style="padding: 6px 0; color: #334155;">${clientName || "Not Provided"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">Business Email:</td>
                <td style="padding: 6px 0; color: #334155;"><a href="mailto:${clientEmail}" style="color: #064e3b; text-decoration: none; font-weight: 500;">${clientEmail || "Not Provided"}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">Company:</td>
                <td style="padding: 6px 0; color: #334155;">${company || "Not Provided"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">Solution Type:</td>
                <td style="padding: 6px 0; color: #003527; font-weight: bold;">${serviceType || "Not Provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0 6px 0; font-weight: bold; color: #0f172a;" colspan="2">System Challenges & Notes:</td>
              </tr>
              <tr>
                <td style="padding: 8px; color: #334155; background-color: #f1f5f9; border-radius: 4px; font-family: sans-serif; line-height: 1.5;" colspan="2">${notes || "None provided."}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
            <a href="https://wa.me/2348085040146" style="display: inline-block; background-color: #25D366; color: white; padding: 10px 20px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 5px; margin-right: 10px;">
              Reply on WhatsApp
            </a>
            <a href="mailto:${clientEmail}" style="display: inline-block; background-color: #003527; color: white; padding: 10px 20px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 5px;">
              Reply via Email
            </a>
          </div>

          <p style="font-size: 11px; color: #94a3b8; margin-top: 25px; text-align: center; font-family: monospace;">
            Sender: ${smtpUser} | Designated Target: ${smtpTo}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: %s", info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ error: error.message || "Failed to dispatch email via Nodemailer." });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAI();
    
    // Format history for the SDK if provided
    // SDK expects: [{ role: "user" | "model", parts: [{ text: string }] }]
    const formattedHistory = Array.isArray(history) 
      ? history.map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text || h.parts?.[0]?.text || "" }]
        }))
      : [];

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const result = await chat.sendMessage({ message });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred while generating response.",
      isConfigError: !process.env.GEMINI_API_KEY
    });
  }
});

// Setup static serving or Vite middleware
async function start() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Emerald Codelines server online on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});
