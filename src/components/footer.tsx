"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const navigationLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Vision", href: "#vision" },
  { label: "FAQ", href: "#faq" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-white/2 to-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Left section - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-foreground">Tactly</span>
            </div>
            <p className="text-sm text-foreground/70 font-medium leading-relaxed max-w-xs">
              Helping people communicate, not just write
            </p>
          </motion.div>

          {/* Center section - Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-cyan-400 transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right section - Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-cyan-400 transition-colors duration-200 font-medium flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"
        />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-foreground/50 font-medium">
            © 2026 Tactly. All rights reserved.
          </p>
          <p className="text-xs text-foreground/60 font-medium">
            Built for modern communication
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/tactlyai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-cyan-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s-1.5 7.5-7 10" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/tactly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-cyan-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
