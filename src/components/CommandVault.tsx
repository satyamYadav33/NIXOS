import React, { useState, useMemo } from 'react';
import type { 
  CommandCategory, 
  CommandItem, 
  NoiseLevel, 
  KillChainPhase 
} from '../types';
import { CATEGORIES } from '../data/commandsData';
import { CommandCard } from './CommandCard';
import { 
  X, 
  SlidersHorizontal, 
  Search, 
  Layers,
  FolderOpen
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
  const [showFilters, setShowFilters] = useState(false);

  // Filter commands
  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      // Category filter
      if (selectedCategory !== 'all' && cmd.category !== selectedCategory) {
        return false;
      }

      // Noise filter
      if (selectedNoise !== 'all' && cmd.noiseLevel !== selectedNoise) {
        return false;
      }

      // Phase filter
      if (selectedPhase !== 'all' && cmd.phase !== selectedPhase) {
        return false;
      }

      // Bookmark filter
      if (showOnlyBookmarks && !bookmarkedIds.has(cmd.id)) {
        return false;
      }

      // Search query
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
  }, [commands, selectedCategory, selectedNoise, selectedPhase, showOnlyBookmarks, bookmarkedIds, searchQuery]);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedNoise('all');
    setSelectedPhase('all');
    setSearchQuery('');
    setShowOnlyBookmarks(false);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedNoise !== 'all' || 
    selectedPhase !== 'all' || 
    searchQuery.trim() !== '' || 
    showOnlyBookmarks;

  return (
    <div className="space-y-6">
      
      {/* Category Pills Slider */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Categories</span>
          <span className="text-[10px] ml-1 opacity-70 font-mono">({commands.length})</span>
        </button>

        {CATEGORIES.map((cat) => {
          const count = commands.filter((c) => c.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
                isSelected
                  ? 'bg-gradient-to-r ' + cat.color + ' text-white font-semibold shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.shortName}</span>
              <span className="text-[10px] ml-1 opacity-70 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Category Info Banner (if specific category selected) */}
      {activeCategoryMeta && (
        <div className={`p-4 rounded-xl bg-slate-900/40 border ${activeCategoryMeta.borderColor} flex items-start justify-between gap-4`}>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-white">
                {activeCategoryMeta.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-cyan-400 font-mono">
                {filteredCommands.length} commands
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {activeCategoryMeta.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 shrink-0 mt-0.5"
          >
            <span>Clear</span>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
        
        {/* Left: Filter Toggle & Counter */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showFilters || selectedNoise !== 'all' || selectedPhase !== 'all'
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Advanced Filters</span>
            {(selectedNoise !== 'all' || selectedPhase !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            )}
          </button>

          <span className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-slate-200">{filteredCommands.length}</strong> of {commands.length} commands
          </span>
        </div>

        {/* Right: Quick Noise Filter Badges */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mr-1 hidden sm:inline">
            Noise:
          </span>
          {(['all', 'stealth', 'low', 'moderate', 'noisy'] as const).map((noise) => (
            <button
              key={noise}
              onClick={() => setSelectedNoise(noise)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-colors ${
                selectedNoise === noise
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {noise}
            </button>
          ))}
        </div>

      </div>

      {/* Collapsible Advanced Filters Drawer */}
      {showFilters && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Kill Chain Phase */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Cyber Kill Chain / MITRE Phase
              </label>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value as KillChainPhase | 'all')}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
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
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Operational Security (OpSec) Noise Rating
              </label>
              <select
                value={selectedNoise}
                onChange={(e) => setSelectedNoise(e.target.value as NoiseLevel | 'all')}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
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
            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={resetAllFilters}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Search Input (Visible only on small screens) */}
      <div className="block md:hidden">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands, flags, tools..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 font-mono"
          />
        </div>
      </div>

      {/* Grid of Commands */}
      {filteredCommands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filteredCommands.map((cmd) => {
            const cat = CATEGORIES.find((c) => c.id === cmd.category);
            return (
              <CommandCard
                key={cmd.id}
                command={cmd}
                isBookmarked={bookmarkedIds.has(cmd.id)}
                onToggleBookmark={onToggleBookmark}
                onRunInTerminal={onRunInTerminal}
                categoryColor={cat?.color || 'from-cyan-500 to-blue-500'}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-200">
            No Kali commands found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {showOnlyBookmarks 
              ? 'You have not saved any commands yet. Click the bookmark icon on any card to save it here.'
              : 'No commands match your current filters or search term. Try resetting your search parameters.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-medium hover:bg-cyan-500/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters & Search</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
};
