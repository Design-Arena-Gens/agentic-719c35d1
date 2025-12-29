import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerManager from "../components/ServiceWorkerManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Jarvis Mentor Console",
  description: "Offline-first mentor assistant engineered for Ubuntu.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png"
  },
  category: "productivity"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className="bg-slate-950 text-slate-100">
    <body className={`${inter.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
      <ServiceWorkerManager />
      {children}
    </body>
  </html>
);

export default RootLayout;
