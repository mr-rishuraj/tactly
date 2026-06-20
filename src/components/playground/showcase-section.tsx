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
    icon: "in",
    label: "LinkedIn",
    transformation: "Professional",
    before:
      "Hi there! I came across your profile and I'm really impressed by your work. I'd love to connect and maybe we could explore potential synergies. Looking forward to hearing from you!",
    after:
      "Hi [Name] — saw your work scaling [Company]'s growth from seed to Series B. Building something adjacent in the space and would love to connect.",
  },
  {
    platform: "email",
    icon: "@",
    label: "Email",
    transformation: "Confident",
    before:
      "Hi, I just wanted to follow up on the email I sent last week about the proposal. I wasn't sure if you had a chance to review it yet. No worries if you're busy, I totally understand! Just let me know whenever you get a chance. Thanks so much!",
    after:
      "Checking in on the proposal from last week — have you had a chance to review? Happy to jump on a 15-min call to answer questions.",
  },
  {
    platform: "x",
    icon: "𝕏",
    label: "X / Twitter",
    transformation: "Founder",
    before:
      "Super excited to share that we've been working on a new project that's going to completely change how people communicate! More details coming very soon, so make sure to follow to stay updated!",
    after: "We're rebuilding how people communicate on the internet. More in two weeks.",
  },
  {
    platform: "slack",
    icon: "#",
    label: "Slack",
    transformation: "Casual",
    before:
      "Hey everyone, so sorry to interrupt! I was just wondering if maybe one of you could possibly help me out with this bug I've been stuck on? I know everyone is super busy so absolutely no pressure at all!",
    after: "Stuck on a gnarly bug — anyone free to pair for 20 min today?",
  },
  {
    platform: "whatsapp",
    icon: "W",
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
    <section className="relative py-14 md:py-20 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header — compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-[11px] font-semibold uppercase tracking-widest mb-5">
            <Sparkles size={11} />
            Real Examples
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
            <span className="text-foreground">Bad message. </span>
            <span className="text-cyan-400">Better message.</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-foreground/50 max-w-xl mx-auto">
            See how Tactly transforms real communication across every platform you use.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {EXAMPLES.map((ex, i) => (
            <motion.button
              key={ex.platform}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-[13px] transition-all duration-250 ${
                active === i
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/40 shadow-[0_2px_12px_rgba(6,182,212,0.25)]"
                  : "bg-white/[0.04] text-foreground/55 hover:bg-white/[0.08] hover:text-foreground/85 border border-white/[0.1] hover:border-white/[0.2]"
              }`}
            >
              <span className={`font-mono text-[11px] font-bold ${active === i ? "text-white/80" : "text-foreground/35"}`}>
                {ex.icon}
              </span>
              {ex.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Before / After */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28 }}
            className="grid md:grid-cols-2 gap-4 md:gap-5 items-stretch"
          >
            {/* Before */}
            <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 md:p-7 backdrop-blur-sm flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.12em]">Before</p>
              </div>
              <p className="text-[15px] text-foreground/50 leading-relaxed flex-1">
                {example.before}
              </p>
            </div>

            {/* Mobile arrow */}
            <div className="flex justify-center md:hidden">
              <div className="flex items-center justify-center w-9 h-9 rounded-full border border-cyan-500/25 bg-cyan-500/8">
                <ArrowDown size={16} className="text-cyan-400" />
              </div>
            </div>

            {/* After */}
            <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/[0.06] to-blue-500/[0.03] p-6 md:p-7 backdrop-blur-sm flex flex-col gap-4 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
              {/* Desktop connector */}
              <div className="hidden md:flex absolute -left-3.5 top-1/2 -translate-y-1/2 items-center justify-center w-7 h-7 rounded-full border border-cyan-500/25 bg-background text-cyan-400 text-[11px] font-bold shadow-sm">
                →
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.6)]" />
                  <p className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-[0.12em]">Tactly</p>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-cyan-500/12 text-cyan-400 border border-cyan-500/20 font-semibold">
                  {example.transformation}
                </span>
              </div>
              <p className="text-[16px] text-foreground/90 leading-relaxed font-medium flex-1 tracking-[-0.01em]">
                {example.after}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-center text-[12px] text-foreground/30 mt-8 font-medium tracking-wide"
        >
          Same intent. Sharper delivery. Higher response rate.
        </motion.p>
      </div>
    </section>
  );
}
