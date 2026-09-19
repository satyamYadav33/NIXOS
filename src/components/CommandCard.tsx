import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Terminal, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Sparkles,
  Tag
} from 'lucide-react';
import type { CommandItem, NoiseLevel } from '../types';

interface CommandCardProps {
  command: CommandItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onRunInTerminal: (cmd: string) => void;
  categoryColor: string;
}

export const CommandCard: React.FC<CommandCardProps> = ({
  command,
  isBookmarked,
  onToggleBookmark,
  onRunInTerminal,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFlags, setShowFlags] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNoiseBadge = (level: NoiseLevel) => {
    switch (level) {
      case 'stealth':
        return {
          label: 'Stealth / Passive',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400'
        };
      case 'low':
        return {
          label: 'Low OpSec Noise',
          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          dot: 'bg-sky-400'
        };
      case 'moderate':
        return {
          label: 'Moderate Noise',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400'
        };
      case 'noisy':
        return {
          label: 'High Noise / Active',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400 animate-pulse'
        };
    }
  };

  const noiseMeta = getNoiseBadge(command.noiseLevel);

  return (
    <div className="group relative rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 shadow-lg hover:shadow-cyan-500/5 flex flex-col justify-between overflow-hidden">
      
      {/* Top Bar: Tool, Noise, Phase, Bookmarks */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 rounded-md">
              {command.tool}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium border rounded-full ${noiseMeta.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${noiseMeta.dot}`}></span>
              {noiseMeta.label}
            </span>
            <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60 rounded-full">
              {command.phase}
            </span>
            {command.mitreId && (
              <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                {command.mitreId}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleBookmark(command.id)}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Command'}
            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 rounded-lg transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Command Title & Description */}
        <h3 className="text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
          {command.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {command.description}
        </p>

        {/* Command Box */}
        <div className="mt-3.5 relative rounded-lg bg-[#070b14] border border-slate-800/90 group-hover:border-slate-700 transition-colors p-3 font-mono text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 overflow-x-auto text-emerald-400 py-1 pr-2 selection:bg-emerald-500/30">
              <span className="text-slate-500 select-none mr-2">$</span>
              {command.command}
            </div>
            
            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                onClick={handleCopy}
                title="Copy Command to Clipboard"
                className={`p-1.5 rounded-md border text-xs transition-all ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => onRunInTerminal(command.command)}
                title="Run in Kali Terminal Simulator"
                className="p-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/25 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Real-World Cybersecurity Scenario */}
        <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/70 text-xs text-slate-300 flex items-start space-x-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-cyan-300 text-[11px] block uppercase tracking-wider mb-0.5">
              Analyst Scenario & Context
            </span>
            <p className="text-slate-300 leading-snug">
              {command.scenario}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Sections: Flags Breakdown & Simulated Output */}
      <div className="px-5 pb-4 pt-1 space-y-2">
        {/* Toggle Flags */}
        {command.flags && command.flags.length > 0 && (
          <div className="border border-slate-800/80 rounded-lg overflow-hidden bg-slate-950/40">
            <button
              onClick={() => setShowFlags(!showFlags)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span className="flex items-center space-x-1.5 font-medium">
                <Tag className="w-3 h-3 text-cyan-400" />
                <span>Flag Breakdown ({command.flags.length})</span>
              </span>
              {showFlags ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showFlags && (
              <div className="px-3 pb-2.5 pt-1 space-y-1.5 border-t border-slate-800/60 text-xs">
                {command.flags.map((f, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2 py-1 border-b border-slate-900/60 last:border-0">
                    <code className="text-cyan-400 font-mono font-semibold shrink-0 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40 text-[11px]">
                      {f.flag}
                    </code>
                    <span className="text-slate-400 text-right text-[11px] leading-tight">
                      {f.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Toggle Output Example */}
        {command.outputExample && (
          <div className="border border-slate-800/80 rounded-lg overflow-hidden bg-slate-950/40">
            <button
              onClick={() => setShowOutput(!showOutput)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span className="flex items-center space-x-1.5 font-medium">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>Simulated Output Preview</span>
              </span>
              {showOutput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showOutput && (
              <div className="p-3 border-t border-slate-800/60 bg-[#060911] font-mono text-[11px] text-slate-300 overflow-x-auto max-h-48 scanlines">
                <pre className="whitespace-pre text-emerald-400/90 leading-relaxed">
                  {command.outputExample}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Pro Tip if available */}
        {command.tips && (
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 px-1 pt-1">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">
              <strong className="text-amber-300/90">Pro-Tip:</strong> {command.tips}
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
