"use client";
import AICard from "./features/AICard";
import GroupingCard from "./features/GroupingCard";
import ImportCard from "./features/ImportCard";
import SchedulingCard from "./features/SchedulingCard";
import CleanupCard from "./features/CleanupCard";
import RentabilityCard from "./features/RentabilityCard";
import PlaceholderCard from "./features/PlaceholderCard";
import { motion } from "framer-motion";

const smoothTransition = {
  duration: 0.6,
  ease: [0.165, 0.84, 0.44, 1] as const,
};

// Mise en page :  1 2 3
//                 1 4 5
//                 6 7 7
// Feature 0 = row-span-2 (col 1), Feature 6 = col-span-2 (ligne 3)
const LAYOUT: { rowSpan?: number; colSpan?: number }[] = [
  { rowSpan: 2 },       // 0: occupe 2 lignes à gauche
  {}, {}, {}, {}, {},  // 1-5: cellule normale
  { colSpan: 2 },      // 6: occupe 2 colonnes à droite
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

const featureCards = [
  AICard,
  GroupingCard,
  ImportCard,
  SchedulingCard,
  CleanupCard,
  RentabilityCard,
  PlaceholderCard,
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative left-1/2 -ml-[50vw] w-screen py-24 bg-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="inline-block px-4 py-2 rounded-full text-sm bg-amber-100 font-semibold text-slate-500 tracking-wider mb-4"
          >
            Fonctionnalités
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6"
          >
            L&apos;envoi de SMS devient enfin simple.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Des outils qu&apos;il vous faut pour gagner du temps et booster
            votre business.
          </motion.p>
        </div>

        {/* Grille 7 features : 1 2 3 / 1 4 5 / 6 7 7 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 auto-rows-fr"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.08 },
            },
          }}
        >
          {featureCards.map((Card, index) => {
            const layout = LAYOUT[index];
            const rowSpan = layout.rowSpan === 2 ? "md:row-span-2" : "";
            const colSpan = layout.colSpan === 2 ? "md:col-span-2" : "";
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`min-w-0 w-full h-full max-w-sm mx-auto md:mx-0 flex flex-col overflow-hidden ${rowSpan} ${colSpan} ${
                  layout.colSpan === 2 ? "md:max-w-none" : ""
                }`}
                style={{ contain: "layout" }}
              >
                <Card />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
