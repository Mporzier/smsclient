'use client';

import Logo from './Logo';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Logo / Home Link */}
        <div
          className="flex items-center gap-2 cursor-pointer scale-75"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <span className="font-extrabold text-4xl text-fuchsia-900 ml-2">
            SMS Client
          </span>
        </div>

        {/* Simple CTA */}
        <div className="scale-60">
          <button className="group relative px-8 py-4 bg-fuchsia-900 text-white rounded-lg font-semibold text-xl tracking-tight shadow-[0_10px_20px_-10px_rgba(112,26,117,0.5)] hover:bg-fuchsia-800 hover:shadow-[0_15px_25px_-10px_rgba(112,26,117,0.6)] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto border border-fuchsia-700/30">
            <span className="flex items-center justify-center gap-2">
              Découvrir l&apos;outil
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}