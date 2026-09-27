import { ExternalLink, ShieldAlert } from 'lucide-react';

interface NixosFooterProps {
  onSwitchToKali: () => void;
}

export const NixosFooter: React.FC<NixosFooterProps> = ({ onSwitchToKali }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                ❄️
              </div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                NixOS Interactive Studio
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              An educational and architectural visualizer presenting the pure functional Nix package manager, immutable content-addressed storage, and declarative operating system rollbacks.
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              Designed for portfolio demonstration & technical exploration.
            </div>
          </div>

          {/* Quick External Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Official Resources
            </span>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li>
                <a 
                  href="https://nixos.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 flex items-center gap-1 transition-colors"
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
                  className="hover:text-cyan-500 flex items-center gap-1 transition-colors"
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
                  className="hover:text-cyan-500 flex items-center gap-1 transition-colors"
                >
                  <span>NixOS Reference Manual</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Portfolio Dual Ecosystem Banner */}
          <div className="md:col-span-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
              <span>Explore Sister Project</span>
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Looking for offensive cybersecurity commands, exploits, and OSINT?
            </p>
            <button
              onClick={onSwitchToKali}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 dark:bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Launch KaliVault</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Built with React 19, TypeScript & Tailwind CSS • Fully Responsive & Production-Ready
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span>Reproducible</span>
            <span className="text-cyan-500 font-bold">•</span>
            <span>Declarative</span>
            <span className="text-blue-500 font-bold">•</span>
            <span>Rollback Safe</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
