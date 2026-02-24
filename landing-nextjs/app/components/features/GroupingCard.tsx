"use client";
import React, { useEffect, useRef, useState } from "react";
import { Users, Target, Filter, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCursor } from "./animatedIcons/AnimatedCursor";

const TARGET_GROUPS = ["Tous les clients", "Nouveaux", "Inactifs", "VIP ✨"];
const CUSTOMERS = [
  { name: "Thomas B.", tag: "Nouveau", color: "bg-blue-100 text-blue-700" },
  { name: "Julie D.", tag: "VIP", color: "bg-amber-100 text-amber-700" },
  { name: "Lucas M.", tag: "Inactif", color: "bg-slate-100 text-slate-600" },
];

type Phase = "idle" | "move" | "click" | "filtering" | "done";

export default function GroupingCard() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorPos, setCursorPos] = useState({ x: 220, y: 180 });
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const runCycle = async (): Promise<void> => {
      // Reset
      setPhase("idle");
      setIsFiltered(false);
      setSelectedGroup(0);
      setCursorPos({ x: 220, y: 180 });

      await new Promise((r) => timeouts.push(setTimeout(r, 1500)));
      if (!buttonRef.current || !containerRef.current) return;

      const btn = buttonRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();

      // Move to "VIP" selector (simulated)
      setCursorPos({
        x: btn.left - container.left + btn.width / 2,
        y: btn.top - container.top + btn.height / 2,
      });
      setPhase("move");

      // Click
      await new Promise((r) => timeouts.push(setTimeout(r, 800)));
      setPhase("click");

      // Filtering Action
      await new Promise((r) => timeouts.push(setTimeout(r, 400)));
      setPhase("filtering");

      // Cycle through groups quickly to show "selection"
      for (let i = 1; i <= 3; i++) {
        await new Promise((r) => timeouts.push(setTimeout(r, 300)));
        setSelectedGroup(i);
      }

      setPhase("done");
      setIsFiltered(true);

      // Wait before restarting
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
          className="relative bg-gradient-to-br from-indigo-500 to-violet-700 p-4 flex-1 flex items-center justify-center overflow-hidden min-h-0"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>

          <div className="w-full max-w-[200px] bg-white rounded-xl shadow-xl p-3 relative z-10 border border-white/60">
            <div className="min-h-[120px] flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Audience
                </span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
              </div>

              <div className="space-y-2 flex-1">
                {CUSTOMERS.map((customer, idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      opacity: isFiltered && customer.tag !== "VIP" ? 0.3 : 1,
                      scale: isFiltered && customer.tag === "VIP" ? 1.02 : 1,
                      x: isFiltered && customer.tag !== "VIP" ? -10 : 0,
                    }}
                    className={`flex items-center justify-between p-1.5 rounded-lg border ${
                      isFiltered && customer.tag === "VIP"
                        ? "border-indigo-200 bg-indigo-50/50"
                        : "border-slate-50 bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-500">
                        {customer.name[0]}
                      </div>
                      <span className="text-[10px] font-medium text-slate-700">
                        {customer.name}
                      </span>
                    </div>
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${customer.color}`}
                    >
                      {customer.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
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
                                      phase === "filtering"
                                        ? "bg-indigo-950"
                                        : ""
                                    }
                                    ${
                                      phase === "done"
                                        ? "bg-green-600 shadow-green-700/30"
                                        : "bg-indigo-900 shadow-indigo-900/20"
                                    }
                                `}
              >
                {phase === "done" ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Filter className="w-3 h-3" />
                )}
                <span>
                  {phase === "filtering"
                    ? `Ciblage: ${TARGET_GROUPS[selectedGroup]}`
                    : phase === "done"
                    ? "Groupe VIP Ciblé"
                    : "Cibler mes VIP"}
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
            <div className="bg-indigo-50 p-1.5 rounded-md">
              <Target className="text-indigo-900 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Ciblage Client Précis
            </h3>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Ne parlez qu&apos;aux bons clients.{" "}
            <strong className="text-indigo-900 font-semibold">
              Créez des groupes intelligents
            </strong>{" "}
            pour multiplier vos conversions par 3 avec des offres
            ultra-personnalisées.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
