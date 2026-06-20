"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

interface ShowcaseExample {
  platform: string;
  icon: string;
  label: string;
  transformation: string;
  before: string;
  after: string;
}

const EXAMPLES: ShowcaseExample[] = [
  {
    platform: "linkedin",
    icon: "💼",
    label: "LinkedIn",
    transformation: "Professional",
    before:
      "Hi there! I came across your profile and I'm really impressed by your work. I'd love to connect and maybe we could explore potential synergies. Looking forward to hearing from you!",
    after:
      "Hi [Name] — saw your work scaling [Company]'s growth from seed to Series B. Building something adjacent in the space and would love to connect.",
  },
  {
    platform: "email",
    icon: "📧",
    label: "Email",
    transformation: "Confident Follow-up",
    before:
      "Hi, I just wanted to follow up on the email I sent last week about the proposal. I wasn't sure if you had a chance to review it yet. No worries if you're busy, I totally understand! Just let me know whenever you get a chance. Thanks so much!",
    after:
      "Checking in on the proposal from last week — have you had a chance to review? Happy to jump on a 15-min call to answer questions and walk through the details.",
  },
  {
    platform: "x",
    icon: "𝕏",
    label: "X / Twitter",
    transformation: "Founder",
    before:
      "Super excited to share that we've been working on a new project that's going to completely change how people communicate! More details coming very soon, so make sure to follow to stay updated! Very exciting times ahead!!",
    after: "We're rebuilding how people communicate on the internet. More in two weeks.",
  },
  {
    platform: "slack",
    icon: "#",
    label: "Slack",
    transformation: "Casual",
    before:
      "Hey everyone, so sorry to interrupt! I was just wondering if maybe one of you could possibly help me out with this bug I've been stuck on for a while now? I know everyone is super busy so absolutely no pressure at all, I truly appreciate it!",
    after: "Stuck on a gnarly bug — anyone free to pair for 20 min today?",
  },
  {
    platform: "whatsapp",
    icon: "💬",
    label: "WhatsApp",
    transformation: "Friendly",
    before:
      "Heyyyy!! It's been sooooo long since we last spoke! Hope you're doing absolutely amazing!! We should totally definitely catch up sometime really soon! Miss you loads!! 😊😊😊",
    after: "Hey! Been ages — free to catch up this week?",
  },
];

export function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const example = EXAMPLES[active];

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles size={12} />
            Real Examples
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            <span className="text-foreground">Bad message. </span>
            <span className="text-cyan-400">Better message.</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
            See how Tactly transforms real communication across every platform you use.
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10 md:mb-12"
        >
          {EXAMPLES.map((ex, i) => (
            <motion.button
              key={ex.platform}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                active === i
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground border border-white/15 hover:border-white/25"
              }`}
            >
              <span>{ex.icon}</span>
              {ex.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Before / After Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-6 items-start"
          >
            {/* Before */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/3 to-white/[0.01] p-6 md:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-red-400/60" />
                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                  Before
                </p>
              </div>
              <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
                {example.before}
              </p>
            </div>

            {/* Arrow - visible on mobile as down arrow, hidden on desktop */}
            <div className="flex justify-center md:hidden">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500/30 bg-cyan-500/10">
                <ArrowDown size={18} className="text-cyan-400" />
              </div>
            </div>

            {/* After */}
            <div className="relative rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/8 to-blue-500/5 p-6 md:p-8 backdrop-blur-sm">
              {/* Desktop arrow overlay */}
              <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full border border-cyan-500/30 bg-background shadow-md">
                <span className="text-cyan-400 text-xs font-bold">→</span>
              </div>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <p className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest">
                    Tactly
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 font-medium">
                  {example.transformation}
                </span>
              </div>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
                {example.after}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-sm text-foreground/40 mt-10 font-medium"
        >
          Same intent. Sharper delivery. Higher response rate.
        </motion.p>
      </div>
    </section>
  );
}
