import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/contexts/waitlist-context";
import { WaitlistModalContainer } from "@/components/waitlist-modal-container";
import { ContactProvider } from "@/contexts/contact-context";
import { ContactModalContainer } from "@/components/contact-modal-container";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tactly-ai.vercel.app"),
  title: "Tactly - Communication Intelligence for the Internet",
  description: "Write with tact. Everywhere. The AI communication copilot that helps you say the right thing across LinkedIn, Gmail, X, Slack, Discord, and more.",
  keywords: ["AI", "Communication", "Writing", "Copilot", "Tone", "Personalization"],
  robots: "index, follow",
  openGraph: {
    title: "Tactly - Communication Intelligence for the Internet",
    description: "Write with tact. Everywhere. The AI communication copilot that helps you say the right thing across LinkedIn, Gmail, X, Slack, Discord, and more.",
    url: "https://tactly-ai.vercel.app",
    siteName: "Tactly",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tactly-ai.vercel.app/OG.png",
        width: 1200,
        height: 630,
        alt: "Tactly - Communication Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tactly - Communication Intelligence for the Internet",
    description: "Write with tact. Everywhere. The AI communication copilot that helps you say the right thing across LinkedIn, Gmail, X, Slack, Discord, and more.",
    creator: "@usetactly",
  },
  other: {
    "twitter:image": "https://tactly-ai.vercel.app/OG.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          async
          src="https://plausible.io/js/pa-hItDaXkMZZ_kwj-YXq5l8.js"
          strategy="afterInteractive"
        />
        <Script
          id="plausible-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <WaitlistProvider>
          <ContactProvider>
            {children}
            <WaitlistModalContainer />
            <ContactModalContainer />
          </ContactProvider>
        </WaitlistProvider>
      </body>
    </html>
  );
}
