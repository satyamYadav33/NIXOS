import React, { useState } from 'react';
import type { CommandItem } from '../types';
import { X, Download, Copy, Check, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandItem[];
  bookmarkedIds: Set<string>;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  commands,
  bookmarkedIds
}) => {
  const [exportScope, setExportScope] = useState<'all' | 'bookmarks'>('all');
  const [exportFormat, setExportFormat] = useState<'markdown' | 'text'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetCommands = exportScope === 'bookmarks'
    ? commands.filter((c) => bookmarkedIds.has(c.id))
    : commands;

  const generateExportText = (): string => {
    if (exportFormat === 'markdown') {
      let md = `# Kali Linux Cybersecurity Command Cheat Sheet\n\n`;
      md += `Generated from KaliVault on ${new Date().toLocaleDateString()}\n`;
      md += `Total Commands: ${targetCommands.length}\n\n---\n\n`;

      targetCommands.forEach((cmd) => {
        md += `### ${cmd.name} (${cmd.tool})\n`;
        md += `- **Category:** ${cmd.category.toUpperCase()}\n`;
        md += `- **Kill Chain Phase:** ${cmd.phase}\n`;
        md += `- **OpSec Noise Level:** ${cmd.noiseLevel}\n`;
        if (cmd.mitreId) md += `- **MITRE ATT&CK:** ${cmd.mitreId}\n`;
        md += `- **Description:** ${cmd.description}\n`;
        md += `- **Scenario:** ${cmd.scenario}\n\n`;
        md += `\`\`\`bash\n${cmd.command}\n\`\`\`\n\n`;

        if (cmd.flags.length > 0) {
          md += `**Flags Breakdown:**\n`;
          cmd.flags.forEach((f) => {
            md += `- \`${f.flag}\`: ${f.description}\n`;
          });
          md += `\n`;
        }

        if (cmd.tips) {
          md += `> **Pro-Tip:** ${cmd.tips}\n\n`;
        }

        md += `---\n\n`;
      });

      return md;
    } else {
      let txt = `KALI LINUX COMMAND CHEAT SHEET\n`;
      txt += `Total: ${targetCommands.length} commands\n\n`;

      targetCommands.forEach((cmd, i) => {
        txt += `[${i + 1}] ${cmd.name.toUpperCase()}\n`;
        txt += `Command: ${cmd.command}\n`;
        txt += `Tool: ${cmd.tool} | Phase: ${cmd.phase} | Noise: ${cmd.noiseLevel}\n`;
        txt += `Context: ${cmd.scenario}\n`;
        txt += `--------------------------------------------------------\n\n`;
      });

      return txt;
    }
  };

  const exportContent = generateExportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `kalivault-cheatsheet.${exportFormat === 'markdown' ? 'md' : 'txt'}`;
    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl clay-card overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                Export Kali Tactical Sheet
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Generate offline markdown or text field reference
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="clay-btn p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Options */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Scope */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono">
                Export Scope
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportScope('all')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    exportScope === 'all'
                      ? 'clay-btn-primary'
                      : 'clay-btn text-slate-600 dark:text-slate-300'
                  }`}
                >
                  All ({commands.length})
                </button>
                <button
                  onClick={() => setExportScope('bookmarks')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    exportScope === 'bookmarks'
                      ? 'clay-btn-primary'
                      : 'clay-btn text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Bookmarks ({bookmarkedIds.size})
                </button>
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono">
                Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportFormat('markdown')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    exportFormat === 'markdown'
                      ? 'clay-btn-primary'
                      : 'clay-btn text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Markdown (.md)
                </button>
                <button
                  onClick={() => setExportFormat('text')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    exportFormat === 'text'
                      ? 'clay-btn-primary'
                      : 'clay-btn text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Plain Text (.txt)
                </button>
              </div>
            </div>

          </div>

          {/* Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                Preview ({targetCommands.length} commands)
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                Ready to compile
              </span>
            </div>
            <div className="clay-inset p-4 rounded-2xl font-mono text-xs text-slate-800 dark:text-slate-200 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all">
              {exportContent}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleCopy}
            className={`clay-btn flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${
              copied
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="clay-btn-primary flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download File</span>
          </button>
        </div>

      </div>
    </div>
  );
};
