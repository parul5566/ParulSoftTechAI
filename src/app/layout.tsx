import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "ParulSoftTechAI — AI-Powered Interactive Agency Showcase",
  description:
    "Experience the future of software development. ParulSoftTechAI delivers AI-powered solutions, immersive 3D experiences, and enterprise-grade engineering across Web, Mobile, AR/VR, and beyond.",
  keywords: [
    "AI agency",
    "software development",
    "machine learning",
    "AR/VR",
    "web development",
    "mobile apps",
    "cloud computing",
    "blockchain",
    "ParulSoftTechAI",
  ],
  authors: [{ name: "ParulSoftTechAI" }],
  openGraph: {
    title: "ParulSoftTechAI — Interactive Agency Showcase",
    description:
      "AI-powered solutions, immersive 3D experiences, and enterprise-grade engineering.",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
