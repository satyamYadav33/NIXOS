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
          badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500'
        };
      case 'low':
        return {
          label: 'Low OpSec Noise',
          badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
          dot: 'bg-sky-500'
        };
      case 'moderate':
        return {
          label: 'Moderate Noise',
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500'
        };
      case 'noisy':
        return {
          label: 'High Noise / Active',
          badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
          dot: 'bg-rose-500 animate-pulse'
        };
    }
  };

  const noiseMeta = getNoiseBadge(command.noiseLevel);

  return (
    <div className="clay-card clay-card-hover group p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
      
      {/* Top Bar: Tool, Noise, Phase, Bookmarks */}
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="clay-badge px-3 py-1 text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">
              {command.tool}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium border rounded-full ${noiseMeta.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${noiseMeta.dot}`}></span>
              {noiseMeta.label}
            </span>
            <span className="clay-badge px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              {command.phase}
            </span>
            {command.mitreId && (
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                {command.mitreId}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleBookmark(command.id)}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Command'}
            className="clay-btn p-2 text-slate-400 hover:text-amber-500 transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Command Title & Description */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
            {command.name}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            {command.description}
          </p>
        </div>

        {/* Command Box (Recessed Clay) */}
        <div className="clay-inset p-3.5 font-mono text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 overflow-x-auto text-emerald-600 dark:text-emerald-400 font-semibold py-1 pr-2 select-all">
              <span className="text-slate-400 select-none mr-2 font-normal">$</span>
              {command.command}
            </div>
            
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleCopy}
                title="Copy Command to Clipboard"
                className={`clay-btn p-2 text-xs transition-all ${
                  copied
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => onRunInTerminal(command.command)}
                title="Run in Kali Terminal Simulator"
                className="clay-btn p-2 text-cyan-600 dark:text-cyan-400 hover:scale-105 transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Real-World Cybersecurity Scenario */}
        <div className="clay-inset p-3 text-xs flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 text-[10px] block uppercase tracking-wider mb-0.5">
              Analyst Scenario & Engagement Context
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              {command.scenario}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Sections: Flags Breakdown & Simulated Output */}
      <div className="pt-4 space-y-2">
        
        {/* Toggle Flags */}
        {command.flags && command.flags.length > 0 && (
          <div className="clay-inset overflow-hidden">
            <button
              onClick={() => setShowFlags(!showFlags)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              <span className="flex items-center space-x-1.5 font-semibold">
                <Tag className="w-3.5 h-3.5 text-cyan-500" />
                <span>Flag Breakdown ({command.flags.length})</span>
              </span>
              {showFlags ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFlags && (
              <div className="px-3.5 pb-3 pt-1 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                {command.flags.map((f, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 py-1 border-b border-slate-200/40 dark:border-slate-800/40 last:border-0">
                    <code className="text-cyan-600 dark:text-cyan-400 font-mono font-bold shrink-0 clay-badge px-2 py-0.5 text-[11px]">
                      {f.flag}
                    </code>
                    <span className="text-slate-600 dark:text-slate-400 text-right text-[11px] leading-tight">
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
          <div className="clay-inset overflow-hidden">
            <button
              onClick={() => setShowOutput(!showOutput)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              <span className="flex items-center space-x-1.5 font-semibold">
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulated Output Preview</span>
              </span>
              {showOutput ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showOutput && (
              <div className="p-3.5 border-t border-slate-200/60 dark:border-slate-800/60 bg-[#060911] text-slate-200 font-mono text-[11px] overflow-x-auto max-h-52 scanlines rounded-b-xl">
                <pre className="whitespace-pre text-emerald-400 leading-relaxed">
                  {command.outputExample}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Pro Tip if available */}
        {command.tips && (
          <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 px-1 pt-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">
              <strong className="text-amber-600 dark:text-amber-400 font-semibold">Pro-Tip:</strong> {command.tips}
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
