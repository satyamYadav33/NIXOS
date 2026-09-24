import React from 'react';
import { 
  Terminal, 
  Shield, 
  Bookmark, 
  Wrench, 
  HelpCircle, 
  Download, 
  Search, 
  Sparkles, 
  Flame, 
  Sun, 
  Moon,
  RotateCcw,
  Laptop
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'vault' | 'terminal' | 'builder' | 'quiz' | 'releases' | 'setup';
  setActiveTab: (tab: 'vault' | 'terminal' | 'builder' | 'quiz' | 'releases' | 'setup') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkCount: number;
  showOnlyBookmarks: boolean;
  setShowOnlyBookmarks: (show: boolean) => void;
  onOpenExport: () => void;
  totalCommandsCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onReplaySplash?: () => void;
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
  totalCommandsCount,
  theme,
  onToggleTheme,
  onReplaySplash
}) => {
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 transition-colors duration-300 px-3 sm:px-6 pt-3 pb-2">
      {/* Claymorphic Master Floating Capsule Navbar */}
      <div className="max-w-7xl mx-auto clay-card p-2 sm:p-3 transition-all duration-300">
        
        {/* Top Row: Brand, Search, Bookmarks, Theme Switcher */}
        <div className="flex items-center justify-between gap-3 px-2 sm:px-3 h-14 sm:h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group select-none" 
            onClick={() => setActiveTab('vault')}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-md shadow-cyan-500/25 ring-2 ring-cyan-400/40 group-hover:scale-105 transition-transform duration-200">
              <Terminal className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-black tracking-tight font-mono">
                  Kali<span className="text-cyan-500">Vault</span>
                </span>
                <span className="clay-badge px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-cyan-500">
                  CLAY SEC
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Tactical Kali Linux Intelligence Hub
              </p>
            </div>
          </div>

          {/* Quick Search Bar (Desktop) */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'vault') setActiveTab('vault');
                }}
                placeholder={`Search ${totalCommandsCount} commands by tool, flag, scenario...`}
                className="w-full pl-10 pr-4 py-2 text-xs font-mono clay-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-cyan-500 font-mono cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions (Replay, Bookmarks, Export, Theme Toggle) */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Replay 3D Splash Button */}
            {onReplaySplash && (
              <button
                onClick={onReplaySplash}
                title="Replay 3D Clay Kali Intro"
                className="clay-btn p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors hidden sm:flex items-center cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Bookmarks Toggle */}
            <button
              onClick={() => {
                setShowOnlyBookmarks(!showOnlyBookmarks);
                if (activeTab !== 'vault') setActiveTab('vault');
              }}
              title="Toggle Bookmarked Commands"
              className={`clay-btn flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                showOnlyBookmarks
                  ? 'text-amber-500 font-bold shadow-inner'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                {bookmarkCount}
              </span>
            </button>

            {/* Export Cheatsheet */}
            <button
              onClick={onOpenExport}
              title="Export Cheat Sheet"
              className="clay-btn flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Claymorphic Dark / Light Mode Switcher */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              className="relative clay-btn flex items-center justify-between w-14 sm:w-16 h-8 px-1.5 rounded-full cursor-pointer transition-all duration-300 group"
            >
              {/* Sliding Bulbous Indicator */}
              <div 
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-400 ease-out shadow-md ${
                  isDark 
                    ? 'left-1 bg-slate-900 text-cyan-400 shadow-cyan-500/20' 
                    : 'left-7 sm:left-9 bg-amber-400 text-slate-900 shadow-amber-500/30'
                }`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 fill-cyan-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 fill-slate-900" />
                )}
              </div>

              {/* Background ambient icons */}
              <Moon className="w-3 h-3 text-slate-500 ml-1.5 opacity-40 group-hover:opacity-80" />
              <Sun className="w-3 h-3 text-amber-500 mr-1.5 opacity-40 group-hover:opacity-80" />
            </button>

          </div>
        </div>

        {/* Tab Navigation Row (Clay Tabs) */}
        <div className="flex items-center space-x-1.5 pt-2 pb-1 overflow-x-auto no-scrollbar border-t border-slate-200/60 dark:border-slate-800/60 text-xs sm:text-sm">
          
          {/* Command Vault Tab */}
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'vault'
                ? 'clay-btn text-cyan-600 dark:text-cyan-300 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4 text-cyan-500" />
            <span>Command Vault</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
              {totalCommandsCount}
            </span>
          </button>

          {/* Kali Setup Guide Tab (Shortcut Nav Key for Win & Mac) */}
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'setup'
                ? 'clay-btn text-cyan-600 dark:text-cyan-300 font-bold shadow-md shadow-cyan-500/15'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Laptop className="w-4 h-4 text-cyan-500" />
            <span>Setup Guide</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              WIN + MAC
            </span>
          </button>

          {/* Kali Terminal Tab */}
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'clay-btn text-emerald-600 dark:text-emerald-300 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>Kali Terminal</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>

          {/* Command Builder Tab */}
          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'builder'
                ? 'clay-btn text-purple-600 dark:text-purple-300 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4 text-purple-500" />
            <span>Command Builder</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 font-bold">
              3D BUILD
            </span>
          </button>

          {/* Cyber Quiz Tab */}
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'clay-btn text-amber-600 dark:text-amber-300 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Cyber Quiz</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </button>

          {/* Latest Tools & Releases Tab (Highlighted with Flame) */}
          <button
            onClick={() => setActiveTab('releases')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'releases'
                ? 'clay-btn text-rose-600 dark:text-rose-300 font-bold shadow-md shadow-rose-500/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Latest Releases</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white animate-pulse shadow-sm">
              NEW
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
