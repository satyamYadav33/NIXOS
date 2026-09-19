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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Export Kali Cheat Sheet</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Options */}
        <div className="p-6 space-y-4 overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Scope */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Export Scope
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportScope('all')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    exportScope === 'all'
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All ({commands.length})
                </button>
                <button
                  onClick={() => setExportScope('bookmarks')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    exportScope === 'bookmarks'
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Bookmarks ({bookmarkedIds.size})
                </button>
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportFormat('markdown')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    exportFormat === 'markdown'
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Markdown (.md)
                </button>
                <button
                  onClick={() => setExportFormat('text')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    exportFormat === 'text'
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Plain Text (.txt)
                </button>
              </div>
            </div>

          </div>

          {/* Preview Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Preview ({targetCommands.length} commands)
            </label>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-slate-300 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all">
              {exportContent}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download File</span>
          </button>
        </div>

      </div>
    </div>
  );
};
