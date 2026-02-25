"use client";

import { motion } from "framer-motion";
import { CirclePlay, Mail, Target, Wand2 } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  const bullets = [
    { icon: Target, text: "Cibler", color: "bg-red-200" },
    { icon: Wand2, text: "Générer", color: "bg-cyan-200" },
    { icon: Mail, text: "Envoyer", color: "bg-violet-200" },
  ];

  // Copie exacte du .reveal / .reveal.active : opacity + translateY(20px), 0.6s ease-out, delay 0.1s
  const revealVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.4, ease: "easeOut" },
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="hero"
      className="py-10 w-full min-h-[75vh] flex overflow-hidden"
    >
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side: Text Content */}
        <div className="py-15 lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            variants={revealVariants}
            className="badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.85rem] font-medium bg-cyan-100 text-cyan-500 mb-4"
          >
            <span className="badge-dot h-2 w-2 rounded-full bg-[#5BC0C9] animate-pulse" />
            <span>Sans abonnement, ni engagement.</span>
          </motion.div>

          <motion.h1
            variants={revealVariants}
            className="text-[#2D3436] mb-8 font-extrabold leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)]"
          >
            L&apos;IA écrit vos SMS,
            <br />
            vos clients les lisent.
            <br />
            <span className="bg-gradient-to-br from-violet-300 to-rose-300 bg-clip-text text-transparent">
              en quelques secondes.
            </span>
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="text-xl text-gray-600 mb-8 max-w-xl"
          >
            <span className="text-2xl">
              Un outil pour conçu pour les petits commerçants.
            </span>
            <span className="block mb-4" />
            Ajoutez vos contacts, lancez vos campagnes et envoyez vos SMS
            simplement et rapidement.
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center lg:justify-start items-center lg:items-start mb-10"
          >
            {bullets.map((bullet, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-slate-800"
              >
                <span className={`p-1.5 rounded-lg ${bullet.color}`}>
                  <bullet.icon
                    size={20}
                    className="text-slate-900"
                    strokeWidth={2}
                  />
                </span>
                <span className="text-lg font-medium tracking-tight">
                  {bullet.text}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button className="cursor-pointer group relative w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg tracking-tight text-slate-50 bg-gradient-to-br from-violet-300 to-rose-300 shadow-lg shadow-violet-300/30 transition-all duration-500 hover:opacity-90">
              <span className="flex items-center justify-center gap-2">
                <Mail size={18} />
                Rejoindre la liste d&apos;attente
              </span>
            </button>

            <button className="flex items-center justify-center gap-2 cursor-pointer px-8 py-4 bg-transparent text-slate-700 border-2 border-slate-300 rounded-2xl font-semibold text-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 w-full sm:w-auto">
              <CirclePlay size={18} />
              Voir comment ça marche
            </button>
          </motion.div>
        </div>

        {/* Right Side: Media / Animation */}
        <motion.div
          variants={revealVariants}
          className="lg:col-span-5 flex justify-center w-full lg:justify-end items-center"
        >
          <div className="w-full max-w-[450px]">
            <HeroAnimation />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
