"use client";
import React, { useEffect, useRef, useState } from "react";
import { Wand2, PartyPopper, Sparkles, Smartphone } from "lucide-react";
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
  "🌍 Engagement Eco :\nDécouvrez notre gamme 100% responsable. Consommez mieux sans renoncer au style. 🌱",
];

const TYPING_MS_PER_CHAR = 8;
const SENDING_DURATION_MS = 900;
const DONE_DISPLAY_MS = 5000;

type Phase = "idle" | "move" | "click" | "generating" | "sending" | "done";

export default function AICard() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorPos, setCursorPos] = useState({ x: 220, y: 160 });
  const [text, setText] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  const messageIndexRef = useRef(0);

  const fireConfetti = () => {
    if (!canvasRef.current) return;
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#f0abfc", "#d946ef", "#a855f7", "#ffffff"],
      gravity: 1.2,
      scalar: 0.7,
      ticks: 150,
    });
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let typing: NodeJS.Timeout;

    const runCycle = async (): Promise<void> => {
      setPhase("idle");
      setText("");
      setSentMessage("");
      setCursorPos({ x: 220, y: 160 });

      await new Promise((r) => timeouts.push(setTimeout(r, 1200)));
      if (!buttonRef.current || !containerRef.current) return;

      const btn = buttonRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: btn.left - container.left + btn.width / 2,
        y: btn.top - container.top + btn.height / 2,
      });
      setPhase("move");

      await new Promise((r) => timeouts.push(setTimeout(r, 550)));
      setPhase("click");
      await new Promise((r) => timeouts.push(setTimeout(r, 400)));
      setPhase("generating");

      const currentMessage = MESSAGES[messageIndexRef.current];
      let i = 0;

      typing = setInterval((): void => {
        setText(currentMessage.slice(0, i + 1));
        i++;
        if (i >= currentMessage.length) {
          clearInterval(typing);
          setSentMessage(currentMessage);
          setPhase("sending");

          timeouts.push(
            setTimeout(() => {
              setPhase("done");
              fireConfetti();
              messageIndexRef.current =
                (messageIndexRef.current + 1) % MESSAGES.length;
              timeouts.push(setTimeout(runCycle, DONE_DISPLAY_MS));
            }, SENDING_DURATION_MS)
          );
        }
      }, TYPING_MS_PER_CHAR);
    };

    runCycle();
    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(typing);
    };
  }, []);

  const showClientMessage = phase === "sending" || phase === "done";

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full min-h-[260px]"
      >
        <div
          ref={containerRef}
          className="relative bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 p-4 flex-1 flex flex-col gap-4 overflow-hidden min-h-0"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          {/* Zone générateur */}
          <div className="flex items-center justify-center flex-shrink-0 min-h-0">
            <div className="w-full max-w-[200px] bg-white rounded-xl shadow-xl p-3 relative z-10 border border-white/60">
              <div className="min-h-[100px] flex flex-col">
                <AnimatePresence mode="wait">
                  {text ? (
                    <motion.div
                      key="text-area"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-[10px] text-slate-700 leading-relaxed relative whitespace-pre-wrap text-left overflow-hidden shadow-inner min-h-0"
                    >
                      {text}
                      {phase === "generating" && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                          className="inline-block w-1.5 h-3.5 bg-fuchsia-600 ml-1 align-middle rounded-full"
                        />
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center bg-slate-50/50 min-h-0">
                      <p className="text-[9px] text-slate-300 font-medium">
                        IA prête à rédiger...
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-2.5 relative">
                <motion.div
                  ref={buttonRef}
                  animate={{
                    scale:
                      phase === "click" ? 0.95 : phase === "done" ? 1.05 : 1,
                  }}
                  className={`
                    w-full flex items-center justify-center gap-1.5 text-white text-[10px] font-bold py-2 rounded-lg shadow-lg
                    transition-all duration-500 ease-in-out cursor-default
                    ${
                      phase === "generating"
                        ? "bg-fuchsia-950 shadow-fuchsia-900/20"
                        : ""
                    }
                    ${
                      phase === "done"
                        ? "bg-fuchsia-800 shadow-fuchsia-700/30"
                        : ""
                    }
                    ${
                      phase === "sending"
                        ? "bg-fuchsia-800 shadow-fuchsia-700/20"
                        : ""
                    }
                    ${
                      phase === "idle" || phase === "move" || phase === "click"
                        ? "bg-fuchsia-900 shadow-fuchsia-900/20"
                        : ""
                    }
                  `}
                >
                  {phase === "generating" ? (
                    <AnimatedSparkles className="w-3 h-3 text-slate-50" />
                  ) : phase === "sending" ? (
                    <span className="w-3 h-3 rounded-full bg-slate-300 animate-pulse" />
                  ) : phase === "done" ? (
                    <PartyPopper className="w-3 h-3 text-slate-50" />
                  ) : (
                    <Wand2 className="w-3 h-3 text-slate-50" />
                  )}
                  <span>
                    {phase === "generating"
                      ? "Rédaction..."
                      : phase === "sending"
                      ? "Envoi en cours..."
                      : phase === "done"
                      ? "Envoyé !"
                      : "Générer le message"}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Zone envoi au client — hauteur fixe pour ne pas faire bouger la grille */}
          <div className="flex-1 min-h-[120px] flex flex-col rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/20 flex-shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-white/90" />
              <span className="text-[10px] font-semibold text-white/95">
                Envoi au client
              </span>
              <span className="text-[9px] text-white/70 ml-1">
                06 12 34 56 78
              </span>
            </div>
            <div className="flex-1 min-h-[88px] p-2 flex flex-col justify-end">
              <AnimatePresence mode="wait">
                {showClientMessage ? (
                  <motion.div
                    key="client-msg"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="bg-white rounded-lg rounded-bl-sm shadow-md px-2.5 py-2 text-[9px] text-slate-700 leading-relaxed whitespace-pre-wrap text-left border border-slate-100/80 max-h-full overflow-y-auto"
                  >
                    {sentMessage}
                    {phase === "sending" && (
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="inline-block w-1 h-3 bg-fuchsia-500 ml-0.5 align-middle rounded-full"
                      />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="client-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-white/50 italic"
                  >
                    Le message apparaîtra ici après envoi.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none z-[5]"
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
            <div className="bg-fuchsia-50 p-1.5 rounded-md">
              <Sparkles className="text-fuchsia-900 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              IA de rédaction SMS
            </h3>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Panne d&apos;inspiration ?{" "}
            <strong className="text-fuchsia-900 font-semibold">
              L&apos;IA écrit vos messages à votre place.
            </strong>{" "}
            Générez en un clic, puis{" "}
            <strong className="text-fuchsia-900 font-semibold">
              envoyez directement à vos clients.
            </strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
