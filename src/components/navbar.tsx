"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useWaitlist } from "@/contexts/waitlist-context";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Vision", href: "#vision" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAboutOrPrivacy = pathname === "/about" || pathname === "/privacy";
  const { openModal } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-background/50 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
        {/* Logo - Home Button */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-all duration-300 active:scale-95"
        >
          {/* Icon */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg opacity-90 group-hover:opacity-100 transition-opacity shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 group-hover:shadow-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg font-space-grotesk">T</span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-foreground group-hover:text-cyan-400 transition-colors duration-200 leading-tight">
              Tactly
            </span>
            <span className="text-xs text-foreground/50 group-hover:text-cyan-400/70 transition-colors duration-200 leading-tight">
              AI for Communication
            </span>
          </div>
        </Link>

        {/* Desktop Menu - Hidden on About/Privacy pages */}
        {!isAboutOrPrivacy && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-cyan-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          {!isAboutOrPrivacy && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="hidden sm:inline-flex px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              Waitlist
            </motion.button>
          )}

          {/* Home Button on About/Privacy pages */}
          {isAboutOrPrivacy && (
            <Link
              href="/"
              className="hidden md:inline-flex text-sm font-medium text-foreground/70 hover:text-cyan-400 transition-colors duration-200 px-3 py-2"
            >
              ← Home
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-md"
        >
          <div className="px-4 md:px-6 py-4 space-y-3">
            {!isAboutOrPrivacy ? (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-foreground/70 hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    openModal();
                    setIsOpen(false);
                  }}
                  className="w-full mt-4 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold transition-all"
                >
                  Join Waitlist
                </motion.button>
              </>
            ) : (
              <Link
                href="/"
                className="block text-sm font-medium text-foreground/70 hover:text-cyan-400 transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                ← Back to Home
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
