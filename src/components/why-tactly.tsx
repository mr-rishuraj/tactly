"use client";

import { motion } from "framer-motion";
import { Zap, PenTool, Target } from "lucide-react";

const categories = [
  {
    icon: Zap,
    title: "Grammar",
    tagline: "Fix mistakes and structure",
    focus: ["Spelling", "Grammar", "Readability"],
    tools: ["Grammarly", "Microsoft Word"],
    color: "red",
    order: 0,
  },
  {
    icon: PenTool,
    title: "Writing",
    tagline: "Generate and improve text",
    focus: ["Drafting", "Rewriting", "Content creation"],
    tools: ["ChatGPT", "Claude"],
    color: "yellow",
    order: 1,
  },
  {
    icon: Target,
    title: "Tactly",
    tagline: "Optimize communication outcomes",
    focus: ["Context awareness", "Personalization", "Relationship building"],
    badge: "Outcome Driven",
    color: "cyan",
    highlight: true,
    order: 2,
  },
];

export function WhyTactly() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glow behind Tactly card */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="text-foreground">Most tools help you write</span>
            <br />
            <span className="text-cyan-400">Tactly helps you communicate</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-xl mx-auto">
            A new category built for outcomes, not correctness.
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: category.order * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={
                category.highlight
                  ? { scale: 1.02, y: -4 }
                  : { scale: 1.01, y: -2 }
              }
              className={`group relative h-full rounded-2xl border transition-all duration-300 overflow-hidden ${
                category.highlight
                  ? "border-cyan-500/50 bg-gradient-to-br from-cyan-950/40 to-blue-900/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {/* Pulsing glow for Tactly */}
              {category.highlight && (
                <>
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -inset-px bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 rounded-2xl pointer-events-none blur"
                  />
                </>
              )}

              {/* Card Content */}
              <div className="relative p-6 md:p-7 h-full flex flex-col">
                {/* Icon */}
                <div className="text-5xl md:text-6xl mb-5">
                  <category.icon size={64} className="text-cyan-400" />
                </div>

                {/* Title & Badge */}
                <div className="mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {category.title}
                  </h3>
                  {category.badge && (
                    <motion.span
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block px-3 py-1 text-xs font-bold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                    >
                      {category.badge}
                    </motion.span>
                  )}
                </div>

                {/* Tagline */}
                <p className="text-foreground/70 font-medium mb-6 leading-snug">
                  {category.tagline}
                </p>

                {/* Divider */}
                <div
                  className={`w-12 h-1 rounded-full mb-5 ${
                    category.highlight
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "bg-white/10"
                  }`}
                />

                {/* Focus Areas */}
                <div className="flex-grow">
                  <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">
                    Focus
                  </p>
                  <ul className="space-y-2">
                    {category.focus.map((item, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 4 }}
                        className={`flex items-start gap-2 text-sm font-medium ${
                          category.highlight
                            ? "text-cyan-400"
                            : "text-foreground/70"
                        }`}
                      >
                        <span className="mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tools/Powered By */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                    {category.highlight ? "Powered by" : "Examples"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.tools?.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1.5 rounded text-xs font-medium border transition-all ${
                          category.highlight
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/25 hover:border-cyan-500/40"
                            : "bg-white/5 text-foreground/50 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Positioning Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            <span className="text-foreground font-semibold">Grammar tools optimize correctness</span> Writing tools optimize content generation{" "}
            <span className="text-cyan-400 font-semibold">Tactly optimizes communication outcomes</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
