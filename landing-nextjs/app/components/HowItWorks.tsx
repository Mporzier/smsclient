"use client";

import { motion } from "framer-motion";
import { UserPlus, Sparkles, SendHorizontal } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Importez vos contacts client",
    description:
      "Importez votre liste de clients en un clic, ou ajoutez vos contacts manuellement.",
    tag: "Import ",
    tagBold: "rapide",
    icon: UserPlus,
    numClass: "bg-rose-400 shadow-lg shadow-rose-300/40",
    iconBgClass: "bg-rose-100",
    iconColorClass: "text-rose-500",
  },
  {
    number: "2",
    title: "L'IA rédige vos SMS marketing",
    description:
      "Décrivez votre besoin en quelques mots, notre Intelligence Artificielle génère automatiquement vos SMS prêts à envoyer.",
    tag: "Rédaction ",
    tagBold: "automatique",
    icon: Sparkles,
    numClass: "bg-amber-400 shadow-lg shadow-amber-300/40",
    iconBgClass: "bg-amber-100",
    iconColorClass: "text-amber-600",
  },
  {
    number: "3",
    title: "Lancez votre campagne en un clic",
    description:
      "Envoyez vos SMS instantanément ou planifiez-les pour le moment idéal : soldes, fêtes, anniversaires clients.",
    tag: "Envoi ",
    tagBold: "immédiat ou programmé",
    icon: SendHorizontal,
    numClass: "bg-violet-400 shadow-lg shadow-violet-300/40",
    iconBgClass: "bg-violet-100",
    iconColorClass: "text-violet-600",
  },
];

const smoothTransition = {
  duration: 0.6,
  ease: [0.165, 0.84, 0.44, 1] as const,
};

export default function HowItWorks() {
  return (
    <section className="py-24 antialiased font-sans" id="how-it-works">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="inline-block px-4 py-2 rounded-full text-sm bg-amber-100 font-semibold text-slate-500 tracking-wider mb-4"
          >
            Envoi de SMS en 3 étapes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6"
          >
            Comment envoyer des SMS à vos clients ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            De l&apos;importation de vos contacts à l&apos;envoi de votre
            première campagne SMS, en quelques minutes seulement.
          </motion.p>
        </div>

        {/* Steps Timeline : ligne + numéros superposés, contenu à droite */}
        <div className="relative">
          {/* Ligne verticale (passe derrière les cercles) */}
          <div
            className="absolute hidden md:block top-0 bottom-0 w-0.5 left-[28px] z-0 bg-gradient-to-b from-rose-400 via-amber-400 to-violet-400"
            aria-hidden
          />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...smoothTransition, delay: index * 0.15 }}
                className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-0"
              >
                {/* Numéro centré sur la timeline (superposé à la ligne) */}
                <div className="flex justify-center md:justify-start md:w-14 md:flex-shrink-0">
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full text-slate-700 font-extrabold text-xl z-10 ${step.numClass}`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Contenu à droite */}
                <div className="md:pl-8 flex-1 min-w-0 border border-slate-200 rounded-3xl p-8 ml-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.iconBgClass}`}
                    >
                      <step.icon size={25} className={step.iconColorClass} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-lg text-slate-500 leading-relaxed mb-4 max-w-2xl font-medium">
                    {step.description}
                  </p>

                  <div className="inline-flex px-4 py-1.5 rounded-lg bg-slate-100 text-sm text-slate-500 shadow-sm">
                    {step.tag}
                    <span className="font-bold text-slate-700">
                      &nbsp;{step.tagBold}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
