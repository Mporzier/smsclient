"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, ShieldCheck, Zap } from "lucide-react";

const SMS_DATABASE = {
  promo: {
    friendly:
      "Coucou ! 😊 Petite surprise pour vous : -20% sur tout le store avec le code 'HAPPINESS'. Profitez-en ici : sms.pro/demo",
    urgent:
      "VITE ! ⚡ -20% sur TOUT le site. Plus que quelques heures pour en profiter. Ça se passe ici : sms.pro/demo",
    vip: "Accès Privé 💎 : Profitez de -20% sur la nouvelle collection avant tout le monde. Code : PRIVILEGE.",
  },
  relance: {
    friendly:
      "Votre panier s'ennuie... 🛒 Revenez le voir et on vous offre la livraison avec le code 'HELLO'. À très vite !",
    urgent:
      "ALERTE STOCK ⏳ : Vos articles favoris sont presque épuisés. Finalisez votre commande maintenant : sms.pro/demo",
    vip: "Service Client 💎 : Nous avons réservé vos articles préférés pendant 24h. Retrouvez-les ici : sms.pro/demo",
  },
};

export default function AIStreamModule() {
  const [config, setConfig] = useState({ type: "promo", tone: "friendly" });
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // L'effet magique : simuler l'écriture de l'IA
  const simulateAI = (targetText: string) => {
    setIsAnalyzing(true);
    setDisplayText(""); // On vide l'écran

    // Phase 1 : "Réflexion" de l'IA
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsTyping(true);

      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(targetText.slice(0, i + 1));
        i++;
        if (i >= targetText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 25); // Vitesse de frappe humaine/IA
    }, 1200); // Temps de "réflexion"
  };

  // Trigger au changement de boutons
  const handleUpdate = (newType: string, newTone: string) => {
    if (isTyping || isAnalyzing) return;
    const nextText = SMS_DATABASE[newType as "promo"][newTone as "friendly"];
    simulateAI(nextText);
  };

  // Initialisation
  useEffect(() => {
    simulateAI(SMS_DATABASE.promo.friendly);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* CONTRÔLES */}
        <div className="p-8 space-y-10">
          <div>
            <h3 className="flex items-center gap-2 text-blue-600 font-bold mb-6">
              <Cpu size={20} className="animate-pulse" /> Configuration de
              l&apos;IA
            </h3>

            <div className="space-y-8">
              {/* Objectif */}
              <div className="flex gap-4">
                {["promo", "relance"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setConfig({ ...config, type: t });
                      handleUpdate(t, config.tone);
                    }}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all font-bold ${
                      config.type === t
                        ? "border-blue-600 bg-white shadow-md text-blue-600"
                        : "bg-slate-100 border-transparent text-slate-400"
                    }`}
                  >
                    {t === "promo" ? "🎁 Promotion" : "🛒 Relance"}
                  </button>
                ))}
              </div>

              {/* Ton */}
              <div className="grid grid-cols-3 gap-3">
                {["friendly", "urgent", "vip"].map((tn) => (
                  <button
                    key={tn}
                    onClick={() => {
                      setConfig({ ...config, tone: tn });
                      handleUpdate(config.type, tn);
                    }}
                    className={`p-3 rounded-xl border-2 transition-all text-sm font-bold ${
                      config.tone === tn
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "bg-white border-slate-100 text-slate-400"
                    }`}
                  >
                    {tn.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status de l'IA */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="flex items-center gap-3 text-xs font-mono mb-4 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              SYSTEM_STATUS:{" "}
              {isAnalyzing
                ? "ANALYZING_CONTEXT"
                : isTyping
                ? "GENERATING_TEXT"
                : "IDLE"}
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-1"
                  >
                    <div className="h-1 bg-blue-900 w-full rounded-full overflow-hidden">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="h-full bg-blue-400 w-1/3"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 italic uppercase tracking-widest">
                      Optimisation sémantique en cours...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* PRÉVISUALISATION IPHONE */}
        <div className="relative bg-white lg:rounded-l-[4rem] p-12 flex items-center justify-center border-l border-slate-100">
          <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] p-3 shadow-2xl border-[6px] border-slate-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-800 rounded-b-2xl z-20" />

            <div className="h-full w-full bg-white rounded-[2.5rem] overflow-hidden pt-12 px-4">
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {(displayText || isAnalyzing) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-100 p-4 rounded-2xl rounded-tl-none relative"
                    >
                      <p className="text-[13px] text-slate-800 leading-relaxed min-h-[60px]">
                        {displayText}
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6 }}
                            className="inline-block w-[2px] h-4 bg-blue-600 ml-1 align-middle"
                          />
                        )}
                      </p>
                      <div className="mt-2 flex justify-between items-center border-t border-slate-200 pt-2">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                          AI Optimized
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono">
                          {displayText.length}/160
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Badges Flottants de Réassurance */}
          <div className="absolute -right-4 top-1/4 space-y-4 hidden xl:block">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2"
            >
              <Zap size={16} className="text-yellow-500" />{" "}
              <span className="text-xs font-bold uppercase tracking-tighter">
                Boost CTR +24%
              </span>
            </motion.div>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2"
            >
              <ShieldCheck size={16} className="text-green-500" />{" "}
              <span className="text-xs font-bold uppercase tracking-tighter">
                RGPD compliant
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
