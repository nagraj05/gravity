"use client";

import { motion } from "motion/react";
import { JSX } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  delay: number;
  icon: string;
}

function FeatureCard({
  title,
  description,
  delay,
  icon,
}: FeatureCardProps): JSX.Element {
  return (
    <motion.div
      className="rounded-2xl border dark:border-gray-800 p-6 hover:border-purple-500 transition backdrop-blur-sm dark:bg-gray-900/30 relative overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
      }}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-gradient-to-br dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />

      {/* <motion.div
        className="text-4xl mb-4"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      > */}
      {icon}
      {/* </motion.div> */}

      <h3 className="text-xl font-semibold mb-2 relative z-10">{title}</h3>
      <p className="text-gray-400 relative z-10">{description}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full">
      <FeatureCard
        title="No Likes"
        description="Posts don't compete for attention. They earn gravity through depth."
        delay={0.2}
        icon="⭐"
      />

      <FeatureCard
        title="Interest-Driven"
        description="You don't follow people. You fall into ideas and thoughts."
        delay={0.4}
        icon="🌌"
      />

      <FeatureCard
        title="Finite Feed"
        description="No infinite scroll. Consume consciously. Leave fulfilled."
        delay={0.6}
        icon="🌙"
      />
    </section>
  );
}
