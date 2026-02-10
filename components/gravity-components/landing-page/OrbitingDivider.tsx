"use client";

import { motion } from "motion/react";

export default function OrbitingDivider() {
  return (
    <div className="my-20 relative w-full max-w-4xl h-px">
      <div className="h-px w-full bg-linear-gradient-to-r dark:from-transparent dark:via-gray-700 dark:to-transparent" />

      {/* Small orbiting planet */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-48 h-48">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🪐
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
