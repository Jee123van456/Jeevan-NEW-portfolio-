import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeevan K — AI Engineer | Agentic AI & Intelligent Systems",
  description:
    "Portfolio of Jeevan K — AI Engineer and Software Engineer building agentic AI, RAG systems, LLM applications and production-ready intelligent software.",
  keywords: [
    "Jeevan K",
    "AI Engineer",
    "Software Engineer",
    "Agentic AI",
    "LLM Applications",
    "RAG Systems",
    "Multi-Agent Systems",
    "Backend Engineering",
    "FastAPI",
    "Python AI",
  ],
  authors: [{ name: "Jeevan K" }],
  creator: "Jeevan K",
  openGraph: {
    title: "Jeevan K — AI Engineer | Agentic AI & Intelligent Systems",
    description:
      "Portfolio of Jeevan K — AI Engineer and Software Engineer building agentic AI, RAG systems, LLM applications and production-ready intelligent software.",
    url: "https://jeevank.ai",
    siteName: "Jeevan K Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeevan K — AI Engineer | Agentic AI & Intelligent Systems",
    description:
      "Portfolio of Jeevan K — AI Engineer and Software Engineer building agentic AI, RAG systems, LLM applications and production-ready intelligent software.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-[#fafafa] text-[#0d0d0e] selection:bg-[#ff5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}
