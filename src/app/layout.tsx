import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Oxanium } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SystemMetricsPoller } from "./(utils)/systemMetricsPoller";

const oxaniumHeading = Oxanium({subsets:['latin'],variable:'--font-heading'});

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Operation: OVERTHINK!',
    default: "Operation: OVERTHINK!",
  },
  description: "A code-cracking project created by Kyle Snelgrove",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("bg-black h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable, oxaniumHeading.variable)}
    >
      <body className="min-h-full flex w-full h-full items-center justify-center bg-black">
        <SystemMetricsPoller />
          {children}
      </body>
    </html>
  );
}
