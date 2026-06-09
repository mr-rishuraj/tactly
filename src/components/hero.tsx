"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useWaitlist } from "@/contexts/waitlist-context";

export function Hero() {
  const { openModal } = useWaitlist();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
      },
    }),
  };

  return (
    <section className="min-h-screen pt-32 pb-16 px-4 md:px-6 lg:px-8 flex items-center relative overflow-hidden">
      {/* Animated Background grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </motion.div>

      {/* Animated Radial gradient backgrounds */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <h1 className="mb-6 md:mb-8">
            <motion.span
              className="block text-foreground"
              custom={0}
              variants={textVariants}
            >
              Say the right thing
            </motion.span>
            <motion.span
              className="block text-cyan-400"
              custom={1}
              variants={textVariants}
            >
              Every time.
            </motion.span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-foreground/70 mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Write with confidence across LinkedIn, Gmail, X, Slack, Discord, and anywhere else you communicate on the internet.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={openModal}
              className="px-8 py-4 md:px-12 md:py-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg md:text-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 whitespace-nowrap"
            >
              Join Waitlist
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Transformation Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
            <span className="text-foreground">Communicating with intelligence</span>
            <br />
            <span className="text-foreground">vs. communicating blind</span>
          </h2>

          {/* Main Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-stretch">
            {/* WITHOUT TACTLY CARD */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-md border border-red-500/30 rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Header */}
                <div className="px-6 md:px-8 pt-6 md:pt-8">
                  <p className="text-xs md:text-sm font-bold text-red-400/70 uppercase tracking-widest mb-4">Without Tactly</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground/90 mb-6 leading-tight">
                    "Hey! I love what you're doing. Your product seems really innovative. Would be great to connect and learn from you."
                  </p>
                </div>

                {/* Weakness Chips */}
                <div className="px-6 md:px-8 py-4 flex-1 flex flex-col gap-3">
                  <ChipBadge text="Uninformed" color="red" />
                  <ChipBadge text="Generic" color="red" />
                  <ChipBadge text="Unclear Intent" color="red" />
                </div>

                {/* Footer with metrics */}
                <div className="px-6 md:px-8 py-6 border-t border-red-500/20 bg-red-950/20">
                  <div className="text-center">
                    <p className="text-xs text-red-400/60 font-medium mb-2 uppercase tracking-wider">Reply Rate</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-red-400">23%</span>
                      <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-2xl text-red-500"
                      >
                        ↓
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TRANSFORMATION BEAM */}
            <motion.div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
              <TransformationBeam />
            </motion.div>

            {/* WITH TACTLY CARD */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-cyan-950/40 to-blue-900/20 backdrop-blur-md border border-cyan-500/40 rounded-2xl overflow-hidden h-full flex flex-col md:col-start-2">
                {/* Header */}
                <div className="px-6 md:px-8 pt-6 md:pt-8">
                  <p className="text-xs md:text-sm font-bold text-cyan-400/70 uppercase tracking-widest mb-4">With Tactly</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground/95 mb-6 leading-tight">
                    "Hey Rishu, been following how you think about communication tools. The way you approach this is interesting. I'm working on something related and would love your take on it. I think you'd have a really useful perspective on what we're building."
                  </p>
                </div>

                {/* Strength Chips */}
                <div className="px-6 md:px-8 py-4 flex-1 flex flex-col gap-3">
                  <ChipBadge text="Intelligence-Driven" color="green" />
                  <ChipBadge text="Strategically Aligned" color="green" />
                  <ChipBadge text="Clear Value" color="green" />
                </div>

                {/* Footer with metrics */}
                <div className="px-6 md:px-8 py-6 border-t border-cyan-500/20 bg-cyan-950/20">
                  <div className="text-center">
                    <p className="text-xs text-cyan-400/60 font-medium mb-2 uppercase tracking-wider">Reply Rate</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-green-400">87%</span>
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-2xl text-green-500"
                      >
                        ↑
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Chip Badge Component
function ChipBadge({ text, color }: { text: string; color: "red" | "green" }) {
  const baseClass = "px-3 py-2 rounded-lg text-sm font-semibold border transition-all duration-300";
  const colorMap = {
    red: "bg-red-500/15 text-red-400 border-red-500/25 hover:border-red-500/40 hover:bg-red-500/20",
    green: "bg-green-500/15 text-green-400 border-green-500/25 hover:border-green-500/40 hover:bg-green-500/20",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, x: 4 }}
      className={`${baseClass} ${colorMap[color]} cursor-default inline-block w-fit`}
    >
      {text}
    </motion.div>
  );
}

// Transformation Beam Component
function TransformationBeam() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Outer pulsing glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-red-500 via-cyan-400 to-green-500 rounded-full blur-2xl opacity-40"
      />

      {/* Central gradient beam */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="relative z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="innerBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#52ff00" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle cx="60" cy="60" r="50" fill="none" stroke="url(#beam)" strokeWidth="2" />

        {/* Inner circle */}
        <circle cx="60" cy="60" r="35" fill="none" stroke="url(#innerBeam)" strokeWidth="1.5" opacity="0.6" />

        {/* Animated dots */}
        <g>
          <motion.circle
            cx="60"
            cy="10"
            r="3"
            fill="#06b6d4"
            animate={{ cx: [60, 110, 60, 10, 60] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </g>
      </motion.svg>

      {/* Particle system */}
      <ParticleFlow />

      {/* Center spark */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute w-4 h-4 bg-gradient-to-br from-cyan-400 to-green-400 rounded-full"
      />
    </div>
  );
}

// Particle Flow Component
function ParticleFlow() {
  const particles = Array.from({ length: 5 });

  return (
    <div className="absolute inset-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 30, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-sm"
        />
      ))}
    </div>
  );
}
