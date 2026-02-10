"use client";

import { motion } from "motion/react";

export default function FloatingBlobs() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-linear-gradient-to-br dark:from-purple-500 dark:to-pink-500 opacity-20 blur-2xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-linear-gradient-to-br dark:from-blue-500 dark:to-purple-500 opacity-20 blur-3xl pointer-events-none"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
