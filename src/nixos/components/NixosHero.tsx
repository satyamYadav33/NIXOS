import React from 'react';
import type { NixHubTab } from '../types';
import { 
  RotateCcw, 
  Layers, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Box, 
  Copy, 
  Check 
} from 'lucide-react';

interface NixosHeroProps {
  onNavigate: (tab: NixHubTab) => void;
}

export const NixosHero: React.FC<NixosHeroProps> = ({ onNavigate }) => {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const featurePills = [
    {
      title: 'Nix: Functional Package Manager',
      desc: 'Isolates software in /nix/store. Zero dependency collisions.',
      tab: 'architecture' as NixHubTab,
      icon: <Box className="w-4 h-4 text-cyan-500" />
    },
    {
      title: 'NixOS: Declarative Operating System',
      desc: 'The entire OS, services & users defined in configuration.nix.',
      tab: 'config-builder' as NixHubTab,
      icon: <Layers className="w-4 h-4 text-blue-500" />
    },
    {
      title: 'Sub-Second Rollbacks',
      desc: 'Instantly revert broken updates with `nixos-rebuild switch --rollback`.',
      tab: 'rollback-timemachine' as NixHubTab,
      icon: <RotateCcw className="w-4 h-4 text-emerald-500" />
    },
    {
      title: 'Bit-for-Bit Reproducibility',
      desc: 'Share a configuration or flake to replicate identical machines.',
      tab: 'imperative-vs-declarative' as NixHubTab,
      icon: <Cpu className="w-4 h-4 text-indigo-500" />
    }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-sky-500/10 to-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Super Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400 text-xs font-bold w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Declarative Linux Architecture & Package Isolation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Master <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">Nix & NixOS</span>:
              <br />
              The Pure Declarative Revolution.
            </h1>

            {/* Core Distinction Quote (Grounded in User Explanation) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm relative">
              <div className="absolute -left-1 top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-2">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">Nix is the package manager:</span> responsible for installing, managing, and isolating software packages on Linux & macOS without dependency conflicts.
                <br className="my-1 sm:block hidden" />
                <span className="font-bold text-blue-600 dark:text-blue-400">NixOS is the operating system:</span> extending that declarative management to the entire machine in <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-300 font-mono text-xs">configuration.nix</code> with atomic generations and instant rollbacks.
              </p>
            </div>

            {/* Command Showcase Quick Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 shadow-md">
                <span className="text-cyan-400 select-none">$</span>
                <span>sudo nixos-rebuild switch --rollback</span>
                <button
                  onClick={() => copyToClipboard('sudo nixos-rebuild switch --rollback')}
                  className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy rollback command"
                >
                  {copiedCmd === 'sudo nixos-rebuild switch --rollback' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                ⚡ Reverts broken updates in 0.4 seconds!
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('rollback-timemachine')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Simulate System Rollback</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onNavigate('architecture')}
                className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>Explore Architecture</span>
              </button>

              <button
                onClick={() => onNavigate('terminal')}
                className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-slate-500" />
                <span>Terminal</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Visual Snowflake & System Derivation Reactor */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md p-6 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800/80 shadow-xl overflow-hidden">
              
              {/* Header of Reactor Card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500">
                  closure-derivation.drv
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pure Closure</span>
                </div>
              </div>

              {/* Animated Interactive Snowflake Graphic */}
              <div className="py-8 flex flex-col items-center justify-center relative">
                
                {/* Floating Derivation Badges Around Center */}
                <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 animate-bounce">
                  /nix/store/7v9x...-nginx
                </div>
                <div className="absolute top-4 right-2 text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  kernel-6.6.52.drv
                </div>
                <div className="absolute bottom-4 left-4 text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  configuration.nix
                </div>
                <div className="absolute bottom-2 right-4 text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-pulse">
                  Gen 45: Active
                </div>

                {/* Central Snowflake Node */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/15 animate-ping duration-1000" />
                  <div className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-cyan-400/40 shadow-2xl flex items-center justify-center group cursor-pointer hover:rotate-90 transition-transform duration-700">
                    <svg viewBox="0 0 100 100" className="w-18 h-18 text-cyan-400" fill="currentColor">
                      <g transform="translate(50,50)">
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                          <g key={deg} transform={`rotate(${deg})`}>
                            <path 
                              d="M -3,-38 L 3,-38 L 5,-14 L 14,-22 L 18,-18 L 6,-6 L 0,-15 L -6,-6 L -18,-18 L -14,-22 L -5,-14 Z" 
                              className={i % 2 === 0 ? "fill-cyan-400" : "fill-sky-400"} 
                            />
                          </g>
                        ))}
                        <circle cx="0" cy="0" r="5" className="fill-white" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Deterministic Closure Tree
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Input Hash: <span className="text-cyan-500 font-semibold">0z3j8fk7x12a9v4p</span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">100%</div>
                  <div className="text-[10px] text-slate-500">Reproducible</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="text-xs font-bold text-cyan-500 font-mono">0.4s</div>
                  <div className="text-[10px] text-slate-500">Rollback</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="text-xs font-bold text-blue-500 font-mono">0</div>
                  <div className="text-[10px] text-slate-500">Collisions</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {featurePills.map((pill, i) => (
            <div
              key={i}
              onClick={() => onNavigate(pill.tab)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {pill.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {pill.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pill.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <span>Explore Interactive</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
