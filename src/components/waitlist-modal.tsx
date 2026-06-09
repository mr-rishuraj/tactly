"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [persona, setPersona] = useState("");
  const [useCase, setUseCase] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const personaOptions = [
    { value: "student", label: "Student" },
    { value: "founder", label: "Founder" },
    { value: "professional", label: "Professional" },
    { value: "creator", label: "Creator" },
    { value: "job_seeker", label: "Job Seeker" },
    { value: "other", label: "Other" },
  ];

  const useCaseOptions = [
    { value: "networking", label: "Networking" },
    { value: "cold_outreach", label: "Cold Outreach" },
    { value: "professional_communication", label: "Professional Communication" },
    { value: "job_search", label: "Job Search" },
    { value: "content_creation", label: "Content Creation" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          persona,
          useCase: useCase || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "already_exists") {
          setError(data.message);
        } else {
          setError(data.error || "Something went wrong");
        }
        return;
      }

      setSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      setError("Failed to join waitlist. Please try again.");
      console.error("Waitlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPersona("");
    setUseCase("");
    setSuccess(false);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 p-1 text-foreground/40 hover:text-foreground/70 transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>

                {/* Success State */}
                {success ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center"
                    >
                      <span className="text-2xl">✓</span>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      You're on the waitlist
                    </h2>
                    <p className="text-foreground/60 mb-2">
                      We'll let you know when Tactly is ready.
                    </p>
                    <p className="text-foreground/50 text-sm">
                      Thank you for helping shape the future of communication.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Join the waitlist
                      </h2>
                      <p className="text-foreground/60">
                        Be first to experience communication intelligence.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                          disabled={loading}
                        />
                      </div>

                      {/* Persona */}
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          What best describes you?
                        </label>
                        <select
                          value={persona}
                          onChange={(e) => setPersona(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                          disabled={loading}
                        >
                          <option value="">Select an option</option>
                          {personaOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Use Case */}
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          What would you primarily use Tactly for?
                        </label>
                        <select
                          value={useCase}
                          onChange={(e) => setUseCase(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                          disabled={loading}
                        >
                          <option value="">Select an option (optional)</option>
                          {useCaseOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Error */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-cyan-500/50 disabled:to-blue-500/50 text-white font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Joining...
                          </motion.span>
                        ) : (
                          "Join Waitlist"
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
