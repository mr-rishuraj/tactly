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
    <section className="h-screen pt-24 md:pt-28 px-4 md:px-6 lg:px-8 flex items-center relative overflow-hidden">
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
            className="flex flex-col sm:flex-row gap-4 justify-center mb-0"
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

      </motion.div>
    </section>
  );
}
