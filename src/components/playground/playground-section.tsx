"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, RotateCcw, ChevronDown } from "lucide-react";
import type { Goal, Tone, Platform } from "@/lib/rewrite-types";

interface TonePreset {
  label: string;
  tone: Tone;
  goal: Goal;
  hint?: string;
}

const TONE_PRESETS: TonePreset[] = [
  { label: "Professional", tone: "professional", goal: "ask" },
  { label: "Friendly", tone: "friendly", goal: "network" },
  { label: "Confident", tone: "confident", goal: "ask" },
  { label: "Casual", tone: "casual", goal: "network" },
  { label: "Founder", tone: "founder", goal: "persuade" },
  { label: "Follow-up", tone: "professional", goal: "follow-up" },
  { label: "Networking", tone: "professional", goal: "network" },
  { label: "Persuasive", tone: "confident", goal: "persuade" },
  { label: "Cold Email", tone: "professional", goal: "persuade" },
  { label: "Apology", tone: "friendly", goal: "apologize" },
  { label: "Closer", tone: "confident", goal: "close" },
];

interface PlatformOption {
  label: string;
  value: Platform;
  icon: string;
}

const PLATFORMS: PlatformOption[] = [
  { label: "LinkedIn", value: "linkedin", icon: "💼" },
  { label: "Email", value: "gmail", icon: "📧" },
  { label: "X / Twitter", value: "x", icon: "𝕏" },
  { label: "WhatsApp", value: "whatsapp", icon: "💬" },
  { label: "Slack", value: "unknown", icon: "#" },
  { label: "General", value: "unknown", icon: "✍️" },
];

const MAX_CHARS = 2000;

export function PlaygroundSection({ hero = false }: { hero?: boolean }) {
  const [input, setInput] = useState("");
  const [selectedTone, setSelectedTone] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState(0);
  const [customInstructions, setCustomInstructions] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleTactify = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    if (input.length > MAX_CHARS) return;

    setIsLoading(true);
    setOutput("");
    setError("");

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const preset = TONE_PRESETS[selectedTone];
    const platform = PLATFORMS[selectedPlatform];

    try {
      const res = await fetch("/api/playground/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: input.trim(),
          context: customInstructions.trim() || undefined,
          goal: preset.goal,
          tone: preset.tone,
          platform: platform.value,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;
          try {
            const parsed = JSON.parse(raw);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setOutput(accumulated);
            }
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  }, [input, selectedTone, selectedPlatform, customInstructions, isLoading]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handleRegenerate = useCallback(() => {
    handleTactify();
  }, [handleTactify]);

  const charsLeft = MAX_CHARS - input.length;
  const isOverLimit = input.length > MAX_CHARS;

  return (
    <section className={`relative px-4 md:px-6 lg:px-8 overflow-hidden ${hero ? "pt-32 md:pt-36 pb-16 md:pb-24" : "py-16 md:py-24 border-t border-white/5"}`}>
      {/* Background glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/6 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Grid */}
      {hero && (
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: hero ? 30 : 20 }}
          animate={hero ? { opacity: 1, y: 0 } : undefined}
          whileInView={hero ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={hero ? undefined : { once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles size={12} />
            {hero ? "No Extension Needed" : "Try It Yourself"}
          </div>
          {hero ? (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              <span className="block text-foreground">Paste your message.</span>
              <span className="block text-cyan-400">See the difference.</span>
            </h1>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              <span className="text-foreground">Your message. </span>
              <span className="text-cyan-400">Tactly rewritten.</span>
            </h2>
          )}
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
            {hero
              ? "Pick a tone. Click Tactify. Get a sharper message in seconds — no install, no sign-up."
              : "Paste any text. Pick a tone. See the difference instantly."}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hero ? { opacity: 1, y: 0 } : undefined}
          whileInView={hero ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={hero ? undefined : { once: true }}
          className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start"
        >
          {/* ── LEFT: Input ── */}
          <div className="flex flex-col gap-5">
            {/* Textarea */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm overflow-hidden">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste an email, LinkedIn message, tweet, Slack message, or any text here…"
                rows={7}
                className="w-full bg-transparent text-foreground/90 placeholder:text-foreground/30 text-sm leading-relaxed p-5 resize-none outline-none"
                suppressHydrationWarning
              />
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                <span className={`text-xs font-medium ${isOverLimit ? "text-red-400" : "text-foreground/30"}`}>
                  {isOverLimit ? `${Math.abs(charsLeft)} over limit` : `${charsLeft} characters left`}
                </span>
                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Platform Selector */}
            <div>
              <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">
                Platform
              </p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setSelectedPlatform(i)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedPlatform === i
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/50 shadow-md shadow-cyan-500/20"
                        : "bg-white/5 text-foreground/60 hover:bg-white/10 hover:text-foreground border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span>{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">
                Tone & Goal
              </p>
              <div className="flex flex-wrap gap-2">
                {TONE_PRESETS.map((preset, i) => (
                  <button
                    key={preset.label}
                    onClick={() => setSelectedTone(i)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedTone === i
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/50 shadow-md shadow-cyan-500/20"
                        : "bg-white/5 text-foreground/60 hover:bg-white/10 hover:text-foreground border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Instructions (collapsible) */}
            <div>
              <button
                onClick={() => setShowCustom((v) => !v)}
                className="flex items-center gap-2 text-xs font-medium text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${showCustom ? "rotate-180" : ""}`}
                />
                Additional Instructions (optional)
              </button>
              <AnimatePresence>
                {showCustom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <textarea
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="e.g. Make it shorter, add urgency, sound startup-friendly…"
                      rows={3}
                      className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl text-foreground/80 placeholder:text-foreground/25 text-sm leading-relaxed p-4 resize-none outline-none focus:border-white/20 transition-colors"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleTactify}
              disabled={!input.trim() || isLoading || isOverLimit}
              whileHover={{ scale: input.trim() && !isLoading ? 1.02 : 1 }}
              whileTap={{ scale: input.trim() && !isLoading ? 0.98 : 1 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Rewriting…
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Tactify
                </>
              )}
            </motion.button>
          </div>

          {/* ── RIGHT: Output ── */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm min-h-[420px] flex flex-col">
            {/* Output header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-colors ${isLoading ? "bg-cyan-400 animate-pulse" : output ? "bg-cyan-400" : "bg-foreground/20"}`} />
                <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                  {isLoading ? "Rewriting…" : output ? "Tactly Output" : "Output"}
                </span>
              </div>
              {output && !isLoading && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegenerate}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground/50 hover:text-foreground/80 hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all"
                  >
                    <RotateCcw size={12} />
                    Regenerate
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      copied
                        ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                        : "text-foreground/50 hover:text-foreground/80 hover:bg-white/5 border-white/5 hover:border-white/15"
                    }`}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              )}
            </div>

            {/* Output content */}
            <div className="flex-1 p-5">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/10"
                  >
                    <span className="text-red-400 text-sm">{error}</span>
                  </motion.div>
                ) : output ? (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-foreground/90 text-base leading-relaxed whitespace-pre-wrap">
                      {output}
                    </p>
                    {!isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs text-foreground/30"
                      >
                        <Sparkles size={12} className="text-cyan-400/50" />
                        Powered by Tactly × Gemini 2.5 Flash
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-16 gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                      <Sparkles size={20} className="text-foreground/20" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/30 mb-1">
                        Your rewritten message appears here
                      </p>
                      <p className="text-xs text-foreground/20">
                        Paste text on the left and click Tactify
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
