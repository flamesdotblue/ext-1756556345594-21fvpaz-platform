import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Pips({ value }) {
  // positions for 1-6 pip layouts on a 3x3 grid
  const map = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };
  const cells = map[value] || [];
  return (
    <div className="absolute inset-1 grid grid-cols-3 grid-rows-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="relative">
          {cells.includes(i + 1) && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-zinc-100 shadow-[0_0_0_1px_rgba(0,0,0,0.25)_inset]" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function DiceTable({ dice, isRolling, onToggleHold }) {
  return (
    <div className="relative">
      <div className="mx-auto w-full max-w-4xl h-[380px] perspective-[1200px]">
        {/* table surface */}
        <div className="relative w-full h-full rounded-xl bg-emerald-900/70 shadow-2xl border border-emerald-800 overflow-visible" style={{ transform: 'rotateX(18deg)', transformOrigin: 'bottom center' }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35),transparent_60%)] rounded-xl pointer-events-none" />

          {/* dice row */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[38%] flex gap-6">
            {dice.map((d, i) => {
              const heldShift = (i < 2 ? -1 : (i > 2 ? 1 : 0)) * (d.held ? 40 : 0); // push outwards if held
              const rollSpin = isRolling && !d.held ? 1 : 0;
              return (
                <motion.button
                  key={i}
                  onClick={() => onToggleHold(i)}
                  disabled={isRolling}
                  className={`relative select-none`}
                  initial={false}
                  animate={{
                    y: d.held ? -8 : 0,
                    x: heldShift,
                    rotateZ: d.held ? (i % 2 ? -3 : 3) : 0,
                    scale: isRolling && !d.held ? 1.05 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-neutral-200 shadow-[inset_0_-10px_0_0_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.5)] border border-neutral-300`}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      rotateX: rollSpin ? 360 : 15,
                      rotateY: rollSpin ? 360 : -12,
                      rotateZ: rollSpin ? 180 : (d.held ? 2 : 0),
                    }}
                    transition={{ duration: rollSpin ? 1.0 : 0.6, ease: rollSpin ? 'easeInOut' : 'easeOut' }}
                  >
                    <Pips value={d.value} />
                    {/* subtle highlight */}
                    <div className="pointer-events-none absolute -inset-0.5 rounded-[10px] bg-gradient-to-br from-white/30 to-transparent mix-blend-overlay" />
                    {/* hold indicator ribbon */}
                    <AnimatePresence>
                      {d.held && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/90 text-zinc-900 shadow">
                          HELD
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* wood edges for 3D feel */}
          <div className="absolute -inset-2 rounded-[14px] border border-emerald-950/50 pointer-events-none" />
          <div className="absolute -bottom-8 left-0 right-0 h-10 bg-emerald-950/50 blur-xl" />
        </div>
      </div>
    </div>
  );
}
