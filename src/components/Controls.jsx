import React from 'react';
import { motion } from 'framer-motion';

export default function Controls({ rollsLeft, onRoll, onReset, disableRoll }) {
  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileTap={{ scale: disableRoll ? 1 : 0.97 }}
        onClick={onRoll}
        disabled={disableRoll}
        className={`px-4 py-2 rounded-md font-medium shadow transition-colors ${disableRoll ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
      >
        {rollsLeft > 0 ? 'Roll' : 'No Rolls Left'}
      </motion.button>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-md font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-100 shadow"
      >
        New Round
      </button>
      <div className="ml-auto text-sm text-zinc-400">
        Hold dice by clicking on them.
      </div>
    </div>
  );
}
