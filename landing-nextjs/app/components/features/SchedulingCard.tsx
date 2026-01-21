"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send, Clock, BarChart3, Calendar as CalendarIcon, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCursor } from "./animatedIcons/AnimatedCursor";

type Phase = "idle" | "move" | "click" | "scheduling" | "done";

export default function SchedulingCard() {
    const buttonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [phase, setPhase] = useState<Phase>("idle");
    const [cursorPos, setCursorPos] = useState({ x: 220, y: 180 });
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        const runCycle = async (): Promise<void> => {
            // Reset
            setPhase("idle");
            setStatsVisible(false);
            setCursorPos({ x: 220, y: 180 });

            await new Promise((r) => timeouts.push(setTimeout(r, 1500)));
            if (!buttonRef.current || !containerRef.current) return;

            const btn = buttonRef.current.getBoundingClientRect();
            const container = containerRef.current.getBoundingClientRect();

            // Mouvement vers le bouton
            setCursorPos({
                x: btn.left - container.left + btn.width / 2,
                y: btn.top - container.top + btn.height / 2,
            });
            setPhase("move");

            // Clic
            await new Promise((r) => timeouts.push(setTimeout(r, 800)));
            setPhase("click");

            // Simulation de planification
            await new Promise((r) => timeouts.push(setTimeout(r, 400)));
            setPhase("scheduling");

            // Finalisation
            await new Promise((r) => timeouts.push(setTimeout(r, 1200)));
            setPhase("done");
            setStatsVisible(true);

            // Relancer le cycle après lecture
            timeouts.push(setTimeout(runCycle, 6000));
        };

        runCycle();

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="max-w-md mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[520px]"
            >
                <div
                    ref={containerRef}
                    className="relative bg-gradient-to-br from-orange-400 to-amber-600 p-8 flex-1 flex items-center justify-center overflow-hidden"
                >
                    {/* Card UI */}
                    <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl p-5 relative z-10 border border-white/60">
                        <div className="h-[200px] flex flex-col">

                            {/* Header avec Tabs simulés */}
                            <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                                <div className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg text-center transition-colors ${phase !== 'done' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>Flash</div>
                                <div className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg text-center transition-colors ${phase === 'done' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>Planifié</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                                <AnimatePresence mode="wait">
                                    {statsVisible ? (
                                        <motion.div
                                            key="stats"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center"
                                        >
                                            <div className="relative w-20 h-20 mb-2 mx-auto">
                                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                                    <path className="stroke-slate-100" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                    <motion.path
                                                        className="stroke-amber-500"
                                                        strokeWidth="3"
                                                        strokeDasharray="98, 100"
                                                        initial={{ strokeDashoffset: 100 }}
                                                        animate={{ strokeDashoffset: 0 }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        fill="none"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800 text-sm">98%</div>
                                            </div>
                                            <p className="text-[10px] font-medium text-slate-500">Taux de lecture éclair</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="clock"
                                            className="flex flex-col items-center"
                                            animate={{ opacity: phase === "scheduling" ? 0.5 : 1 }}
                                        >
                                            <div className="bg-amber-50 p-4 rounded-full mb-2">
                                                <Clock className="w-8 h-8 text-amber-500" />
                                            </div>
                                            <div className="h-4 bg-slate-100 w-24 rounded-full overflow-hidden relative">
                                                {phase === "scheduling" && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-amber-200"
                                                        initial={{ x: "-100%" }}
                                                        animate={{ x: "0%" }}
                                                        transition={{ duration: 0.8 }}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Bouton d'action */}
                        <div className="mt-5 relative">
                            <motion.div
                                ref={buttonRef}
                                animate={{
                                    scale: phase === "click" ? 0.95 : (phase === "done" ? 1.05 : 1)
                                }}
                                className={`
                                    w-full flex items-center justify-center gap-2 text-white text-xs font-bold py-3 rounded-xl shadow-lg 
                                    transition-all duration-700 ease-in-out cursor-default
                                    ${phase === "done" ? "bg-amber-600 shadow-amber-700/30" : "bg-slate-900 shadow-slate-900/20"}
                                `}
                            >
                                {phase === "done" ? <Zap className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                                <span>
                                    {phase === "done" ? "Programmée avec succès" : "Programmer l'envoi"}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    <div style={{ opacity: phase === "idle" ? 0 : 1, transition: "opacity 0.2s" }}>
                        <AnimatedCursor phase={phase} cursorPos={cursorPos} />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-white border-t border-slate-50 text-left">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-amber-50 p-2 rounded-lg">
                            <Clock className="text-amber-900 w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Envoi Flash ou Planifié</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Envoyez une promo en 30 secondes ou programmez-la. <strong className="text-amber-900 font-semibold">98% de vos messages sont lus</strong> dans les 90 secondes suivant la réception.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}