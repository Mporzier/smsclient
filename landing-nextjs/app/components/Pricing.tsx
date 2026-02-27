import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const smoothTransition = {
  duration: 0.6,
  ease: [0.165, 0.84, 0.44, 1] as const,
};

const featuredButtonClass = [
  "mt-10 block rounded-lg px-3 py-3 text-center text-sm font-semibold leading-6",
  "text-slate-50 bg-gradient-to-br from-violet-300 to-rose-300",
  "shadow-lg shadow-violet-300/30 transition-all duration-500 hover:opacity-90",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-800",
].join(" ");

const defaultButtonClass = [
  "mt-10 block rounded-lg bg-slate-200 px-3 py-3 text-center text-sm font-semibold leading-6",
  "text-slate-900 hover:bg-slate-100",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800",
].join(" ");

export default function Pricing() {
  return (
    <section className="py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="inline-block px-4 py-2 rounded-full text-sm bg-amber-100 font-semibold text-slate-500 tracking-wider mb-4"
          >
            Tarifs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6"
          >
            Simple et transparent
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Commencez gratuitement. Passez à Premium quand vous êtes prêt. Aucun
            engagement !
          </motion.p>
        </div>

        <div className="isolate mx-auto mt-8 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-x-4 xl:gap-x-8">
          {/* Tier Free */}
          <div className="rounded-xl bg-white p-8 xl:p-10 border border-slate-200">
            <div className="border-b border-b-slate-200 pb-8 text-center">
              <h3 className="text-xl font-bold leading-8 text-slate-900">
                Découverte
              </h3>
              <div className="mt-4 flex items-baseline justify-center gap-x-1">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                  0
                </span>
                <span className="text-sm text-slate-400">€ / mois</span>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6" role="list">
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Jusqu&apos;à 20 contacts</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Scan intelligent</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>1 campagne / mois</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Match Engine™ (5/jour)</span>
              </li>
              <li className="flex gap-x-3 text-slate-600 opacity-60">
                <X
                  size={18}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-slate-400"
                  aria-hidden
                />
                <span>Mode hors-ligne</span>
              </li>
              <li className="flex gap-x-3 text-slate-600 opacity-60">
                <X
                  size={18}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-slate-400"
                  aria-hidden
                />
                <span>Statistiques avancées</span>
              </li>
              <li className="flex gap-x-3 text-slate-600 font-bold">
                <span>Crédits SMS</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>20 inclus</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>0,15€ / Crédit supplémentaire</span>
              </li>
            </ul>
            <a href="#waitlist" className={defaultButtonClass}>
              Commencer
            </a>
          </div>

          {/* Tier Premium */}
          <div className="relative rounded-xl bg-white p-8 xl:p-10 border-2 border-violet-300">
            {/* Bulle "Recommandé" superposée en haut */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400 to-rose-400 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md"
              aria-hidden
            >
              🚀 Rédaction avec l&apos;IA
            </div>
            <div className="border-b border-b-slate-200 pb-8 text-center">
              <h3 className="text-xl font-bold leading-8 text-slate-900">
                Professionnel
              </h3>
              <div className="mt-4 flex items-baseline justify-center gap-x-1">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                  19
                </span>
                <span className="text-sm text-slate-400"> € / mois</span>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6" role="list">
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Cartes illimitées</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Scan intelligent</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Événements illimités</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Match Engine™ illimité</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Mode hors-ligne</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>Statistiques avancées</span>
              </li>
              <li className="flex gap-x-3 text-slate-600 font-bold">
                <span>Crédits SMS</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>100 inclus</span>
              </li>
              <li className="flex gap-x-3 text-slate-600">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden
                />
                <span>0,12€ / Crédit supplémentaire</span>
              </li>
            </ul>
            <a href="#waitlist" className={featuredButtonClass}>
              Choisir Premium
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
