import React, { useState } from 'react';
import { NIX_COMMANDS } from '../data/nixosData';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Lightbulb
} from 'lucide-react';

export const NixCheatSheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Commands' },
    { id: 'rebuild', label: 'System Rebuild & Rollback' },
    { id: 'shell', label: 'Ephemeral Shells' },
    { id: 'flake', label: 'Flakes & Hermeticity' },
    { id: 'inspection', label: 'Closure Diffing' },
    { id: 'garbage', label: 'Garbage Collection' }
  ];

  const filteredCommands = NIX_COMMANDS.filter(cmd => {
    const matchesCat = selectedCat === 'all' || cmd.category === selectedCat;
    const matchesSearch = cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Production Reference</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nix & NixOS Command Vault
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          The essential cheat-sheet for managing system generations, atomic rollbacks, isolated packages, and flake environments.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands (e.g. rollback, nix-shell, flake, garbage)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {cmd.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                  {cmd.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {cmd.description}
              </p>

              {/* Command Box */}
              <div className="p-3 rounded-2xl bg-slate-950 font-mono text-xs text-cyan-300 flex items-center justify-between border border-slate-800 shadow-inner group">
                <span className="truncate pr-2">{cmd.command}</span>
                <button
                  onClick={() => handleCopy(cmd.id, cmd.command)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex-shrink-0"
                  title="Copy command"
                >
                  {copiedId === cmd.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Flags if present */}
              {cmd.flags && cmd.flags.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Important Flags:
                  </span>
                  <div className="space-y-1">
                    {cmd.flags.map((flag, idx) => (
                      <div key={idx} className="flex items-baseline gap-2 text-[11px]">
                        <code className="text-cyan-600 dark:text-cyan-400 font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded">
                          {flag.flag}
                        </code>
                        <span className="text-slate-500 dark:text-slate-400">{flag.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Terminal Output */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 font-mono text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap">
                {cmd.exampleOutput}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-3 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold">Pro-Tip: </span>
                {cmd.proTip}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
