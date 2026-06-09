"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const examples = [
  {
    start: "Bhai mujhe ye startup opportunity mil gaya, kya—",
    completion: "mujhe leap lena chahiye?",
  },
  {
    start: "Yaar startup idea mil gaya kya—",
    completion: "main bhi kuch explore kar raha tha.",
  },
  {
    start: "Arey yaar, ye feature ke liye—",
    completion: "kab tak timeline milega?",
  },
  {
    start: "Dekho, mujhe help chahiye na—",
    completion: "ye bug fix karne mein, urgent hai.",
  },
];

const features = [
  "Understands Hinglish",
  "Completes Naturally",
  "Keeps Your Voice",
];

function HinglishEditor() {
  const [currentExample, setCurrentExample] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [displayedStart, setDisplayedStart] = useState("");

  const example = examples[currentExample];

  // Type the start text
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= example.start.length) {
        setDisplayedStart(example.start.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        // Show ghost text after typing
        setTimeout(() => setShowCompletion(true), 300);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [example.start]);

  // Auto-accept after delay
  useEffect(() => {
    if (showCompletion && !isAccepted) {
      const acceptTimer = setTimeout(() => {
        setIsAccepted(true);
      }, 2000);
      return () => clearTimeout(acceptTimer);
    }
  }, [showCompletion, isAccepted]);

  // Rotate to next example
  useEffect(() => {
    const rotateTimer = setTimeout(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
      setShowCompletion(false);
      setIsAccepted(false);
      setDisplayedStart("");
    }, 5000);

    return () => clearTimeout(rotateTimer);
  }, [isAccepted]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent backdrop-blur-xl">
      {/* Premium glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-cyan-500/20 pointer-events-none" />

      {/* Editor Content */}
      <div className="relative p-8 md:p-12 lg:p-16">
        {/* Editor header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <p className="text-xs text-foreground/40 ml-2 font-mono">message.hinglish</p>
        </div>

        {/* Editor area */}
        <div className="space-y-8">
          {/* Text input area */}
          <div className="font-mono text-lg md:text-xl leading-relaxed">
            <div className="flex items-start gap-1">
              <span className="text-cyan-400/50 select-none">›</span>
              <div className="flex-1">
                {/* Displayed text with cursor */}
                <span className="text-foreground/90">
                  {displayedStart}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="text-cyan-400 font-semibold"
                  >
                    |
                  </motion.span>
                </span>

                {/* Ghost text - the autocomplete */}
                <AnimatePresence>
                  {showCompletion && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isAccepted ? 1 : 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        isAccepted ? "text-foreground/90" : "text-cyan-400/40"
                      }`}
                    >
                      {example.completion}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-4 pt-4">
            <AnimatePresence>
              {showCompletion && !isAccepted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-xl"
                  />
                  <button className="relative px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono text-sm font-medium hover:border-cyan-500/60 hover:bg-cyan-500/30 transition-all">
                    Press Tab ↹
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Accepted state */}
            <AnimatePresence>
              {isAccepted && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-cyan-400 text-sm font-medium"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    ✓
                  </motion.span>
                  <span>Accepted</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Example counter */}
        <div className="mt-8 flex gap-1 justify-center">
          {examples.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 rounded-full bg-cyan-500/30"
              animate={{
                width: currentExample === index ? 24 : 6,
                backgroundColor:
                  currentExample === index ? "rgb(34, 211, 238)" : "rgba(34, 211, 238, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HinglishShowcase() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5">
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

      {/* Radial glow - subtle blue */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[600px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block text-foreground"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
            >
              Fluent in how you
            </motion.span>
            <br />
            <motion.span
              className="block text-cyan-400"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
            >
              actually communicate
            </motion.span>
          </motion.h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Your thoughts don't switch languages. Neither should your AI.
            <br />
            Tactly understands mixed Hindi-English communication and completes your thoughts naturally.
          </p>
        </motion.div>

        {/* Interactive Editor */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="group mb-20 md:mb-28"
          whileHover={{ scale: 1.01 }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.1)",
                "0 0 40px rgba(34, 211, 238, 0.2)",
                "0 0 20px rgba(34, 211, 238, 0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <HinglishEditor />
          </motion.div>
        </motion.div>

        {/* Features pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
              }}
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-cyan-500/10 border border-cyan-500/25 hover:border-cyan-500/40 transition-all"
            >
              <span className="text-cyan-400 font-bold">✓</span>
              <span className="text-sm md:text-base text-foreground/80 font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
