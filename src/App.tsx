import React, { useState, useEffect } from 'react';
import { COMMANDS_DATA } from './data/commandsData';
import { Header } from './components/Header';
import { CommandVault } from './components/CommandVault';
import { TerminalSimulator } from './components/TerminalSimulator';
import { CommandBuilder } from './components/CommandBuilder';
import { CyberQuiz } from './components/CyberQuiz';
import { LatestReleases } from './components/LatestReleases';
import { KaliSetupGuide } from './components/KaliSetupGuide';
import { ExportModal } from './components/ExportModal';
import { ClayKaliSplash } from './components/ClayKaliSplash';
import { ThemeTransitionWave } from './components/ThemeTransitionWave';
import { ShieldAlert, Terminal, ExternalLink, Flame, Laptop } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'vault' | 'terminal' | 'builder' | 'quiz' | 'releases' | 'setup'>('vault');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [initialTerminalCommand, setInitialTerminalCommand] = useState<string | undefined>(undefined);

  // Splash Screen state (lazy loading Kali logo intro animation)
  const [showSplash, setShowSplash] = useState(true);

  // Theme state with local storage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('kalivault_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // Animated Theme Transition Shockwave state
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<'dark' | 'light'>('light');
  const [waveOrigin, setWaveOrigin] = useState<{ x: number; y: number } | null>(null);

  // Synchronize document classList with theme state
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('kalivault_theme', theme);
    } catch (e) {
      console.error('Failed to save theme:', e);
    }
  }, [theme]);

  // Load bookmarks from localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('kalivault_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set(['scan-1', 'web-1', 'exploit-1', 'pwd-1']);
    } catch {
      return new Set(['scan-1', 'web-1', 'exploit-1', 'pwd-1']);
    }
  });

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kalivault_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRunInTerminal = (cmd: string) => {
    setInitialTerminalCommand(cmd);
    setActiveTab('terminal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setWaveOrigin({ x, y });
    setTargetTheme(nextTheme);
    setIsThemeTransitioning(true);

    // Switch active theme at the apex of the ripple wave (350ms)
    setTimeout(() => {
      setTheme(nextTheme);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-app text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* 3-Second Kali Dragon Logo Lazy Loading Splash Intro */}
      {showSplash && (
        <ClayKaliSplash
          onComplete={() => setShowSplash(false)}
          isDarkMode={theme === 'dark'}
        />
      )}

      {/* Full-Screen Smooth Theme Wave Morph Animation */}
      <ThemeTransitionWave
        isAnimating={isThemeTransitioning}
        targetTheme={targetTheme}
        onAnimationEnd={() => setIsThemeTransitioning(false)}
        originCoords={waveOrigin}
      />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarkCount={bookmarkedIds.size}
        showOnlyBookmarks={showOnlyBookmarks}
        setShowOnlyBookmarks={setShowOnlyBookmarks}
        onOpenExport={() => setIsExportOpen(true)}
        totalCommandsCount={COMMANDS_DATA.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onReplaySplash={() => setShowSplash(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5">
        
        {/* Banner Announcement / Quick Stats in Claymorphism */}
        <div className="mb-6 p-4 sm:p-5 clay-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 font-mono flex items-center gap-2">
                <span>Offensive Security & Red Team Tactical Playbook</span>
                <span className="clay-badge text-[9px] px-2 py-0.5 text-cyan-600 dark:text-cyan-400 uppercase font-mono">
                  v2024.x
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Volumetric Claymorphic Hub covering Reconnaissance, Exploitation, Privilege Escalation, and Defense Evasion.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono self-end sm:self-center">
            {/* Quick Link to Setup Guide */}
            <button
              onClick={() => setActiveTab('setup')}
              className="clay-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-cyan-600 dark:text-cyan-400 font-bold cursor-pointer"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-500" />
              <span>Win/Mac Setup</span>
            </button>

            {/* Quick Link to Releases */}
            <button
              onClick={() => setActiveTab('releases')}
              className="clay-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 font-bold cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Latest Tools</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            </button>

            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
            <span className="clay-badge px-3 py-1 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {COMMANDS_DATA.length}+ Commands
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
            <span className="clay-badge px-3 py-1 text-slate-700 dark:text-slate-300">
              9 Tactical Domains
            </span>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'vault' && (
          <CommandVault
            commands={COMMANDS_DATA}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onRunInTerminal={handleRunInTerminal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showOnlyBookmarks={showOnlyBookmarks}
            setShowOnlyBookmarks={setShowOnlyBookmarks}
          />
        )}

        {activeTab === 'setup' && (
          <KaliSetupGuide
            onRunInTerminal={handleRunInTerminal}
            onExploreCommands={() => setActiveTab('vault')}
          />
        )}

        {activeTab === 'terminal' && (
          <TerminalSimulator
            initialCommand={initialTerminalCommand}
            onClearInitialCommand={() => setInitialTerminalCommand(undefined)}
          />
        )}

        {activeTab === 'builder' && (
          <CommandBuilder
            onRunInTerminal={handleRunInTerminal}
          />
        )}

        {activeTab === 'quiz' && (
          <CyberQuiz />
        )}

        {activeTab === 'releases' && (
          <LatestReleases
            onRunInTerminal={handleRunInTerminal}
          />
        )}

      </main>

      {/* Footer in Claymorphism */}
      <footer className="mt-16 px-4 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto clay-card p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">KaliVault</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Tactical Claymorphic Cybersecurity Operations Suite</span>
          </div>

          <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 max-w-md">
            ⚠️ Disclaimer: All commands and tools documented are strictly for authorized penetration testing, security auditing, and defensive hardening.
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://www.kali.org/tools/"
              target="_blank"
              rel="noreferrer"
              className="clay-btn px-3 py-1.5 rounded-xl font-mono text-[11px] flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400"
            >
              <span>Official Kali Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        commands={COMMANDS_DATA}
        bookmarkedIds={bookmarkedIds}
      />

    </div>
  );
}

export default App;
