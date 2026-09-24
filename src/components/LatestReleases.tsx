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
          color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          icon: Sparkles
        };
      case 'major_update':
        return {
          label: 'Major Upgrade',
          color: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
          icon: Zap
        };
      case 'replacement':
        return {
          label: 'Successor / Replaced',
          color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          icon: RefreshCw
        };
      case 'core_upgrade':
        return {
          label: 'Core Ecosystem',
          color: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
          icon: Cpu
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner (Claymorphic Depth) */}
      <div className="clay-card relative overflow-hidden p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="clay-badge inline-flex items-center space-x-2 px-3 py-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Kali Linux Official Tool Updates & Releases</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Latest Tools & Releases Radar
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Stay ahead of the offensive security curve. Track tools recently added to Kali package repositories, community-driven successors to retired tools (like <strong className="text-cyan-600 dark:text-cyan-400">NetExec</strong> replacing CrackMapExec), and architectural overhauls (like <strong className="text-cyan-600 dark:text-cyan-400">BloodHound CE</strong> and <strong className="text-cyan-600 dark:text-cyan-400">Snort 3</strong>).
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono">
            <span className="clay-badge px-3 py-1 text-slate-700 dark:text-slate-300 font-bold">
              ⚡ {LATEST_TOOLS_DATA.length} Tools Tracked
            </span>
            <span className="clay-badge px-3 py-1 text-emerald-600 dark:text-emerald-400 font-bold">
              🟢 Pre-configured for APT
            </span>
            <span className="clay-badge px-3 py-1 text-cyan-600 dark:text-cyan-400 font-bold">
              📦 Kali 2024.x / 2025+ Ready
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar (Clay Card) */}
      <div className="clay-card p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search updated tools, packages, capabilities..."
            className="w-full pl-10 pr-4 py-2 clay-inset text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        {/* Change Type Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs no-scrollbar">
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
                className={`clay-btn px-3 py-1.5 text-xs font-semibold shrink-0 transition-all ${
                  selectedChangeType === type
                    ? 'clay-btn-primary shadow-lg'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>

      </div>

      {/* Release Version Tabs (Clay Pills) */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 text-xs no-scrollbar px-1">
        <span className="clay-badge px-3 py-1 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider shrink-0 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-500" />
          Release Cycle:
        </span>
        <button
          onClick={() => setSelectedVersion('all')}
          className={`clay-btn px-3.5 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ${
            selectedVersion === 'all'
              ? 'clay-btn-primary'
              : 'text-slate-600 dark:text-slate-300'
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
              className={`clay-btn px-3.5 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ${
                selectedVersion === ver
                  ? 'clay-btn-primary'
                  : 'text-slate-600 dark:text-slate-300'
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
              className="clay-card clay-card-hover p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                
                {/* Header Row: Name, Version, Change Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.color}`}>
                        <BadgeIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <span className="clay-badge px-2.5 py-0.5 text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
                        {tool.releaseVersion}
                      </span>
                      {tool.badgeText && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          {tool.badgeText}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                      {tool.name}
                      <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold px-2 py-0.5 rounded-lg clay-inset">
                        {tool.packageName}
                      </code>
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {tool.category}
                    </p>
                  </div>

                  <a
                    href={tool.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="View Documentation & Repo"
                    className="clay-btn p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Replaced Tool Callout (if any) */}
                {tool.replacedTool && (
                  <div className="clay-inset p-3 text-xs text-amber-700 dark:text-amber-300 flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      <strong>Successor Alert:</strong> Replaces deprecated{' '}
                      <code className="font-mono font-bold underline">{tool.replacedTool}</code>.
                    </span>
                  </div>
                )}

                {/* Headline & Description */}
                <div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
                    {tool.headline}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Why Cybersecurity Experts Care */}
                <div className="clay-inset p-3.5 space-y-1.5">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-500" />
                    Why Pentesters & Analysts Care:
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {tool.whyItMatters}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Key Highlights & Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {tool.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Actions: Install Command & Demo Launch */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3">
                
                {/* Install Block */}
                <div className="flex items-center justify-between gap-2 p-2.5 clay-inset font-mono text-xs">
                  <div className="overflow-x-auto text-emerald-600 dark:text-emerald-400 font-semibold select-all py-0.5">
                    <span className="text-slate-400 select-none mr-2 font-normal">$</span>
                    {tool.installCmd}
                  </div>
                  <button
                    onClick={() => handleCopyInstall(tool.id, tool.installCmd)}
                    title="Copy APT Install Command"
                    className={`clay-btn p-2 text-xs transition-all shrink-0 ${
                      isCopied
                        ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Demo in Terminal button if available */}
                {tool.demoCommand && (
                  <button
                    onClick={() => onRunInTerminal(tool.demoCommand!)}
                    className="clay-btn w-full flex items-center justify-center space-x-2 py-2.5 px-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 text-xs font-bold transition-all"
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
