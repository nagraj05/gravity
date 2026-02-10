"use client";

import { motion } from "motion/react";

export default function Astronaut() {
  return (
    <motion.div
      className="absolute bottom-20 left-10 text-5xl pointer-events-none"
      animate={{
        y: [0, -20, 0],
        rotate: [-10, 10, -10],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      🧑‍🚀
    </motion.div>
  );
}
