import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Tactly privacy policy. Learn how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy",
    description: "Tactly privacy policy - how we protect your data",
    type: "website",
  },
};

export default function PrivacyPage() {
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Privacy</span>
                <br />
                <span className="text-cyan-400">Policy</span>
              </h1>
              <p className="text-lg text-foreground/70">
                Last updated: June 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
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

          <div className="max-w-3xl mx-auto w-full relative z-10 prose prose-invert max-w-none">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  At Tactly, we believe privacy is a fundamental right. This Privacy Policy explains how we collect, use, and protect your information when you use our website, extension, and services.
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-foreground/70">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Email Addresses
                    </h3>
                    <p className="leading-relaxed">
                      When you sign up for our waitlist or create an account, we collect your email address to communicate with you about Tactly and product updates.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Usage Data
                    </h3>
                    <p className="leading-relaxed">
                      We collect information about how you interact with our website and extension, including pages visited, features used, and time spent. This helps us improve the product.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Messages & Context
                    </h3>
                    <p className="leading-relaxed">
                      When you use Tactly to improve a message, we may temporarily process that message to provide suggestions. We do not permanently store your messages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Device Information
                    </h3>
                    <p className="leading-relaxed">
                      We collect basic device information like browser type, operating system, and IP address to understand how people access Tactly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  2. How We Use Your Information
                </h2>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Provide services:</strong> To operate and improve Tactly</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Communicate:</strong> To send updates, announcements, and respond to your inquiries</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Analyze:</strong> To understand usage patterns and improve features</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Secure:</strong> To protect against fraud and malicious activity</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  3. Data Security
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  We take data security seriously. Your information is protected using industry-standard encryption and security practices. We follow HTTPS, secure storage, and regular security audits.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  However, no system is perfectly secure. We encourage you to use strong passwords and notify us immediately if you suspect unauthorized access.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  4. Third-Party Services
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  We use third-party services for analytics, hosting, and infrastructure. These services have their own privacy policies. We do not share your personal information with third parties for marketing purposes.
                </p>
              </div>

              {/* Section 5 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  5. Cookies & Analytics
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  We use cookies and similar tracking technologies to improve your experience and understand how people use Tactly. You can control cookies through your browser settings.
                </p>
              </div>

              {/* Section 6 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  6. Your Rights
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>Access your personal information</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>Request deletion of your data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>Opt out of communications</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>Request correction of inaccurate data</span>
                  </li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  7. Contact Us
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-6 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-foreground font-medium">
                    Email: <a href="mailto:usetactly.ai@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">usetactly.ai@gmail.com</a>
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  8. Changes to This Policy
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the website. Your continued use of Tactly after changes constitutes your acceptance of the updated policy.
                </p>
              </div>

              {/* Footer Note */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-foreground/50">
                  This Privacy Policy is a living document. We take your privacy seriously and are committed to transparency. If you have suggestions for improvements, please let us know.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
