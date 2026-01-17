'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative bg-slate-50">
      <Header />
      <Hero />
      <FAQ />
      <Footer />
    </div>
  );
}