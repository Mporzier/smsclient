import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap', // Ensures text remains visible during font load
});

export const metadata: Metadata = {
  title: "SMS Client - La solution de marketing par SMS",
  description: "Des SMS vus par vos clients, en quelques secondes. Générez automatiquement des campagnes, sans même avoir à rédiger.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SMS Client",
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}