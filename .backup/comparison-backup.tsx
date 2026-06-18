"use client";

import { motion } from "framer-motion";

type ComparisonValue = boolean | "Partial";

interface ComparisonRow {
  feature: string;
  grammarly: ComparisonValue;
  chatgpt: ComparisonValue;
  composeai: ComparisonValue;
  tactly: ComparisonValue;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Corrects grammar & spelling",
    grammarly: true,
    chatgpt: "Partial",
    composeai: "Partial",
    tactly: "Partial",
  },
  {
    feature: "Text generation / completion",
    grammarly: false,
    chatgpt: true,
    composeai: true,
    tactly: true,
  },
  {
    feature: "Browser extension (works inline)",
    grammarly: true,
    chatgpt: false,
    composeai: false,
    tactly: true,
  },
  {
    feature: "Clones your writing style",
    grammarly: false,
    chatgpt: false,
    composeai: true,
    tactly: true,
  },
  {
    feature: "Understands communication intent",
    grammarly: false,
    chatgpt: "Partial",
    composeai: false,
    tactly: true,
  },
  {
    feature: "Native code-switching (Hinglish, etc)",
    grammarly: false,
    chatgpt: "Partial",
    composeai: false,
    tactly: true,
  },
  {
    feature: "Optimizes for response rates",
    grammarly: false,
    chatgpt: false,
    composeai: false,
    tactly: true,
  },
  {
    feature: "No context switching needed",
    grammarly: true,
    chatgpt: false,
    composeai: false,
    tactly: true,
  },
  {
    feature: "Understands recipient context",
    grammarly: false,
    chatgpt: "Partial",
    composeai: false,
    tactly: true,
  },
];

export function Comparison() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Subtle grid background */}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">More than a</span>
            <br />
            <span className="text-cyan-400">writing assistant</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            See how Tactly creates a new category of communication intelligence.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-sm"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-gradient-to-r from-white/5 to-white/3">
                <th className="text-left py-6 px-6 md:px-8 font-bold text-foreground">Feature</th>
                <th className="text-center py-6 px-4 md:px-6 font-semibold text-foreground/60 text-sm">
                  Grammarly
                </th>
                <th className="text-center py-6 px-4 md:px-6 font-semibold text-foreground/60 text-sm">
                  ChatGPT
                </th>
                <th className="text-center py-6 px-4 md:px-6 font-semibold text-foreground/60 text-sm">
                  Compose AI
                </th>
                <th className="text-center py-6 px-4 md:px-6 font-bold bg-gradient-to-r from-cyan-500/15 to-blue-500/10">
                  <span className="text-cyan-400">Tactly</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                    index % 2 === 0 ? "bg-white/2" : "bg-transparent"
                  }`}
                >
                  <td className="py-5 px-6 md:px-8 font-medium text-sm text-foreground/90">
                    {row.feature}
                  </td>
                  <td className="py-5 px-4 md:px-6 text-center">
                    {row.grammarly === true ? (
                      <span className="text-green-400 font-bold text-lg">✓</span>
                    ) : row.grammarly === "Partial" ? (
                      <span className="text-yellow-400 font-bold text-lg">◐</span>
                    ) : (
                      <span className="text-foreground/15">-</span>
                    )}
                  </td>
                  <td className="py-5 px-4 md:px-6 text-center">
                    {row.chatgpt === true ? (
                      <span className="text-green-400 font-bold text-lg">✓</span>
                    ) : row.chatgpt === "Partial" ? (
                      <span className="text-yellow-400 font-bold text-lg">◐</span>
                    ) : (
                      <span className="text-foreground/15">-</span>
                    )}
                  </td>
                  <td className="py-5 px-4 md:px-6 text-center">
                    {row.composeai === true ? (
                      <span className="text-green-400 font-bold text-lg">✓</span>
                    ) : row.composeai === "Partial" ? (
                      <span className="text-yellow-400 font-bold text-lg">◐</span>
                    ) : (
                      <span className="text-foreground/15">-</span>
                    )}
                  </td>
                  <td className="py-5 px-4 md:px-6 text-center bg-gradient-to-r from-cyan-500/12 to-blue-500/8">
                    {row.tactly === true ? (
                      <span className="text-cyan-400 font-bold text-lg">✓</span>
                    ) : row.tactly === "Partial" ? (
                      <span className="text-cyan-400/60 font-bold text-lg">◐</span>
                    ) : (
                      <span className="text-foreground/15">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-sm text-foreground/60 mt-12 font-medium"
        >
          Traditional tools help you write. Tactly helps you <span className="text-cyan-400">communicate better</span>
        </motion.p>
      </div>
    </section>
  );
}
