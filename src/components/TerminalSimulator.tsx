import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';
import { COMMANDS_DATA } from '../data/commandsData';

interface TerminalSimulatorProps {
  initialCommand?: string;
  onClearInitialCommand?: () => void;
}

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string;
}

const WELCOME_BANNER = `
 ┌─────────────────────────────────────────────────────────────┐
 │  ██╗  ██╗ █████╗ ██╗     ██╗██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗  │
 │  ██║ ██╔╝██╔══██╗██║     ██║██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝  │
 │  █████═╝ ███████║██║     ██║██║   ██║███████║██║   ██║██║     ██║     │
 │  ██╔═██╗ ██╔══██║██║     ██║╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║     │
 │  ██║ ╚██╗██║  ██║███████╗██║ ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║     │
 │  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     │
 ├─────────────────────────────────────────────────────────────┤
 │ Kali Linux 2026.3 Release (Kernel 6.8.0-kali-amd64)        │
 │ Type 'help' to view available commands, or click any tool   │
 │ from the Command Vault to execute simulated attacks.        │
 └─────────────────────────────────────────────────────────────┘
`;

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  initialCommand,
  onClearInitialCommand
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 'welcome', type: 'system', content: WELCOME_BANNER }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on output update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // If an initial command was passed from another component, execute it automatically
  useEffect(() => {
    if (initialCommand) {
      handleExecuteCommand(initialCommand);
      onClearInitialCommand?.();
    }
  }, [initialCommand]);

  const handleExecuteCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add input command line to history
    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const inputLine: TerminalLine = {
      id: String(Date.now()),
      type: 'input',
      content: trimmed
    };

    let outputContent = '';

    const lower = trimmed.toLowerCase();

    // Built-in Terminal commands
    if (lower === 'clear') {
      setLines([]);
      setCurrentInput('');
      return;
    } else if (lower === 'help') {
      outputContent = `KaliVault Terminal Shell v2.4

Available built-in commands:
  help               - Display this help message
  clear              - Clear terminal display
  whoami             - Print current user identity
  id                 - Print real and effective user/group IDs
  uname -a           - Print system architecture and kernel
  neofetch           - Display Kali system info & ASCII art
  ls                 - List files in current directory
  history            - Display recent command history
  matrix             - Trigger green matrix cascade simulation

You can also run any of the 45+ Kali tools (nmap, sqlmap, hydra, msfconsole, etc.)!`;
    } else if (lower === 'whoami') {
      outputContent = `kali`;
    } else if (lower === 'id') {
      outputContent = `uid=1000(kali) gid=1000(kali) groups=1000(kali),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),121(wireshark),122(docker)`;
    } else if (lower === 'uname -a') {
      outputContent = `Linux kali-secops 6.8.0-kali-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.8.11-1kali2 (2026-07-24) x86_64 GNU/Linux`;
    } else if (lower === 'ls' || lower === 'ls -la') {
      outputContent = `total 68
drwxr-xr-x 6 kali kali  4096 Sep 19 11:30 .
drwxr-xr-x 3 root root  4096 Sep 19 09:12 ..
-rw------- 1 kali kali  1248 Sep 19 11:28 .zsh_history
drwxr-xr-x 2 kali kali  4096 Sep 19 10:45 exploits
drwxr-xr-x 2 kali kali  4096 Sep 19 10:50 scans
drwxr-xr-x 2 kali kali  4096 Sep 19 11:15 wordlists
-rwxr-xr-x 1 kali kali 14200 Sep 19 11:22 linpeas.sh
-rw-r--r-- 1 kali kali 28400 Sep 19 11:25 capture-01.cap`;
    } else if (lower === 'history') {
      outputContent = commandHistory.map((cmd, idx) => `  ${idx + 1}  ${cmd}`).reverse().join('\n');
    } else if (lower === 'neofetch' || lower === 'banner') {
      outputContent = `
       ..............              kali@kali-secops 
     ............,;:cllc:,.        ---------------- 
    ..........':cloooooooooolc:.   OS: Kali GNU/Linux Rolling x86_64 
   ........';looooooooooooooooooc  Host: Virtual Machine 2.0 
  .......,coooooooooooooooooooooo  Kernel: 6.8.0-kali-amd64 
  ......:oooooooooooooooooooooooo  Uptime: 4 hours, 12 mins 
  .....cloooooooooooooooooooooooo  Packages: 2842 (dpkg) 
  ....:oooooooooooooooooooooooooo  Shell: zsh 5.9 
  ...:ooooooooooooooooooooooooooo  Terminal: xterm-256color 
  ..:oooooooooooooooooooooooooooo  CPU: AMD Ryzen 9 7950X (8) @ 4.500GHz 
  .;ooooooooooooooooooooooooooooo  Memory: 3824MiB / 16000MiB 
  .cooooooooooooooooooooooooooooo  Tools: nmap, sqlmap, hydra, metasploit
`;
    } else if (lower === 'matrix') {
      outputContent = `[!] Initiating Matrix cascade...
01001011 01000001 01001100 01001001 00100000 01001100 01001001 01001110 01010101 01011000
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.
Knock, knock, Neo.`;
    } else {
      // Check if command matches any known Kali tool from our catalog
      const matched = COMMANDS_DATA.find((c) => {
        const cmdBase = c.command.split(' ')[0].toLowerCase();
        const inputBase = trimmed.split(' ')[0].toLowerCase();
        return (
          trimmed.toLowerCase().includes(c.tool.toLowerCase()) ||
          inputBase === cmdBase ||
          c.command.toLowerCase().includes(trimmed.toLowerCase())
        );
      });

      if (matched && matched.outputExample) {
        outputContent = `[*] Executing: ${trimmed}\n${matched.outputExample}`;
      } else {
        outputContent = `zsh: command not found: ${trimmed.split(' ')[0]}\nType 'help' to see built-in commands or choose from the quick-run chips above.`;
      }
    }

    const outputLine: TerminalLine = {
      id: String(Date.now() + 1),
      type: 'output',
      content: outputContent
    };

    setLines((prev) => [...prev, inputLine, outputLine]);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setCurrentInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setCurrentInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const handleCopyAll = () => {
    const allText = lines.map((l) => (l.type === 'input' ? `$ ${l.content}` : l.content)).join('\n');
    navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const QUICK_COMMANDS = [
    'nmap -sC -sV -p- -T4 192.168.1.50',
    'sqlmap -u "https://target.com/vuln.php?id=1" --dbs',
    'hydra -l root -P rockyou.txt ssh',
    'whois target.com',
    'neofetch',
    'clear'
  ];

  return (
    <div className="space-y-4">
      
      {/* Quick-run pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-500 uppercase font-semibold text-[11px] tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Quick Launch:
        </span>
        {QUICK_COMMANDS.map((qc, i) => (
          <button
            key={i}
            onClick={() => handleExecuteCommand(qc)}
            className="shrink-0 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 font-mono transition-colors text-[11px]"
          >
            {qc}
          </button>
        ))}
      </div>

      {/* Terminal Window Container */}
      <div className="rounded-2xl border border-slate-800 bg-[#060911] shadow-2xl overflow-hidden terminal-glow">
        
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-xs font-mono text-slate-400 ml-2 font-medium flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              kali@kali: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={handleCopyAll}
              title="Copy Terminal Transcript"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setLines([])}
              title="Clear Terminal"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 min-h-[460px] max-h-[600px] overflow-y-auto font-mono text-xs sm:text-[13px] scanlines cursor-text space-y-2"
        >
          {lines.map((line) => (
            <div key={line.id}>
              {line.type === 'input' && (
                <div className="flex items-center space-x-2 text-slate-300">
                  <span className="text-cyan-400 font-semibold select-none">┌──(kali㉿kali)-[~]</span>
                </div>
              )}
              {line.type === 'input' && (
                <div className="flex items-center space-x-2 text-slate-100 pl-2">
                  <span className="text-cyan-400 font-semibold select-none">└─$</span>
                  <span className="text-emerald-400">{line.content}</span>
                </div>
              )}
              {line.type === 'output' && (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pl-2 py-1 select-text">
                  {line.content}
                </pre>
              )}
              {line.type === 'system' && (
                <pre className="text-cyan-400/90 whitespace-pre leading-tight select-none">
                  {line.content}
                </pre>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="space-y-1 pt-1">
            <div className="text-cyan-400 font-semibold select-none text-xs">
              ┌──(kali㉿kali)-[~]
            </div>
            <div className="flex items-center space-x-2 pl-2">
              <span className="text-cyan-400 font-semibold select-none">└─$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command, or 'help'..."
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-emerald-400 placeholder-slate-600 font-mono text-xs sm:text-[13px] caret-emerald-400"
              />
            </div>
          </div>

          <div ref={terminalEndRef} />
        </div>

      </div>

      <div className="text-xs text-slate-400 flex items-center justify-between px-2 font-mono">
        <span>Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">↑</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">↓</kbd> arrows to navigate command history</span>
        <span>Simulated Shell Environment</span>
      </div>

    </div>
  );
};
