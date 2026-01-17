import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
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
        className={`${geist.variable} font-sans antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}