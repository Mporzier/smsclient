"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FileUp,
  FileSpreadsheet,
  CheckCircle2,
  Zap,
  ArrowDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCursor } from "./animatedIcons/AnimatedCursor";

type Phase = "idle" | "move" | "click" | "uploading" | "done";

export default function ImportCard() {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorPos, setCursorPos] = useState({ x: 350, y: 100 }); // Start cursor outside
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let progressInterval: NodeJS.Timeout;

    const runCycle = async (): Promise<void> => {
      // Reset
      setPhase("idle");
      setProgress(0);
      setCursorPos({ x: 350, y: 50 });

      await new Promise((r) => timeouts.push(setTimeout(r, 1000)));
      if (!dropZoneRef.current || !containerRef.current) return;

      const zone = dropZoneRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();

      // 1. Move to grab the "file" (imaginary grab)
      setPhase("move");
      setCursorPos({
        x: zone.left - container.left + zone.width / 2,
        y: zone.top - container.top + zone.height / 2,
      });

      // 2. Click (The "Drop")
      await new Promise((r) => timeouts.push(setTimeout(r, 1200)));
      setPhase("click");

      // 3. Uploading
      await new Promise((r) => timeouts.push(setTimeout(r, 400)));
      setPhase("uploading");

      let p = 0;
      progressInterval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) {
          clearInterval(progressInterval);
          setPhase("done");
          // Wait 6s before restarting
          timeouts.push(setTimeout(runCycle, 6000));
        }
      }, 50);
    };

    runCycle();

    return () => {
      timeouts.forEach(clearTimeout);
      if (progressInterval) clearInterval(progressInterval);
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
          className="relative bg-gradient-to-br from-emerald-500 to-teal-700 p-4 flex-1 flex items-center justify-center overflow-hidden min-h-0"
        >
          <div className="w-full max-w-[200px] bg-white rounded-xl shadow-xl p-3 relative z-10 border border-white/60">
            <div className="min-h-[120px] flex flex-col">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                  <FileUp className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">
                  Importation Directe
                </span>
              </div>

              <div
                ref={dropZoneRef}
                className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center min-h-0 transition-colors duration-500 ${
                  phase === "uploading" || phase === "done"
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-slate-100 bg-slate-50/50"
                }`}
              >
                <AnimatePresence mode="wait">
                  {phase === "uploading" || phase === "done" ? (
                    <motion.div
                      key="progress"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full px-3 flex flex-col items-center"
                    >
                      <FileSpreadsheet
                        className={`w-7 h-7 mb-2 ${
                          phase === "done"
                            ? "text-emerald-500"
                            : "text-slate-400"
                        }`}
                      />
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 mt-1.5">
                        {phase === "done"
                          ? "1,240 clients importés !"
                          : `Analyse... ${progress}%`}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      className="flex flex-col items-center"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowDown className="w-4 h-4 text-slate-300 mb-1" />
                      <p className="text-[9px] text-slate-400 font-medium px-2 text-center">
                        Glissez .csv ou .xlsx ici
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3 relative">
              <motion.div
                animate={{
                  scale: phase === "click" ? 0.95 : phase === "done" ? 1.05 : 1,
                }}
                className={`
                                    w-full flex items-center justify-center gap-1.5 text-white text-[10px] font-bold py-2 rounded-lg shadow-lg 
                                    transition-all duration-700 ease-in-out
                                    ${
                                      phase === "done"
                                        ? "bg-emerald-600 shadow-emerald-700/30"
                                        : "bg-slate-900 shadow-slate-900/20"
                                    }
                                `}
              >
                {phase === "done" ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <Zap className="w-3 h-3" />
                )}
                <span>
                  {phase === "done"
                    ? "Prêt à envoyer !"
                    : "Démarrage instantané"}
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
            <div className="relative">
              <AnimatedCursor phase={phase} cursorPos={cursorPos} />
              {phase === "move" && (
                <motion.div
                  style={{
                    position: "absolute",
                    left: cursorPos.x + 12,
                    top: cursorPos.y + 12,
                  }}
                  className="bg-white p-1.5 rounded shadow-lg border border-slate-200"
                >
                  <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-50 text-left flex-shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="bg-emerald-50 p-1.5 rounded-md">
              <Zap className="text-emerald-900 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Importez vos contacts en 1 Clic
            </h3>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Glissez-déposez votre fichier (Excel, CRM) et{" "}
            <strong className="text-emerald-900 font-semibold">
              lancez votre campagne SMS
            </strong>{" "}
            en moins de 2 minutes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
