"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useContact } from "@/contexts/contact-context";

const faqs = [
  {
    question: "Why not just use ChatGPT?",
    answer:
      "ChatGPT requires opening a new tab, copying your message, waiting for a response, then copying it back. You lose context with every switch. Tactly works where you already are. Gmail, LinkedIn, Slack, everywhere. No friction, no context loss.",
  },
  {
    question: "Why not Grammarly?",
    answer:
      "Grammarly fixes grammar and spelling. Tactly helps you achieve your communication goals. Grammarly tells you if a sentence is correct. Tactly helps you get a reply, land an internship, or build a relationship. Different tools, different missions.",
  },
  {
    question: "How is Tactly different from Compose AI?",
    answer:
      "Compose AI generates text. Tactly understands context. Who you're talking to, what platform you're on, what outcome you want. We're building communication intelligence, not just autocompletion.",
  },
  {
    question: "How does tone cloning work?",
    answer:
      "You upload examples of your writing. Our AI learns your vocabulary, sentence structure, formality level, and personality. When you use Tactly, it maintains your authentic voice while improving clarity and impact.",
  },
  {
    question: "How does Hinglish support work?",
    answer:
      "We trained our models on millions of Hinglish messages. Instead of converting Hinglish to English first, we understand it natively. Your mixed-language communication gets the same intelligence and personalization as English-only messages.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "Tactly works as a browser extension on any text field. Gmail, LinkedIn, Twitter/X, Slack, Discord, WhatsApp Web, and more. We're also building native mobile apps.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. We don't store your messages. Everything is processed instantly and deleted. We follow enterprise-grade security standards. Your privacy is non-negotiable.",
  },
  {
    question: "How much will it cost?",
    answer:
      "We're working on pricing. We're considering a freemium model with generous free limits, plus premium tiers for power users and teams. We'll announce pricing when we launch.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openModal } = useContact();

  return (
    <section
      id="faq"
      className="relative py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5"
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
          className="text-center mb-24 md:mb-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Frequently asked</span>
            <br />
            <span className="text-cyan-400">questions</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Everything you need to know about Tactly
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/3 hover:border-white/25 transition-all overflow-hidden backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between hover:bg-white/3 transition-colors"
              >
                <h3 className="text-left font-semibold text-foreground text-base md:text-lg">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-6"
                >
                  <ChevronDown size={20} className="text-foreground/50" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 bg-white/3 px-6 md:px-8 py-6"
                  >
                    <p className="text-foreground/75 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-foreground/70 mb-4 font-medium">
            Didn't find what you're looking for?
          </p>
          <button
            onClick={openModal}
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold cursor-pointer"
          >
            Contact us →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
