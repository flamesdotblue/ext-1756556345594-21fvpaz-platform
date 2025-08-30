import React from 'react';
import { motion } from 'framer-motion';

export default function Hands({ isRolling, anyHeld }) {
  const active = isRolling || anyHeld;
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Left hand */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-40"
        initial={false}
        animate={{ x: active ? 10 : -120, rotate: active ? 6 : 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 top-6 w-36 h-28 rounded-[40%] bg-gradient-to-br from-amber-200/70 to-amber-800/60 shadow-2xl blur-[0.5px]" />
          <div className="absolute left-28 top-2 w-10 h-10 rounded-full bg-amber-900/60" />
          {/* fingers */}
          <div className="absolute left-24 top-8 w-10 h-3 rounded-full bg-amber-300/70" />
          <div className="absolute left-24 top-14 w-10 h-3 rounded-full bg-amber-300/70" />
          <div className="absolute left-24 top-20 w-10 h-3 rounded-full bg-amber-300/70" />
        </div>
      </motion.div>

      {/* Right hand */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40"
        initial={false}
        animate={{ x: active ? -10 : 120, rotate: active ? -6 : 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute right-0 top-6 w-36 h-28 rounded-[40%] bg-gradient-to-bl from-amber-200/70 to-amber-800/60 shadow-2xl blur-[0.5px]" />
          <div className="absolute right-28 top-2 w-10 h-10 rounded-full bg-amber-900/60" />
          <div className="absolute right-24 top-8 w-10 h-3 rounded-full bg-amber-300/70" />
          <div className="absolute right-24 top-14 w-10 h-3 rounded-full bg-amber-300/70" />
          <div className="absolute right-24 top-20 w-10 h-3 rounded-full bg-amber-300/70" />
        </div>
      </motion.div>
    </div>
  );
}
