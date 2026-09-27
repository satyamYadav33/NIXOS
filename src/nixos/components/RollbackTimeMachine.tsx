import React, { useState } from 'react';
import { NIX_GENERATIONS } from '../data/nixosData';
import type { NixGeneration } from '../types';
import { 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  RefreshCw, 
  Power 
} from 'lucide-react';

export const RollbackTimeMachine: React.FC = () => {
  const [selectedGenId, setSelectedGenId] = useState<string>('gen-45');
  const [activeSystemGen, setActiveSystemGen] = useState<number>(45);
  
  // Interactive Live Rollback Simulation states
  const [simState, setSimState] = useState<'stable' | 'broken' | 'rolling-back' | 'restored'>('stable');
  const [terminalLog, setTerminalLog] = useState<string[]>([]);

  // Bootloader Simulator states
  const [bootSelectedIdx, setBootSelectedIdx] = useState<number>(0);
  const [isBooting, setIsBooting] = useState<boolean>(false);
  const [bootLog, setBootLog] = useState<string | null>(null);

  const selectedGen = NIX_GENERATIONS.find(g => g.id === selectedGenId) || NIX_GENERATIONS[4];

  // Trigger experimental update that breaks display
  const triggerBrokenUpdate = () => {
    setSimState('broken');
    setActiveSystemGen(43);
    setSelectedGenId('gen-43');
    setTerminalLog([
      '$ sudo nixos-rebuild switch',
      'building Nix...',
      'building system closure: /nix/store/9k2m4x7v1a8z-nixos-system-unstable.43',
      'activating the configuration...',
      'reloading units...',
      '❌ [FAILED] Failed to start display-manager.service: GPU firmware initialization panic!',
      '❌ [CRITICAL] Black screen detected. Wayland compositor terminated with SIGSEGV (Status 1).'
    ]);
  };

  // Execute the famous rollback command
  const executeRollback = () => {
    setSimState('rolling-back');
    setTerminalLog(prev => [
      ...prev,
      '',
      '$ sudo nixos-rebuild switch --rollback',
      'switching from generation 43 to 42...',
      're-pointing symlink: /nix/var/nix/profiles/system -> ...-system-24.05.42',
      're-pointing /run/current-system atomically...',
      'activating the configuration...',
      'stopping failed units: nvidia-beta-daemon.service',
      'starting units: display-manager.service',
      '✅ [SUCCESS] Restored to Generation 42 in 0.41 seconds! Display manager running smoothly.'
    ]);

    setTimeout(() => {
      setSimState('restored');
      setActiveSystemGen(42);
      setSelectedGenId('gen-44');
    }, 700);
  };

  const resetSim = () => {
    setSimState('stable');
    setActiveSystemGen(45);
    setSelectedGenId('gen-45');
    setTerminalLog([]);
  };

  // Bootloader boot execution
  const handleBootloaderBoot = (gen: NixGeneration) => {
    setIsBooting(true);
    setBootLog('Loading Linux kernel and initramfs closure...');
    setTimeout(() => {
      if (gen.status === 'broken') {
        setBootLog(`❌ BOOT FAILED (Generation ${gen.generationNumber}): Kernel drm-kms driver panic. Screen unresponsive. Reboot and select Gen 42 to recover!`);
      } else {
        setBootLog(`✅ BOOT SUCCESSFUL (Generation ${gen.generationNumber}): ${gen.kernelVersion} booted cleanly. systemd started 142 units in 1.8s.`);
      }
      setIsBooting(false);
    }, 800);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sub-Second Disaster Recovery</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The Rollback Time Machine
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Made a mistake in <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-mono text-xs">configuration.nix</code>?
          Run <code className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono text-xs font-bold">nixos-rebuild switch --rollback</code> or select any previous generation in the bootloader to revert instantly.
        </p>
      </div>

      {/* Interactive Rollback Simulation Sandbox */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border-2 border-cyan-500/30 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glowing Ambient Backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Rollback Sandbox</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Active System: <span className="font-mono text-cyan-400">Generation {activeSystemGen}</span>
              {simState === 'broken' && (
                <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded bg-red-500 text-white animate-pulse">
                  CRASH DETECTED
                </span>
              )}
              {simState === 'restored' && (
                <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">
                  RESTORED
                </span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {simState === 'stable' && (
              <button
                onClick={triggerBrokenUpdate}
                className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Simulate Risky Update Failure</span>
              </button>
            )}

            {simState === 'broken' && (
              <button
                onClick={executeRollback}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer animate-bounce"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Run: nixos-rebuild switch --rollback</span>
              </button>
            )}

            {(simState === 'restored' || simState === 'broken') && (
              <button
                onClick={resetSim}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Terminal Output in Simulator */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/80 border border-slate-800 font-mono text-xs space-y-1.5 max-h-60 overflow-y-auto relative z-10">
          <div className="text-slate-500 text-[11px] mb-2 border-b border-slate-900 pb-1 flex items-center justify-between">
            <span>root@nixbox:~ (nixos-rebuild engine)</span>
            <span className="text-cyan-500 font-bold">Symlink Switch: 0.4s</span>
          </div>

          {terminalLog.length === 0 ? (
            <div className="text-slate-500 py-3 italic">
              System is healthy on Generation 45. Click "Simulate Risky Update Failure" to see how NixOS handles emergency recovery.
            </div>
          ) : (
            terminalLog.map((line, idx) => (
              <div 
                key={idx} 
                className={`${
                  line.includes('❌') 
                    ? 'text-red-400 font-bold' 
                    : line.includes('✅') 
                    ? 'text-emerald-400 font-bold' 
                    : line.startsWith('$') 
                    ? 'text-cyan-300 font-bold' 
                    : 'text-slate-300'
                }`}
              >
                {line}
              </div>
            ))
          )}
        </div>

        {/* How It Works Under The Hood */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-400 font-mono">1. Atomic Symlink Flip:</span>
            <p className="text-slate-400 text-[11px]">
              Nix updates <code className="text-cyan-300 font-mono">/run/current-system</code> with a single atomic rename. Files are never partially overwritten.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-blue-400 font-mono">2. Zero Old File Deletion:</span>
            <p className="text-slate-400 text-[11px]">
              Generation 42 packages remained in <code className="text-blue-300 font-mono">/nix/store</code> untouched, ready to be reactivated instantaneously.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 font-mono">3. systemd Unit Synchronization:</span>
            <p className="text-slate-400 text-[11px]">
              The NixOS activation script calculates service diffs and restarts only units that changed between generations.
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Generation Timeline Scrubber & Diff Viewer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Generations Archive</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Inspect Any Historical Generation
          </h3>
          <p className="text-xs text-slate-500">
            Click on any generation below to see its exact package diff, service state, and store path.
          </p>
        </div>

        {/* Timeline Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {NIX_GENERATIONS.map((gen) => {
            const isSelected = selectedGenId === gen.id;
            return (
              <div
                key={gen.id}
                onClick={() => setSelectedGenId(gen.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-black text-slate-900 dark:text-white">
                      Gen #{gen.generationNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                      gen.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                        : gen.status === 'broken'
                        ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                        : gen.status === 'rolled-back'
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {gen.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">
                    {gen.timestamp.split(' ')[0]}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                  {gen.kernelVersion}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Generation Detail Panel */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Generation {selectedGen.generationNumber}
                </h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {selectedGen.nixpkgsChannel}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {selectedGen.summary}
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {selectedGen.timestamp}
            </div>
          </div>

          {/* Store Path */}
          <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs break-all border border-slate-800">
            {selectedGen.storePath}
          </div>

          {/* Diff Changes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Package Modifications</span>
              </span>
              <div className="space-y-1">
                {selectedGen.changes.addedPackages.map((pkg, i) => (
                  <div key={i} className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                    + {pkg}
                  </div>
                ))}
                {selectedGen.changes.removedPackages.map((pkg, i) => (
                  <div key={i} className="text-red-500 font-mono text-[11px]">
                    - {pkg}
                  </div>
                ))}
                {selectedGen.changes.addedPackages.length === 0 && selectedGen.changes.removedPackages.length === 0 && (
                  <div className="text-slate-400 italic">No package alterations</div>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-500" />
                <span>systemd Units Transition</span>
              </span>
              <div className="space-y-1 font-mono text-[11px]">
                {selectedGen.changes.serviceChanges.map((svc, i) => (
                  <div key={i} className={`${svc.includes('CRASHED') ? 'text-red-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                    {svc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bootloader (GRUB / systemd-boot) Interactive Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Power className="w-3.5 h-3.5" />
              <span>UEFI / systemd-boot Menu Simulator</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Bootloader Disaster Recovery
            </h3>
            <p className="text-xs text-slate-400">
              Can't reach a graphical desktop or shell? Select any previous generation directly in the boot menu before Linux even launches!
            </p>
          </div>
        </div>

        {/* Retro Boot Screen Frame */}
        <div className="p-6 rounded-2xl bg-black border-2 border-slate-700 font-mono text-xs space-y-4 shadow-inner">
          <div className="text-center text-slate-400 text-xs font-bold pb-2 border-b border-slate-800">
            NixOS systemd-boot v255.4 (x86_64-efi)
          </div>

          <div className="space-y-1">
            {NIX_GENERATIONS.map((gen, idx) => {
              const isSelected = bootSelectedIdx === idx;
              return (
                <div
                  key={gen.id}
                  onClick={() => setBootSelectedIdx(idx)}
                  className={`px-3 py-2 rounded transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-transparent'}`} />
                    <span>{gen.bootLabel}</span>
                  </div>
                  <span className="text-[10px] opacity-80">
                    Gen {gen.generationNumber}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Boot Action Bar */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400 text-[11px]">
            <span>Use click or arrow keys to select, then click "Boot Selected Entry"</span>
            <button
              onClick={() => handleBootloaderBoot(NIX_GENERATIONS[bootSelectedIdx])}
              disabled={isBooting}
              className="px-4 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all self-start sm:self-auto cursor-pointer disabled:opacity-50"
            >
              {isBooting ? 'Booting...' : 'Boot Selected Entry'}
            </button>
          </div>

          {/* Boot Output Message */}
          {bootLog && (
            <div className={`p-3 rounded border font-mono text-xs animate-fadeIn ${
              bootLog.includes('❌') 
                ? 'bg-red-950/60 border-red-500 text-red-200' 
                : 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
            }`}>
              {bootLog}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
