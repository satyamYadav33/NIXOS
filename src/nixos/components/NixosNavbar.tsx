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
  Sparkles
} from 'lucide-react';

interface NixosNavbarProps {
  activeTab: NixHubTab;
  setActiveTab: (tab: NixHubTab) => void;
  onSwitchToKali: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NixosNavbar: React.FC<NixosNavbarProps> = ({
  activeTab,
  setActiveTab,
  onSwitchToKali,
  theme,
  onToggleTheme
}) => {
  const navItems: { id: NixHubTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'architecture', label: 'Nix vs NixOS', icon: <Layers className="w-4 h-4" /> },
    { id: 'imperative-vs-declarative', label: 'Imperative vs Declarative', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'store-graph', label: '/nix/store Graph', icon: <Package className="w-4 h-4" />, badge: 'Hash ID' },
    { id: 'rollback-timemachine', label: 'Rollback Machine', icon: <RotateCcw className="w-4 h-4" />, badge: '0.4s' },
    { id: 'config-builder', label: 'config.nix Studio', icon: <Code2 className="w-4 h-4" /> },
    { id: 'terminal', label: 'Terminal Sim', icon: <Terminal className="w-4 h-4" /> },
    { id: 'cheatsheet', label: 'Cheat Sheet', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Banner / Portfolio Hub Ribbon */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold tracking-wide text-[10px] uppercase">
            Portfolio Showcase
          </span>
          <span className="hidden sm:inline">
            Interactive Architecture Visualizer: Nix Functional Package Manager & NixOS Declarative Operating System
          </span>
          <span className="sm:hidden">Nix vs NixOS Interactive Visualizer</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToKali}
            className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-xs font-semibold cursor-pointer border border-white/20"
            title="Switch to Kali Linux Cyber Hub"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-300 group-hover:rotate-12 transition-transform" />
            <span>Open KaliVault</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* Nix Snowflake SVG Logo */}
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-7 h-7 text-cyan-400 group-hover:rotate-45 transition-transform duration-700 ease-out"
                  fill="currentColor"
                >
                  <g transform="translate(50,50)">
                    {/* 6 Lambda Petals */}
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                      <g key={deg} transform={`rotate(${deg})`}>
                        <path 
                          d="M -3,-38 L 3,-38 L 5,-14 L 14,-22 L 18,-18 L 6,-6 L 0,-15 L -6,-6 L -18,-18 L -14,-22 L -5,-14 Z" 
                          className={i % 2 === 0 ? "fill-cyan-400" : "fill-blue-500"} 
                        />
                      </g>
                    ))}
                    <circle cx="0" cy="0" r="4" className="fill-white" />
                  </g>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
                  NixOS Studio
                </span>
                <span className="hidden md:inline-flex text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold font-mono">
                  v24.05 LTS
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Declarative OS & Rollback Visualizer
              </span>
            </div>
          </div>

          {/* Universe Switcher & Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Dual Switch Pill */}
            <div className="hidden lg:flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <button
                className="px-3 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>❄️ NixOS & Nix</span>
              </button>
              <button
                onClick={onSwitchToKali}
                className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>🐉 KaliVault Hub</span>
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2.5 border-t border-slate-100 dark:border-slate-800/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase font-bold ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
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
