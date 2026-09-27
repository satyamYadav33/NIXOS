import React, { useState } from 'react';
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
  Check,
  FileCode2,
  GitBranch,
  ShieldCheck
} from 'lucide-react';

interface NixosHeroProps {
  onNavigate: (tab: NixHubTab) => void;
}

export const NixosHero: React.FC<NixosHeroProps> = ({ onNavigate }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const pipelineSteps = [
    {
      title: '1. Declarative Spec',
      label: 'configuration.nix',
      icon: <FileCode2 className="w-4 h-4 text-cyan-500" />,
      detail: 'A single declarative blueprint defining your kernel, networking, user accounts, and services.',
      actionTab: 'config-builder' as NixHubTab
    },
    {
      title: '2. Pure Evaluation',
      label: 'Nix Derivations',
      icon: <Cpu className="w-4 h-4 text-blue-500" />,
      detail: 'Nix compiles derivations mathematically from inputs without touching or mutating the running host.',
      actionTab: 'architecture' as NixHubTab
    },
    {
      title: '3. Immutable Store',
      label: '/nix/store/<hash>',
      icon: <Box className="w-4 h-4 text-indigo-500" />,
      detail: 'Software is isolated by cryptographic hashes. Zero dependency hell or shared library clobbering.',
      actionTab: 'store-graph' as NixHubTab
    },
    {
      title: '4. Atomic Switch',
      label: '0.4s Symlink Flip',
      icon: <RotateCcw className="w-4 h-4 text-emerald-500" />,
      detail: 'Atomic pointer update to the new generation. Revert anytime with `nixos-rebuild switch --rollback`!',
      actionTab: 'rollback-timemachine' as NixHubTab
    }
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-14">
      
      {/* Background Soft Glow Halos */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-sky-500/10 to-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Top Hero Grid: Headlines + 3D Holographic Snowflake */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Core Value Proposition in Claymorphic Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            
            {/* Super Header Badge */}
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-cyan-600 dark:text-cyan-400 text-xs font-bold w-fit">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-mono">Pure Functional OS & Atomic Rollback Engine</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              The Operating System{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
                You Cannot Brick.
              </span>
            </h1>

            {/* Claymorphic Tactile Concept Card */}
            <div className="clay-card p-5 sm:p-6 space-y-3 relative overflow-hidden group">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>The Core Distinction</span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <strong className="text-slate-900 dark:text-white font-black text-cyan-600 dark:text-cyan-400">Nix is the package manager:</strong> isolating software in content-addressed store paths on Linux & macOS.
                <br />
                <strong className="text-slate-900 dark:text-white font-black text-blue-600 dark:text-blue-400">NixOS is the operating system:</strong> declaring your entire machine state in <code className="px-1.5 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-cyan-600 dark:text-cyan-300 font-mono text-xs font-bold">configuration.nix</code> with sub-second atomic rollbacks.
              </p>
            </div>

            {/* Quick Rollback Command Bar with Tactile Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="clay-inset flex items-center gap-2 px-4 py-2 font-mono text-xs text-slate-900 dark:text-slate-100 font-bold shadow-inner">
                <span className="text-cyan-500 select-none">$</span>
                <span>sudo nixos-rebuild switch --rollback</span>
                <button
                  onClick={() => copyToClipboard('sudo nixos-rebuild switch --rollback')}
                  className="ml-2 p-1 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer"
                  title="Copy rollback command"
                >
                  {copiedCmd === 'sudo nixos-rebuild switch --rollback' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Restores in ~0.4s!</span>
              </span>
            </div>

            {/* Call to Action Tactile Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onNavigate('rollback-timemachine')}
                className="clay-btn-primary px-5 py-3 text-white font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Simulate System Rollback</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>

              <button
                onClick={() => onNavigate('architecture')}
                className="clay-btn px-5 py-3 text-slate-800 dark:text-slate-200 font-bold text-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>Visual Architecture</span>
              </button>

              <button
                onClick={() => onNavigate('terminal')}
                className="clay-btn px-4 py-3 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-slate-500" />
                <span>Terminal Sim</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Claymorphic Snowflake Reactor Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="clay-card w-full max-w-md p-6 relative overflow-hidden group">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm" />
                </div>
                <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  pure-system-closure.drv
                </div>
                <div className="clay-badge px-2 py-0.5 text-[10px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Atomic</span>
                </div>
              </div>

              {/* Animated 3D Snowflake Core with Orbiting Derivation Nodes */}
              <div className="py-8 flex flex-col items-center justify-center relative">
                
                {/* Floating Tactile Badges Orbiting the Snowflake */}
                <div className="clay-badge absolute top-1 left-2 text-[10px] font-mono px-2 py-0.5 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm animate-bounce">
                  /nix/store/7v9x...-nginx
                </div>
                <div className="clay-badge absolute top-3 right-1 text-[10px] font-mono px-2 py-0.5 text-blue-600 dark:text-blue-400 font-bold shadow-sm">
                  kernel-6.6.52.drv
                </div>
                <div className="clay-badge absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm">
                  configuration.nix
                </div>
                <div className="clay-badge absolute bottom-1 right-2 text-[10px] font-mono px-2 py-0.5 text-emerald-600 dark:text-emerald-400 font-black shadow-sm animate-pulse">
                  Gen 45: Live
                </div>

                {/* Central 3D Bulbous Snowflake */}
                <div className="relative w-40 h-40 flex items-center justify-center cursor-pointer group/snowflake">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
                  <div className="relative z-10 w-32 h-32 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 border-2 border-cyan-400/40 shadow-2xl flex items-center justify-center group-hover/snowflake:rotate-90 transition-transform duration-700">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 text-cyan-400 drop-shadow-[0_4px_10px_rgba(6,182,212,0.5)]" fill="currentColor">
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

                <div className="mt-3 text-center">
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200">
                    Deterministic Closure Tree
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Hash: <span className="text-cyan-500 font-bold">0z3j8fk7x12a9v4p</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tactile Circular Gauges Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-center">
                <div className="clay-inset p-2.5 space-y-0.5">
                  <div className="text-xs font-black text-slate-900 dark:text-white font-mono">100%</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Reproducible</div>
                </div>
                <div className="clay-inset p-2.5 space-y-0.5">
                  <div className="text-xs font-black text-cyan-500 font-mono">0.4s</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Rollback</div>
                </div>
                <div className="clay-inset p-2.5 space-y-0.5">
                  <div className="text-xs font-black text-blue-500 font-mono">0</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Collisions</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Visual Interactive Architecture Pipeline Flow Diagram */}
        <div className="clay-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Visual Execution Pipeline</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                How NixOS Transforms Code Into an Operating System
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Click any step to inspect
            </span>
          </div>

          {/* 4 Interactive Pipeline Slabs with Animated Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {pipelineSteps.map((step, idx) => {
              const isSelected = activePipelineStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActivePipelineStep(idx);
                    onNavigate(step.actionTab);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-md transform -translate-y-1'
                      : 'clay-card hover:border-cyan-400/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                        {step.icon}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        STEP 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h4>

                    <div className="clay-inset px-2.5 py-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold truncate">
                      {step.label}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {step.detail}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                    <span>Explore Interactive</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
