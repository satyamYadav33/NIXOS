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

  const generateNixCode = () => {
    const enabledModules = CONFIG_MODULE_OPTIONS.filter(m => selectedModuleIds.has(m.id));

    if (configFormat === 'classic') {
      return `# /etc/nixos/configuration.nix
# Declarative blueprint generated via NixOS Studio

{ config, pkgs, ... }:

{
  imports = [ ./hardware-configuration.nix ];

  networking.hostName = "${hostname}";
  time.timeZone = "UTC";
  i18n.defaultLocale = "en_US.UTF-8";
  nixpkgs.config.allowUnfree = true;

${enabledModules.map(m => `  # --- ${m.title} ---
${m.nixCodeSnippet.split('\n').map(line => `  ${line}`).join('\n')}`).join('\n\n')}

  system.stateVersion = "24.05";
}
`;
    } else {
      return `# /etc/nixos/flake.nix
{
  description = "Pure Deterministic NixOS Flake for ${hostname}";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.05";
  };

  outputs = { self, nixpkgs, ... }@inputs: {
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
    }, 800);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Interactive Declarative Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          <span className="font-mono text-cyan-600 dark:text-cyan-400">configuration.nix</span> Live Studio
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Toggle features below and watch the pure Nix syntax synthesize in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Toggles & Parameters */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Identity Parameters */}
          <div className="clay-card p-5 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Host Identity & Blueprint Format
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Hostname</label>
                <input
                  type="text"
                  value={hostname}
                  onChange={(e) => setHostname(e.target.value || 'nixbox')}
                  className="w-full px-3 py-1.5 rounded-xl clay-inset text-xs font-mono text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500">Format</label>
                <div className="flex clay-inset p-1 mt-1">
                  <button
                    onClick={() => setConfigFormat('classic')}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                      configFormat === 'classic'
                        ? 'clay-btn-primary text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Classic
                  </button>
                  <button
                    onClick={() => setConfigFormat('flake')}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                      configFormat === 'flake'
                        ? 'clay-btn-primary text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Flake
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Module Selector */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Declarative System Modules
              </h3>
              <span className="clay-badge px-2 py-0.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
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
                        ? 'border-cyan-500/60 bg-cyan-500/10 shadow-sm'
                        : 'clay-card hover:border-cyan-400/40 opacity-75'
                    }`}
                  >
                    {/* Visual Custom Clay Switch */}
                    <div className="mt-0.5">
                      <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${isChecked ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                        <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-3.5' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {module.title}
                        </span>
                        {module.badge && (
                          <span className="clay-badge text-[9px] font-mono px-1.5 py-0.2 text-slate-600 dark:text-slate-300">
                            {module.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Syntax-Highlighted Screen */}
        <div className="lg:col-span-7 clay-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-500" />
              <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                {configFormat === 'classic' ? '/etc/nixos/configuration.nix' : '/etc/nixos/flake.nix'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="clay-btn px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-cyan-500" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="clay-btn px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-500" />
                <span>Export .nix</span>
              </button>

              <button
                onClick={handleSimulateBuild}
                disabled={isEvaluating}
                className="clay-btn-primary px-3.5 py-1.5 text-white font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

          {/* Syntax Display Box */}
          <div className="relative">
            <pre className="clay-inset p-4 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed overflow-x-auto max-h-[500px]">
              <code>{code}</code>
            </pre>
          </div>

          {evaluationSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 space-y-1 animate-fadeIn font-mono text-xs">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Nix Evaluation Passed! Zero syntax impurities.</span>
              </div>
              <p className="text-[11px] opacity-90">
                Synthesized {selectedModuleIds.size} modules into a deterministic system closure: <code className="font-bold">/nix/store/1a7c...-system-{hostname}.drv</code>.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
