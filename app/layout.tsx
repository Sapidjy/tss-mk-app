import { Toaster } from "@/src/components/ui/sonner";
import { cn } from "cn";
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
  title: {
    default: "Team Sans Stress | Micro Crédit",
    template: "%s | TSS-MK",
  },
  description: "Plateforme de gestion du microcrédit de Team Sans Stress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          "h-full",
          "bg-slate-50",
          "dark:bg-slate-950",
          "dark:text-slate-50",
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
