"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, RotateCcw, ChevronDown, SplitSquareHorizontal } from "lucide-react";
import type { Goal, Tone, Platform } from "@/lib/rewrite-types";

interface TonePreset {
  label: string;
  tone: Tone;
  goal: Goal;
}

const TONE_PRESETS: TonePreset[] = [
  { label: "Professional", tone: "professional", goal: "ask" },
  { label: "Friendly",     tone: "friendly",     goal: "network" },
  { label: "Confident",    tone: "confident",     goal: "ask" },
  { label: "Casual",       tone: "casual",        goal: "network" },
  { label: "Founder",      tone: "founder",       goal: "persuade" },
  { label: "Follow-up",    tone: "professional",  goal: "follow-up" },
  { label: "Networking",   tone: "professional",  goal: "network" },
  { label: "Persuasive",   tone: "confident",     goal: "persuade" },
  { label: "Cold Email",   tone: "professional",  goal: "persuade" },
  { label: "Apology",      tone: "friendly",      goal: "apologize" },
  { label: "Closer",       tone: "confident",     goal: "close" },
];

interface PlatformOption {
  label: string;
  value: Platform;
  icon: string;
}

const PLATFORMS: PlatformOption[] = [
  { label: "LinkedIn",   value: "linkedin", icon: "in" },
  { label: "Email",      value: "gmail",    icon: "@"  },
  { label: "X / Twitter", value: "x",       icon: "𝕏"  },
  { label: "WhatsApp",   value: "whatsapp", icon: "W"  },
  { label: "Slack",      value: "unknown",  icon: "#"  },
  { label: "General",    value: "unknown",  icon: "✦"  },
];

const QUICK_EXAMPLES = [
  {
    label: "LinkedIn cold DM",
    platform: 0,
    tone: 0,
    text: "Hi there! I came across your profile and I'm really impressed by your work. I'd love to connect and maybe we could explore potential synergies. Looking forward to hearing from you!",
  },
  {
    label: "Email follow-up",
    platform: 1,
    tone: 5,
    text: "Hi, I just wanted to follow up on the email I sent last week. I wasn't sure if you had a chance to review it yet. No worries if you're busy! Just let me know whenever you get a chance. Thanks so much!",
  },
  {
    label: "Slack ask for help",
    platform: 4,
    tone: 2,
    text: "Hey everyone, so sorry to interrupt! I was just wondering if maybe one of you could possibly help me out with this bug I've been stuck on? I know everyone is super busy so absolutely no pressure at all!",
  },
  {
    label: "Cold outreach",
    platform: 1,
    tone: 8,
    text: "Hello, I hope this email finds you well. I wanted to reach out to introduce myself and my company. We provide solutions that could potentially be beneficial for your organization. I would love to schedule a call at your earliest convenience to discuss further.",
  },
];

const MAX_CHARS = 2000;

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function PlaygroundSection({ hero = false }: { hero?: boolean }) {
  const [input, setInput]                     = useState("");
  const [selectedTone, setSelectedTone]       = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState(0);
  const [customInstructions, setCustomInstructions] = useState("");
  const [showCustom, setShowCustom]           = useState(false);
  const [output, setOutput]                   = useState("");
  const [isLoading, setIsLoading]             = useState(false);
  const [error, setError]                     = useState("");
  const [copied, setCopied]                   = useState(false);
  const [compareMode, setCompareMode]         = useState(false);
  const [lastInput, setLastInput]             = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const handleTactify = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    if (input.length > MAX_CHARS) return;

    setIsLoading(true);
    setOutput("");
    setError("");
    setCompareMode(false);
    setLastInput(input.trim());

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const preset   = TONE_PRESETS[selectedTone];
    const platform = PLATFORMS[selectedPlatform];

    try {
      const res = await fetch("/api/playground/rewrite", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        signal:  controller.signal,
        body: JSON.stringify({
          message:  input.trim(),
          context:  customInstructions.trim() || undefined,
          goal:     preset.goal,
          tone:     preset.tone,
          platform: platform.value,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }

      const reader  = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;
          try {
            const parsed  = JSON.parse(raw);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setOutput(accumulated);
            }
          } catch { /* ignore malformed chunks */ }
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

  const fillExample = useCallback((ex: typeof QUICK_EXAMPLES[0]) => {
    setInput(ex.text);
    setSelectedPlatform(ex.platform);
    setSelectedTone(ex.tone);
    setOutput("");
    setError("");
    setCompareMode(false);
  }, []);

  const charsLeft   = MAX_CHARS - input.length;
  const isOverLimit = input.length > MAX_CHARS;

  const sectionClass = hero
    ? "relative px-4 md:px-6 lg:px-8 overflow-hidden pt-24 md:pt-28 pb-14 md:pb-20"
    : "relative px-4 md:px-6 lg:px-8 overflow-hidden py-16 md:py-24 border-t border-white/5";

  return (
    <section className={sectionClass}>
      {/* Background glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0], opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* Subtle grid (hero only) */}
      {hero && (
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={hero ? { opacity: 1, y: 0 } : undefined}
          whileInView={hero ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={hero ? undefined : { once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-[11px] font-semibold uppercase tracking-widest mb-5">
            <Sparkles size={11} />
            {hero ? "No Extension Needed" : "Try It Yourself"}
          </div>

          {hero ? (
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-4 leading-[1.1]">
              <span className="block text-foreground">Paste your message.</span>
              <span className="block text-cyan-400">See the difference.</span>
            </h1>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="text-foreground">Your message. </span>
              <span className="text-cyan-400">Tactly rewritten.</span>
            </h2>
          )}

          <p className="text-[15px] md:text-base text-foreground/50 max-w-xl mx-auto leading-relaxed">
            {hero
              ? "Pick a tone, click Tactify — get a sharper message in seconds. No install, no sign-up."
              : "Paste any text. Pick a tone. See the difference instantly."}
          </p>
        </motion.div>

        {/* ── Two-column ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={hero ? { opacity: 1, y: 0 } : undefined}
          whileInView={hero ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          viewport={hero ? undefined : { once: true }}
          className="grid lg:grid-cols-2 gap-5 lg:gap-6 items-start"
        >

          {/* ────── LEFT: Input ────── */}
          <div className="flex flex-col gap-4">

            {/* Quick-fill examples */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-semibold text-foreground/30 uppercase tracking-wider shrink-0">Try:</span>
              {QUICK_EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => fillExample(ex)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/8 bg-white/[0.03] text-foreground/50 hover:text-foreground/80 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-150 font-medium"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            {/* Textarea card */}
            <div className="group rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 focus-within:border-cyan-500/35 focus-within:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_4px_24px_rgba(6,182,212,0.06)]">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste an email, LinkedIn message, tweet, Slack message, or any text here…"
                rows={7}
                className="w-full bg-transparent text-foreground/90 placeholder:text-foreground/25 text-[15px] leading-relaxed p-5 resize-none outline-none font-sans"
                suppressHydrationWarning
              />
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06]">
                <span className={`text-[11px] font-medium tabular-nums ${isOverLimit ? "text-red-400" : "text-foreground/25"}`}>
                  {isOverLimit ? `${Math.abs(charsLeft)} over limit` : `${input.length} / ${MAX_CHARS}`}
                </span>
                {input && (
                  <button
                    onClick={() => { setInput(""); setOutput(""); setError(""); }}
                    className="text-[11px] text-foreground/25 hover:text-foreground/55 transition-colors font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Platform selector */}
            <div>
              <p className="text-[11px] font-bold text-foreground/35 uppercase tracking-[0.1em] mb-2.5">
                Platform
              </p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setSelectedPlatform(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                      selectedPlatform === i
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/40 shadow-[0_2px_12px_rgba(6,182,212,0.25)]"
                        : "bg-white/[0.04] text-foreground/55 hover:bg-white/[0.08] hover:text-foreground/90 border border-white/[0.1] hover:border-white/[0.2]"
                    }`}
                  >
                    <span className={`font-mono text-[11px] font-bold ${selectedPlatform === i ? "text-white/80" : "text-foreground/35"}`}>
                      {p.icon}
                    </span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone selector */}
            <div>
              <p className="text-[11px] font-bold text-foreground/35 uppercase tracking-[0.1em] mb-2.5">
                Tone &amp; Goal
              </p>
              <div className="flex flex-wrap gap-2">
                {TONE_PRESETS.map((preset, i) => (
                  <button
                    key={preset.label}
                    onClick={() => setSelectedTone(i)}
                    className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                      selectedTone === i
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/40 shadow-[0_2px_12px_rgba(6,182,212,0.25)]"
                        : "bg-white/[0.04] text-foreground/55 hover:bg-white/[0.08] hover:text-foreground/90 border border-white/[0.1] hover:border-white/[0.2]"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom instructions (collapsible) */}
            <div>
              <button
                onClick={() => setShowCustom((v) => !v)}
                className="flex items-center gap-2 text-[12px] font-medium text-foreground/35 hover:text-foreground/60 transition-colors"
              >
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${showCustom ? "rotate-180" : ""}`}
                />
                Additional instructions
              </button>
              <AnimatePresence>
                {showCustom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <textarea
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="e.g. Make it shorter, add urgency, sound startup-friendly…"
                      rows={3}
                      className="mt-3 w-full bg-white/[0.04] border border-white/[0.1] rounded-xl text-foreground/80 placeholder:text-foreground/20 text-[14px] leading-relaxed p-4 resize-none outline-none focus:border-cyan-500/30 transition-colors"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tactify CTA */}
            <motion.button
              onClick={handleTactify}
              disabled={!input.trim() || isLoading || isOverLimit}
              whileHover={{ scale: input.trim() && !isLoading ? 1.015 : 1 }}
              whileTap={{ scale: input.trim() && !isLoading ? 0.985 : 1 }}
              className="w-full py-[15px] rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-[15px] tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_28px_rgba(59,130,246,0.45)] disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2.5"
            >
              {isLoading ? (
                <>
                  <LoadingDots />
                  <span className="text-white/80">Rewriting…</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Tactify
                </>
              )}
            </motion.button>
          </div>

          {/* ────── RIGHT: Output ────── */}
          <motion.div
            className={`rounded-2xl border flex flex-col overflow-hidden transition-all duration-500 min-h-[440px] ${
              output && !isLoading
                ? "border-cyan-500/20 bg-gradient-to-b from-cyan-500/[0.05] to-transparent shadow-[0_0_40px_rgba(6,182,212,0.06)]"
                : "border-white/[0.1] bg-gradient-to-b from-white/[0.04] to-white/[0.02]"
            }`}
          >
            {/* Output toolbar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isLoading ? "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.7)]" :
                  output    ? "bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.5)]" :
                              "bg-foreground/15"
                }`} />
                <span className="text-[11px] font-bold text-foreground/35 uppercase tracking-[0.1em]">
                  {isLoading ? "Rewriting" : output ? "Tactly" : "Output"}
                </span>
                {isLoading && <LoadingDots />}
              </div>

              {output && !isLoading && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCompareMode((v) => !v)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                      compareMode
                        ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/25"
                        : "text-foreground/40 hover:text-foreground/70 hover:bg-white/5 border-white/[0.08] hover:border-white/15"
                    }`}
                  >
                    <SplitSquareHorizontal size={11} />
                    Compare
                  </button>
                  <button
                    onClick={handleTactify}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-foreground/40 hover:text-foreground/70 hover:bg-white/5 border border-white/[0.08] hover:border-white/15 transition-all"
                  >
                    <RotateCcw size={11} />
                    Retry
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                      copied
                        ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/25"
                        : "text-foreground/40 hover:text-foreground/70 hover:bg-white/5 border-white/[0.08] hover:border-white/15"
                    }`}
                  >
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </div>

            {/* Output body */}
            <div className="flex-1 p-5">
              <AnimatePresence mode="wait">

                {/* Error */}
                {error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl border border-red-500/20 bg-red-500/8"
                  >
                    <span className="text-red-400 text-sm">{error}</span>
                  </motion.div>

                ) : output ? (

                  /* Compare mode */
                  compareMode ? (
                    <motion.div
                      key="compare"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-2 gap-4 h-full"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Before</p>
                        <p className="text-sm text-foreground/45 leading-relaxed">{lastInput}</p>
                      </div>
                      <div className="flex flex-col gap-2 border-l border-white/[0.08] pl-4">
                        <p className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-widest">After · Tactly</p>
                        <p className="text-sm text-foreground/90 leading-relaxed font-medium">{output}</p>
                      </div>
                    </motion.div>
                  ) : (
                    /* Normal output */
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[16px] leading-[1.7] text-foreground/90 whitespace-pre-wrap font-medium tracking-[-0.01em]">
                        {output}
                      </p>
                      {!isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2"
                        >
                          <Sparkles size={11} className="text-cyan-400/40" />
                          <span className="text-[11px] text-foreground/25 font-medium">Tactly × Gemini 2.5 Flash</span>
                        </motion.div>
                      )}
                    </motion.div>
                  )

                ) : (
                  /* Empty state */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-4 py-16"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                        <Sparkles size={22} className="text-foreground/15" />
                      </div>
                      {isLoading && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border border-cyan-500/30"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-foreground/25 mb-1">
                        Your rewritten message appears here
                      </p>
                      <p className="text-[12px] text-foreground/18">
                        Paste text on the left and click Tactify
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
