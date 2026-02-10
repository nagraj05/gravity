"use client";

import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <>
      {/* Rocket animation */}
      <motion.div
        className="absolute top-10 right-10 text-6xl"
        animate={{
          y: [-20, -100],
          x: [0, 50],
          rotate: 45,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        🚀
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-tight flex gap-2 items-center justify-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px rgba(168, 85, 247, 0.4)",
              "0 0 40px rgba(168, 85, 247, 0.8)",
              "0 0 20px rgba(168, 85, 247, 0.4)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Gravity!
        </motion.span>
      </motion.h1>

      <section className="max-w-5xl w-full text-center space-y-8">
        <motion.h2
          className="text-md sm:text-md lg:text-xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          What pulls{" "}
          <motion.span
            className="bg-linear-to-r from-purple-400 to-pink-500 dark:bg-linear-gradient-to-r dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            you in?
          </motion.span>
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto text-lg sm:text-xl dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Gravity is a social space built around thoughts, depth, and meaning —
          not likes, not noise.
        </motion.p>
      </section>
    </>
  );
}
