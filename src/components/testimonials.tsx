"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  DURATIONS,
  DELAYS,
  TRANSITIONS,
  VIEWPORT_SETTINGS,
  HOVER_VARIANTS,
  BACKGROUND_ANIMATIONS,
} from "@/lib/motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechFlow",
    avatar: "SC",
    quote:
      "We were spending hours rewriting cold outreach emails. With Tactly, we got 3x more responses without changing anything but our communication.",
  },
  {
    name: "Rahul Sharma",
    role: "Student, BITS Pilani",
    avatar: "RS",
    quote:
      "As someone applying to internships, Tactly helped me sound more professional without losing my personality. Landed 5 internship offers.",
  },
  {
    name: "Maya Patel",
    role: "Creator, 50k followers",
    avatar: "MP",
    quote:
      "The Hinglish support is incredible. I can write naturally and Tactly transforms it into something that resonates with different audiences.",
  },
  {
    name: "Vikram Singh",
    role: "Sales Lead, B2B SaaS",
    avatar: "VS",
    quote:
      "Reply probability scores changed how we approach outreach. We're now tracking which messaging patterns actually work.",
  },
];

export function Testimonials() {
  // Duplicate testimonials for seamless marquee loop
  const marqueeTestimonials = [...testimonials, ...testimonials];

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
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: DURATIONS.slow, ease: "easeOut" }}
          viewport={VIEWPORT_SETTINGS.standard}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATIONS.normal, delay: DELAYS.tiny }}
            viewport={VIEWPORT_SETTINGS.standard}
          >
            <motion.div
              {...BACKGROUND_ANIMATIONS.rotate}
            >
              <Sparkles size={16} className="text-cyan-400/70" />
            </motion.div>
            <p className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest">
              Testimonials
            </p>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATIONS.slow, delay: DELAYS.small }}
            viewport={VIEWPORT_SETTINGS.standard}
          >
            <motion.span
              className="block text-foreground"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: DURATIONS.normal, delay: DELAYS.medium }}
              viewport={VIEWPORT_SETTINGS.standard}
            >
              People are transforming
            </motion.span>
            <motion.span
              className="block text-cyan-400"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: DURATIONS.normal, delay: DELAYS.medium + DELAYS.tiny }}
              viewport={VIEWPORT_SETTINGS.standard}
            >
              their communication
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATIONS.normal, delay: DELAYS.small + DELAYS.tiny }}
            viewport={VIEWPORT_SETTINGS.standard}
          >
            From students to founders to creators. Tactly is helping people achieve real outcomes.
          </motion.p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Marquee */}
          <div className="flex gap-6 md:gap-8">
            <motion.div
              className="flex gap-6 md:gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              // Using PRESETS.marquee pattern
            >
              {marqueeTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/3 hover:border-cyan-500/40 transition-all p-6 md:p-8 backdrop-blur-sm flex-shrink-0 w-80 md:w-96 h-72 md:h-80 flex flex-col"
                  whileHover={HOVER_VARIANTS.lift}
                >
                  {/* Quote */}
                  <p className="text-foreground/85 leading-relaxed text-base mb-8 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* Divider */}
                  <div className="border-t border-white/10 mb-8" />

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-foreground/50">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: DURATIONS.normal, delay: DELAYS.small }}
          viewport={VIEWPORT_SETTINGS.standard}
          className="text-center text-sm text-foreground/50 mt-16 md:mt-20 italic"
        >
          Demo testimonials. Real user feedback coming after launch.
        </motion.p>
      </div>
    </section>
  );
}
