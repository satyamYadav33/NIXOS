import React, { useState, useMemo } from 'react';
import type { ToolChangeType } from '../types';
import { LATEST_TOOLS_DATA } from '../data/latestToolsData';
import { 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Search, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert,
  Cpu,
  RefreshCw,
  Zap
} from 'lucide-react';

interface LatestReleasesProps {
  onRunInTerminal: (cmd: string) => void;
}

export const LatestReleases: React.FC<LatestReleasesProps> = ({ onRunInTerminal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChangeType, setSelectedChangeType] = useState<ToolChangeType | 'all'>('all');
  const [selectedVersion, setSelectedVersion] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const versions = useMemo(() => {
    const set = new Set<string>();
    LATEST_TOOLS_DATA.forEach((t) => set.add(t.releaseVersion));
    return Array.from(set);
  }, []);

  const filteredTools = useMemo(() => {
    return LATEST_TOOLS_DATA.filter((tool) => {
      if (selectedChangeType !== 'all' && tool.changeType !== selectedChangeType) {
        return false;
      }
      if (selectedVersion !== 'all' && tool.releaseVersion !== selectedVersion) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesPkg = tool.packageName.toLowerCase().includes(q);
        const matchesCat = tool.category.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesWhy = tool.whyItMatters.toLowerCase().includes(q);
        const matchesHead = tool.headline.toLowerCase().includes(q);
        return matchesName || matchesPkg || matchesCat || matchesDesc || matchesWhy || matchesHead;
      }
      return true;
    });
  }, [selectedChangeType, selectedVersion, searchQuery]);

  const handleCopyInstall = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getChangeTypeBadge = (type: ToolChangeType) => {
    switch (type) {
      case 'new':
        return {
          label: 'New Tool',
          color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: Sparkles
        };
      case 'major_update':
        return {
          label: 'Major Upgrade',
          color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          icon: Zap
        };
      case 'replacement':
        return {
          label: 'Successor / Replaced',
          color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          icon: RefreshCw
        };
      case 'core_upgrade':
        return {
          label: 'Core Ecosystem',
          color: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          icon: Cpu
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kali Linux Official Tool Updates & Releases</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Latest Tools & Releases Radar
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Stay ahead of the offensive security curve. Track tools recently added to Kali package repositories, community-driven successors to retired tools (like <strong className="text-cyan-300">NetExec</strong> replacing CrackMapExec), and architectural overhauls (like <strong className="text-cyan-300">BloodHound CE</strong> and <strong className="text-cyan-300">Snort 3</strong>).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-300">
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60">
              ⚡ {LATEST_TOOLS_DATA.length} Tools Tracked
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-emerald-400">
              🟢 Pre-configured for APT
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-cyan-400">
              📦 Kali 2024.x / 2025+ Ready
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search updated tools, packages, capabilities..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Change Type Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs no-scrollbar">
          {(['all', 'new', 'major_update', 'replacement', 'core_upgrade'] as const).map((type) => {
            const labels: Record<string, string> = {
              all: 'All Changes',
              new: '✨ New Tools',
              major_update: '⚡ Major Upgrades',
              replacement: '🔄 Replacements',
              core_upgrade: '🛠️ Core Upgrades'
            };
            return (
              <button
                key={type}
                onClick={() => setSelectedChangeType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                  selectedChangeType === type
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-slate-950 border border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>

      </div>

      {/* Release Version Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-500 uppercase font-semibold text-[11px] tracking-wider shrink-0 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          Release Cycle:
        </span>
        <button
          onClick={() => setSelectedVersion('all')}
          className={`px-3 py-1 rounded-md text-xs font-mono transition-colors shrink-0 ${
            selectedVersion === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          All Releases ({LATEST_TOOLS_DATA.length})
        </button>
        {versions.map((ver) => {
          const count = LATEST_TOOLS_DATA.filter((t) => t.releaseVersion === ver).length;
          return (
            <button
              key={ver}
              onClick={() => setSelectedVersion(ver)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors shrink-0 ${
                selectedVersion === ver
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {ver} ({count})
            </button>
          );
        })}
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTools.map((tool) => {
          const badge = getChangeTypeBadge(tool.changeType);
          const BadgeIcon = badge.icon;
          const isCopied = copiedId === tool.id;

          return (
            <div
              key={tool.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/40 p-6 flex flex-col justify-between shadow-xl hover:shadow-cyan-500/5 transition-all space-y-5"
            >
              <div className="space-y-4">
                
                {/* Header Row: Name, Version, Change Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.color}`}>
                        <BadgeIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60">
                        {tool.releaseVersion}
                      </span>
                      {tool.badgeText && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {tool.badgeText}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      {tool.name}
                      <code className="text-xs font-mono text-cyan-400 font-normal px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/30">
                        {tool.packageName}
                      </code>
                    </h2>

                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {tool.category}
                    </p>
                  </div>

                  <a
                    href={tool.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="View Documentation & Repo"
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-colors shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Replaced Tool Callout (if any) */}
                {tool.replacedTool && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Successor Alert:</strong> Replaces deprecated{' '}
                      <code className="font-mono font-bold text-amber-300 underline">{tool.replacedTool}</code>.
                    </span>
                  </div>
                )}

                {/* Headline & Description */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">
                    {tool.headline}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Why Cybersecurity Experts Care */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-1.5">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                    Why Pentesters & Analysts Care:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {tool.whyItMatters}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                    Key Highlights & Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {tool.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Actions: Install Command & Demo Launch */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                
                {/* Install Block */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                  <div className="overflow-x-auto text-emerald-400 select-all py-0.5">
                    <span className="text-slate-500 select-none mr-2">$</span>
                    {tool.installCmd}
                  </div>
                  <button
                    onClick={() => handleCopyInstall(tool.id, tool.installCmd)}
                    title="Copy APT Install Command"
                    className={`p-1.5 rounded-md border text-xs transition-all shrink-0 ${
                      isCopied
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Demo in Terminal button if available */}
                {tool.demoCommand && (
                  <button
                    onClick={() => onRunInTerminal(tool.demoCommand!)}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Run Demo in Kali Terminal Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
