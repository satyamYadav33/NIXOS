import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Sparkles } from 'lucide-react';

interface TerminalEntry {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

export const NixTerminalSimulator: React.FC = () => {
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: 'system',
      content: '❄️ NixOS 24.05 LTS (Uakari) x86_64 — Linux 6.6.52-lts\nWelcome to the NixOS Interactive Terminal Simulator!\nType "help" to see available Nix & NixOS commands, or click any chip below.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isInsideNixShell, setIsInsideNixShell] = useState(false);
  const [shellPackages, setShellPackages] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const promptPrefix = isInsideNixShell ? '[nix-shell:~]$ ' : 'nixos@nixbox:~$ ';
    setHistory(prev => [...prev, { type: 'input', content: `${promptPrefix}${trimmed}` }]);

    const lower = trimmed.toLowerCase();

    if (isInsideNixShell && lower === 'exit') {
      setIsInsideNixShell(false);
      setShellPackages([]);
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: 'Exited ephemeral nix-shell. Environment variables purged from $PATH.\nYour base system remains 100% clean and untouched.'
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `Available Interactive Commands:
  • sudo nixos-rebuild switch             Build and activate current configuration
  • sudo nixos-rebuild switch --rollback  Instant rollback to previous working generation
  • nix-shell -p <pkg1> <pkg2>           Spawn temporary isolated environment
  • nixos-version                        Print active NixOS release and channel
  • cat /etc/nixos/configuration.nix     Inspect the declarative blueprint
  • nix store diff-closures              Compare package delta between generations
  • sudo nix-collect-garbage -d          Purge old generations and unreferenced store files
  • uname -a                             Display Linux kernel closure details
  • clear                                Clear the terminal display`
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower.startsWith('sudo nixos-rebuild switch --rollback') || lower.startsWith('nixos-rebuild switch --rollback')) {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `switching from generation 45 to 44...
activating the configuration...
setting up /etc symlinks...
reloading services: nginx.service, sshd.service
done. System successfully rolled back to last known good configuration in 0.39s!`
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower.startsWith('sudo nixos-rebuild switch') || lower.startsWith('nixos-rebuild switch')) {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `building Nix...
building system configuration...
these 4 derivations will be built:
  /nix/store/7v9x4p1k8w3m-configuration.nix.drv
  /nix/store/1a7c8z9x2m4k-etc-system.drv
updating bootloader menu (systemd-boot)...
activating the configuration...
setting up /etc symlinks...
done. New system closure activated: Generation 46.`
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower.startsWith('nix-shell -p')) {
      const parts = trimmed.split(' ').slice(2);
      const pkgs = parts.length > 0 ? parts : ['ripgrep'];
      setIsInsideNixShell(true);
      setShellPackages(pkgs);
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `fetching path(s) into /nix/store...
entered isolated nix-shell with packages: [ ${pkgs.join(', ')} ]
$PATH updated temporarily for this subshell. Type "exit" to leave.`
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower === 'nixos-version') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: '24.05.20260924.9c2742a (Uakari) — pure nixpkgs channel'
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower === 'cat /etc/nixos/configuration.nix') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `{ config, pkgs, ... }:
{
  imports = [ ./hardware-configuration.nix ];
  boot.loader.systemd-boot.enable = true;
  networking.hostName = "nixbox";
  services.pipewire.enable = true;
  services.nginx.enable = true;
  environment.systemPackages = with pkgs; [ git neovim ripgrep htop tmux ];
  system.stateVersion = "24.05";
}`
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower.startsWith('nix store diff-closures')) {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `Comparing /nix/var/nix/profiles/system-44-link -> system-45-link:
  + hyprland: ∅ -> 0.41.0 (+24.1 MiB)
  + pipewire: ∅ -> 1.0.7 (+18.4 MiB)
  ~ nginx: 1.26.0 -> 1.26.1 (+0.2 MiB)
  Total closure delta: +42.7 MiB (Zero conflicting libraries)`
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower.startsWith('sudo nix-collect-garbage') || lower.startsWith('nix-collect-garbage')) {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `finding garbage collector roots...
deleting old generation 41
deleting old generation 42
purging unreferenced store paths...
deleted 2,140 paths from /nix/store.
freed 18,412.34 MiB of disk space.`
        }
      ]);
      setInputVal('');
      return;
    }

    if (lower === 'uname -a') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: 'Linux nixbox 6.6.52-lts #1-NixOS SMP PREEMPT_DYNAMIC Sun Sep 27 10:00:00 UTC 2026 x86_64 GNU/Linux'
        }
      ]);
      setInputVal('');
      return;
    }

    setHistory(prev => [
      ...prev,
      {
        type: 'error',
        content: `command not found: "${trimmed}". Type "help" to see available Nix commands.`
      }
    ]);
    setInputVal('');
  };

  const chips = [
    'sudo nixos-rebuild switch --rollback',
    'sudo nixos-rebuild switch',
    'nix-shell -p htop ripgrep',
    'nixos-version',
    'cat /etc/nixos/configuration.nix',
    'nix store diff-closures',
    'sudo nix-collect-garbage -d'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Shell Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          NixOS Terminal Simulator
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Test real NixOS rebuilds, atomic rollbacks, and ephemeral sandboxes right in your browser.
        </p>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        <span className="text-xs text-slate-400 font-bold mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Quick Run:</span>
        </span>
        {chips.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="clay-btn px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-mono text-[11px] transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Window Box in Clay Frame */}
      <div className="max-w-4xl mx-auto clay-card p-2 sm:p-3 overflow-hidden">
        
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-slate-900 rounded-t-2xl border-b border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
            <span className="ml-2 text-slate-400 text-xs font-semibold">
              {isInsideNixShell ? 'nix-shell (ephemeral sandboxed session)' : 'nixos@nixbox:~ (bash)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isInsideNixShell && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                ACTIVE NIX-SHELL: {shellPackages.join(', ')}
              </span>
            )}
            <button
              onClick={() => setHistory([])}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 bg-black/95 rounded-b-2xl font-mono text-xs space-y-2.5 min-h-[380px] max-h-[500px] overflow-y-auto">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'system' && (
                <div className="text-cyan-400 font-semibold p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 mb-3">
                  {item.content}
                </div>
              )}
              {item.type === 'input' && (
                <div className="text-white font-bold flex items-center gap-1">
                  <span>{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-slate-300 pl-2 border-l border-slate-800">
                  {item.content}
                </div>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 pl-2 border-l border-red-500/50">
                  {item.content}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-2.5 bg-slate-900/90 rounded-b-2xl border-t border-slate-800 flex items-center gap-2 font-mono text-xs mt-1">
          <span className="text-cyan-400 font-bold whitespace-nowrap pl-2">
            {isInsideNixShell ? '[nix-shell:~]$' : 'nixos@nixbox:~$'}
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(inputVal)}
            placeholder={isInsideNixShell ? 'Type "exit" to leave shell...' : 'Type a command, e.g. sudo nixos-rebuild switch --rollback'}
            className="flex-1 bg-transparent text-white outline-none text-xs placeholder-slate-500 font-mono"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
            title="Execute command"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
