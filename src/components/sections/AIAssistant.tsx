"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What services do you offer?",
  "How much does a mobile app cost?",
  "Can you build an AI chatbot?",
  "What's your development timeline?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the ParulSoftTechAI Business Assistant. I can help you with project recommendations, cost estimates, technology advice, and more. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="assistant" className="section-dark relative r-section overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#4ECDC4] opacity-10 blur-[120px]" />

      <div className="r-container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#4ECDC4] flex items-center justify-center gap-2">
            AI Chatbot <span className="badge-new">NEW</span>
          </span>
          <h2 className="r-heading font-black mt-2 sm:mt-3 mb-3 sm:mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Meet Your <span className="text-gradient">AI Assistant</span>
          </h2>
          <p className="r-text max-w-xl mx-auto text-white/60 px-2">
            Ask about our services, get instant project estimates, or get technology recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-3xl glass-strong overflow-hidden glow-border mx-auto max-w-3xl"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-3 sm:p-5 border-b border-white/10">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#4ECDC4] flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 border-2 border-black" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm sm:text-base text-white">ParulSoftTechAI Assistant</div>
              <div className="text-[10px] sm:text-xs flex items-center gap-1 text-white/50">
                <Sparkles className="w-3 h-3" /> Online · AI-Powered
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-[300px] sm:h-[350px] md:h-[400px] overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 no-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4ECDC4] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] sm:max-w-[75%] p-2.5 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed break-words ${
                    msg.role === "user"
                      ? "bg-[#4ECDC4] text-black rounded-br-sm font-medium"
                      : "glass text-white rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4ECDC4] flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black animate-spin" />
                </div>
                <div className="glass p-3 sm:p-4 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-2 h-2 rounded-full bg-[#4ECDC4]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 1 && (
            <div className="px-3 sm:px-5 pb-3 flex flex-wrap gap-1.5 sm:gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg glass hover:glass-strong text-white/80 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-5 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2 sm:gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl glass border-0 outline-none text-xs sm:text-sm text-white placeholder-white/40"
                style={{ background: "rgba(255,255,255,0.06)" }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-primary px-4 sm:px-5 disabled:opacity-50 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
