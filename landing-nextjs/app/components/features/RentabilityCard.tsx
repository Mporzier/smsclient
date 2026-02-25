"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Banknote,
  ShoppingCart,
  TrendingUp,
  Send,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCursor } from "./animatedIcons/AnimatedCursor";

type Phase = "idle" | "move" | "click" | "converting" | "done";

export default function RentabilityCard() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorPos, setCursorPos] = useState({ x: 220, y: 180 });
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let interval: NodeJS.Timeout;

    const runCycle = async (): Promise<void> => {
      // Reset
      setPhase("idle");
      setRevenue(0);
      setCursorPos({ x: 220, y: 180 });

      await new Promise((r) => timeouts.push(setTimeout(r, 1500)));
      if (!buttonRef.current || !containerRef.current) return;

      const btn = buttonRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();

      // Move to Button
      setCursorPos({
        x: btn.left - container.left + btn.width / 2,
        y: btn.top - container.top + btn.height / 2,
      });
      setPhase("move");

      // Click
      await new Promise((r) => timeouts.push(setTimeout(r, 800)));
      setPhase("click");

      // Conversion Animation
      setPhase("converting");

      // Increment revenue simulation
      let currentRev = 0;
      interval = setInterval(() => {
        currentRev += 1;
        setRevenue(currentRev);
        if (currentRev >= 20) {
          clearInterval(interval);
          setPhase("done");
          // Wait 6s before restart
          timeouts.push(setTimeout(runCycle, 6000));
        }
      }, 40);
    };

    runCycle();

    return () => {
      timeouts.forEach(clearTimeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full min-h-[260px]"
      >
        <div
          ref={containerRef}
          className="relative bg-gradient-to-br from-lime-400 to-emerald-600 p-4 flex-1 flex items-center justify-center overflow-hidden min-h-0"
        >
          <div className="w-full max-w-[200px] bg-white rounded-xl shadow-xl p-3 relative z-10 border border-white/60">
            <div className="min-h-[120px] flex flex-col items-center justify-center">
              <div className="w-full flex justify-around items-center mb-4 relative">
                <div className="text-center">
                  <div className="bg-slate-50 w-9 h-9 rounded-xl flex items-center justify-center mb-1 border border-slate-100">
                    <Send className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">
                    0,10€
                  </span>
                </div>

                <ArrowRight
                  className={`w-3 h-3 text-slate-200 ${
                    phase === "converting" ? "animate-pulse" : ""
                  }`}
                />

                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: phase === "done" ? [1, 1.1, 1] : 1,
                      backgroundColor: phase === "done" ? "#ecfdf5" : "#f8fafc",
                    }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-1 border border-emerald-100"
                  >
                    <AnimatePresence mode="wait">
                      {phase === "done" || phase === "converting" ? (
                        <motion.div
                          key="cart"
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          <ShoppingCart className="w-5 h-5 text-emerald-500" />
                        </motion.div>
                      ) : (
                        <TrendingUp className="w-5 h-5 text-slate-200" />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span
                    className={`text-xs font-black transition-colors ${
                      revenue > 0 ? "text-emerald-600" : "text-slate-300"
                    }`}
                  >
                    {revenue}€
                  </span>
                </div>
              </div>

              <motion.div
                animate={{
                  opacity: phase === "done" ? 1 : 0,
                  y: phase === "done" ? 0 : 8,
                }}
                className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg shadow-emerald-200"
              >
                RENTABILITÉ : x200
              </motion.div>
            </div>

            <div className="mt-3 relative">
              <motion.div
                ref={buttonRef}
                animate={{
                  scale: phase === "click" ? 0.95 : phase === "done" ? 1.05 : 1,
                }}
                className={`
                                    w-full flex items-center justify-center gap-1.5 text-white text-[10px] font-bold py-2 rounded-lg shadow-lg 
                                    transition-all duration-700 ease-in-out cursor-default
                                    ${
                                      phase === "done"
                                        ? "bg-emerald-600 shadow-emerald-700/30"
                                        : "bg-slate-900 shadow-slate-900/20"
                                    }
                                `}
              >
                <Banknote className="w-3 h-3" />
                <span>
                  {phase === "done" ? "Rentabilisée" : "Lancer pour 0,10€"}
                </span>
              </motion.div>
            </div>
          </div>

          <div
            style={{
              opacity: phase === "idle" ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <AnimatedCursor phase={phase} cursorPos={cursorPos} />
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-50 text-left flex-shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="bg-emerald-50 p-1.5 rounded-md">
              <TrendingUp className="text-emerald-900 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Rentabilité Immédiate du SMS marketing
            </h3>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Envoyez 100 SMS pour seulement 10€. Un SMS à 0,10€ peut générer une
            vente à 20€ :{" "}
            <strong className="text-emerald-900 font-semibold">
              votre campagne est rentable dès la première vente.
            </strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
