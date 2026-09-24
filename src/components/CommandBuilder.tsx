import React, { useState } from 'react';
import { Wrench, Copy, Check, Terminal, Sparkles } from 'lucide-react';

interface CommandBuilderProps {
  onRunInTerminal: (cmd: string) => void;
}

type ToolChoice = 'nmap' | 'sqlmap' | 'hydra' | 'msfvenom';

export const CommandBuilder: React.FC<CommandBuilderProps> = ({ onRunInTerminal }) => {
  const [activeTool, setActiveTool] = useState<ToolChoice>('nmap');
  const [copied, setCopied] = useState(false);

  // Nmap State
  const [nmapTarget, setNmapTarget] = useState('192.168.1.50');
  const [nmapScanType, setNmapScanType] = useState('-sS'); // -sS, -sT, -sU, -sA
  const [nmapPorts, setNmapPorts] = useState('-p-'); // -p-, --top-ports 1000, -p 80,443,8080
  const [nmapVersion, setNmapVersion] = useState(true); // -sV
  const [nmapDefaultScripts, setNmapDefaultScripts] = useState(true); // -sC
  const [nmapTiming, setNmapTiming] = useState('-T4'); // -T2, -T3, -T4, -T5
  const [nmapNoPing, setNmapNoPing] = useState(true); // -Pn
  const [nmapNoDns, setNmapNoDns] = useState(true); // -n
  const [nmapVulnScan, setNmapVulnScan] = useState(false); // --script=vuln
  const [nmapOutput, setNmapOutput] = useState(true); // -oA scan_results

  // SQLMap State
  const [sqlmapUrl, setSqlmapUrl] = useState('https://target.com/item.php?id=1');
  const [sqlmapAction, setSqlmapAction] = useState('--dbs'); // --dbs, --tables, --dump, --os-shell
  const [sqlmapBatch, setSqlmapBatch] = useState(true); // --batch
  const [sqlmapRandomAgent, setSqlmapRandomAgent] = useState(true); // --random-agent
  const [sqlmapRisk, setSqlmapRisk] = useState('1'); // 1, 2, 3
  const [sqlmapLevel, setSqlmapLevel] = useState('1'); // 1, 2, 3, 5
  const [sqlmapThreads, setSqlmapThreads] = useState('5');

  // Hydra State
  const [hydraTarget, setHydraTarget] = useState('192.168.1.50');
  const [hydraService, setHydraService] = useState('ssh'); // ssh, ftp, rdp, http-post-form, smb
  const [hydraUserMode, setHydraUserMode] = useState<'single' | 'list'>('single');
  const [hydraUser, setHydraUser] = useState('root');
  const [hydraPassMode, setHydraPassMode] = useState<'single' | 'wordlist'>('wordlist');
  const [hydraPass, setHydraPass] = useState('/usr/share/wordlists/rockyou.txt');
  const [hydraThreads, setHydraThreads] = useState('4');
  const [hydraVerbose, setHydraVerbose] = useState(true);

  // Msfvenom State
  const [msfPlatform, setMsfPlatform] = useState('windows');
  const [msfArch, setMsfArch] = useState('x64');
  const [msfPayloadType, setMsfPayloadType] = useState('meterpreter/reverse_tcp');
  const [msfLhost, setMsfLhost] = useState('10.10.14.5');
  const [msfLport, setMsfLport] = useState('4444');
  const [msfFormat, setMsfFormat] = useState('exe');
  const [msfOutputFile, setMsfOutputFile] = useState('payload.exe');

  // Computed command strings
  const generateCommand = (): string => {
    switch (activeTool) {
      case 'nmap': {
        const parts = ['nmap'];
        if (nmapScanType) parts.push(nmapScanType);
        if (nmapNoPing) parts.push('-Pn');
        if (nmapNoDns) parts.push('-n');
        if (nmapVersion) parts.push('-sV');
        if (nmapDefaultScripts) parts.push('-sC');
        if (nmapVulnScan) parts.push('--script=vuln');
        if (nmapPorts) parts.push(nmapPorts);
        if (nmapTiming) parts.push(nmapTiming);
        if (nmapOutput) parts.push('-oA scan_results');
        parts.push(nmapTarget || 'target.com');
        return parts.join(' ');
      }
      case 'sqlmap': {
        const parts = ['sqlmap'];
        parts.push(`-u "${sqlmapUrl}"`);
        if (sqlmapBatch) parts.push('--batch');
        if (sqlmapRandomAgent) parts.push('--random-agent');
        if (sqlmapLevel !== '1') parts.push(`--level=${sqlmapLevel}`);
        if (sqlmapRisk !== '1') parts.push(`--risk=${sqlmapRisk}`);
        if (sqlmapThreads !== '1') parts.push(`--threads=${sqlmapThreads}`);
        parts.push(sqlmapAction);
        return parts.join(' ');
      }
      case 'hydra': {
        const parts = ['hydra'];
        if (hydraUserMode === 'single') {
          parts.push(`-l ${hydraUser}`);
        } else {
          parts.push(`-L /usr/share/wordlists/SecLists/Usernames/top-usernames-shortlist.txt`);
        }
        if (hydraPassMode === 'single') {
          parts.push(`-p ${hydraPass}`);
        } else {
          parts.push(`-P ${hydraPass}`);
        }
        parts.push(hydraTarget);
        parts.push(hydraService);
        if (hydraThreads) parts.push(`-t ${hydraThreads}`);
        if (hydraVerbose) parts.push('-V');
        return parts.join(' ');
      }
      case 'msfvenom': {
        const payload = `${msfPlatform}/${msfArch}/${msfPayloadType}`;
        const parts = [
          'msfvenom',
          `-p ${payload}`,
          `LHOST=${msfLhost}`,
          `LPORT=${msfLport}`,
          `-f ${msfFormat}`,
          `-o ${msfOutputFile}`
        ];
        return parts.join(' ');
      }
    }
  };

  const generatedCommand = generateCommand();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Tool Selector Tabs (Tactile Clay) */}
      <div className="flex flex-wrap items-center gap-2.5 pb-2">
        <span className="clay-badge px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mr-2 flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5 text-purple-500" />
          Select Tool:
        </span>
        {[
          { id: 'nmap', label: 'Nmap Port Scanner' },
          { id: 'sqlmap', label: 'SQLMap SQLi Exploiter' },
          { id: 'hydra', label: 'Hydra Network Cracker' },
          { id: 'msfvenom', label: 'Msfvenom Payload Crafter' }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id as ToolChoice)}
            className={`clay-btn px-4 py-2 text-xs font-bold transition-all ${
              activeTool === tool.id
                ? 'clay-btn-primary shadow-lg'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Dynamic Builder Form (Clay Card) */}
      <div className="clay-card p-6 sm:p-8 space-y-6">
        
        {/* NMAP FORM */}
        {activeTool === 'nmap' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Target Host / Subnet
                </label>
                <input
                  type="text"
                  value={nmapTarget}
                  onChange={(e) => setNmapTarget(e.target.value)}
                  placeholder="192.168.1.50 or target.com"
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Scan Technique
                </label>
                <select
                  value={nmapScanType}
                  onChange={(e) => setNmapScanType(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="-sS">TCP SYN Stealth Scan (-sS)</option>
                  <option value="-sT">TCP Full Connect Scan (-sT)</option>
                  <option value="-sU">UDP Port Scan (-sU)</option>
                  <option value="-sA">TCP ACK Firewall Evasion (-sA)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Port Scope
                </label>
                <select
                  value={nmapPorts}
                  onChange={(e) => setNmapPorts(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="-p-">All 65,535 Ports (-p-)</option>
                  <option value="--top-ports 1000">Top 1,000 Ports (--top-ports 1000)</option>
                  <option value="--top-ports 100">Top 100 Ports (--top-ports 100)</option>
                  <option value="-p 80,443,8080,8443">Web Ports Only (-p 80,443,8080,8443)</option>
                  <option value="-p 21,22,23,25,53,80,443,445,3389">Standard Core Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Timing & Performance
                </label>
                <select
                  value={nmapTiming}
                  onChange={(e) => setNmapTiming(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="-T4">Aggressive / Fast (-T4)</option>
                  <option value="-T3">Normal / Default (-T3)</option>
                  <option value="-T2">Polite / Slower (-T2)</option>
                  <option value="-T5">Insane / Lab Speed (-T5)</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={nmapVersion}
                  onChange={(e) => setNmapVersion(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Version Detection (-sV)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={nmapDefaultScripts}
                  onChange={(e) => setNmapDefaultScripts(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Default Scripts (-sC)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={nmapNoPing}
                  onChange={(e) => setNmapNoPing(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Skip Ping Probe (-Pn)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={nmapNoDns}
                  onChange={(e) => setNmapNoDns(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Disable DNS Resolution (-n)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={nmapVulnScan}
                  onChange={(e) => setNmapVulnScan(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Vulnerability NSE (--script=vuln)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={nmapOutput}
                  onChange={(e) => setNmapOutput(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Export All Formats (-oA)</span>
              </label>
            </div>
          </div>
        )}

        {/* SQLMAP FORM */}
        {activeTool === 'sqlmap' && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                Target URL with Parameter
              </label>
              <input
                type="text"
                value={sqlmapUrl}
                onChange={(e) => setSqlmapUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Extraction Action
                </label>
                <select
                  value={sqlmapAction}
                  onChange={(e) => setSqlmapAction(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="--dbs">Enumerate Databases (--dbs)</option>
                  <option value="--tables">Enumerate Tables (--tables)</option>
                  <option value="--dump">Dump Database Contents (--dump)</option>
                  <option value="--current-user">Current DB User (--current-user)</option>
                  <option value="--os-shell">Spawn OS Command Shell (--os-shell)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Detection Level (1-5)
                </label>
                <select
                  value={sqlmapLevel}
                  onChange={(e) => setSqlmapLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="1">Level 1 (Standard GET/POST)</option>
                  <option value="2">Level 2 (Includes HTTP Cookies)</option>
                  <option value="3">Level 3 (Includes User-Agent/Referer)</option>
                  <option value="5">Level 5 (Exhaustive & Custom Headers)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Payload Risk (1-3)
                </label>
                <select
                  value={sqlmapRisk}
                  onChange={(e) => setSqlmapRisk(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="1">Risk 1 (Safe, no heavy queries)</option>
                  <option value="2">Risk 2 (Time-based queries included)</option>
                  <option value="3">Risk 3 (OR-based, can update data)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={sqlmapBatch}
                  onChange={(e) => setSqlmapBatch(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Default Answers (--batch)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={sqlmapRandomAgent}
                  onChange={(e) => setSqlmapRandomAgent(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Random User-Agent</span>
              </label>

              <div className="flex items-center space-x-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <span className="text-[11px] uppercase font-bold text-slate-700 dark:text-slate-300 font-mono">Threads:</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={sqlmapThreads}
                  onChange={(e) => setSqlmapThreads(e.target.value)}
                  className="w-16 px-2.5 py-1.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* HYDRA FORM */}
        {activeTool === 'hydra' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Target Host
                </label>
                <input
                  type="text"
                  value={hydraTarget}
                  onChange={(e) => setHydraTarget(e.target.value)}
                  placeholder="192.168.1.50"
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Target Protocol / Service
                </label>
                <select
                  value={hydraService}
                  onChange={(e) => setHydraService(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="ssh">SSH (Port 22)</option>
                  <option value="ftp">FTP (Port 21)</option>
                  <option value="rdp">RDP (Port 3389)</option>
                  <option value="smb">SMB (Port 445)</option>
                  <option value="mysql">MySQL (Port 3306)</option>
                  <option value="http-post-form">HTTP Post Form (/login.php)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Username Target
                </label>
                <div className="flex gap-2">
                  <select
                    value={hydraUserMode}
                    onChange={(e) => setHydraUserMode(e.target.value as 'single' | 'list')}
                    className="w-28 px-2.5 py-2 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono bg-white dark:bg-slate-900"
                  >
                    <option value="single">-l (User)</option>
                    <option value="list">-L (List)</option>
                  </select>
                  <input
                    type="text"
                    value={hydraUser}
                    onChange={(e) => setHydraUser(e.target.value)}
                    disabled={hydraUserMode === 'list'}
                    className="flex-1 px-3.5 py-2 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Password Target
                </label>
                <div className="flex gap-2">
                  <select
                    value={hydraPassMode}
                    onChange={(e) => setHydraPassMode(e.target.value as 'single' | 'wordlist')}
                    className="w-32 px-2.5 py-2 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono bg-white dark:bg-slate-900"
                  >
                    <option value="wordlist">-P (List)</option>
                    <option value="single">-p (Pass)</option>
                  </select>
                  <input
                    type="text"
                    value={hydraPass}
                    onChange={(e) => setHydraPass(e.target.value)}
                    className="flex-1 px-3.5 py-2 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Parallel Connection Tasks (-t)
                </label>
                <input
                  type="number"
                  min="1"
                  max="64"
                  value={hydraThreads}
                  onChange={(e) => setHydraThreads(e.target.value)}
                  className="w-24 px-3.5 py-2 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <label className="flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer pt-6 font-medium">
                <input
                  type="checkbox"
                  checked={hydraVerbose}
                  onChange={(e) => setHydraVerbose(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-rose-500 focus:ring-0"
                />
                <span>Verbose Display (-V)</span>
              </label>
            </div>
          </div>
        )}

        {/* MSFVENOM FORM */}
        {activeTool === 'msfvenom' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Target Platform
                </label>
                <select
                  value={msfPlatform}
                  onChange={(e) => {
                    const p = e.target.value;
                    setMsfPlatform(p);
                    if (p === 'windows') setMsfFormat('exe');
                    else if (p === 'linux') setMsfFormat('elf');
                    else if (p === 'android') setMsfFormat('apk');
                    else if (p === 'php') setMsfFormat('raw');
                  }}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="windows">Windows</option>
                  <option value="linux">Linux</option>
                  <option value="android">Android</option>
                  <option value="php">PHP</option>
                  <option value="python">Python</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Architecture
                </label>
                <select
                  value={msfArch}
                  onChange={(e) => setMsfArch(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="x64">64-bit (x64)</option>
                  <option value="x86">32-bit (x86)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Payload Type
                </label>
                <select
                  value={msfPayloadType}
                  onChange={(e) => setMsfPayloadType(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-white dark:bg-slate-900"
                >
                  <option value="meterpreter/reverse_tcp">Meterpreter Reverse TCP</option>
                  <option value="meterpreter/reverse_https">Meterpreter Reverse HTTPS</option>
                  <option value="shell/reverse_tcp">Standard Shell Reverse TCP</option>
                  <option value="meterpreter/bind_tcp">Meterpreter Bind TCP</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Attacker IP (LHOST)
                </label>
                <input
                  type="text"
                  value={msfLhost}
                  onChange={(e) => setMsfLhost(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Attacker Port (LPORT)
                </label>
                <input
                  type="text"
                  value={msfLport}
                  onChange={(e) => setMsfLport(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Output Format (-f)
                </label>
                <input
                  type="text"
                  value={msfFormat}
                  onChange={(e) => setMsfFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                  Output Filename (-o)
                </label>
                <input
                  type="text"
                  value={msfOutputFile}
                  onChange={(e) => setMsfOutputFile(e.target.value)}
                  className="w-full px-3.5 py-2.5 clay-inset rounded-xl text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Generated Command Preview Bar (Clay Card) */}
      <div className="clay-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Constructed Live Command:
          </span>
          <span className="clay-badge px-2.5 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300 font-bold">
            Ready to copy & execute
          </span>
        </div>

        <div className="clay-inset p-4 bg-[#070b14] dark:bg-[#050810] font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto select-all rounded-xl">
          <span className="text-slate-500 select-none mr-2 font-normal">$</span>
          {generatedCommand}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
          <button
            onClick={handleCopy}
            className={`clay-btn flex items-center space-x-2 px-5 py-2.5 text-xs font-bold transition-all ${
              copied
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Command'}</span>
          </button>

          <button
            onClick={() => onRunInTerminal(generatedCommand)}
            className="clay-btn-primary flex items-center space-x-2 px-6 py-2.5 text-xs font-bold transition-all"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Launch in Kali Terminal</span>
          </button>
        </div>
      </div>

    </div>
  );
};
