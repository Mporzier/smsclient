'use client';

import Logo from './Logo';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isPageScrolled, setIsPageScrolled] = useState(false);

  // Handle scroll event to set the isPageScrolled state (header is a bubble when page is scrolled)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsPageScrolled(true);
      } else {
        setIsPageScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky z-50 flex justify-center transition-all duration-500 top-1">
      <div className={`
    mx-auto rounded-2xl transition-all duration-500 ease-in-out
    border border-border backdrop-blur-lg bg-background/75
    w-full max-w-7xl
    ${isPageScrolled
          ? 'md:w-[800px] translate-y-3 shadow-lg'
          : 'translate-y-0'}`}>
        <div className="flex h-[56px] items-center justify-between p-4">
          {/* Logo / Home Link */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo />
            <span className="font-extrabold text-xl md:text-3xl text-fuchsia-900">
              SMSClient
            </span>
          </div>

          <div className="w-full hidden md:block">
            <nav className="flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Tarifs</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 font-medium">FAQ</a>
            </nav>
          </div>

          {/* Simple CTA */}
          <div className="flex-shrink-0">
            <button className="cursor-pointer group relative px-4 py-2 bg-fuchsia-900 text-white rounded-lg font-semibold text-sm md:text-base tracking-tight shadow-[0_10px_20px_-10px_rgba(112,26,117,0.5)] hover:bg-fuchsia-800 hover:shadow-[0_15px_25px_-10px_rgba(112,26,117,0.6)] active:scale-[0.98] transition-all duration-300 whitespace-nowrap border border-fuchsia-700/30">
              <span className="flex items-center justify-center gap-1.5">
                <span className="hidden sm:inline">Essayer gratuitement</span>
                <span className="sm:hidden">Essayer</span>
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}