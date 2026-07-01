"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Zap, Globe, Palette, User, BarChart3, Mail, Briefcase, MessageSquare } from "lucide-react";
import { X } from "lucide-react";
import {
  DURATIONS,
  DELAYS,
  TRANSITIONS,
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
  HOVER_VARIANTS,
  VIEWPORT_SETTINGS,
} from "@/lib/motion";

const featureCards = [
  {
    id: "rewrite",
    title: "Rewrite Anywhere",
    description: "Improve messages across every platform",
    icon: Sparkles,
  },
  {
    id: "autocomplete",
    title: "AI Autocomplete",
    description: "Smart completions, instantly",
    icon: Zap,
  },
  {
    id: "hinglish",
    title: "Hinglish Native",
    description: "Fluent in how Indians communicate",
    icon: Globe,
  },
  {
    id: "tone",
    title: "Tone Engine",
    description: "Switch between five personas",
    icon: Palette,
  },
  {
    id: "voice",
    title: "Write Like Me",
    description: "Learn your unique voice",
    icon: User,
  },
  {
    id: "optimizer",
    title: "Reply Optimizer",
    description: "Analyze impact before sending",
    icon: BarChart3,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={TRANSITIONS.slow}
          viewport={VIEWPORT_SETTINGS.standard}
          className="mb-16 md:mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Powered by</span>
            <br />
            <span className="text-cyan-400">
              communication intelligence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Six core capabilities that work together to transform how you communicate.
          </p>
        </motion.div>

        {/* 3x2 Symmetrical Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SETTINGS.eager}
          variants={CONTAINER_VARIANTS.stagger(DELAYS.small)}
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: DURATIONS.normal, delay: index * DELAYS.tiny, ease: "easeOut" }}
              viewport={VIEWPORT_SETTINGS.standard}
              whileHover={HOVER_VARIANTS.liftScale}
              className="group relative rounded-2xl overflow-hidden h-[420px] md:h-[480px] lg:h-[520px] cursor-pointer"
            >
              {/* Card background with modern gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-white/2 border border-white/15 rounded-2xl group-hover:border-white/25 transition-all duration-300"
                whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
              />

              {/* Accent gradient overlay - animated */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-2xl pointer-events-none"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.8 }}
                transition={TRANSITIONS.fast}
              />

              {/* Content */}
              <div className="relative p-6 md:p-8 h-full flex flex-col">
                {/* Header Section */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: DELAYS.small + index * DELAYS.tiny, duration: DURATIONS.normal }}
                  viewport={VIEWPORT_SETTINGS.standard}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={TRANSITIONS.spring}
                    >
                      <card.icon size={48} className="text-cyan-400" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-base text-foreground/70">
                    {card.description}
                  </p>
                </motion.div>

                {/* Demo Section */}
                <div className="flex-grow flex flex-col justify-center">
                  {card.id === "rewrite" && <RewriteDemo />}
                  {card.id === "autocomplete" && <AutocompleteDemo />}
                  {card.id === "hinglish" && <HinglishDemo />}
                  {card.id === "tone" && <ToneDemo />}
                  {card.id === "voice" && <VoiceDemo />}
                  {card.id === "optimizer" && <OptimizerDemo />}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ===== DEMOS ===== */

function RewriteDemo() {
  const platformIcons = [Mail, Briefcase, X, MessageSquare];

  return (
    <div className="space-y-5">
      {/* Platform icons */}
      <div className="flex justify-center gap-4">
        {platformIcons.map((Icon, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * DELAYS.medium }}
            className="opacity-80"
          >
            <Icon size={32} className="text-cyan-400/70" />
          </motion.div>
        ))}
      </div>

      {/* Comparison */}
      <div className="space-y-3">
        <div className="bg-red-500/15 border border-red-500/25 rounded-lg p-3">
          <p className="text-xs text-red-400/80">Before: "hey can u help"</p>
        </div>
        <div className="bg-green-500/15 border border-green-500/25 rounded-lg p-3">
          <p className="text-xs text-green-400/80">After: "Could you help me?"</p>
        </div>
      </div>
    </div>
  );
}

function AutocompleteDemo() {
  const fullText = "I loved your recent article";
  const [text, setText] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setShowSuggestion(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/15 rounded-lg p-4">
        <p className="text-sm text-foreground/90">
          {text}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: DURATIONS.normal, repeat: Infinity }}
            className="text-cyan-400 ml-1"
          >
            |
          </motion.span>
        </p>
      </div>

      {showSuggestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={TRANSITIONS.smooth}
          className="bg-cyan-500/15 border border-cyan-500/25 rounded-lg p-3"
        >
          <p className="text-xs text-cyan-400/90">
            {text}{" "}
            <span className="font-semibold text-cyan-400">
              and found it insightful
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}

function HinglishDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isTabAnimating, setIsTabAnimating] = useState(false);

  const examples = [
    {
      userInput: "Bhai kal meeting ke liye free hai?",
      suggestion: "\nMujhe product roadmap discuss karna tha.",
    },
    {
      userInput: "Yaar startup idea mil gaya kya?",
      suggestion: "\nI've been exploring a few spaces recently.",
    },
    {
      userInput: "Arre iska solution nikalo jaldi",
      suggestion: "\nclient follow-up aa gaya hai.",
    },
  ];

  const currentExample = examples[activeIndex];

  // Typing animation
  useEffect(() => {
    let index = 0;
    setShowSuggestion(false);
    setTypedText("");
    setIsTabAnimating(false);

    const typingInterval = setInterval(() => {
      if (index < currentExample.userInput.length) {
        setTypedText(currentExample.userInput.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowSuggestion(true), 500);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [activeIndex, currentExample.userInput]);

  // Cycle examples
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % examples.length);
    }, 8000);
    return () => clearInterval(cycleInterval);
  }, []);

  // Tab animation trigger
  useEffect(() => {
    if (showSuggestion) {
      const tabTimeout = setTimeout(() => {
        setIsTabAnimating(true);
      }, 1000);
      return () => clearTimeout(tabTimeout);
    }
  }, [showSuggestion]);

  return (
    <div className="space-y-4">
      {/* Autocomplete input area */}
      <div className="bg-white/5 border border-white/15 rounded-lg p-4 min-h-24 relative">
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-mono">
          {/* User typed text */}
          <span className="text-foreground">{typedText}</span>

          {/* Typing cursor */}
          {!showSuggestion && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: DURATIONS.normal, repeat: Infinity }}
              className="text-cyan-400"
            >
              |
            </motion.span>
          )}

          {/* Ghost text suggestion (appears inline) */}
          {showSuggestion && !isTabAnimating && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={TRANSITIONS.smooth}
              className="text-foreground/40"
            >
              {currentExample.suggestion}
            </motion.span>
          )}

          {/* Completed text (after Tab) */}
          {isTabAnimating && (
            <motion.span
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={TRANSITIONS.fast}
              className="text-cyan-400"
            >
              {currentExample.suggestion}
            </motion.span>
          )}
        </p>
      </div>

      {/* Tab hint */}
      {showSuggestion && !isTabAnimating && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={TRANSITIONS.fast}
          className="text-xs text-cyan-400/70 font-medium"
        >
          Press Tab to accept →
        </motion.div>
      )}

      {/* Completion feedback */}
      {isTabAnimating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={TRANSITIONS.fast}
          className="flex items-center gap-2 text-xs text-green-400/70"
        >
          <span className="text-green-400">✓</span>
          <span>Context understood • Continues naturally</span>
        </motion.div>
      )}
    </div>
  );
}

function ToneDemo() {
  const [active, setActive] = useState(0);

  const tones = [
    { name: "Founder", text: "Let's build something remarkable together." },
    { name: "Student", text: "Would love to learn from your experience!" },
    { name: "Pro", text: "I'd appreciate the opportunity to collaborate." },
  ];

  return (
    <div className="space-y-4">
      {/* Tone buttons */}
      <div className="flex gap-2 flex-wrap">
        {tones.map((tone, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={HOVER_VARIANTS.scaleUp}
            whileTap={HOVER_VARIANTS.press}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              active === i
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                : "bg-white/5 text-foreground/70 border border-white/15 hover:bg-white/10"
            }`}
          >
            {tone.name}
          </motion.button>
        ))}
      </div>

      {/* Message display */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={TRANSITIONS.fast}
        className="bg-white/5 border border-white/15 rounded-lg p-4 mt-2"
      >
        <p className="text-sm text-foreground/90">"{tones[active].text}"</p>
      </motion.div>
    </div>
  );
}

function VoiceDemo() {
  const attributes = [
    { name: "Vocabulary", value: 87 },
    { name: "Formality", value: 72 },
    { name: "Tone", value: 94 },
  ];

  return (
    <div className="space-y-4">
      {attributes.map((attr, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: DURATIONS.normal, delay: i * DELAYS.tiny }}
          viewport={VIEWPORT_SETTINGS.standard}
          className="space-y-1.5"
        >
          <div className="flex justify-between text-xs">
            <span className="text-foreground/70 font-medium">{attr.name}</span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: DURATIONS.slow, delay: i * DELAYS.tiny + DELAYS.tiny }}
              viewport={VIEWPORT_SETTINGS.standard}
              className="text-cyan-400 font-semibold"
            >
              {attr.value}%
            </motion.span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${attr.value}%` }}
              transition={{ duration: DURATIONS.slow, delay: i * DELAYS.tiny + DELAYS.tiny }}
              viewport={VIEWPORT_SETTINGS.standard}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function OptimizerDemo() {
  const metrics = [
    { label: "Reply", value: 87 },
    { label: "Personal", value: 92 },
    { label: "Context", value: 94 },
    { label: "Clarity", value: 89 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATIONS.normal, delay: i * DELAYS.tiny }}
          viewport={VIEWPORT_SETTINGS.standard}
          className="bg-white/5 border border-white/15 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: DURATIONS.slow, delay: i * DELAYS.tiny + DELAYS.tiny }}
            viewport={VIEWPORT_SETTINGS.standard}
            className="text-2xl font-bold text-cyan-400 mb-1"
          >
            {metric.value}%
          </motion.div>
          <p className="text-xs text-foreground/60">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
