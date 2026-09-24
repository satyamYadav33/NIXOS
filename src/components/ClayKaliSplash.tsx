import React, { useState, useEffect } from 'react';

interface ClayKaliSplashProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export const ClayKaliSplash: React.FC<ClayKaliSplashProps> = ({ onComplete, isDarkMode }) => {
  const [corner] = useState<Corner>(() => {
    const corners: Corner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    const randomIndex = Math.floor(Math.random() * corners.length);
    return corners[randomIndex];
  });

  // Animation phase:
  // 0: Initial outside corner
  // 1: Swoop into center (0.05s -> 0.9s)
  // 2: Center slow grow & hover (0.9s -> 2.1s)
  // 3: Rapid blast to full screen (2.1s -> 2.7s)
  // 4: Blending out & fade (2.7s -> 3.2s)
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    // Start swoop into center almost immediately
    const t1 = setTimeout(() => setPhase(1), 50);

    // Center slow grow
    const t2 = setTimeout(() => setPhase(2), 950);

    // Rapid expansion to whole screen
    const t3 = setTimeout(() => setPhase(3), 2100);

    // Blend out into background
    const t4 = setTimeout(() => setPhase(4), 2700);

    // Animation complete
    const t5 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Calculate transform according to corner and phase
  const getTransformStyle = () => {
    if (phase === 0) {
      switch (corner) {
        case 'top-left':
          return 'translate(-85vw, -85vh) rotate(-45deg) scale(0.35)';
        case 'top-right':
          return 'translate(85vw, -85vh) rotate(45deg) scale(0.35)';
        case 'bottom-left':
          return 'translate(-85vw, 85vh) rotate(-135deg) scale(0.35)';
        case 'bottom-right':
          return 'translate(85vw, 85vh) rotate(135deg) scale(0.35)';
      }
    } else if (phase === 1) {
      return 'translate(0, 0) rotate(0deg) scale(1)';
    } else if (phase === 2) {
      return 'translate(0, 0) rotate(0deg) scale(1.35)';
    } else if (phase === 3) {
      return 'translate(0, 0) rotate(0deg) scale(24)';
    } else {
      return 'translate(0, 0) rotate(0deg) scale(32)';
    }
  };

  const getTransitionStyle = () => {
    if (phase === 1) {
      return 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
    } else if (phase === 2) {
      return 'all 1.15s cubic-bezier(0.4, 0, 0.2, 1)';
    } else if (phase === 3) {
      return 'all 0.6s cubic-bezier(0.7, 0, 0.84, 0)';
    } else {
      return 'all 0.5s ease-out';
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isDarkMode ? 'bg-[#080c14]' : 'bg-[#e9eff7]'
      } ${phase === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Background Soft Glow Ring */}
      <div 
        className={`absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isDarkMode ? 'bg-cyan-500/15' : 'bg-cyan-500/25'
        } ${phase >= 3 ? 'scale-[6] opacity-0' : 'scale-100 opacity-100'}`}
      />

      {/* Skipping button in corner for convenience */}
      <button
        onClick={onComplete}
        className={`absolute bottom-6 right-6 px-4 py-1.5 text-xs font-mono font-medium rounded-full z-50 transition-all ${
          isDarkMode 
            ? 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800' 
            : 'bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200'
        }`}
      >
        Skip [ESC]
      </button>

      {/* Trajectory Direction Indicator (Faint) */}
      <div className={`absolute top-6 left-6 text-[11px] font-mono tracking-wider uppercase opacity-40 ${
        isDarkMode ? 'text-cyan-400' : 'text-slate-500'
      }`}>
        Origin: {corner.replace('-', ' ')}
      </div>

      {/* Main Animated Clay Kali Emblem */}
      <div
        style={{
          transform: getTransformStyle(),
          transition: getTransitionStyle(),
          transformOrigin: 'center center'
        }}
        className="relative flex flex-col items-center justify-center cursor-default select-none will-change-transform"
      >
        {/* 3D Tactile Clay Card Container */}
        <div
          className={`relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-[2.5rem] transition-all duration-300 ${
            isDarkMode 
              ? 'bg-[#111a2d] border border-cyan-500/20' 
              : 'bg-[#e4ebf5] border border-white/80'
          }`}
          style={{
            boxShadow: isDarkMode
              ? '16px 16px 36px rgba(0,0,0,0.85), -12px -12px 30px rgba(26,36,56,0.6), inset 3px 3px 8px rgba(255,255,255,0.12), inset -4px -4px 10px rgba(0,0,0,0.7)'
              : '16px 16px 36px rgba(166,178,198,0.7), -14px -14px 32px rgba(255,255,255,0.98), inset 4px 4px 8px rgba(255,255,255,0.95), inset -4px -4px 8px rgba(166,178,198,0.4)'
          }}
        >
          {/* Inner Recessed Clay Well for the Dragon */}
          <div 
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] flex items-center justify-center p-3 transition-colors ${
              isDarkMode 
                ? 'bg-[#0b1220]' 
                : 'bg-[#edf3fa]'
            }`}
            style={{
              boxShadow: isDarkMode
                ? 'inset 4px 4px 10px rgba(0,0,0,0.9), inset -3px -3px 8px rgba(255,255,255,0.06)'
                : 'inset 4px 4px 8px rgba(166,178,198,0.5), inset -4px -4px 8px rgba(255,255,255,0.95)'
            }}
          >
            {/* Kali Linux Dragon Vector */}
            <svg
              viewBox="0 0 240 240"
              className={`w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md ${phase === 2 ? 'animate-pulse' : ''}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="kaliDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e1b4b" />
                </linearGradient>
                <filter id="clayGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#06b6d4" floodOpacity="0.45" />
                </filter>
              </defs>
              
              {/* Kali Dragon Outline Path */}
              <path
                d="M 175 40 
                   C 165 42, 150 49, 142 58
                   C 134 67, 126 80, 118 92
                   C 105 85, 90 82, 75 88
                   C 58 95, 46 110, 42 128
                   C 39 143, 44 160, 56 172
                   C 70 186, 92 191, 110 184
                   C 126 178, 137 165, 142 150
                   C 146 138, 144 125, 138 114
                   C 148 108, 158 98, 168 88
                   C 180 76, 192 60, 195 44
                   C 190 41, 182 40, 175 40 Z
                   M 115 110
                   C 122 118, 124 130, 120 140
                   C 116 150, 106 158, 95 160
                   C 82 162, 70 156, 64 145
                   C 58 133, 62 118, 72 110
                   C 84 102, 102 102, 115 110 Z"
                fill="url(#kaliDragonGrad)"
                filter="url(#clayGlow)"
              />
              {/* Dragon Wing & Spine Accents */}
              <path
                d="M 148 65 Q 170 85 185 115 Q 160 110 145 100 Z"
                fill="#38bdf8"
                opacity="0.9"
              />
              <path
                d="M 125 90 Q 145 110 160 135 Q 138 128 128 118 Z"
                fill="#0ea5e9"
                opacity="0.8"
              />
              <circle cx="165" cy="52" r="3.5" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Text Branding (Reveals during center phase) */}
        <div 
          className={`mt-4 text-center transition-all duration-300 ${
            phase >= 1 && phase <= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className={`text-xl sm:text-2xl font-black tracking-widest font-mono ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              KALI<span className="text-cyan-500">LINUX</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
              v2026
            </span>
          </div>
          <p className={`text-[11px] font-medium tracking-wide mt-1 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Tactical Cybersecurity & Red Team Platform
          </p>
        </div>

      </div>
    </div>
  );
};
