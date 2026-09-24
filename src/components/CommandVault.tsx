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
      if (selectedCategory !== 'all' && cmd.category !== selectedCategory) {
        return false;
      }
      if (selectedNoise !== 'all' && cmd.noiseLevel !== selectedNoise) {
        return false;
      }
      if (selectedPhase !== 'all' && cmd.phase !== selectedPhase) {
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
      
      {/* Category Pills Slider (Tactile Clay) */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar px-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`clay-btn flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold shrink-0 transition-all ${
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
              className={`clay-btn flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold shrink-0 transition-all ${
                isSelected
                  ? 'clay-btn-primary font-bold shadow-lg'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{cat.shortName}</span>
              <span className="text-[10px] ml-1 opacity-80 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Category Info Banner (Clay Card) */}
      {activeCategoryMeta && (
        <div className="clay-card p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                {activeCategoryMeta.name}
              </span>
              <span className="clay-badge px-2.5 py-0.5 text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                {filteredCommands.length} commands
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              {activeCategoryMeta.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className="clay-btn p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Toolbar (Clay Bar) */}
      <div className="clay-card p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Filter Toggle & Counter */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`clay-btn flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold transition-all ${
              showFilters || selectedNoise !== 'all' || selectedPhase !== 'all'
                ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Advanced Filters</span>
            {(selectedNoise !== 'all' || selectedPhase !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            )}
          </button>

          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            Showing <strong className="text-slate-900 dark:text-slate-100 font-bold">{filteredCommands.length}</strong> of {commands.length} commands
          </span>
        </div>

        {/* Right: Quick Noise Filter Badges (Clay Pills) */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mr-1 hidden sm:inline">
            Noise:
          </span>
          {(['all', 'stealth', 'low', 'moderate', 'noisy'] as const).map((noise) => (
            <button
              key={noise}
              onClick={() => setSelectedNoise(noise)}
              className={`clay-btn px-3 py-1 text-[11px] font-semibold capitalize transition-all ${
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Cyber Kill Chain / MITRE Phase
              </label>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value as KillChainPhase | 'all')}
                className="w-full px-3.5 py-2.5 clay-inset text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none"
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Operational Security (OpSec) Noise Rating
              </label>
              <select
                value={selectedNoise}
                onChange={(e) => setSelectedNoise(e.target.value as NoiseLevel | 'all')}
                className="w-full px-3.5 py-2.5 clay-inset text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none"
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
                className="clay-btn flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Search Input */}
      <div className="block md:hidden">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands, flags, tools..."
            className="w-full pl-10 pr-4 py-2.5 clay-inset text-xs text-slate-800 dark:text-slate-200 placeholder-slate-500 font-mono focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Commands */}
      {filteredCommands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="clay-card text-center py-16 px-4">
          <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No Kali commands found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {showOnlyBookmarks 
              ? 'You have not saved any commands yet. Click the bookmark icon on any card to save it here.'
              : 'No commands match your current filters or search term. Try resetting your search parameters.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="clay-btn mt-5 inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-bold text-cyan-600 dark:text-cyan-400"
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
