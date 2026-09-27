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
    { id: 'rebuild', label: 'Rebuild & Rollback' },
    { id: 'shell', label: 'Ephemeral Shells' },
    { id: 'flake', label: 'Flakes' },
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
        <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Production Reference</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Nix & NixOS Command Vault
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The essential cheat-sheet for managing system generations, atomic rollbacks, and flakes.
        </p>
      </div>

      {/* Search and Category Filters in Claymorphism */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands (e.g. rollback, nix-shell, flake, garbage)..."
            className="w-full pl-10 pr-4 py-2.5 clay-inset text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`clay-btn px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'clay-btn-primary text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Commands Grid in Clay Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.id}
            className="clay-card p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {cmd.title}
                </h3>
                <span className="clay-badge text-[10px] font-mono px-2 py-0.5 uppercase text-cyan-600 dark:text-cyan-400 font-bold">
                  {cmd.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {cmd.description}
              </p>

              {/* Command Pill */}
              <div className="clay-inset p-3 font-mono text-xs text-cyan-600 dark:text-cyan-300 font-bold flex items-center justify-between shadow-inner">
                <span className="truncate pr-2">{cmd.command}</span>
                <button
                  onClick={() => handleCopy(cmd.id, cmd.command)}
                  className="p-1 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer shrink-0"
                  title="Copy command"
                >
                  {copiedId === cmd.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {cmd.flags && cmd.flags.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    Important Flags:
                  </span>
                  <div className="space-y-1">
                    {cmd.flags.map((flag, idx) => (
                      <div key={idx} className="flex items-baseline gap-2 text-[11px]">
                        <code className="clay-badge text-cyan-600 dark:text-cyan-400 font-mono font-bold px-1.5 py-0.2">
                          {flag.flag}
                        </code>
                        <span className="text-slate-600 dark:text-slate-400">{flag.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="clay-inset p-3 font-mono text-[11px] text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {cmd.exampleOutput}
              </div>
            </div>

            <div className="clay-inset p-3 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Pro-Tip: </strong>
                {cmd.proTip}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
