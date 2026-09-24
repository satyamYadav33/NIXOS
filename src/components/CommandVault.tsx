import React, { useState, useMemo } from 'react';
import type { 
  CommandCategory, 
  CommandItem, 
  NoiseLevel, 
  KillChainPhase,
  LearningLevel
} from '../types';
import { CATEGORIES } from '../data/commandsData';
import { CommandCard } from './CommandCard';
import { 
  X, 
  SlidersHorizontal, 
  Search, 
  Layers,
  FolderOpen,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface CommandVaultProps {
  commands: CommandItem[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  onRunInTerminal: (cmd: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showOnlyBookmarks: boolean;
  setShowOnlyBookmarks: (show: boolean) => void;
}

export const CommandVault: React.FC<CommandVaultProps> = ({
  commands,
  bookmarkedIds,
  onToggleBookmark,
  onRunInTerminal,
  searchQuery,
  setSearchQuery,
  showOnlyBookmarks,
  setShowOnlyBookmarks
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CommandCategory | 'all'>('all');
  const [selectedNoise, setSelectedNoise] = useState<NoiseLevel | 'all'>('all');
  const [selectedPhase, setSelectedPhase] = useState<KillChainPhase | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Helper to infer learning level if not explicitly defined
  const getInferredLevel = (cmd: CommandItem): LearningLevel => {
    if (cmd.learningLevel) return cmd.learningLevel;
    if (['whois', 'netdiscover', 'arp-scan', 'nikto', 'hydra', 'strings', 'exiftool', 'cewl', 'sublist3r'].includes(cmd.tool.toLowerCase()) || cmd.category === 'osint') {
      return 'Beginner';
    }
    if (['nmap', 'sqlmap', 'gobuster', 'ffuf', 'john', 'airmon-ng', 'tcpdump', 'hashcat', 'commix', 'wpscan'].includes(cmd.tool.toLowerCase()) || cmd.category === 'scanning' || cmd.category === 'web') {
      return 'Intermediate';
    }
    return 'Advanced';
  };

  // Filter commands
  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      if (selectedCategory !== 'all' && cmd.category !== selectedCategory) {
        return false;
      }
      if (selectedNoise !== 'all' && cmd.noiseLevel !== selectedNoise) {
        return false;
      }
      if (selectedPhase !== 'all' && cmd.phase !== selectedPhase) {
        return false;
      }
      if (selectedLevel !== 'all' && getInferredLevel(cmd) !== selectedLevel) {
        return false;
      }
      if (showOnlyBookmarks && !bookmarkedIds.has(cmd.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = cmd.name.toLowerCase().includes(query);
        const matchesTool = cmd.tool.toLowerCase().includes(query);
        const matchesDesc = cmd.description.toLowerCase().includes(query);
        const matchesCmd = cmd.command.toLowerCase().includes(query);
        const matchesScenario = cmd.scenario.toLowerCase().includes(query);
        const matchesFlags = cmd.flags.some(
          (f) => f.flag.toLowerCase().includes(query) || f.description.toLowerCase().includes(query)
        );
        const matchesMitre = cmd.mitreId?.toLowerCase().includes(query) || false;

        return matchesName || matchesTool || matchesDesc || matchesCmd || matchesScenario || matchesFlags || matchesMitre;
      }

      return true;
    });
  }, [commands, selectedCategory, selectedNoise, selectedPhase, selectedLevel, showOnlyBookmarks, bookmarkedIds, searchQuery]);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedNoise('all');
    setSelectedPhase('all');
    setSelectedLevel('all');
    setSearchQuery('');
    setShowOnlyBookmarks(false);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedNoise !== 'all' || 
    selectedPhase !== 'all' || 
    selectedLevel !== 'all' ||
    searchQuery.trim() !== '' || 
    showOnlyBookmarks;

  return (
    <div className="space-y-6">
      
      {/* Category Pills Slider (Tactile Clay) */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar px-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`clay-btn flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'clay-btn-primary font-bold shadow-lg'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Categories</span>
          <span className="text-[10px] ml-1 opacity-80 font-mono">({commands.length})</span>
        </button>

        {CATEGORIES.map((cat) => {
          const count = commands.filter((c) => c.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`clay-btn flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'clay-btn-primary font-bold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{cat.shortName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full clay-badge font-mono font-bold">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Learning Curve Level Selector Bar */}
      <div className="clay-card p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-cyan-500 shrink-0" />
          <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Learning Curve:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`clay-btn px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              selectedLevel === 'all'
                ? 'clay-btn-primary'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All Levels
          </button>

          <button
            onClick={() => setSelectedLevel('Beginner')}
            className={`clay-btn px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              selectedLevel === 'Beginner'
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500 font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            🌱 Lvl 1: Core Fundamentals
          </button>

          <button
            onClick={() => setSelectedLevel('Intermediate')}
            className={`clay-btn px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              selectedLevel === 'Intermediate'
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-2 border-cyan-500 font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            ⚡ Lvl 2: Tactical Assessment
          </button>

          <button
            onClick={() => setSelectedLevel('Advanced')}
            className={`clay-btn px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              selectedLevel === 'Advanced'
                ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-2 border-purple-500 font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            🔥 Lvl 3: Red Team Operator
          </button>
        </div>
      </div>

      {/* Beginner Helpful Guidance Callout */}
      {selectedLevel === 'Beginner' && (
        <div className="clay-card p-4 sm:p-5 flex items-start space-x-3 border-l-4 border-emerald-500 animate-in fade-in duration-200">
          <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300 font-mono">
              Beginner Learning Roadmap Tip
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Welcome to Kali Linux! Start by practicing commands in the <strong>OSINT & Reconnaissance</strong> and <strong>Port Scanning</strong> categories. These tools allow you to learn command flags, DNS architecture, and network ports without risking unintended harm. Click "Beginner Mental Model" on any card below to see what happens under the hood!
            </p>
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar (Tactile Clay Bar) */}
      <div className="clay-card p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Mobile Search & Advanced Filter Toggle */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          {/* Mobile Search input */}
          <div className="relative flex-1 sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, flags..."
              className="w-full pl-9 pr-3 py-2 text-xs font-mono clay-inset rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`clay-btn flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              showFilters || hasActiveFilters
                ? 'clay-btn-primary font-bold'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            )}
          </button>

          <span className="text-xs text-slate-500 font-mono hidden md:inline">
            Showing <strong className="text-slate-900 dark:text-slate-100 font-bold">{filteredCommands.length}</strong> of {commands.length} commands
          </span>
        </div>

        {/* Right: Quick Noise Filter Badges (Clay Pills) */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs no-scrollbar self-start sm:self-center">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mr-1 hidden sm:inline font-mono">
            Noise:
          </span>
          {(['all', 'stealth', 'low', 'moderate', 'noisy'] as const).map((noise) => (
            <button
              key={noise}
              onClick={() => setSelectedNoise(noise)}
              className={`clay-btn px-3 py-1 text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                selectedNoise === noise
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {noise}
            </button>
          ))}
        </div>

      </div>

      {/* Collapsible Advanced Filters Drawer (Clay Recessed Box) */}
      {showFilters && (
        <div className="clay-card p-5 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Kill Chain Phase */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Cyber Kill Chain / MITRE Phase
              </label>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value as KillChainPhase | 'all')}
                className="w-full px-3.5 py-2.5 clay-inset text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none rounded-xl"
              >
                <option value="all">All Kill Chain Phases</option>
                <option value="Reconnaissance">Reconnaissance</option>
                <option value="Weaponization">Weaponization</option>
                <option value="Discovery">Discovery & Enumeration</option>
                <option value="Exploitation">Exploitation</option>
                <option value="Privilege Escalation">Privilege Escalation</option>
                <option value="Credential Access">Credential Access</option>
                <option value="Lateral Movement">Lateral Movement</option>
                <option value="Collection">Collection & Sniffing</option>
                <option value="Forensics">Digital Forensics</option>
              </select>
            </div>

            {/* OpSec Noise Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Operational Security (OpSec) Noise Rating
              </label>
              <select
                value={selectedNoise}
                onChange={(e) => setSelectedNoise(e.target.value as NoiseLevel | 'all')}
                className="w-full px-3.5 py-2.5 clay-inset text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none rounded-xl"
              >
                <option value="all">All Noise Ratings</option>
                <option value="stealth">Stealth / Passive (Zero network intrusion alerts)</option>
                <option value="low">Low Noise (Minimal IDS footprint)</option>
                <option value="moderate">Moderate Noise (Standard port probing)</option>
                <option value="noisy">High Noise / Active (Triggers SIEM / EDR alerts)</option>
              </select>
            </div>

          </div>

          {hasActiveFilters && (
            <div className="flex justify-end pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={resetAllFilters}
                className="clay-btn flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Category Header if filtered */}
      {activeCategoryMeta && (
        <div className="clay-card p-4 sm:p-5 flex items-center justify-between border-l-4 border-cyan-500">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                Category Spotlight
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
              {activeCategoryMeta.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeCategoryMeta.description}
            </p>
          </div>

          <button
            onClick={() => setSelectedCategory('all')}
            className="clay-btn p-2 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
            title="Clear category filter"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Commands Grid */}
      {filteredCommands.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {filteredCommands.map((command) => (
            <CommandCard
              key={command.id}
              command={command}
              isBookmarked={bookmarkedIds.has(command.id)}
              onToggleBookmark={onToggleBookmark}
              onRunInTerminal={onRunInTerminal}
              categoryColor={
                CATEGORIES.find((c) => c.id === command.category)?.color || 'from-cyan-500 to-blue-500'
              }
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="clay-card text-center py-16 px-4 space-y-4">
          <div className="w-16 h-16 rounded-3xl clay-inset flex items-center justify-center mx-auto text-slate-400">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
              No tactical commands found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
              No commands matched your active filter query. Try clearing filters or searching for alternative tools.
            </p>
          </div>
          <div>
            <button
              onClick={resetAllFilters}
              className="clay-btn-primary px-5 py-2.5 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
