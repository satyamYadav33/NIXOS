import React, { useState } from 'react';
import type { NixHubTab } from './types';
import { NixosNavbar } from './components/NixosNavbar';
import { NixosHero } from './components/NixosHero';
import { NixVsNixosExplorer } from './components/NixVsNixosExplorer';
import { ImperativeVsDeclarative } from './components/ImperativeVsDeclarative';
import { NixStoreVisualizer } from './components/NixStoreVisualizer';
import { RollbackTimeMachine } from './components/RollbackTimeMachine';
import { ConfigPlayground } from './components/ConfigPlayground';
import { NixTerminalSimulator } from './components/NixTerminalSimulator';
import { NixCheatSheet } from './components/NixCheatSheet';
import { NixQuiz } from './components/NixQuiz';
import { NixosFooter } from './components/NixosFooter';
import { 
  RotateCcw, 
  ArrowRight 
} from 'lucide-react';

interface NixosHubProps {
  onSwitchToKali: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onReplaySplash?: () => void;
}

export const NixosHub: React.FC<NixosHubProps> = ({
  onSwitchToKali,
  theme,
  onToggleTheme,
  onReplaySplash
}) => {
  const [activeTab, setActiveTab] = useState<NixHubTab>('overview');

  const handleTabChange = (tab: NixHubTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-200 transition-colors duration-200">
      
      {/* Top Sticky Navigation */}
      <NixosNavbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onSwitchToKali={onSwitchToKali}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onReplaySplash={onReplaySplash}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <NixosHero onNavigate={handleTabChange} />

            {/* Quick Interactive Highlights */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* Feature 1: The Core Distinction */}
              <section className="space-y-6">
                <NixVsNixosExplorer />
              </section>

              {/* Feature 2: Rollback Time Machine Teaser */}
              <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-blue-950/80 text-white border border-cyan-500/20 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Sub-Second Rollback Engine</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Experience the Zero-Downtime Rollback Time Machine
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                      Traditional systems force you to troubleshoot broken updates or restore heavy disk snapshots. NixOS makes disaster recovery instantaneous: simply run <code className="text-cyan-300 font-mono font-bold">nixos-rebuild switch --rollback</code> or select previous generations directly in the boot menu.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
                    <button
                      onClick={() => handleTabChange('rollback-timemachine')}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Launch Time Machine</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Feature 3: Interactive configuration.nix Preview */}
              <section className="space-y-6">
                <ConfigPlayground />
              </section>

            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <NixVsNixosExplorer />
          </div>
        )}

        {activeTab === 'imperative-vs-declarative' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ImperativeVsDeclarative />
          </div>
        )}

        {activeTab === 'store-graph' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <NixStoreVisualizer />
          </div>
        )}

        {activeTab === 'rollback-timemachine' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <RollbackTimeMachine />
          </div>
        )}

        {activeTab === 'config-builder' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ConfigPlayground />
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <NixTerminalSimulator />
          </div>
        )}

        {activeTab === 'cheatsheet' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <NixCheatSheet />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <NixQuiz />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <NixosFooter onSwitchToKali={onSwitchToKali} />

    </div>
  );
};
