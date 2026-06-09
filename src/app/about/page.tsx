import type { Metadata } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Tactly",
  description: "Learn about Tactly's mission to help people communicate more effectively across languages and cultures.",
  openGraph: {
    title: "About Tactly",
    description: "We're building communication intelligence for the internet.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:py-40 px-4 md:px-6 lg:px-8 overflow-hidden border-b border-white/5">
          {/* Background grid */}
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

          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[600px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

          <div className="max-w-4xl mx-auto w-full relative z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-foreground">About</span>
                <br />
                <span className="text-cyan-400">Tactly</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-8">
                Most tools help you write. We're building tools that help people communicate.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden border-b border-white/5">
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

          <div className="max-w-4xl mx-auto w-full relative z-10">
            <div className="space-y-8 md:space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  The Problem
                </h2>
                <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                  <p>
                    People are ignored. Not because they can't write. But because their messages lack context, personalization, and genuine connection.
                  </p>
                  <p>
                    A cold email with perfect grammar still gets ignored. A DM that sounds like a bot gets deleted. An outreach message without personalization gets marked as spam.
                  </p>
                  <p>
                    Traditional tools fix grammar, spell-check, and suggest words. But they miss the real problem: <span className="text-cyan-400 font-semibold">nobody cares about grammatically perfect messages</span>.
                  </p>
                  <p>
                    People care about feeling understood. About genuine connection. About messages that make them feel like they matter.
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Our Mission
                </h2>
                <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                  <p>
                    We're building <span className="text-cyan-400 font-semibold">communication intelligence</span>. AI that understands context, audience, and intent.
                  </p>
                  <p>
                    Not to write for you. But to help you communicate better. To make your authentic voice clearer, more impactful, and more human.
                  </p>
                  <p>
                    Whether you're pitching investors, reaching out to mentors, collaborating with your team, or connecting with audiences. Tactly helps you say exactly what you mean.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Tactly Section */}
        <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden border-b border-white/5">
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

          <div className="max-w-4xl mx-auto w-full relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
              Why Tactly Exists
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-cyan-400">Communication matters</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Your success depends on being understood. Getting replies. Building relationships. Not on perfect punctuation.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-cyan-400">Context matters</h3>
                <p className="text-foreground/70 leading-relaxed">
                  The same message to a CEO sounds different than to a friend. Different languages require different approaches. We understand that.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-cyan-400">Your voice matters</h3>
                <p className="text-foreground/70 leading-relaxed">
                  We're not here to replace your voice. We're here to amplify it. To help you sound more like yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
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

          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[600px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

          <div className="max-w-4xl mx-auto w-full relative z-10">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                Our Vision
              </h2>
              <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-12">
                A future where AI helps billions of people communicate more effectively, across cultures, languages, and platforms.
              </p>
              <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                Where language is no barrier. Where your authentic voice is always heard. Where connection happens naturally, without friction.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Link
                href="/#waitlist"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
              >
                Join Us
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
