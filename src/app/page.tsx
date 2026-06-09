import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { WhyTactly } from "@/components/why-tactly";
import { Features } from "@/components/features";
import { HinglishShowcase } from "@/components/hinglish-showcase";
import { ToneEngine } from "@/components/tone-engine";
import { Comparison } from "@/components/comparison";
import { CommunicationIntelligence } from "@/components/communication-intelligence";
import { FutureVision } from "@/components/future-vision";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="w-full bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <WhyTactly />
        <Features />
        <HinglishShowcase />
        <ToneEngine />
        <Comparison />
        <CommunicationIntelligence />
        <FutureVision />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
