"use client";
import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Smartphone, Trash2, Check, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCursor } from "./animatedIcons/AnimatedCursor";

type Phase = "idle" | "move" | "click" | "scanning" | "done";

const PHONE_NUMBERS = [
    { num: "06 12 •• •• 45", status: "valid" },
    { num: "07 99 •• •• 01", status: "invalid" },
    { num: "06 45 •• •• 88", status: "valid" },
    { num: "01 22 •• •• 00", status: "invalid" },
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
        <div className="max-w-md mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[520px]"
            >
                <div
                    ref={containerRef}
                    className="relative bg-gradient-to-br from-sky-400 to-blue-600 p-8 flex-1 flex items-center justify-center overflow-hidden"
                >
                    {/* Card UI */}
                    <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl p-5 relative z-10 border border-white/60">
                        <div className="h-[200px] flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nettoyage en cours</span>
                                {phase === "done" && (
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                        Budget Optimisé
                                    </motion.span>
                                )}
                            </div>

                            <div className="space-y-2 flex-1">
                                {PHONE_NUMBERS.map((item, idx) => {
                                    const isScanning = activeIndex === idx;
                                    const isProcessed = activeIndex > idx || phase === "done";

                                    return (
                                        <motion.div
                                            key={idx}
                                            animate={{
                                                opacity: isProcessed && item.status === "invalid" ? 0.4 : 1,
                                                x: isProcessed && item.status === "invalid" ? -5 : 0
                                            }}
                                            className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${isScanning ? "border-blue-300 bg-blue-50/50 shadow-sm" : "border-slate-50 bg-slate-50/30"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Smartphone className={`w-3 h-3 ${isScanning ? "text-blue-500" : "text-slate-400"}`} />
                                                <span className="text-[11px] font-mono text-slate-600">{item.num}</span>
                                            </div>

                                            <div className="w-5 h-5 flex items-center justify-center">
                                                {isScanning ? (
                                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
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

                        {/* Action Button */}
                        <div className="mt-5 relative">
                            <motion.div
                                ref={buttonRef}
                                animate={{
                                    scale: phase === "click" ? 0.95 : (phase === "done" ? 1.05 : 1)
                                }}
                                className={`
                                    w-full flex items-center justify-center gap-2 text-white text-xs font-bold py-3 rounded-xl shadow-lg 
                                    transition-all duration-700 ease-in-out cursor-default
                                    ${phase === "scanning" ? "bg-blue-900" : ""}
                                    ${phase === "done" ? "bg-blue-600 shadow-blue-700/30" : "bg-slate-900 shadow-slate-900/20"}
                                `}
                            >
                                {phase === "done" ? <ShieldCheck className="w-4 h-4" /> : <RefreshCw className={`w-4 h-4 ${phase === "scanning" ? "animate-spin" : ""}`} />}
                                <span>
                                    {phase === "scanning" ? "Analyse..." : phase === "done" ? "Base de données propre" : "Vérifier les numéros"}
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
                        <div className="bg-blue-50 p-2 rounded-lg">
                            <ShieldCheck className="text-blue-900 w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Nettoyage Inclus</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Évitez de payer pour rien. Notre système <strong className="text-blue-900 font-semibold">vérifie la validité des numéros</strong> avant l&apos;envoi pour garantir que 100% de votre budget arrive à destination.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}