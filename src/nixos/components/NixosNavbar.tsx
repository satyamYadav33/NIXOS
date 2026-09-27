import React from 'react';
import type { NixHubTab } from '../types';
import { 
  Terminal, 
  Layers, 
  GitCompare, 
  RotateCcw, 
  Code2, 
  Package, 
  BookOpen, 
  HelpCircle, 
  Sun, 
  Moon, 
  ShieldAlert, 
  Sparkles,
  RotateCw
} from 'lucide-react';

interface NixosNavbarProps {
  activeTab: NixHubTab;
  setActiveTab: (tab: NixHubTab) => void;
  onSwitchToKali: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onReplaySplash?: () => void;
}

export const NixosNavbar: React.FC<NixosNavbarProps> = ({
  activeTab,
  setActiveTab,
  onSwitchToKali,
  theme,
  onToggleTheme,
  onReplaySplash
}) => {
  const isDark = theme === 'dark';

  const navItems: { id: NixHubTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'architecture', label: 'Nix vs NixOS', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'imperative-vs-declarative', label: 'Imperative vs Declarative', icon: <GitCompare className="w-3.5 h-3.5" /> },
    { id: 'store-graph', label: '/nix/store Graph', icon: <Package className="w-3.5 h-3.5" />, badge: 'Hash ID' },
    { id: 'rollback-timemachine', label: 'Rollback Machine', icon: <RotateCcw className="w-3.5 h-3.5" />, badge: '0.4s' },
    { id: 'config-builder', label: 'config.nix Studio', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'terminal', label: 'Terminal Sim', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'cheatsheet', label: 'Cheat Sheet', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="sticky top-0 z-40 transition-colors duration-300 px-3 sm:px-6 pt-3 pb-2">
      {/* Top Banner Portfolio Ribbon in Claymorphism */}
      <div className="max-w-7xl mx-auto mb-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-cyan-600/90 via-sky-600/90 to-blue-600/90 text-white text-xs font-medium flex items-center justify-between shadow-md backdrop-blur-md border border-cyan-400/20">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-black tracking-wide text-[10px] uppercase shadow-sm">
            ❄️ Declarative OS Portfolio
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-cyan-50">
            Nix Pure Functional Package Manager & NixOS Declarative Linux Distribution
          </span>
          <span className="sm:hidden text-[11px]">Nix vs NixOS Visualizer</span>
        </div>
        
        <div className="flex items-center gap-2">
          {onReplaySplash && (
            <button
              onClick={onReplaySplash}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-[11px] font-semibold cursor-pointer border border-white/20"
              title="Replay 3D Nix Snowflake Intro Animation"
            >
              <RotateCw className="w-3 h-3 text-cyan-200" />
              <span className="hidden md:inline">Replay Intro</span>
            </button>
          )}

          <button
            onClick={onSwitchToKali}
            className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-xs font-semibold cursor-pointer border border-white/20"
            title="Switch to Kali Linux Cyber Hub"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-300 group-hover:rotate-12 transition-transform" />
            <span>Open KaliVault</span>
          </button>
        </div>
      </div>

      {/* Claymorphic Master Floating Capsule Navbar */}
      <div className="max-w-7xl mx-auto clay-card p-2 sm:p-3 transition-all duration-300">
        
        {/* Top Row: Brand Logo, Universe Switch, Tactile Theme Toggle */}
        <div className="flex items-center justify-between gap-3 px-2 sm:px-3 h-14 sm:h-16">
          
          {/* Brand Logo & Title with Tactile Bulbous Icon */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 shadow-md shadow-cyan-500/25 ring-2 ring-cyan-400/40 group-hover:scale-105 transition-transform duration-200">
              <svg 
                viewBox="0 0 100 100" 
                className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:rotate-45 transition-transform duration-700 ease-out"
                fill="currentColor"
              >
                <g transform="translate(50,50)">
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <g key={deg} transform={`rotate(${deg})`}>
                      <path 
                        d="M -3,-38 L 3,-38 L 5,-14 L 14,-22 L 18,-18 L 6,-6 L 0,-15 L -6,-6 L -18,-18 L -14,-22 L -5,-14 Z" 
                        className={i % 2 === 0 ? "fill-white" : "fill-cyan-200"} 
                      />
                    </g>
                  ))}
                  <circle cx="0" cy="0" r="4" className="fill-white" />
                </g>
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-black tracking-tight font-mono text-slate-900 dark:text-slate-100">
                  NixOS<span className="text-cyan-500">Studio</span>
                </span>
                <span className="clay-badge px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
                  CLAY OS
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 hidden sm:block font-medium">
                Declarative Operating System & Rollback Visualizer
              </p>
            </div>
          </div>

          {/* Right Action Controls: Universe Switcher & Bulbous Theme Switcher */}
          <div className="flex items-center space-x-2.5">
            
            {/* Quick Universe Toggle Button */}
            <button
              onClick={onSwitchToKali}
              title="Switch to Kali Linux Cyber Hub"
              className="clay-btn hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-500 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
              <span>KaliVault</span>
            </button>

            {/* High-End Tactile Claymorphic Dark / Light Mode Switcher */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle theme"
              className="relative clay-btn flex items-center justify-between w-14 sm:w-16 h-8 px-1.5 rounded-full cursor-pointer transition-all duration-300 group"
            >
              {/* Sliding Bulbous 3D Indicator */}
              <div 
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-400 ease-out shadow-md ${
                  isDark 
                    ? 'left-1 bg-slate-900 text-cyan-400 shadow-cyan-500/30 ring-1 ring-cyan-500/40' 
                    : 'left-7 sm:left-9 bg-amber-400 text-slate-900 shadow-amber-500/40 ring-1 ring-amber-300'
                }`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 fill-cyan-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 fill-slate-900" />
                )}
              </div>

              {/* Ambient Background icons inside track */}
              <Moon className="w-3 h-3 text-slate-500 ml-1.5 opacity-40 group-hover:opacity-80 transition-opacity" />
              <Sun className="w-3 h-3 text-amber-500 mr-1.5 opacity-40 group-hover:opacity-80 transition-opacity" />
            </button>

          </div>
        </div>

        {/* Tactile Tab Navigation Row (Clay Tabs with Soft Depressions) */}
        <div className="flex items-center space-x-1.5 pt-2 pb-1 overflow-x-auto no-scrollbar border-t border-slate-200/60 dark:border-slate-800/60 text-xs sm:text-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'clay-btn-primary text-white shadow-md'
                    : 'clay-btn text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase font-black ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'clay-badge text-cyan-600 dark:text-cyan-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
