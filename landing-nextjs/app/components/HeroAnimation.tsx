'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroAnimation() {
  // This state is used to "reset" the animation loop
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Restarts the animation every 10 seconds
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // 1. CHAT BUBBLE VARIANTS
  const bubbleVariants: Variants = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: (delay: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay, type: 'spring', stiffness: 200, damping: 20 }
    }),
  };

  // 2. TYPING DOTS VARIANTS
  const typingVariants: Variants = {
    initial: { opacity: 0, display: 'none' },
    animate: (startDelay: number) => ({
      opacity: [0, 1, 1, 0], // Fade in, hold, fade out
      display: ['flex', 'flex', 'flex', 'none'], // "none" at the end removes the space it occupied
      transition: {
        times: [0, 0.1, 0.8, 1], // Percentage of duration for each keyframe
        duration: 1.5,
        delay: startDelay,
      },
    }),
  };

  return (
    <div className="flex items-center justify-center w-full h-[500px] bg-gray-50 rounded-3xl border border-gray-100 relative overflow-hidden">
      <div className="relative w-[260px] h-[480px] bg-white border-[8px] border-gray-900 rounded-[3rem] shadow-2xl overflow-hidden">
        {/* PHONE NOTCH */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-20"></div>

        {/* CHAT CONTAINER - The 'key' forces React to re-render and restart animations */}
        <div key={count} className="flex flex-col gap-3 p-4 pt-12">

          {/* STEP 1: Dots appear at 0s, disappear at 1.5s */}
          <motion.div variants={typingVariants} custom={0} initial="initial" animate="animate" className="self-start bg-gray-100 flex gap-1 p-3 rounded-2xl rounded-bl-none w-16">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </motion.div>

          {/* STEP 2: Message 1 appears at 1.5s */}
          <motion.div variants={bubbleVariants} custom={1.5} initial="initial" animate="animate" className="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-bl-none text-sm">
            Hello! How can I help you?
          </motion.div>

          {/* STEP 3: User response appears at 2.5s */}
          <motion.div variants={bubbleVariants} custom={2.5} initial="initial" animate="animate" className="self-end bg-fuchsia-900 text-white p-3 rounded-2xl rounded-br-none text-sm">
            Send campaign to 500 clients.
          </motion.div>

          {/* STEP 4: Dots appear at 3.5s, disappear at 5s */}
          <motion.div variants={typingVariants} custom={3.5} initial="initial" animate="animate" className="self-start bg-gray-100 flex gap-1 p-3 rounded-2xl rounded-bl-none w-16">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </motion.div>

          {/* STEP 5: Final Result appears at 5s */}
          <motion.div variants={bubbleVariants} custom={5} initial="initial" animate="animate" className="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-bl-none text-sm font-bold">
            Done! 🚀 Sent.
          </motion.div>
        </div>
      </div>

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
    </div>
  );
}