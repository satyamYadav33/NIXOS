import React, { useEffect, useState } from 'react';

interface ThemeTransitionWaveProps {
  isAnimating: boolean;
  targetTheme: 'dark' | 'light';
  onAnimationEnd: () => void;
  originCoords?: { x: number; y: number } | null;
}

export const ThemeTransitionWave: React.FC<ThemeTransitionWaveProps> = ({
  isAnimating,
  targetTheme,
  onAnimationEnd,
  originCoords
}) => {
  const [stage, setStage] = useState<'idle' | 'expanding' | 'dissolving'>('idle');

  useEffect(() => {
    if (isAnimating) {
      setStage('expanding');
      const timer1 = setTimeout(() => {
        setStage('dissolving');
      }, 450);

      const timer2 = setTimeout(() => {
        setStage('idle');
        onAnimationEnd();
      }, 750);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isAnimating, onAnimationEnd]);

  if (!isAnimating && stage === 'idle') return null;

  const posX = originCoords?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const posY = originCoords?.y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Expanding tactile Clay Shockwave */}
      <div
        style={{
          left: `${posX}px`,
          top: `${posY}px`,
          transform: 'translate(-50%, -50%)',
        }}
        className={`absolute rounded-full transition-all duration-700 ease-out will-change-transform ${
          stage === 'expanding' 
            ? 'w-[280vmax] h-[280vmax] opacity-100' 
            : stage === 'dissolving' 
            ? 'w-[320vmax] h-[320vmax] opacity-0' 
            : 'w-0 h-0 opacity-0'
        } ${
          targetTheme === 'dark'
            ? 'bg-gradient-to-br from-[#0b1322] via-[#080c14] to-[#04060a]'
            : 'bg-gradient-to-br from-[#e4ebf5] via-[#edf3fa] to-[#e9eff7]'
        }`}
      >
        {/* Glowing Rim / Clay Lip */}
        <div
          className={`w-full h-full rounded-full transition-opacity duration-500 ${
            targetTheme === 'dark'
              ? 'border-[16px] border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.3)]'
              : 'border-[16px] border-amber-400/30 shadow-[0_0_100px_rgba(251,191,36,0.35)]'
          }`}
        />
      </div>
    </div>
  );
};
