'use client';

import HeroAnimation from './HeroAnimation';

export default function Hero() {
  return (
    /* MODIFICATIONS:
       1. max-w-[1440px]: Expanded container for a more cinematic feel.
       2. lg:grid-cols-12: Switched to 12-column system to allow custom 60/40 split.
       3. lg:col-span-7: Assigned 7/12 (approx 60%) to text.
       4. lg:col-span-5: Assigned 5/12 (approx 40%) to animation.
       5. lg:text-left/lg:items-start: Reverted centering on desktop for visual balance.
    */
    <section className="py-20 w-full min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

        {/* Left Side: Text Content (Occupies 7 of 12 columns = ~60%) */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-[1.15]">
            Des SMS vus par
            <br className="sm:hidden" />
            <span className="hidden sm:inline">&nbsp;</span>
            vos clients, en
            <br />
            <span className="relative inline-block px-2 mt-2 lg:mt-0">
              <div className="absolute inset-0 bg-slate-900 rounded-md h-[120%] top-[5%]" />
              <span className="relative text-slate-50">quelques secondes.</span>
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            Générez automatiquement des campagnes sans rédiger.
            <br />
            Importez vos contacts, on s&apos;occupe du reste.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mx-auto">
            {/* Primary Action: High-End Indigo */}
            <button className="cursor-pointer group relative px-8 py-4 bg-fuchsia-900 text-white rounded-lg font-semibold text-xl tracking-tight shadow-[0_10px_20px_-10px_rgba(112,26,117,0.5)] hover:bg-fuchsia-800 hover:shadow-[0_15px_25px_-10px_rgba(112,26,117,0.6)] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto border border-fuchsia-700/30">
              <span className="flex items-center justify-center gap-2">
                Essayer gratuitement
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            {/* Secondary Action: Sophisticated Ghost Button */}
            <button className="cursor-pointer px-8 py-4 bg-transparent text-slate-700 border-2 border-slate-300 rounded-lg font-semibold text-xl hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all duration-300 w-full sm:w-auto">
              Rejoindre la liste d&apos;attente
            </button>
          </div>
        </div >

        {/* Right Side: Media / Animation (Occupies 5 of 12 columns = ~40%) */}
        <div className="lg:col-span-5 flex items-center justify-center w-full lg:justify-end">
          <div className="w-full max-w-[450px]">
            <HeroAnimation />
          </div>
        </div>

      </div >
    </section >
  );
}