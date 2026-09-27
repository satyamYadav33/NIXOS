import React, { useState } from 'react';
import { COMPARISON_POINTS } from '../data/nixosData';
import { 
  GitCompare, 
  AlertTriangle, 
  Play, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

export const ImperativeVsDeclarative: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<'conflict' | 'powercut' | 'driver' | 'replicate'>('conflict');
  const [simStep, setSimStep] = useState<'idle' | 'running' | 'resolved'>('idle');

  const simulations = {
    conflict: {
      title: 'Diamond Dependency Conflict (OpenSSL 1.1 vs 3.0)',
      description: 'Legacy internal microservice requires OpenSSL 1.1, but modern CLI tool requires OpenSSL 3.0.',
      traditional: {
        action: '$ sudo apt install tool-requiring-ssl3',
        status: 'CRITICAL FAILURE',
        details: 'Package manager overwrote /usr/lib/x86_64-linux-gnu/libssl.so. Legacy service crashes with symbol lookup error: undefined symbol SSLv23_method. Production is down!',
        color: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
      },
      nixos: {
        action: 'environment.systemPackages = [ legacyApp modernTool ]; in configuration.nix',
        status: 'PERFECT ISOLATION',
        details: 'Nix links legacyApp to /nix/store/3p7w...-openssl-1.1.1u and modernTool to /nix/store/8r1t...-openssl-3.0.13 via ELF RPATH headers. Zero conflict!',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    },
    powercut: {
      title: 'Power Failure Mid-Upgrade',
      description: 'Your laptop battery dies right as the package manager is unpacking core C libraries and kernel modules.',
      traditional: {
        action: '$ sudo apt upgrade (abruptly cut at 52%)',
        status: 'BRICKED SYSTEM STATE',
        details: 'glibc is half-overwritten. /bin/sh dynamic linker throws SIGSEGV. dpkg database is locked. System cannot spawn a rescue shell upon reboot.',
        color: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
      },
      nixos: {
        action: '$ sudo nixos-rebuild switch (cut during build)',
        status: '100% UNTOUCHED & SAFE',
        details: 'Nix compiles derivations into unreferenced /nix/store paths first. The atomic symlink switch never executed! Active running system continues without a single scratch.',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    },
    driver: {
      title: 'Faulty Experimental GPU Driver',
      description: 'You enabled a beta Nvidia driver that causes kernel panics and a black screen upon starting the display manager.',
      traditional: {
        action: '$ sudo dnf install akmod-nvidia-beta',
        status: 'HEADLESS PANIC',
        details: 'Black screen with blinking cursor. User must prepare a USB recovery drive, chroot into root filesystem, and manually purge DKMS modules.',
        color: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
      },
      nixos: {
        action: '$ sudo nixos-rebuild switch',
        status: '0.4s ROLLBACK RECOVERY',
        details: 'Reboot PC. Select previous generation (e.g. Gen 42) in the systemd-boot menu. Machine boots in 4 seconds into the working driver with zero trace of failure!',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    },
    replicate: {
      title: 'Deploy to 10 Cloud Servers / New Laptop',
      description: 'You need to set up a replica staging server or configure a brand new work laptop to match your exact workstation.',
      traditional: {
        action: 'Write ad-hoc shell scripts, Ansible playbooks, hunt down configs',
        status: 'CONFIGURATION DRIFT',
        details: 'Takes hours. Forgotten apt dependencies, slight OS version discrepancies, and manual /etc tweaks result in "works on my machine" bugs.',
        color: 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
      },
      nixos: {
        action: '$ nixos-rebuild switch --flake .#staging-server',
        status: 'BIT-FOR-BIT IDENTICAL',
        details: 'The entire OS, services, user accounts, and shell configs compile identically in minutes. Guaranteed mathematical reproducibility across all nodes!',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    }
  };

  const currentSim = simulations[activeSimulation];

  const runSimulation = () => {
    setSimStep('running');
    setTimeout(() => {
      setSimStep('resolved');
    }, 900);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Paradigm Shift</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Imperative OS vs Declarative NixOS
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Traditional operating systems rely on a sequence of commands that mutate global state over time. NixOS models your machine as a pure mathematical function of its configuration.
        </p>
      </div>

      {/* Interactive Simulation Arena */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Crash & Resilience Simulator</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Select a Catastrophic Scenario:
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'conflict', label: 'Dependency Hell' },
              { id: 'powercut', label: 'Power Cut Mid-Upgrade' },
              { id: 'driver', label: 'Broken GPU Driver' },
              { id: 'replicate', label: 'Laptop Replication' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSimulation(s.id as any);
                  setSimStep('idle');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSimulation === s.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Details & Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div>
            <h4 className="text-sm font-bold text-cyan-300">
              {currentSim.title}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {currentSim.description}
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={simStep === 'running'}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
          >
            {simStep === 'running' ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Simulation</span>
              </>
            )}
          </button>
        </div>

        {/* Arena Results Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Traditional Linux Distro (Ubuntu/Arch/Debian) */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <span>Traditional Imperative OS</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Ubuntu / Arch / Debian
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300">
                {currentSim.traditional.action}
              </div>

              {simStep === 'resolved' ? (
                <div className={`p-4 rounded-xl border ${currentSim.traditional.color} space-y-2 animate-fadeIn`}>
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{currentSim.traditional.status}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {currentSim.traditional.details}
                  </p>
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                  Click "Run Simulation" above to observe the outcome.
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-2 font-mono">
              Result: Mutable state corruption & manual intervention required
            </div>
          </div>

          {/* Declarative NixOS */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border-2 border-cyan-500/40 flex flex-col justify-between space-y-4 shadow-lg shadow-cyan-500/5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Declarative NixOS</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Nix Store + Generations
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                {currentSim.nixos.action}
              </div>

              {simStep === 'resolved' ? (
                <div className={`p-4 rounded-xl border ${currentSim.nixos.color} space-y-2 animate-fadeIn`}>
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    <span>{currentSim.nixos.status}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {currentSim.nixos.details}
                  </p>
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                  Click "Run Simulation" above to observe the outcome.
                </div>
              )}
            </div>

            <div className="text-[11px] text-cyan-400/80 border-t border-slate-800/80 pt-2 font-mono">
              Result: Atomic isolation & 100% reproducible recovery
            </div>
          </div>

        </div>

      </div>

      {/* Comprehensive Dimension-by-Dimension Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          In-Depth Technical Comparison
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {COMPARISON_POINTS.map((point) => (
            <div
              key={point.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Dimension: {point.dimension}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Traditional */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {point.traditional.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {point.traditional.description}
                  </p>
                  <div className="pt-2 text-[11px] text-red-600 dark:text-red-400 font-medium">
                    ⚠️ <span className="font-bold">Drawback:</span> {point.traditional.drawback}
                  </div>
                </div>

                {/* NixOS */}
                <div className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <h4 className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {point.nixos.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {point.nixos.description}
                  </p>
                  <div className="pt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ✨ <span className="font-bold">Advantage:</span> {point.nixos.benefit}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
