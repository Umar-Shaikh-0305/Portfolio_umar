import { useEffect, useRef, useState } from "react";
import { PERSONAL } from "./content.js";

const GREETING = `Hi! I can answer questions about ${PERSONAL.firstName}'s projects, skills, and background — what would you like to know?`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // controls entrance animation
  const [messages, setMessages] = useState([{ role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Small entrance delay so the button pops in after the page has settled,
  // rather than being present (and static) from the very first paint.
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setError(err.message || "Couldn't reach the assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDownInput(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={`chat-widget ${mounted ? "chat-widget-mounted" : ""}`}>
      {open && (
        <div className="chat-panel" role="dialog" aria-label={`Chat about ${PERSONAL.firstName}`}>
          <div className="chat-panel-header">
            <span>Ask about {PERSONAL.firstName}</span>
            <button className="chat-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="chat-messages" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble-assistant chat-typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}
            {error && <div className="chat-bubble chat-bubble-error">{error}</div>}
          </div>

          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDownInput}
              placeholder="Ask a question…"
              rows={1}
              aria-label="Type your question"
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              →
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-toggle-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? (
    "×"
  ) : (
    <img
      src="/robo.png"
      alt="AI Chatbot"
    />
  )}
      </button>
    </div>
  );
}
