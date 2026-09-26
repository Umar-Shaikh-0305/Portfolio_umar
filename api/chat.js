// This runs on Vercel's servers, never in the visitor's browser — so the
// Groq API key (read from an environment variable below) is never exposed.
// Set GROQ_API_KEY in your Vercel project: Settings → Environment Variables.
// Get a free key (no credit card required) at https://console.groq.com

import {
  PERSONAL,
  SKILLS,
  FEATURED_PROJECTS,
  OTHER_PROJECTS,
  EXPERIENCE,
  EDUCATION,
  ACHIEVEMENTS,
  LEARNING,
  LINKS,
} from "../src/content.js";

// Free-tier model on Groq. gpt-oss-120b is a strong general-purpose model
// with a generous free daily quota; llama-3.3-70b-versatile is a solid
// alternative if you'd rather switch. Check console.groq.com for the current
// free model list — it does change over time.
const MODEL = "openai/gpt-oss-120b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

function buildSystemPrompt() {
  const projectLines = [...FEATURED_PROJECTS, ...OTHER_PROJECTS]
    .map((p) => `- ${p.name} (${p.tech.join(", ")}): ${p.description}`)
    .join("\n");

  const skillLines = SKILLS.map((s) => `${s.category}: ${s.tags.join(", ")}`).join("\n");
  const experienceLines = EXPERIENCE.map((e) => `- ${e.role} at ${e.org} (${e.date}): ${e.description}`).join("\n");
  const educationLines = EDUCATION.map((e) => `- ${e.degree}, ${e.school} (${e.date}): ${e.detail}`).join("\n");
  const achievementLines = ACHIEVEMENTS.map((a) => `- ${a.title} (${a.org}): ${a.description}`).join("\n");
  const learningLines = LEARNING.map((l) => `- ${l.title}: ${l.description}`).join("\n");

  return `You are a helpful assistant embedded on ${PERSONAL.name}'s personal portfolio website. You answer visitor questions about ${PERSONAL.firstName} — his skills, projects, education, and experience — using ONLY the facts listed below.

ABOUT: ${PERSONAL.sub}
ROLE: ${PERSONAL.role}, based in ${PERSONAL.location}

SKILLS:
${skillLines}

PROJECTS:
${projectLines}

EXPERIENCE:
${experienceLines}

EDUCATION:
${educationLines}

ACHIEVEMENTS:
${achievementLines}

CURRENTLY LEARNING:
${learningLines}

CONTACT: ${LINKS.email.replace("mailto:", "")} · GitHub: ${LINKS.github} · LinkedIn: ${LINKS.linkedin}

Rules:
- Only use the facts above. Never invent experience, skills, achievements, or numbers not listed here.
- If asked something you don't have information on, say so honestly and suggest they reach out directly via the contact section instead of guessing.
- Keep answers short and conversational — a few sentences, not an essay.
- Refer to him as "Umar" or "he", not "I" — you are an assistant describing him, not role-playing as him.
- Politely decline anything unrelated to Umar's portfolio, background, or how to contact him.`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing GROQ_API_KEY." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid request body." });
  }

  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: "Missing 'messages' array." });
  }

  // Basic abuse guard: cap history length and per-message length. This is not
  // a substitute for real rate limiting (a serverless function has no
  // persistent memory between invocations to track request counts), but it
  // stops a single oversized request from burning through the free quota.
  const trimmed = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.text ?? m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((m) => m.content.trim().length > 0);

  if (trimmed.length === 0) {
    return res.status(400).json({ error: "Empty message." });
  }

  const chatMessages = [{ role: "system", content: buildSystemPrompt() }, ...trimmed];

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: chatMessages,
        temperature: 0.6,
        max_tokens: 400,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq API error:", data);
      return res.status(502).json({ error: "The AI service returned an error." });
    }

    const reply = data?.choices?.[0]?.message?.content || "";

    if (!reply) {
      return res.status(502).json({ error: "No response from the AI service." });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
