import { useState, useEffect } from 'react';
import { COMMANDS_DATA } from './data/commandsData';
import { Header } from './components/Header';
import { CommandVault } from './components/CommandVault';
import { TerminalSimulator } from './components/TerminalSimulator';
import { CommandBuilder } from './components/CommandBuilder';
import { CyberQuiz } from './components/CyberQuiz';
import { LatestReleases } from './components/LatestReleases';
import { ExportModal } from './components/ExportModal';
import { ShieldAlert, Terminal, ExternalLink, Flame } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'vault' | 'terminal' | 'builder' | 'quiz' | 'releases'>('vault');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [initialTerminalCommand, setInitialTerminalCommand] = useState<string | undefined>(undefined);

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

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans cyber-grid selection:bg-cyan-500/30 selection:text-cyan-200">
      
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Banner Announcement / Quick Stats */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-indigo-950/30 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-200">
                Offensive Security & Red Team Playbook
              </h2>
              <p className="text-[11px] text-slate-400">
                Curated tactical commands covering Recon, Weaponization, Exploitation, PrivEsc, and Forensics.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 self-end sm:self-center">
            <button
              onClick={() => setActiveTab('releases')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 transition-colors cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Latest Tools Radar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              45+ Commands
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span>9 Domains</span>
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

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/60 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200 font-mono">KaliVault</span>
            <span className="text-slate-600">•</span>
            <span>Interactive Kali Linux Cybersecurity Hub</span>
          </div>

          <div className="text-center text-[11px] text-slate-500 max-w-md">
            ⚠️ Disclaimer: All tools, commands, and syntax provided herein are intended strictly for educational purposes, authorized penetration testing, and security hardening under written consent.
          </div>

          <div className="flex items-center space-x-3 text-slate-400">
            <a
              href="https://www.kali.org/tools/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
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
