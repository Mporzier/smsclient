"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AnimatedSparklesProps {
    className?: string;
    size?: number;
}

export const AnimatedSparkles = ({ className = "", size = 16 }: AnimatedSparklesProps) => {
    return (
        <motion.div
            key="animated-sparkles"
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Sparkle de fond (Echo) */}
            <motion.div
                className="absolute inset-0 text-white/40"
                animate={{
                    scale: [1, 1.8],
                    opacity: [0.5, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeOut",
                }}
            >
                <Sparkles size={size} />
            </motion.div>

            {/* Sparkle principal */}
            <motion.div
                className="relative z-10 text-white"
                animate={{
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 0.8, 1.1, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "anticipate",
                }}
            >
                <Sparkles
                    size={size}
                    className="fill-white"
                    strokeWidth={2.5}
                />
            </motion.div>

            {/* Petites étoiles satellites */}
            {[45, 135, 225, 315].map((angle, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{ width: 2, height: 2 }}
                    animate={{
                        x: [0, Math.cos(angle) * 12],
                        y: [0, Math.sin(angle) * 12],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: i * 0.2,
                        ease: "easeOut",
                    }}
                />
            ))}
        </motion.div>
    );
};