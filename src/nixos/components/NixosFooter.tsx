import React from 'react';
import { ExternalLink, ShieldAlert } from 'lucide-react';

interface NixosFooterProps {
  onSwitchToKali: () => void;
}

export const NixosFooter: React.FC<NixosFooterProps> = ({ onSwitchToKali }) => {
  return (
    <footer className="mt-20 border-t border-slate-200/60 dark:border-slate-800/60 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-cyan-500/20">
                ❄️
              </div>
              <span className="font-black text-lg tracking-tight font-mono text-slate-900 dark:text-white">
                NixOS<span className="text-cyan-500">Studio</span>
              </span>
              <span className="clay-badge text-[9px] font-mono px-2 py-0.5 text-cyan-600 dark:text-cyan-400 font-bold">
                CLAY OS
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              An interactive Claymorphic visualizer presenting the pure functional Nix package manager, immutable content-addressed storage, and declarative operating system rollbacks.
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              Designed for portfolio demonstration & technical exploration.
            </div>
          </div>

          {/* Quick External Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">
              Official Documentation
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <a 
                  href="https://nixos.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 flex items-center gap-1.5 transition-colors"
                >
                  <span>NixOS Official Website</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://search.nixos.org/packages" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 flex items-center gap-1.5 transition-colors"
                >
                  <span>Nixpkgs Package Explorer (100k+ packages)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nixos.org/manual/nixos/stable/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 flex items-center gap-1.5 transition-colors"
                >
                  <span>NixOS Reference Manual</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Portfolio Sister Project Clay Card */}
          <div className="md:col-span-3 clay-card p-4 space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
              <span>Explore Sister Project</span>
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              Looking for offensive cybersecurity commands, exploits, and OSINT?
            </p>
            <button
              onClick={onSwitchToKali}
              className="w-full py-2 px-3 clay-btn-primary font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-white"
            >
              <span>Launch KaliVault</span>
              <ExternalLink className="w-3 h-3 text-emerald-300" />
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Built with React 19, TypeScript & Tailwind CSS • Tactile Claymorphism Theme
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="clay-badge px-2 py-0.5 text-cyan-600 dark:text-cyan-400 font-bold">Reproducible</span>
            <span className="clay-badge px-2 py-0.5 text-blue-600 dark:text-blue-400 font-bold">Declarative</span>
            <span className="clay-badge px-2 py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">Rollback Safe</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
