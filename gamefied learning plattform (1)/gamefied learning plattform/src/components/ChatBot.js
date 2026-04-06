import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey 👋 I'm your AI assistant. Ask me anything about coding, concepts, or your coursework!" }
  ]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const API_KEY = "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";

  /* auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* auto-resize textarea */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg   = { role: "user", text: input.trim() };
    const userInput = input.trim();
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user",   content: userInput },
          ],
        }),
      });

      const data = await res.json();
      let botReply = "⚠️ No response";
      if (data?.choices?.length > 0)  botReply = data.choices[0].message.content;
      else if (data?.error)            botReply = "❌ " + data.error.message;

      setMessages(prev => [...prev, { role: "assistant", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Error connecting to AI" }]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatText = (text) =>
    text.split("\n").map((line, i) => (
      <React.Fragment key={i}>{line}{i < text.split("\n").length - 1 && <br />}</React.Fragment>
    ));

  return (
    <>
      <style>{CSS}</style>

      <div className="cb-root">

        {/* BG BLOBS */}
        <div className="cb-blob cb-blob1" />
        <div className="cb-blob cb-blob2" />

        {/* ── HEADER ── */}
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-ai-avatar">
              <span>⚡</span>
              <span className="cb-online-dot" />
            </div>
            <div>
              <p className="cb-ai-name">SmartLearn AI</p>
              <p className="cb-ai-status">
                {loading ? <><span className="cb-pulse" />Thinking…</> : <><span className="cb-online-badge" />Online</>}
              </p>
            </div>
          </div>
          <div className="cb-header-right">
            <button className="cb-icon-btn" title="Clear chat" onClick={() => setMessages([{ role:"assistant", text:"Chat cleared! How can I help you?" }])}>🗑</button>
          </div>
        </div>

        {/* ── MESSAGES ── */}
        <div className="cb-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`cb-row ${msg.role === "user" ? "cb-row-user" : "cb-row-ai"}`}>

              {msg.role === "assistant" && (
                <div className="cb-bubble-avatar">⚡</div>
              )}

              <div className={`cb-bubble ${msg.role === "user" ? "cb-bubble-user" : "cb-bubble-ai"}`}>
                {formatText(msg.text)}
                <span className="cb-timestamp">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {msg.role === "user" && (
                <div className="cb-bubble-avatar cb-bubble-avatar-user">U</div>
              )}
            </div>
          ))}

          {/* TYPING INDICATOR */}
          {loading && (
            <div className="cb-row cb-row-ai">
              <div className="cb-bubble-avatar">⚡</div>
              <div className="cb-bubble cb-bubble-ai cb-typing-bubble">
                <span className="cb-dot" />
                <span className="cb-dot" />
                <span className="cb-dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── INPUT ── */}
        <div className="cb-input-area">
          <div className="cb-input-wrap">
            <textarea
              ref={textareaRef}
              className="cb-textarea"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything… (Enter to send, Shift+Enter for new line)"
            />
            <button
              className={`cb-send-btn ${input.trim() && !loading ? "cb-send-active" : ""}`}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
            >
              {loading ? <span className="cb-spinner" /> : "↑"}
            </button>
          </div>
          <p className="cb-hint">Powered by OpenRouter · GPT-3.5 Turbo</p>
        </div>

      </div>
    </>
  );
};

/* ─────────────────────── CSS ─────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

.cb-root {
  position: fixed;              /* full screen */
  top: 75px;
  left: 0;
  width: 100vw;                 /* full width */
  height: 100vh;                /* full height */

  display: flex;
  flex-direction: column;

  background: #080d14;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
  color: #e0eaf4;

  overflow: hidden;

  /* remove card look */
  border-radius: 0;
  margin: 0;
  border: none;

  /* optional glow for premium look */
  box-shadow: inset 0 0 120px rgba(0, 255, 247, 0.05);
}

/* BLOBS */
.cb-blob { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }
.cb-blob1 { width:340px; height:340px; top:-120px; left:-120px;
  background: radial-gradient(circle, rgba(0,255,247,0.06) 0%, transparent 70%); }
.cb-blob2 { width:280px; height:280px; bottom:-80px; right:-80px;
  background: radial-gradient(circle, rgba(0,150,255,0.05) 0%, transparent 70%); }

/* HEADER */
.cb-header {
  position: relative; z-index:2;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px;
  background: rgba(255,255,255,0.025);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(10px);
}
.cb-header-left { display:flex; align-items:center; gap:14px; }
.cb-ai-avatar {
  position:relative;
  width:42px; height:42px; border-radius:14px;
  background: linear-gradient(135deg, #00fff7, #007cf0);
  display:flex; align-items:center; justify-content:center;
  font-size:18px;
  box-shadow: 0 0 18px rgba(0,255,247,0.3);
}
.cb-online-dot {
  position:absolute; bottom:2px; right:2px;
  width:10px; height:10px; border-radius:50%;
  background:#22c55e; border:2px solid #080d14;
}
.cb-ai-name { font-size:15px; font-weight:700; color:#f0f4ff; margin:0; }
.cb-ai-status { font-size:12px; color:#5a6a7e; margin:2px 0 0; display:flex; align-items:center; gap:5px; }
.cb-online-badge {
  display:inline-block; width:7px; height:7px; border-radius:50%; background:#22c55e;
  box-shadow: 0 0 6px #22c55e;
}
.cb-pulse { display:inline-block; width:7px; height:7px; border-radius:50%; background:#f59e0b;
  animation: cb-pulsate 1.2s ease infinite; }
@keyframes cb-pulsate { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

.cb-icon-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  width:36px; height:36px;
  cursor:pointer; font-size:15px;
  color:#5a6a7e; transition: background 0.2s, color 0.2s;
}
.cb-icon-btn:hover { background: rgba(255,255,255,0.1); color:#f0f4ff; }

/* MESSAGES */
.cb-messages {
  flex:1; overflow-y:auto; padding:24px 20px;
  display:flex; flex-direction:column; gap:18px;
  position:relative; z-index:1;
  scroll-behavior: smooth;
}
.cb-messages::-webkit-scrollbar { width:4px; }
.cb-messages::-webkit-scrollbar-track { background:transparent; }
.cb-messages::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }

.cb-row { display:flex; align-items:flex-end; gap:10px; animation: cb-appear 0.3s ease; }
@keyframes cb-appear { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
.cb-row-user  { flex-direction:row-reverse; }
.cb-row-ai    { flex-direction:row; }

.cb-bubble-avatar {
  width:32px; height:32px; border-radius:10px; flex-shrink:0;
  background: linear-gradient(135deg, #00fff7, #007cf0);
  display:flex; align-items:center; justify-content:center;
  font-size:13px; color:#000; font-weight:800;
  box-shadow: 0 0 10px rgba(0,255,247,0.2);
}
.cb-bubble-avatar-user {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 0 10px rgba(99,102,241,0.3);
  color: #fff;
  font-size: 11px;
}

.cb-bubble {
  max-width:72%; padding:13px 16px;
  border-radius:18px; font-size:14px; line-height:1.65;
  position:relative; word-break:break-word;
}
.cb-bubble-ai {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom-left-radius: 4px;
  color: #d8e8f4;
}
.cb-bubble-user {
  background: linear-gradient(135deg, #007cf0, #00c3ff);
  border-bottom-right-radius: 4px;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0,124,240,0.25);
}
.cb-timestamp {
  display:block; font-size:10px; opacity:0.4; margin-top:6px; text-align:right;
}

/* TYPING DOTS */
.cb-typing-bubble { display:flex; align-items:center; gap:5px; padding:14px 18px; }
.cb-dot {
  width:7px; height:7px; border-radius:50%;
  background:#00fff7; opacity:0.5;
  animation: cb-bounce 1.2s ease infinite;
}
.cb-dot:nth-child(2) { animation-delay:0.2s; }
.cb-dot:nth-child(3) { animation-delay:0.4s; }
@keyframes cb-bounce { 0%,60%,100%{transform:translateY(0);opacity:0.5;} 30%{transform:translateY(-7px);opacity:1;} }

/* INPUT */
.cb-input-area {
  position:relative; z-index:2;
  padding:16px 20px 14px;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.07);
}
.cb-input-wrap {
  display:flex; align-items:flex-end; gap:10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 10px 10px 10px 16px;
  transition: border-color 0.2s;
}
.cb-input-wrap:focus-within {
  border-color: rgba(0,255,247,0.3);
  box-shadow: 0 0 0 3px rgba(0,255,247,0.05);
}
.cb-textarea {
  flex:1; background:none; border:none; outline:none;
  color:#e0eaf4; font-size:14px; font-family:inherit;
  line-height:1.6; resize:none; min-height:24px; max-height:120px;
  overflow-y:auto;
}
.cb-textarea::placeholder { color:#3d4f63; }
.cb-send-btn {
  width:38px; height:38px; flex-shrink:0;
  border-radius:11px; border:none; cursor:pointer;
  background: rgba(255,255,255,0.06);
  color:#3d4f63; font-size:18px; font-weight:700;
  display:flex; align-items:center; justify-content:center;
  transition: background 0.2s, color 0.2s, transform 0.15s;
}
.cb-send-active {
  background: linear-gradient(135deg, #00fff7, #007cf0) !important;
  color: #000 !important;
  box-shadow: 0 4px 14px rgba(0,200,255,0.35);
}
.cb-send-btn:not(:disabled):hover { transform:scale(1.08); }
.cb-send-btn:disabled { cursor:default; }

.cb-spinner {
  width:16px; height:16px; border-radius:50%;
  border:2px solid rgba(0,0,0,0.2);
  border-top-color:#000;
  animation: cb-spin 0.7s linear infinite;
  display:inline-block;
}
@keyframes cb-spin { to{ transform:rotate(360deg); } }

.cb-hint { font-size:11px; color:#2d3d50; text-align:center; margin:8px 0 0; }
`;

export default ChatBot;