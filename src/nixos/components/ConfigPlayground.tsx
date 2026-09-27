import React, { useState } from 'react';
import { CONFIG_MODULE_OPTIONS } from '../data/nixosData';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Play, 
  FileText, 
  CheckCircle2
} from 'lucide-react';

export const ConfigPlayground: React.FC = () => {
  const [selectedModuleIds, setSelectedModuleIds] = useState<Set<string>>(() => {
    return new Set(CONFIG_MODULE_OPTIONS.filter(m => m.enabledByDefault).map(m => m.id));
  });

  const [hostname, setHostname] = useState('nixbox');
  const [configFormat, setConfigFormat] = useState<'classic' | 'flake'>('classic');
  const [copied, setCopied] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationSuccess, setEvaluationSuccess] = useState(false);

  const toggleModule = (id: string) => {
    setSelectedModuleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setEvaluationSuccess(false);
  };

  // Generate dynamic Nix code
  const generateNixCode = () => {
    const enabledModules = CONFIG_MODULE_OPTIONS.filter(m => selectedModuleIds.has(m.id));

    if (configFormat === 'classic') {
      return `# /etc/nixos/configuration.nix
# Edit this configuration file to define what should be installed on
# your system. Help is available in the configuration.nix(5) man page
# and in the NixOS manual (accessible by running ‘nixos-help’).

{ config, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
  ];

  # Networking & Host identity
  networking.hostName = "${hostname}";

${enabledModules.map(m => `  # --- ${m.title} ---
${m.nixCodeSnippet.split('\n').map(line => `  ${line}`).join('\n')}`).join('\n\n')}

  # Set your time zone & Internationalisation
  time.timeZone = "UTC";
  i18n.defaultLocale = "en_US.UTF-8";

  # Allow unfree packages (e.g. proprietary drivers, VS Code)
  nixpkgs.config.allowUnfree = true;

  # Do NOT change this value unless you have read the changelog!
  system.stateVersion = "24.05";
}
`;
    } else {
      // Modern Flake format
      return `# /etc/nixos/flake.nix
{
  description = "Pure Deterministic NixOS Flake for ${hostname}";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.05";
    home-manager = {
      url = "github:nix-community/home-manager/release-24.05";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, home-manager, ... }@inputs: {
    nixosConfigurations.${hostname} = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ./hardware-configuration.nix
        {
          networking.hostName = "${hostname}";
          nixpkgs.config.allowUnfree = true;

${enabledModules.map(m => `          # --- ${m.title} ---
${m.nixCodeSnippet.split('\n').map(line => `          ${line}`).join('\n')}`).join('\n\n')}

          system.stateVersion = "24.05";
        }
      ];
    };
  };
}
`;
    }
  };

  const code = generateNixCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = configFormat === 'classic' ? 'configuration.nix' : 'flake.nix';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSimulateBuild = () => {
    setIsEvaluating(true);
    setEvaluationSuccess(false);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Interactive Declarative Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          <span className="font-mono text-cyan-600 dark:text-cyan-400">configuration.nix</span> Live Studio
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          The single set of files whose very beautiful name is <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-mono text-xs">configuration.nix</code>. Toggle features below and watch the pure Nix syntax update live in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Feature Toggles */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Identity Parameters */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              System Identity & Mode
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Hostname</label>
                <input
                  type="text"
                  value={hostname}
                  onChange={(e) => setHostname(e.target.value || 'nixbox')}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500">Config Format</label>
                <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mt-1">
                  <button
                    onClick={() => setConfigFormat('classic')}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                      configFormat === 'classic'
                        ? 'bg-cyan-500 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Classic
                  </button>
                  <button
                    onClick={() => setConfigFormat('flake')}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                      configFormat === 'flake'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Flake
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Module Switcher List */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Declarative Modules
              </h3>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                {selectedModuleIds.size} / {CONFIG_MODULE_OPTIONS.length} active
              </span>
            </div>

            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {CONFIG_MODULE_OPTIONS.map((module) => {
                const isChecked = selectedModuleIds.has(module.id);
                return (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'border-cyan-500/50 bg-cyan-500/5 dark:bg-cyan-500/10'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 opacity-75'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // Handled by container onClick
                      className="mt-1 w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer pointer-events-none"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {module.title}
                        </span>
                        {module.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {module.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Syntax-Highlighted Code Box */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-bold text-slate-200">
                {configFormat === 'classic' ? '/etc/nixos/configuration.nix' : '/etc/nixos/flake.nix'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .nix</span>
              </button>

              <button
                onClick={handleSimulateBuild}
                disabled={isEvaluating}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Dry-Run Build</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="relative">
            <pre className="p-4 rounded-2xl bg-black/90 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[500px] border border-slate-800/80">
              <code>{code}</code>
            </pre>
          </div>

          {/* Evaluation Simulation Result */}
          {evaluationSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 space-y-2 animate-fadeIn font-mono text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nix Evaluation Passed! Zero syntax impurities.</span>
              </div>
              <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                Evaluated {selectedModuleIds.size} modules into a deterministic system closure. Derivation path: <code className="text-white">/nix/store/1a7c...-nixos-system-{hostname}.drv</code>. Ready to be deployed via <code className="text-white">sudo nixos-rebuild switch</code>.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
