"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-neutral-950 text-gray-400 pt-10 sm:pt-12 lg:pt-14 pb-4 sm:pb-5 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10">
          {/* Ligne 1 : Newsletter et Liens sur la même ligne, alignés au même bord gauche */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-8 pb-6 mb-8">
            <div className="max-w-md flex-shrink-0">
              <h4 className="text-base font-semibold text-gray-200 mb-1.5">
                Newsletter
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Recevez nos conseils marketing et nos dernières actualités
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="flex h-10 flex-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-fuchsia-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                >
                  S&apos;inscrire
                </button>
              </form>
            </div>

            <nav className="flex items-start gap-x-6 gap-y-2 flex-wrap text-sm font-medium lg:ml-8">
              <Link
                href="/blog"
                className="transition-colors duration-200 hover:text-white text-fuchsia-400/90"
              >
                Blog
              </Link>
              <Link
                href="/mentions-legales"
                className="transition-colors duration-200 hover:text-white"
              >
                Mentions légales
              </Link>
              <Link
                href="/cgv"
                className="transition-colors duration-200 hover:text-white"
              >
                CGV
              </Link>
              <Link
                href="/confidentialite"
                className="transition-colors duration-200 hover:text-white"
              >
                Confidentialité
              </Link>
            </nav>
          </div>

          {/* Ligne 2 : Brand & Badges */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 pb-6">
            <h4 className="text-base font-semibold text-gray-200 tracking-tight">
              SMS Client
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "RGPD",
                "Français",
                "Support 7j/7",
                "Sans engagement",
                "Désinscription en 1 clic",
              ].map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-xs font-medium tracking-wide bg-neutral-900 text-gray-400 border-fuchsia-900/30 whitespace-nowrap"
                >
                  <span className="text-fuchsia-600/80 font-bold text-xs">
                    ✓
                  </span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Texte de présentation */}
          <p className="max-w-3xl text-sm leading-relaxed text-gray-400 pb-6 lg:pb-8">
            La plateforme de SMS Marketing par IA qui transforme vos prospects
            en clients. Importez vos contacts, nettoyez vos listes et générez
            des campagnes SMS à fort impact. Une solution tout-en-un pour
            booster vos ventes en quelques clics.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-2 text-center">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SMS Client. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
