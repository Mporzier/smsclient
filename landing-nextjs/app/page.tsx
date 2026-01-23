"use client";

import Hero from "./components/Hero";
import FAQ from "./components/FAQ";
import CampaignSimulator from "./components/CampaignSimulator";
import Features from "./components/Features";
import AISMSModule from "./components/AISMSModule";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative bg-slate-50">
      <Hero />
      <Features />
      <AISMSModule />
      <CampaignSimulator />
      <FAQ />
    </div>
  );
}
