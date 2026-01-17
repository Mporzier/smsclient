export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#0a0a0a] text-[#9ca3af] py-10 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-white/5"
    >
      {/* Container aligned with your site's max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-8 border-b border-white/10">

          {/* Brand & Badges */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <h4 className="text-[#d1d5db] text-lg font-bold tracking-tight">SMS Client</h4>

            <div className="flex flex-wrap gap-2">
              {[
                "RGPD",
                "Français",
                "Support 7j/7",
                "Sans engagement",
                "Désinscription en 1 clic"
              ].map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border
                 text-[11px] font-medium tracking-wide
                 bg-[#121212] text-[#9ca3af] 
                 border-fuchsia-900/30 whitespace-nowrap"
                >
                  <span className="text-fuchsia-600/80 font-bold text-[10px]">✓</span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Inline Links */}
          <nav className="flex gap-6 flex-wrap text-sm">
            <a href="#mentions-legales" className="transition-colors duration-200 hover:text-white">Mentions légales</a>
            <a href="#cgv" className="transition-colors duration-200 hover:text-white">CGV</a>
            <a href="#confidentialite" className="transition-colors duration-200 hover:text-white">Confidentialité</a>
          </nav>

        </div>

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-[#6b7280] text-xs">
            &copy; {new Date().getFullYear()} SMS Client. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}