"use client";

import Hero from "./components/hero/Hero";
import FAQ from "./components/FAQ";
import CampaignSimulator from "./components/CampaignSimulator";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import TrustBar from "./components/TrustBar";
import HowItWorks from "./components/HowItWorks";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative bg-slate-50">
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Features />
      <Pricing />
      <CampaignSimulator />
      <FAQ />
    </div>
  );
}
