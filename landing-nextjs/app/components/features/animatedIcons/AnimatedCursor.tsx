"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";

interface AnimatedCursorProps {
    phase: string;
    cursorPos: { x: number; y: number };
}

export const AnimatedCursor = ({ phase, cursorPos }: AnimatedCursorProps) => {
    return (
        <motion.div
            animate={{
                x: cursorPos.x,
                y: cursorPos.y,
                // Le curseur n'est visible que pendant le mouvement et le clic
                opacity: (phase === "move" || phase === "click") ? 1 : 0,
            }}
            transition={{
                x: { type: "spring", stiffness: 250, damping: 25, mass: 0.5 },
                y: { type: "spring", stiffness: 250, damping: 25, mass: 0.5 },
                // On définit une transition spécifique pour l'opacité pour qu'il disparaisse doucement
                opacity: { duration: 0.4, ease: "easeInOut" }
            }}
            className="absolute top-0 left-0 pointer-events-none z-50"
        >
            <div className="relative">
                <motion.div
                    animate={{
                        scale: phase === "click" ? 0.9 : 1,
                    }}
                    transition={{ duration: 0.1 }}
                >
                    <MousePointer2
                        className="w-6 h-6 text-slate-900 fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] relative z-10"
                        strokeWidth={2.5}
                    />
                </motion.div>

                <AnimatePresence>
                    {phase === "click" && (
                        <React.Fragment key="click-animation">
                            <motion.div
                                initial={{ scale: 0.2, opacity: 1, borderWidth: "3px" }}
                                animate={{
                                    scale: 2.5,
                                    opacity: 0,
                                    borderWidth: "1px"
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute border-fuchsia-500 rounded-full -translate-x-1/2 -translate-y-1/2 w-6 h-6"
                                style={{ left: "2px", top: "2px", boxSizing: "border-box" }}
                            />

                            <motion.div
                                initial={{ scale: 1.5, opacity: 0.5 }}
                                animate={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute w-2 h-2 bg-fuchsia-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                                style={{ left: "2px", top: "2px" }}
                            />
                        </React.Fragment>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};