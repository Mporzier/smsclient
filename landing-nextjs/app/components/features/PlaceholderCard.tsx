"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, Send, MailOpen, MousePointer } from "lucide-react";
import { motion } from "framer-motion";

type Phase = "idle" | "sending" | "results";

const SENDING_DURATION_MS = 2200;
const RESULTS_DISPLAY_MS = 5500;

export default function PlaceholderCard() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [sentCount, setSentCount] = useState(0);
  const [openRate, setOpenRate] = useState(0);
  const [clickRate, setClickRate] = useState(0);
  const [sendProgress, setSendProgress] = useState(0);

  const TARGET_SENT = 1247;
  const TARGET_OPEN = 34;
  const TARGET_CLICK = 12;

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let progressInterval: ReturnType<typeof setInterval> | null = null;

    const runCycle = () => {
      setPhase("idle");
      setSentCount(0);
      setOpenRate(0);
      setClickRate(0);
      setSendProgress(0);
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }

      timeouts.push(
        setTimeout(() => {
          setPhase("sending");
          let progress = 0;
          progressInterval = setInterval(() => {
            progress += 2;
            setSendProgress((p) => Math.min(p + 2, 100));
            if (progress >= 100 && progressInterval) {
              clearInterval(progressInterval);
              progressInterval = null;
            }
          }, SENDING_DURATION_MS / 50);
        }, 1400)
      );

      timeouts.push(
        setTimeout(() => {
          setPhase("results");
          setSendProgress(100);

          let s = 0;
          const sentStep = TARGET_SENT / 35;
          const si = setInterval(() => {
            s += sentStep;
            setSentCount(Math.min(Math.round(s), TARGET_SENT));
            if (s >= TARGET_SENT) clearInterval(si);
          }, 25);

          let o = 0;
          const oi = setInterval(() => {
            o += 1.5;
            setOpenRate(Math.min(Math.round(o), TARGET_OPEN));
            if (o >= TARGET_OPEN) clearInterval(oi);
          }, 40);

          let c = 0;
          const ci = setInterval(() => {
            c += 0.8;
            setClickRate(Math.min(Math.round(c), TARGET_CLICK));
            if (c >= TARGET_CLICK) clearInterval(ci);
          }, 50);
        }, 1400 + SENDING_DURATION_MS)
      );

      timeouts.push(
        setTimeout(runCycle, 1400 + SENDING_DURATION_MS + RESULTS_DISPLAY_MS)
      );
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
        <div className="relative bg-gradient-to-br from-violet-500 to-indigo-700 p-4 flex-1 flex flex-col md:flex-row gap-4 overflow-hidden min-h-0">
          {/* Bloc gauche : campagne + envoi */}
          <div className="flex-1 min-w-0 min-h-[140px] flex flex-col justify-center">
            <div className="bg-white/95 rounded-xl shadow-lg border border-white/60 p-4 h-full flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Send className="w-4 h-4 text-violet-600 flex-shrink-0" />
                <span className="text-[11px] font-bold text-slate-800 truncate">
                  Campagne Flash Soldes
                </span>
              </div>
              {phase === "idle" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] text-slate-400"
                >
                  Prêt à envoyer
                </motion.p>
              )}
              {phase === "sending" && (
                <div className="space-y-2">
                  <p className="text-[10px] text-violet-600 font-semibold">
                    Envoi en cours...
                  </p>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-violet-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${sendProgress}%` }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                </div>
              )}
              {phase === "results" && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px]"
                >
                  <span className="font-bold text-slate-800">
                    {sentCount.toLocaleString("fr-FR")}
                  </span>
                  <span className="text-slate-500 ml-1">envoyés</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bloc droit : stats (ouvertures, clics) */}
          <div className="flex-1 min-w-0 min-h-[140px] grid grid-cols-2 gap-3">
            <div className="bg-white/95 rounded-xl shadow-lg border border-white/60 p-3 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-2">
                <MailOpen className="w-3.5 h-3.5 text-violet-600 flex-shrink-0" />
                <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-wide">
                  Ouvertures
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <motion.span
                  key={openRate}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-lg font-bold text-violet-700 tabular-nums"
                >
                  {phase === "results" ? openRate : "—"}
                </motion.span>
                <span className="text-[10px] text-slate-500">%</span>
              </div>
              <div className="mt-1.5 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-violet-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: phase === "results" ? `${openRate}%` : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="bg-white/95 rounded-xl shadow-lg border border-white/60 p-3 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-2">
                <MousePointer className="w-3.5 h-3.5 text-violet-600 flex-shrink-0" />
                <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-wide">
                  Clics
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <motion.span
                  key={clickRate}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-lg font-bold text-violet-700 tabular-nums"
                >
                  {phase === "results" ? clickRate : "—"}
                </motion.span>
                <span className="text-[10px] text-slate-500">%</span>
              </div>
              <div className="mt-1.5 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: phase === "results" ? `${clickRate}%` : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-50 text-left flex-shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="bg-violet-50 p-1.5 rounded-md">
              <BarChart3 className="text-violet-900 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Suivi des campagnes SMS en temps réel
            </h3>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Suivez en temps réel vos campagnes SMS,{" "}
            <strong className="text-violet-900 font-semibold">
              taux d&apos;ouverture, taux de clics et performances détaillées
            </strong>{" "}
            Analysez vos résultats et optimisez vos envois SMS.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
