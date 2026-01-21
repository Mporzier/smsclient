"use client";
import React, { useEffect, useRef, useState } from "react";
import { Banknote, ShoppingCart, TrendingUp, Send, ArrowRight } from "lucide-react";
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
        <div className="max-w-md mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[520px]"
            >
                <div
                    ref={containerRef}
                    className="relative bg-gradient-to-br from-lime-400 to-emerald-600 p-8 flex-1 flex items-center justify-center overflow-hidden"
                >
                    {/* Card UI */}
                    <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl p-5 relative z-10 border border-white/60">
                        <div className="h-[200px] flex flex-col items-center justify-center">

                            <div className="w-full flex justify-around items-center mb-8 relative">
                                {/* Dépense */}
                                <div className="text-center">
                                    <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-2 border border-slate-100">
                                        <Send className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500">0,10€</span>
                                </div>

                                <ArrowRight className={`w-4 h-4 text-slate-200 ${phase === 'converting' ? 'animate-pulse' : ''}`} />

                                {/* Gain */}
                                <div className="text-center">
                                    <motion.div
                                        animate={{
                                            scale: phase === "done" ? [1, 1.1, 1] : 1,
                                            backgroundColor: phase === "done" ? "#ecfdf5" : "#f8fafc"
                                        }}
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 border border-emerald-100"
                                    >
                                        <AnimatePresence mode="wait">
                                            {phase === "done" || phase === "converting" ? (
                                                <motion.div
                                                    key="cart"
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                >
                                                    <ShoppingCart className="w-8 h-8 text-emerald-500" />
                                                </motion.div>
                                            ) : (
                                                <TrendingUp className="w-8 h-8 text-slate-200" />
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                    <span className={`text-sm font-black transition-colors ${revenue > 0 ? 'text-emerald-600' : 'text-slate-300'}`}>
                                        {revenue}€
                                    </span>
                                </div>
                            </div>

                            {/* ROI Badge */}
                            <motion.div
                                animate={{ opacity: phase === "done" ? 1 : 0, y: phase === "done" ? 0 : 10 }}
                                className="bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-emerald-200"
                            >
                                RENTABILITÉ : x200
                            </motion.div>
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
                                    ${phase === "done" ? "bg-emerald-600 shadow-emerald-700/30" : "bg-slate-900 shadow-slate-900/20"}
                                `}
                            >
                                <Banknote className="w-4 h-4" />
                                <span>
                                    {phase === "done" ? "Campagne Rentabilisée" : "Lancer pour 0,10€"}
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
                        <div className="bg-emerald-50 p-2 rounded-lg">
                            <TrendingUp className="text-emerald-900 w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Rentabilité Immédiate</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Envoyez 100 SMS pour seulement 10€. Un SMS à 0,10€ peut générer un panier à 20€ : <strong className="text-emerald-900 font-semibold">votre campagne est rentable dès la première vente.</strong>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}