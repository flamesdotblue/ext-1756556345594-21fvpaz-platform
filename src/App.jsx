import React, { useMemo, useState, useEffect, useCallback } from 'react';
import DiceTable from './components/DiceTable';
import Controls from './components/Controls';
import Hands from './components/Hands';
import HorrorGuy from './components/HorrorGuy';

const initialDice = () => Array.from({ length: 5 }, () => ({ value: Math.ceil(Math.random() * 6), held: false }))

export default function App() {
  const [dice, setDice] = useState(initialDice);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [isRolling, setIsRolling] = useState(false);
  const [scare, setScare] = useState(false);

  const allEqual = useMemo(() => dice.every(d => d.value === dice[0].value), [dice]);

  useEffect(() => {
    if (!isRolling && allEqual && rollsLeft < 3) {
      setScare(true);
      const t = setTimeout(() => setScare(false), 1500);
      return () => clearTimeout(t);
    }
  }, [isRolling, allEqual, rollsLeft]);

  const toggleHold = useCallback((index) => {
    setDice(prev => prev.map((d, i) => i === index ? { ...d, held: !d.held } : d));
  }, []);

  const resetRound = useCallback(() => {
    setDice(initialDice());
    setRollsLeft(3);
    setScare(false);
  }, []);

  const rollDice = useCallback(() => {
    if (rollsLeft <= 0 || isRolling) return;
    setIsRolling(true);

    // pre-animation: nudge held dice outward by toggling a transient flag via class in DiceTable using isRolling
    const rollDuration = 1100;
    const tickInterval = 140;
    let elapsed = 0;

    const jitter = () => {
      setDice(prev => prev.map(d => d.held ? d : { ...d, value: Math.ceil(Math.random() * 6) }));
    };

    const timer = setInterval(() => {
      elapsed += tickInterval;
      jitter();
      if (elapsed >= rollDuration) {
        clearInterval(timer);
        // finalize values
        setDice(prev => prev.map(d => d.held ? d : { ...d, value: Math.ceil(Math.random() * 6) }));
        setIsRolling(false);
        setRollsLeft(r => Math.max(0, r - 1));
      }
    }, tickInterval);
  }, [rollsLeft, isRolling]);

  return (
    <div className={`min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-100 relative ${scare ? 'animate-[shake_0.15s_ease-in-out_8]' : ''}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.05),transparent_60%)]" />

      <HorrorGuy active={scare} yahtzee={allEqual && rollsLeft < 3} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-8 pb-24 flex flex-col gap-6">
        <header className="flex items-baseline justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Yahtzee at the Midnight Table</h1>
          <div className="text-sm text-zinc-400">Rolls left: <span className="text-zinc-200 font-medium">{rollsLeft}</span></div>
        </header>

        <div className="relative">
          <Hands isRolling={isRolling} anyHeld={dice.some(d => d.held)} />
          <DiceTable dice={dice} isRolling={isRolling} onToggleHold={toggleHold} />
        </div>

        <Controls
          rollsLeft={rollsLeft}
          onRoll={rollDice}
          onReset={resetRound}
          disableRoll={isRolling || rollsLeft <= 0}
        />

        <footer className="text-xs text-zinc-500">
          Tip: Click a die to hold it. The ghostly hands will push held dice aside during a roll.
        </footer>
      </main>

      <style>{`
        @keyframes shake { 10%{transform:translate(-1px, 0)} 20%{transform:translate(2px, -1px)} 30%{transform:translate(-1px, 1px)} 40%{transform:translate(1px, 0)} 50%{transform:translate(-2px, 1px)} 60%{transform:translate(1px, -1px)} 70%{transform:translate(-1px, 0)} 80%{transform:translate(2px, 1px)} 90%{transform:translate(-1px, -1px)} }
      `}</style>
    </div>
  );
}
