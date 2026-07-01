"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DURATIONS,
  DELAYS,
  TRANSITIONS,
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
  TEXT_VARIANTS,
  BACKGROUND_ANIMATIONS,
} from "@/lib/motion";

export function Hero() {
  const { user } = useAuth();
  const router = useRouter();

  const containerVariants = CONTAINER_VARIANTS.delayedStagger(DELAYS.small, DELAYS.small);
  const itemVariants = ITEM_VARIANTS.slideScaleIn;
  const textVariants = TEXT_VARIANTS.characterAnimate(DELAYS.small);

  return (
    <section className="min-h-[85vh] pt-24 md:pt-28 px-4 md:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
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
          delay: DELAYS.tiny,
        }}
      />

      <motion.div
        className="max-w-4xl mx-auto w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          variants={itemVariants}
        >
          <h1 className="mb-4 md:mb-6">
            <motion.span
              className="block text-foreground"
              custom={0}
              variants={textVariants}
            >
              AI-Powered Writing
            </motion.span>
            <motion.span
              className="block text-cyan-400"
              custom={1}
              variants={textVariants}
            >
              For Every Conversation
            </motion.span>
          </h1>

          <motion.p
            className="text-base md:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Write with confidence and authenticity across LinkedIn, Gmail, X, Slack, Discord, and everywhere you communicate.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {user ? (
              <Link href="/dashboard">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 md:px-10 md:py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-base md:text-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 whitespace-nowrap inline-block"
                >
                  Go to Dashboard
                </motion.div>
              </Link>
            ) : (
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/signup")}
                className="px-8 py-3 md:px-10 md:py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-base md:text-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 whitespace-nowrap"
              >
                Get Started Free
              </motion.button>
            )}
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
