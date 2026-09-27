import React, { useState, useEffect } from 'react';
import { Sparkles, FastForward } from 'lucide-react';

interface ClayNixSplashProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

export const ClayNixSplash: React.FC<ClayNixSplashProps> = ({ onComplete, isDarkMode }) => {
  // Animation phase:
  // 0: Initial scale down
  // 1: Swoop in & spin (0.05s -> 0.9s)
  // 2: Center hover & pulse (0.9s -> 2.1s)
  // 3: Screen blast (2.1s -> 2.6s)
  // 4: Fade out (2.6s -> 3.0s)
  const [phase, setPhase] = useState<number>(0);
  const [loadingText, setLoadingText] = useState('Evaluating /etc/nixos/configuration.nix...');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 50);

    const textTimer1 = setTimeout(() => {
      setLoadingText('Compiling Content-Addressed Derivations into /nix/store...');
    }, 700);

    const t2 = setTimeout(() => setPhase(2), 950);

    const textTimer2 = setTimeout(() => {
      setLoadingText('Ready. Atomic Symlink Pointing to Live Generation 45!');
    }, 1500);

    const t3 = setTimeout(() => setPhase(3), 2100);
    const t4 = setTimeout(() => setPhase(4), 2600);
    const t5 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(textTimer1);
      clearTimeout(t2);
      clearTimeout(textTimer2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const getTransform = () => {
    if (phase === 0) return 'scale(0.3) rotate(-90deg)';
    if (phase === 1) return 'scale(1) rotate(0deg)';
    if (phase === 2) return 'scale(1.2) rotate(15deg)';
    if (phase === 3) return 'scale(22) rotate(90deg)';
    return 'scale(28) rotate(120deg)';
  };

  const getTransition = () => {
    if (phase === 1) return 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
    if (phase === 2) return 'all 1.15s cubic-bezier(0.4, 0, 0.2, 1)';
    if (phase === 3) return 'all 0.5s cubic-bezier(0.7, 0, 0.84, 0)';
    return 'all 0.4s ease-out';
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isDarkMode ? 'bg-[#080c14]' : 'bg-[#f1f4f8]'
      } ${phase === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Background Soft Aura */}
      <div 
        className={`absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isDarkMode ? 'bg-cyan-500/15' : 'bg-cyan-500/20'
        } ${phase >= 3 ? 'scale-[6] opacity-0' : 'scale-100 opacity-100'}`}
      />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-slate-400 hover:text-white backdrop-blur-md border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
      >
        <span>Skip</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>

      {/* Main 3D Snowflake Capsule */}
      <div className="flex flex-col items-center justify-center gap-6 relative z-10 select-none">
        
        <div
          style={{
            transform: getTransform(),
            transition: getTransition()
          }}
          className="relative w-44 h-44 flex items-center justify-center cursor-pointer"
        >
          {/* Bulbous Clay Shadow Layer */}
          <div className="absolute inset-2 rounded-3xl bg-cyan-500/20 blur-xl animate-pulse" />

          {/* Central Claymorphic Disk */}
          <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 border-2 border-cyan-400/40 shadow-2xl flex items-center justify-center relative overflow-hidden group">
            
            {/* Shimmer Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />

            {/* Nix Snowflake 6-Petal SVG */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-24 h-24 text-cyan-400 drop-shadow-[0_4px_12px_rgba(6,182,212,0.6)] animate-spin-slow"
              fill="currentColor"
            >
              <g transform="translate(50,50)">
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <g key={deg} transform={`rotate(${deg})`}>
                    <path 
                      d="M -3,-38 L 3,-38 L 5,-14 L 14,-22 L 18,-18 L 6,-6 L 0,-15 L -6,-6 L -18,-18 L -14,-22 L -5,-14 Z" 
                      className={i % 2 === 0 ? "fill-cyan-400" : "fill-blue-500"} 
                    />
                  </g>
                ))}
                <circle cx="0" cy="0" r="5" className="fill-white" />
              </g>
            </svg>
          </div>
        </div>

        {/* Text Details & Progress (Visible before blast) */}
        <div className={`flex flex-col items-center gap-3 transition-opacity duration-300 ${phase >= 3 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black font-mono tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              NixOS Studio
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
              v24.05 LTS
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="h-4">{loadingText}</span>
          </div>

          {/* Tactile Progress Pill */}
          <div className="w-56 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 rounded-full transition-all duration-700 ease-out"
              style={{
                width: phase === 0 ? '15%' : phase === 1 ? '55%' : phase === 2 ? '90%' : '100%'
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
