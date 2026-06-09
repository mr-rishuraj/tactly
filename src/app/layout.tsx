import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/contexts/waitlist-context";
import { WaitlistModalContainer } from "@/components/waitlist-modal-container";

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
  title: "Tactly - Communication Intelligence for the Internet",
  description: "Write with tact. Everywhere. The AI communication copilot that helps you say the right thing across LinkedIn, Gmail, X, Slack, Discord, and more.",
  keywords: ["AI", "Communication", "Writing", "Copilot", "Tone", "Personalization"],
  openGraph: {
    title: "Tactly - Communication Intelligence",
    description: "Write with tact. Everywhere.",
    url: "https://tactly.ai",
    siteName: "Tactly",
    images: [
      {
        url: "https://tactly.ai/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tactly - Communication Intelligence",
    description: "Write with tact. Everywhere.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <WaitlistProvider>
          {children}
          <WaitlistModalContainer />
        </WaitlistProvider>
      </body>
    </html>
  );
}
