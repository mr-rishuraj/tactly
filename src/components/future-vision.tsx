"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Palette, Users, BookOpen, Network, Briefcase, Rocket } from "lucide-react";

const roadmapItems = [
  {
    phase: "Now",
    description: "Communication engine live",
    features: [
      { title: "Rewrites", icon: Sparkles },
      { title: "Autocomplete", icon: Zap },
      { title: "Tone Engine", icon: Palette },
    ],
  },
  {
    phase: "Next",
    description: "Intelligence at scale",
    features: [
      { title: "Networking Intelligence", icon: Users },
      { title: "Communication Coaching", icon: BookOpen },
      { title: "Relationship Mapping", icon: Network },
    ],
  },
  {
    phase: "Future",
    description: "Communication OS",
    features: [
      { title: "Sales Intelligence", icon: Briefcase },
      { title: "Recruiting Suite", icon: Users },
      { title: "Fundraising Assistant", icon: Rocket },
    ],
  },
];

export function FutureVision() {
  return (
    <section
      id="vision"
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

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Building the communication layer</span>
            <br />
            <span className="text-cyan-400">for the internet</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            We're building infrastructure that powers better human connection at scale.
          </p>
        </motion.div>

        {/* Roadmap Grid */}
        <div className="max-w-6xl mx-auto mb-24 md:mb-32">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                {/* Card */}
                <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/3 p-8 backdrop-blur-sm hover:border-cyan-500/50 transition-all h-full flex flex-col">
                  {/* Phase Header */}
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40">
                          <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{item.phase}</h3>
                    </div>
                    <p className="text-sm text-foreground/60 font-medium">{item.description}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent mb-8" />

                  {/* Features */}
                  <div className="space-y-4 flex-grow">
                    {item.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15 + featureIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <feature.icon size={20} className="text-cyan-400 flex-shrink-0" />
                        <span className="text-foreground/80 font-medium">{feature.title}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer accent */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="text-xs text-foreground/40 font-medium uppercase tracking-wider">
                      {index === 0 && "Available now"}
                      {index === 1 && "In development"}
                      {index === 2 && "Coming soon"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-8 md:p-12 text-center max-w-3xl mx-auto backdrop-blur-sm"
        >
          <p className="text-lg md:text-xl text-foreground/80 mb-6 font-medium">
            We're not building another AI tool.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-cyan-400 mb-8">
            We're building the operating system for human connection.
          </p>
          <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Imagine a world where every person can communicate with confidence, clarity, and authenticity. Where your words always land the way you intend. That's the future we're building.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
