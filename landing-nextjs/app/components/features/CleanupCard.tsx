"use client";
import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Smartphone, Check, RefreshCw, X } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCursor } from "./animatedIcons/AnimatedCursor";

type Phase = "idle" | "move" | "click" | "scanning" | "done";

const PHONE_NUMBERS = [
  { num: "06 12 •• •• 45", status: "valid" },
  { num: "07 99 •• •• 01", status: "invalid" },
  { num: "06 45 •• •• 88", status: "invalid" },
];

export default function CleanupCard() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorPos, setCursorPos] = useState({ x: 220, y: 180 });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const runCycle = async (): Promise<void> => {
      // Reset
      setPhase("idle");
      setActiveIndex(-1);
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

      // Scanning Process
      setPhase("scanning");
      for (let i = 0; i < PHONE_NUMBERS.length; i++) {
        setActiveIndex(i);
        await new Promise((r) => timeouts.push(setTimeout(r, 600)));
      }

      // Done
      setPhase("done");

      // Restart cycle
      timeouts.push(setTimeout(runCycle, 6000));
    };

    runCycle();

    return () => {
      timeouts.forEach(clearTimeout);
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
          className="relative bg-gradient-to-br from-sky-400 to-blue-600 p-4 flex-1 flex items-center justify-center overflow-hidden min-h-0"
        >
          <div className="w-full max-w-[200px] bg-white rounded-xl shadow-xl p-3 relative z-10 border border-white/60">
            <div className="min-h-[120px] flex flex-col">
              <div className="flex items-center justify-between mb-2 h-5 relative flex-shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Nettoyage
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === "done" ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-0 text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full pointer-events-none"
                  aria-hidden
                >
                  Budget Optimisé
                </motion.span>
              </div>

              <div className="space-y-2 flex-1">
                {PHONE_NUMBERS.map((item, idx) => {
                  const isScanning = activeIndex === idx;
                  const isProcessed = activeIndex > idx || phase === "done";

                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        opacity:
                          isProcessed && item.status === "invalid" ? 0.4 : 1,
                        x: isProcessed && item.status === "invalid" ? -5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center justify-between p-1.5 rounded-lg border transition-colors min-h-[28px] ${
                        isScanning
                          ? "border-blue-300 bg-blue-50/50 shadow-sm"
                          : "border-slate-50 bg-slate-50/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone
                          className={`w-3 h-3 ${
                            isScanning ? "text-blue-500" : "text-slate-400"
                          }`}
                        />
                        <span className="text-[10px] font-mono text-slate-600">
                          {item.num}
                        </span>
                      </div>

                      <div className="w-5 h-5 flex items-center justify-center">
                        {isScanning ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                          >
                            <RefreshCw className="w-3 h-3 text-blue-500" />
                          </motion.div>
                        ) : isProcessed ? (
                          item.status === "valid" ? (
                            <Check className="w-3 h-3 text-emerald-500 font-bold" />
                          ) : (
                            <X className="w-3 h-3 text-red-400" />
                          )
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 relative min-h-[32px]">
              <motion.div
                ref={buttonRef}
                animate={{
                  scale: phase === "click" ? 0.95 : phase === "done" ? 1.05 : 1,
                }}
                style={{ transformOrigin: "center" }}
                className={`
                                    w-full flex items-center justify-center gap-1.5 text-white text-[10px] font-bold py-2 rounded-lg shadow-lg 
                                    transition-all duration-700 ease-in-out cursor-default
                                    ${phase === "scanning" ? "bg-blue-900" : ""}
                                    ${
                                      phase === "done"
                                        ? "bg-blue-600 shadow-blue-700/30"
                                        : "bg-slate-900 shadow-slate-900/20"
                                    }
                                `}
              >
                {phase === "done" ? (
                  <ShieldCheck className="w-3 h-3" />
                ) : (
                  <RefreshCw
                    className={`w-3 h-3 ${
                      phase === "scanning" ? "animate-spin" : ""
                    }`}
                  />
                )}
                <span>
                  {phase === "scanning"
                    ? "Analyse..."
                    : phase === "done"
                    ? "Base de données propre"
                    : "Vérifier les numéros"}
                </span>
              </motion.div>
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: phase === "idle" ? 0 : 1,
              transition: "opacity 0.2s",
            }}
            aria-hidden
          >
            <AnimatedCursor phase={phase} cursorPos={cursorPos} />
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-50 text-left flex-shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="bg-blue-50 p-1.5 rounded-md">
              <ShieldCheck className="text-blue-900 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Vérification et nettoyage des numéros
            </h3>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Évitez les SMS non délivrés. Notre système{" "}
            <strong className="text-blue-900 font-semibold">
              vérifie la validité des numéros et supprime les doublons
            </strong>{" "}
            avant l&apos;envoi pour garantir un budget optimisé.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
