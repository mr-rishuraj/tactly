"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Problem() {
  const oldWaySteps = ["Write", "Copy", "ChatGPT", "Paste", "Rewrite", "Copy", "Paste Back"];
  const newWaySteps = ["Highlight", "Improve", "Send"];

  return (
    <section
      id="how-it-works"
      className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5"
    >
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
            <span className="text-foreground">The problem with current tools</span>
            <br />
            <span className="text-cyan-400">Seven unnecessary steps</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Writing something important? You copy it to ChatGPT, wait, paste it back. That's friction.
          </p>
        </motion.div>

        {/* Current Workflow */}
        <div className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold text-red-400/70 uppercase tracking-widest mb-8 text-center">
              The Old Way (Without Tactly)
            </p>

            {/* Desktop Horizontal Layout */}
            <div className="hidden md:flex flex-col">
              <div className="flex items-center justify-center gap-3 flex-wrap max-w-6xl mx-auto">
                {oldWaySteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/25 text-base md:text-lg font-semibold text-red-400/80 whitespace-nowrap hover:border-red-500/40 transition-all backdrop-blur-sm min-w-fit">
                      {step}
                    </div>
                    {index < oldWaySteps.length - 1 && (
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-red-500/40"
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-sm text-red-400/60 mt-8 font-medium"
              >
                7 steps • Lost context • Tab switching • Slow
              </motion.p>
            </div>

            {/* Mobile/Tablet Vertical Layout */}
            <div className="md:hidden flex flex-col">
              <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                {oldWaySteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 w-full"
                  >
                    <div className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/25 text-base font-semibold text-red-400/80 whitespace-nowrap hover:border-red-500/40 transition-all backdrop-blur-sm w-full text-center">
                      {step}
                    </div>
                    {index < oldWaySteps.length - 1 && (
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-red-500/40"
                      >
                        <ArrowDown size={18} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-sm text-red-400/60 mt-8 font-medium"
              >
                7 steps • Lost context • Tab switching • Slow
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20 md:mb-32"
        />

        {/* Tactly Workflow */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest mb-8 text-center">
              The Better Way (With Tactly)
            </p>

            {/* Desktop Horizontal Layout */}
            <div className="hidden md:flex flex-col">
              <div className="flex items-center justify-center gap-3 max-w-3xl mx-auto">
                {newWaySteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="px-8 py-4 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 text-lg font-semibold text-cyan-400 whitespace-nowrap hover:border-cyan-500/50 transition-all backdrop-blur-sm min-w-fit">
                      {step}
                    </div>
                    {index < newWaySteps.length - 1 && (
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-cyan-500/40"
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-center text-sm text-cyan-400/70 mt-8 font-medium"
              >
                3 steps • Full context • No switching • Instant
              </motion.p>
            </div>

            {/* Mobile/Tablet Vertical Layout */}
            <div className="md:hidden flex flex-col">
              <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                {newWaySteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 w-full"
                  >
                    <div className="px-8 py-4 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 text-base font-semibold text-cyan-400 whitespace-nowrap hover:border-cyan-500/50 transition-all backdrop-blur-sm w-full text-center">
                      {step}
                    </div>
                    {index < newWaySteps.length - 1 && (
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-cyan-500/40"
                      >
                        <ArrowDown size={20} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-center text-sm text-cyan-400/70 mt-8 font-medium"
              >
                3 steps • Full context • No switching • Instant
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
