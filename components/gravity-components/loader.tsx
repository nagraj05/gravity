"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background/80 backdrop-blur-md"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Rings */}
        <div className="relative w-24 h-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-4 border-primary/10 border-b-primary/60"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-8 bg-primary/20 rounded-full flex items-center justify-center"
          >
            <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </motion.div>
        </div>

        {/* Text Animation */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl font-bold tracking-tighter text-foreground"
          >
            GRAVITY
          </motion.h2>
          <motion.p
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="text-xs text-muted-foreground uppercase tracking-widest"
          >
            Stabilizing Orbit...
          </motion.p>
        </div>

        {/* Progress Bar (Indeterminate) */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            animate={{ x: [-192, 192] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-linear-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}
