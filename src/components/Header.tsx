import React from 'react';
import { Terminal, Shield, Bookmark, Wrench, HelpCircle, Download, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'vault' | 'terminal' | 'builder' | 'quiz';
  setActiveTab: (tab: 'vault' | 'terminal' | 'builder' | 'quiz') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkCount: number;
  showOnlyBookmarks: boolean;
  setShowOnlyBookmarks: (show: boolean) => void;
  onOpenExport: () => void;
  totalCommandsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  bookmarkCount,
  showOnlyBookmarks,
  setShowOnlyBookmarks,
  onOpenExport,
  totalCommandsCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('vault')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
              <Terminal className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0b0f19] animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  Kali<span className="text-cyan-400">Vault</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                  SecOps
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Cybersecurity Expert Command & Tool Hub
              </p>
            </div>
          </div>

          {/* Quick Search Bar (When on Vault tab) */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'vault') setActiveTab('vault');
                }}
                placeholder={`Search ${totalCommandsCount} commands by tool, flag, scenario, CVE...`}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/70 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  ESC
                </button>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            
            {/* Bookmarks Toggle */}
            <button
              onClick={() => {
                setShowOnlyBookmarks(!showOnlyBookmarks);
                if (activeTab !== 'vault') setActiveTab('vault');
              }}
              title="Toggle Bookmarked Commands"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                showOnlyBookmarks
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              <span className="px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px] text-slate-300 font-mono">
                {bookmarkCount}
              </span>
            </button>

            {/* Export Cheatsheet */}
            <button
              onClick={onOpenExport}
              title="Export Cheat Sheet"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export</span>
            </button>

          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/60 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'vault'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Command Vault</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {totalCommandsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'terminal'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Kali Terminal</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'builder'
                ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <Wrench className="w-4 h-4 text-purple-400" />
            <span>Command Builder</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
              Interactive
            </span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Cyber Quiz</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </button>
        </div>

      </div>
    </header>
  );
};
