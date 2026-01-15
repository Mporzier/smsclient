'use client';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Logo / Home Link */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-2xl">📱</span>
          <span className="font-bold text-xl tracking-tight text-slate-900">SMS Client</span>
        </div>

        {/* Temporary Navigation Placeholder */}
        <nav className="hidden md:flex items-center gap-8">
          <span className="text-sm font-medium text-gray-400 cursor-not-allowed">Fonctionnalités</span>
          <span className="text-sm font-medium text-gray-400 cursor-not-allowed">Tarifs</span>
        </nav>

        {/* Simple CTA */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Connexion
          </button>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all">
            Testez gratuitement
          </button>
        </div>

      </div>
    </header>
  );
}