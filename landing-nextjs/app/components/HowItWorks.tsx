"use client";

import { motion } from "framer-motion";
import { Camera, LayoutGrid, Search, Users } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Scannez vos cartes",
    description:
      "Prenez simplement une photo. Notre IA reconnaît instantanément la carte, l'édition et l'état.",
    tag: "Reconnaissance en < 2 sec",
    icon: Camera,
    colorClass: "bg-rose-400",
    lightColorClass: "bg-rose-50",
    iconColor: "text-rose-400",
  },
  {
    number: "2",
    title: "Classez intelligemment",
    description:
      "Organisez vos cartes en Collection, Doubles à échanger ou Wishlist. Filtrez par série, rareté, état.",
    tag: "Tri automatique",
    icon: LayoutGrid,
    colorClass: "bg-amber-400",
    lightColorClass: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    number: "3",
    title: "Trouvez des matches",
    description:
      "Notre moteur de matching identifie automatiquement les collectionneurs qui ont ce que vous cherchez — et inversement.",
    tag: "Match Engine™",
    icon: Search,
    colorClass: "bg-cyan-400",
    lightColorClass: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    number: "4",
    title: "Échangez en personne",
    description:
      "Rejoignez des événements locaux ou des bourses d'échange. Check-in QR, préparation de trades, tout est intégré.",
    tag: "Mode Événement",
    icon: Users,
    colorClass: "bg-indigo-400",
    lightColorClass: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full text-sm bg-amber-100 font-semibold text-slate-500 tracking-wider mb-4"
          >
            Simple comme 1-2-3
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Comment ça marche ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            De l&apos;ajout de vos contacts à l&apos;envoi de votre première
            campagne, en quelques minutes.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 z-0" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center justify-between z-10 ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="w-full lg:w-[42%] mb-8 lg:mb-0">
                  <div
                    className={`p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all duration-300 hover:shadow-xl group`}
                  >
                    <div
                      className={`w-14 h-14 ${step.lightColorClass} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <step.icon size={28} className={step.iconColor} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="inline-block px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm">
                      {step.tag}
                    </div>
                  </div>
                </div>

                {/* Number (Center) */}
                <div
                  className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${step.colorClass} text-white items-center justify-center font-bold text-xl shadow-lg border-4 border-white`}
                >
                  {step.number}
                </div>

                {/* Empty space for grid alignment */}
                <div className="hidden lg:block lg:w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
