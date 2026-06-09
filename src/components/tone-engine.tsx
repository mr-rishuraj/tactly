"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

const tones = [
  {
    name: "Founder",
    description: "Bold, visionary, confident",
    message:
      "We should shift our focus to AI. There's massive market opportunity here. Let's build something that scales.",
  },
  {
    name: "Student",
    description: "Curious, enthusiastic, learning",
    message:
      "I'm really interested in AI! I've been learning about it and I think it could help us. Can we explore this together?",
  },
  {
    name: "Creator",
    description: "Authentic, engaging, personal",
    message:
      "Been thinking about AI a lot lately (it's everywhere, right?). I feel like this could be the move for us. What do you think?",
  },
  {
    name: "Professional",
    description: "Polished, direct, measured",
    message:
      "I'd like to propose we consider AI integration for our upcoming projects. I believe this aligns with our strategic goals.",
  },
  {
    name: "Casual",
    description: "Friendly, conversational, relaxed",
    message: "Hey, so AI is kinda taking over everything haha. Should we maybe jump on this? Could be fun!",
  },
];

export function ToneEngine() {
  const [selectedTone, setSelectedTone] = useState(0);

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
            <span className="text-foreground">Adapt your tone</span>
            <br />
            <span className="text-cyan-400">Instantly</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            One message. Five personalities. Switch based on the moment and the person.
          </p>
        </motion.div>

        {/* Tone Selector Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-16 md:mb-20">
          {tones.map((tone, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedTone(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                selectedTone === index
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground border border-white/15 hover:border-white/25"
              }`}
            >
              {tone.name}
            </motion.button>
          ))}
        </div>

        {/* Message Display */}
        <motion.div
          key={selectedTone}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/3 p-8 md:p-10 backdrop-blur-sm hover:border-white/25 transition-all">
            <p className="text-xs md:text-sm font-bold text-foreground/50 uppercase tracking-widest mb-6">
              {tones[selectedTone].name} Tone
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 mb-8 font-medium">
              "{tones[selectedTone].message}"
            </p>
            <p className="text-sm text-foreground/60 italic">
              {tones[selectedTone].description}
            </p>
          </div>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-center text-sm text-foreground/50 mt-8 font-medium"
          >
            <Sparkles size={16} />
            <p>Same message. Different approach. All authentic.</p>
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/3 p-8 backdrop-blur-sm hover:border-white/25 transition-all"
          >
            <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-6">
              Available Today
            </p>
            <ul className="space-y-3">
              {["Founder", "Student", "Creator", "Professional", "Casual"].map((persona) => (
                <li key={persona} className="flex items-center gap-3 text-sm text-foreground/70">
                  <Check size={16} className="text-cyan-400 flex-shrink-0" />
                  <span>{persona}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 backdrop-blur-sm hover:border-cyan-500/50 transition-all"
          >
            <p className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest mb-6">
              Coming Soon
            </p>
            <p className="text-sm text-foreground/80 mb-4">
              Custom personal tone based on your writing
            </p>
            <p className="text-xs text-cyan-400/70 font-medium">
              Train it on your own messages
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
