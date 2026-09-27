import React, { useState } from 'react';
import { COMPARISON_POINTS } from '../data/nixosData';
import { 
  GitCompare, 
  AlertTriangle, 
  Play, 
  ShieldCheck, 
  Sparkles,
  Heart,
  Shield,
  Activity
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
        status: 'CRITICAL FAILURE: 0% HEALTH',
        health: 0,
        details: 'Package manager overwrote /usr/lib/libssl.so. Legacy microservice crashes with undefined symbol: SSLv23_method.',
        color: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
      },
      nixos: {
        action: 'environment.systemPackages = [ legacyApp modernTool ]; in configuration.nix',
        status: 'PERFECT ISOLATION: 100% HEALTH',
        health: 100,
        details: 'Both packages live in isolated /nix/store folders. Binaries point to their exact dependencies via ELF RPATH. Zero conflict!',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    },
    powercut: {
      title: 'Power Failure Mid-Upgrade',
      description: 'Your laptop battery dies right as the package manager is unpacking core C libraries and kernel modules.',
      traditional: {
        action: '$ sudo apt upgrade (cut at 52%)',
        status: 'CORRUPTED SYSTEM: 0% HEALTH',
        health: 0,
        details: 'glibc half-overwritten. Dynamic linker throws SIGSEGV. System will not boot into user space.',
        color: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
      },
      nixos: {
        action: '$ sudo nixos-rebuild switch (cut during build)',
        status: '100% UNTOUCHED: 100% HEALTH',
        health: 100,
        details: 'Nix builds new derivations in /nix/store in parallel. Active profile symlink was never updated! Zero damage.',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    },
    driver: {
      title: 'Faulty Experimental GPU Driver',
      description: 'You enabled a beta Nvidia driver that causes kernel panics and a black screen upon starting the display manager.',
      traditional: {
        action: '$ sudo dnf install akmod-nvidia-beta',
        status: 'HEADLESS PANIC: 15% HEALTH',
        health: 15,
        details: 'Black screen with blinking cursor. Requires USB recovery drive and chrooting into disk to purge DKMS.',
        color: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
      },
      nixos: {
        action: '$ sudo nixos-rebuild switch',
        status: '0.4s ROLLBACK: 100% HEALTH',
        health: 100,
        details: 'Reboot and choose Gen 42 from the systemd-boot menu. Machine boots in 4 seconds into working drivers!',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    },
    replicate: {
      title: 'Deploy to New Machine',
      description: 'You need to set up a brand new laptop to match your exact development environment.',
      traditional: {
        action: 'Manual shell scripts, hunt down dotfiles & packages',
        status: 'CONFIG DRIFT: 40% HEALTH',
        health: 40,
        details: 'Takes hours. Slight version mismatches and forgotten manual tweaks lead to "works on my machine" bugs.',
        color: 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
      },
      nixos: {
        action: '$ nixos-rebuild switch --flake .#workstation',
        status: 'BIT-FOR-BIT IDENTICAL: 100% HEALTH',
        health: 100,
        details: 'The entire OS, services, user accounts, and shell configs compile identically in minutes!',
        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      }
    }
  };

  const currentSim = simulations[activeSimulation];

  const runSimulation = () => {
    setSimStep('running');
    setTimeout(() => {
      setSimStep('resolved');
    }, 700);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Interactive Battle Arena</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Imperative OS vs Declarative NixOS
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Traditional operating systems accumulate mutable drift over time. NixOS computes system state as a pure mathematical function.
        </p>
      </div>

      {/* Interactive Simulation Arena in Claymorphism */}
      <div className="clay-card p-6 sm:p-8 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-5">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Disaster Recovery Arena</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
              Choose a Disaster Scenario:
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'conflict', label: 'Dependency Hell' },
              { id: 'powercut', label: 'Power Cut' },
              { id: 'driver', label: 'Broken Driver' },
              { id: 'replicate', label: 'New Laptop' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSimulation(s.id as any);
                  setSimStep('idle');
                }}
                className={`clay-btn px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  activeSimulation === s.id
                    ? 'clay-btn-primary text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Details & Trigger Banner */}
        <div className="clay-inset p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {currentSim.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {currentSim.description}
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={simStep === 'running'}
            className="clay-btn-primary px-5 py-2.5 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-auto shrink-0"
          >
            {simStep === 'running' ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Trigger Simulation</span>
              </>
            )}
          </button>
        </div>

        {/* Health Meters & Battle Arena Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Traditional Imperative OS */}
          <div className="clay-card p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                  <span>Traditional Imperative OS</span>
                </span>
                <span className="clay-badge px-2 py-0.5 text-[9px] font-mono text-slate-500">
                  Ubuntu / Arch / Debian
                </span>
              </div>

              {/* Visual Health Gauge */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                    <span>System Integrity</span>
                  </span>
                  <span className={simStep === 'resolved' ? 'text-red-500' : 'text-slate-400'}>
                    {simStep === 'resolved' ? `${currentSim.traditional.health}%` : '100%'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-700"
                    style={{
                      width: simStep === 'resolved' ? `${currentSim.traditional.health}%` : '100%'
                    }}
                  />
                </div>
              </div>

              <div className="clay-inset p-2.5 font-mono text-xs text-amber-600 dark:text-amber-300 font-bold">
                {currentSim.traditional.action}
              </div>

              {simStep === 'resolved' ? (
                <div className={`p-4 rounded-xl border ${currentSim.traditional.color} space-y-1.5 animate-fadeIn`}>
                  <div className="flex items-center gap-2 font-black text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{currentSim.traditional.status}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {currentSim.traditional.details}
                  </p>
                </div>
              ) : (
                <div className="clay-inset p-5 text-center text-xs text-slate-400">
                  Click "Trigger Simulation" to see the outcome.
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 pt-2 font-mono">
              Outcome: Manual debugging, rescue USB, or reinstall required
            </div>
          </div>

          {/* Declarative NixOS */}
          <div className="clay-card p-5 space-y-4 flex flex-col justify-between border-2 border-cyan-500/40">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Declarative NixOS</span>
                </span>
                <span className="clay-badge px-2 py-0.5 text-[9px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                  Immutable /nix/store
                </span>
              </div>

              {/* Visual Health Gauge */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>System Integrity</span>
                  </span>
                  <span className="text-emerald-500">
                    100%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700 w-full"
                  />
                </div>
              </div>

              <div className="clay-inset p-2.5 font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                {currentSim.nixos.action}
              </div>

              {simStep === 'resolved' ? (
                <div className={`p-4 rounded-xl border ${currentSim.nixos.color} space-y-1.5 animate-fadeIn`}>
                  <div className="flex items-center gap-2 font-black text-xs">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>{currentSim.nixos.status}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {currentSim.nixos.details}
                  </p>
                </div>
              ) : (
                <div className="clay-inset p-5 text-center text-xs text-slate-400">
                  Click "Trigger Simulation" to see the outcome.
                </div>
              )}
            </div>

            <div className="text-[11px] text-cyan-600 dark:text-cyan-400 border-t border-slate-200/60 dark:border-slate-800/60 pt-2 font-mono font-bold">
              Outcome: 0% corruption risk • Sub-second atomic recovery
            </div>
          </div>

        </div>

      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPARISON_POINTS.map((point) => (
          <div key={point.id} className="clay-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                {point.dimension}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="clay-inset p-3 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">Traditional OS:</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  {point.traditional.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
                <span className="font-bold text-cyan-700 dark:text-cyan-300">NixOS Pure Declarative:</span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  {point.nixos.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
