"use client";
import React, { useEffect, useRef, useState } from "react";
import { Wand2, PartyPopper, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { AnimatedSparkles } from "./animatedIcons/AnimatedSparkles";
import { AnimatedCursor } from "./animatedIcons/AnimatedCursor";

const MESSAGES = [
    "🚀 Boostez vos ventes !\n-30% sur toute la collection avec le code FLASH30. Vite, fin dimanche minuit ! ⚡",
    "🎁 Cadeau exclusif !\nUne surprise offerte dans votre panier avec le code WELCOME. Profitez-en vite ! ✨",
    "🔥 Stock limité !\nPlus que quelques pièces sur la collection d'hiver. Livraison offerte dès 50€ ! 📦",
    "📦 Bonne nouvelle !\nVotre commande est en route. Suivez son arrivée en temps réel sur notre site. À très vite ! 😊",
    "💎 Avant-première !\nAccédez à la nouvelle collection 24h avant tout le monde. Soyez prêt demain à 8h ! 🔔",
    "👋 Vous nous manquez !\nRevenez nous voir et profitez de -10% sur votre prochain achat avec le code MISSYOU. ❤️",
    "⏳ Dernière chance !\nVos articles favoris sont presque épuisés. Finalisez votre commande avant qu'il ne soit trop tard ! 🏃‍♂️",
    "💼 Info Pro :\nNotre nouveau catalogue B2B est disponible. Découvrez nos solutions pour votre entreprise. 📈",
    "🌟 Avis client :\nPartagez votre expérience et recevez un bon d'achat de 5€ sur votre prochaine commande ! ⭐",
    "🌍 Engagement Eco :\nDécouvrez notre gamme 100% responsable. Consommez mieux sans renoncer au style. 🌱"
];

type Phase = "idle" | "move" | "click" | "generating" | "done";

export default function AICard() {
    const buttonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [phase, setPhase] = useState<Phase>("idle");
    const [cursorPos, setCursorPos] = useState({ x: 220, y: 180 });
    const [text, setText] = useState("");

    const messageIndexRef = useRef(0);

    // Fonction pour déclencher les confettis localement au canvas
    const fireConfetti = () => {
        if (!canvasRef.current) return;

        // On crée une instance locale liée uniquement à notre canvas
        const myConfetti = confetti.create(canvasRef.current, {
            resize: true,
            useWorker: true
        });

        myConfetti({
            particleCount: 40,
            spread: 70,
            origin: { y: 0.6 }, // Position relative au centre de la zone dégradée
            colors: ['#f0abfc', '#d946ef', '#a855f7', '#ffffff'],
            gravity: 1.2,
            scalar: 0.7,
            ticks: 150
        });
    };

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];
        let typing: NodeJS.Timeout;

        const runCycle = async (): Promise<void> => {
            setPhase("idle");
            setText("");
            setCursorPos({ x: 220, y: 180 });

            await new Promise((r) => timeouts.push(setTimeout(r, 1500)));
            if (!buttonRef.current || !containerRef.current) return;

            const btn = buttonRef.current.getBoundingClientRect();
            const container = containerRef.current.getBoundingClientRect();

            setCursorPos({
                x: btn.left - container.left + btn.width / 2,
                y: btn.top - container.top + btn.height / 2,
            });
            setPhase("move");

            await new Promise((r) => timeouts.push(setTimeout(r, 800)));
            setPhase("click");

            await new Promise((r) => timeouts.push(setTimeout(r, 600)));
            setPhase("generating");

            const currentMessage = MESSAGES[messageIndexRef.current];
            let i = 0;

            typing = setInterval((): void => {
                setText(currentMessage.slice(0, i + 1));
                i++;
                if (i >= currentMessage.length) {
                    clearInterval(typing);
                    setPhase("done");

                    // Déclenchement des confettis
                    fireConfetti();

                    messageIndexRef.current = (messageIndexRef.current + 1) % MESSAGES.length;
                    timeouts.push(setTimeout(runCycle, 6000));
                }
            }, 30);
        };

        runCycle();

        return () => {
            timeouts.forEach(clearTimeout);
            clearInterval(typing);
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
                    className="relative bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 p-8 flex-1 flex items-center justify-center overflow-hidden"
                >
                    {/* Le Canvas local : clé pour cantonner les confettis */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full pointer-events-none z-20"
                    />

                    <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl p-5 relative z-10 border border-white/60">
                        <div className="h-[200px] flex flex-col">
                            <AnimatePresence mode="wait">
                                {text ? (
                                    <motion.div
                                        key="text-area"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[12px] text-slate-700 leading-relaxed relative whitespace-pre-wrap text-left overflow-hidden shadow-inner"
                                    >
                                        {text}
                                        {phase === "generating" && (
                                            <motion.span
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="inline-block w-1.5 h-4 bg-fuchsia-600 ml-1 align-middle rounded-full"
                                            />
                                        )}
                                    </motion.div>
                                ) : (
                                    <div className="flex-1 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center bg-slate-50/50">
                                        <p className="text-[11px] text-slate-300 font-medium">IA prête à rédiger...</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-5 relative">
                            <motion.div
                                ref={buttonRef}
                                animate={{
                                    scale: phase === "click" ? 0.95 : (phase === "done" ? 1.05 : 1)
                                }}
                                className={`
                                    w-full flex items-center justify-center gap-2 text-white text-xs font-bold py-3 rounded-xl shadow-lg 
                                    transition-all duration-700 ease-in-out cursor-default
                                    ${phase === "generating" ? "bg-fuchsia-950 shadow-fuchsia-900/20" : ""}
                                    ${phase === "done" ? "bg-fuchsia-800 shadow-fuchsia-700/30" : ""}
                                    ${phase === "idle" || phase === "move" || phase === "click" ? "bg-fuchsia-900 shadow-fuchsia-900/20" : ""}
                                `}
                            >
                                {phase === "generating" ? <AnimatedSparkles className="w-4 h-4 text-slate-50" /> :
                                    phase === "done" ? <PartyPopper className="w-4 h-4 text-slate-50" /> :
                                        <Wand2 className="w-4 h-4 text-slate-50" />}

                                <span>
                                    {phase === "generating" ? "Rédaction..." : phase === "done" ? "C'est prêt !" : "Générer le message"}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    <div style={{ opacity: phase === "idle" ? 0 : 1, transition: "opacity 0.2s" }}>
                        <AnimatedCursor phase={phase} cursorPos={cursorPos} />
                    </div>
                </div>

                <div className="p-8 bg-white border-t border-slate-50 text-left">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-fuchsia-50 p-2 rounded-lg">
                            <Sparkles className="text-fuchsia-900 w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">IA Rédactrice</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Panne d&apos;inspiration ? <strong className="text-fuchsia-900 font-semibold">L&apos;IA écrit vos messages de vente à votre place.</strong> Générez des messages percutants en un instant.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}