"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import SMSWidget from "./SMSWidget";

export default function HeroAnimation() {
  const fontSizeScaling = 1;
  return (
    <div className="flex   justify-center font-['Inter'] w-full h-full">
      <div
        className="w-full flex  justify-center"
        style={{
          fontSize: `clamp(${fontSizeScaling * 1}px, ${
            fontSizeScaling * 0.75
          }vw, ${fontSizeScaling * 7.5}px)`,
        }}
      >
        <div
          style={
            {
              "--c-h": "284",
              "--c-s": "100%",
              "--c-l": "50%",
            } as CSSProperties
          }
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
              rotateY: -40,
              rotateX: 10,
              z: -300,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              z: 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            // Changed h-[80em] to 70vh for better screen fit
            className="phone relative z-[1] aspect-[37/76] h-[70vh] bg-black rounded-[6.666em]"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: `
                0 0 0.1em 0.25em hsl(var(--c-h), 20%, 25%), 
                0 0 0 0.4em hsl(var(--c-h), 30%, 85%),
                0 2em 4em -1em rgba(0, 0, 0, 0.6),
                0 0.5em 1em -0.25em rgba(0, 0, 0, 0.4),
                inset 0 0 0 0.1em rgba(255, 255, 255, 0.05)
              `,
            }}
          >
            {/* Ambient occlusion in corners */}
            <div className="absolute top-0 left-0 w-[8em] h-[8em] rounded-tl-[6.666em] bg-gradient-to-br from-black/30 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-[8em] h-[8em] rounded-tr-[6.666em] bg-gradient-to-bl from-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[8em] h-[8em] rounded-bl-[6.666em] bg-gradient-to-tr from-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[8em] h-[8em] rounded-br-[6.666em] bg-gradient-to-tl from-black/30 to-transparent pointer-events-none" />

            {/* Rim lighting - subtle highlight on edges */}
            <div
              className="absolute inset-0 rounded-[6.666em] pointer-events-none"
              style={{
                boxShadow: `inset 0 0 0 0.05em rgba(255, 255, 255, 0.08), inset 0.1em 0.1em 0.2em rgba(255, 255, 255, 0.03)`,
              }}
            />

            <div className="absolute top-[6.666em] bottom-[6.666em] inset-x-[-0.4em] border-y-[0.5em] border-y-[hsl(var(--c-h),20%,30%)] pointer-events-none opacity-50" />

            <div className="buttons absolute inset-[-0.4em] pointer-events-none">
              <div className="left absolute right-full top-[13.332em] flex flex-col gap-[1.5em] w-[0.333em]">
                <div className="button h-[3em] rounded-l-[0.2em] bg-[hsl(var(--c-h),20%,95%)] shadow-[inset_-0.15em_0_0.1em_black,inset_0_0_0.1em_hsl(var(--c-h),30%,90%),inset_0_0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_0_-0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_-0.1em_0.333em_0.1em_rgba(0,0,0,0.5),inset_-0.1em_-0.333em_0.1em_rgba(0,0,0,0.5)]" />
                <div className="button h-[6em] rounded-l-[0.2em] bg-[hsl(var(--c-h),20%,95%)] shadow-[inset_-0.15em_0_0.1em_black,inset_0_0_0.1em_hsl(var(--c-h),30%,90%),inset_0_0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_0_-0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_-0.1em_0.333em_0.1em_rgba(0,0,0,0.5),inset_-0.1em_-0.333em_0.1em_rgba(0,0,0,0.5)]" />
                <div className="button h-[6em] rounded-l-[0.2em] bg-[hsl(var(--c-h),20%,95%)] shadow-[inset_-0.15em_0_0.1em_black,inset_0_0_0.1em_hsl(var(--c-h),30%,90%),inset_0_0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_0_-0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_-0.1em_0.333em_0.1em_rgba(0,0,0,0.5),inset_-0.1em_-0.333em_0.1em_rgba(0,0,0,0.5)]" />
              </div>
              <div className="right absolute left-full top-[20em] w-[0.333em] scale-x-[-1]">
                <div className="button h-[9.5em] rounded-l-[0.2em] bg-[hsl(var(--c-h),20%,95%)] shadow-[inset_-0.15em_0_0.1em_black,inset_0_0_0.1em_hsl(var(--c-h),30%,90%),inset_0_0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_0_-0.2em_0.1em_hsl(var(--c-h),30%,90%),inset_-0.1em_0.333em_0.1em_rgba(0,0,0,0.5),inset_-0.1em_-0.333em_0.1em_rgba(0,0,0,0.5)]" />
              </div>
            </div>

            <div
              className="absolute inset-0 border-[1.25em] border-black rounded-[6.666em] flex flex-col overflow-hidden"
              style={{
                boxShadow: `inset 0 0 0.2em rgba(0, 0, 0, 0.8), inset 0 0.5em 1em rgba(0, 0, 0, 0.3)`,
              }}
            >
              {/* Glass reflection overlay */}
              <div
                className="absolute inset-0 rounded-[6.666em] pointer-events-none z-[5]"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 30%, transparent 70%, rgba(255, 255, 255, 0.05) 100%)`,
                  mixBlendMode: "overlay",
                }}
              />

              <div className="absolute top-0 inset-x-0 h-[3.33em] mt-[1.25em] flex justify-center z-[10] pointer-events-none">
                <div
                  className="bg-black w-[33.3%] h-full rounded-[1.66em] pointer-events-auto relative"
                  style={{
                    boxShadow: `
                    inset 0 0 0.1em rgba(0, 0, 0, 0.8),
                    inset 0 0.2em 0.3em rgba(0, 0, 0, 0.6),
                    0 0.1em 0.2em rgba(0, 0, 0, 0.4)
                  `,
                  }}
                >
                  {/* Inner glow */}
                  <div
                    className="absolute inset-[0.2em] rounded-[1.3em] pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0.15em rgba(255, 255, 255, 0.1)`,
                    }}
                  />
                </div>
              </div>

              <div
                className="camera absolute z-[20] top-[1.25em] right-[calc(50%-16.65%)] mr-[0.85em] mt-[0.85em] w-[1.6em] h-[1.6em] rounded-full flex items-center justify-center pointer-events-none"
                style={{
                  background:
                    "radial-gradient(#6667ac, transparent 50%) no-repeat 33.3% 10% / 75% 50%, radial-gradient(#2d2d6d, transparent 50%) no-repeat 60% 85% / 50% 50%, #080928",
                  boxShadow: `
                    inset 0 0 0.25em #4c4da3,
                    inset 0 0 0.1em rgba(0, 0, 0, 0.8),
                    0 0.05em 0.1em rgba(0, 0, 0, 0.5),
                    0 0 0.05em rgba(255, 255, 255, 0.1)
                  `,
                }}
              >
                {/* Lens reflection highlight */}
                <div className="absolute top-[20%] left-[25%] w-[30%] h-[25%] rounded-full bg-white/40 blur-[0.1em] pointer-events-none" />
                <div className="w-[33.3%] aspect-square rounded-full bg-[#080928] opacity-50 shadow-[inset_0_0_0.25em_#4c4da3]" />
              </div>

              {/* Screen content */}
              <div className="relative flex-grow overflow-hidden z-0">
                {/* 1. Le fond de l'écran (Widget SMS) */}
                <div className="absolute inset-0">
                  <SMSWidget />
                </div>

                {/* 2. LE LOCKSCREEN (C'est ICI qu'il faut l'ajouter) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: "-100%" }}
                  transition={{
                    delay: 1.5,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-between py-12"
                  style={{
                    background:
                      "linear-gradient(180deg, #BDB2FF 0%, #FFADAD 100%)",
                  }}
                >
                  {/* Contenu du lockscreen (Heure, date...) */}
                  <div className="mt-10 text-center">
                    <h2 className="text-[4em] font-bold text-white leading-none">
                      09:41
                    </h2>
                    <p className="text-[1.2em] text-white/90 font-medium">
                      Vendredi 20 février
                    </p>
                  </div>

                  {/* Barre de swipe en bas du lockscreen */}
                  <div className="mb-6 w-full flex justify-center">
                    <div className="w-[30%] h-[4px] bg-white/50 rounded-full" />
                  </div>
                </motion.div>

                {/* 3. La barre de navigation iPhone (Toujours visible ou z-40) */}
                <div className="absolute bottom-[0.75em] left-1/2 -translate-x-1/2 w-[36.6%] h-[0.5em] bg-black/20 rounded-full z-40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
