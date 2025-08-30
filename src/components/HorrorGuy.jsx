import React from 'react';
import { motion } from 'framer-motion';

export default function HorrorGuy({ active, yahtzee }) {
  return (
    <div className="relative">
      <motion.div
        className="mx-auto mt-2 mb-4 h-32 w-full max-w-4xl relative"
        initial={false}
      >
        {/* shadowy end of table figure */}
        <div className="absolute inset-x-0 -top-2 flex justify-center">
          <motion.div
            animate={{ scale: active ? 1.04 : 1, y: active ? -2 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="relative h-24 w-24 rounded-full bg-gradient-to-b from-black to-zinc-900 shadow-[0_0_60px_-10px_rgba(255,0,0,0.25)]"
          >
            <div className="absolute inset-0 -top-2 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-zinc-900/80" />
            </div>
            {/* eyes */}
            <motion.div
              className="absolute left-6 top-10 h-2 w-4 rounded-[4px] bg-red-500 shadow-[0_0_8px_2px_rgba(255,0,0,0.5)]"
              animate={{ opacity: yahtzee ? [1, 0.2, 1] : (active ? 1 : 0.65) }}
              transition={{ duration: yahtzee ? 0.2 : 1.2, repeat: yahtzee ? 8 : Infinity, repeatType: yahtzee ? 'reverse' : 'mirror' }}
            />
            <motion.div
              className="absolute right-6 top-10 h-2 w-4 rounded-[4px] bg-red-500 shadow-[0_0_8px_2px_rgba(255,0,0,0.5)]"
              animate={{ opacity: yahtzee ? [1, 0.2, 1] : (active ? 1 : 0.65) }}
              transition={{ duration: yahtzee ? 0.2 : 1.2, repeat: yahtzee ? 8 : Infinity, repeatType: yahtzee ? 'reverse' : 'mirror' }}
            />
            {/* grin */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-6 h-1 w-10 rounded-full bg-red-600/70"
              animate={{ width: active ? 26 : 20, opacity: active ? 1 : 0.7 }}
              transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            />
          </motion.div>
        </div>

        {/* mist */}
        <div className="absolute inset-0">
          <div className="absolute left-0 right-0 top-6 mx-auto h-16 w-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)] blur-xl" />
        </div>
      </motion.div>
    </div>
  );
}
