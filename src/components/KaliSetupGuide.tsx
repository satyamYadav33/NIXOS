import React, { useState, useEffect } from 'react';
import { 
  WINDOWS_SETUP_METHODS, 
  MAC_SETUP_METHODS, 
  COMMON_TROUBLESHOOTING, 
  POST_INSTALL_CHECKLIST 
} from '../data/setupGuideData';
import { 
  Laptop, 
  Monitor, 
  Copy, 
  Check, 
  Terminal, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  Wrench, 
  Zap,
  ChevronDown,
  ChevronUp,
  Cpu,
  HardDrive
} from 'lucide-react';

interface KaliSetupGuideProps {
  onRunInTerminal: (cmd: string) => void;
  onExploreCommands: () => void;
}

export const KaliSetupGuide: React.FC<KaliSetupGuideProps> = ({
  onRunInTerminal,
  onExploreCommands
}) => {
  const [activeOS, setActiveOS] = useState<'windows' | 'mac'>('windows');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('wsl');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [expandedTroubleId, setExpandedTroubleId] = useState<string | null>('tb-1');

  // Track completed steps per method in localStorage
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('kalivault_setup_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kalivault_setup_progress', JSON.stringify(completedSteps));
    } catch (e) {
      console.error(e);
    }
  }, [completedSteps]);

  // Synchronize default method when OS changes
  const handleOSChange = (os: 'windows' | 'mac') => {
    setActiveOS(os);
    if (os === 'windows') {
      setSelectedMethodId('wsl');
    } else {
      setSelectedMethodId('utm');
    }
  };

  const currentMethod = activeOS === 'windows' 
    ? (WINDOWS_SETUP_METHODS[selectedMethodId as 'wsl' | 'vm' | 'usb'] || WINDOWS_SETUP_METHODS.wsl)
    : (MAC_SETUP_METHODS[selectedMethodId as 'utm' | 'fusion' | 'intel_vm'] || MAC_SETUP_METHODS.utm);

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  // Calculate completion percentage for the current method
  const methodStepIds = currentMethod.steps.map(s => s.id);
  const completedCount = methodStepIds.filter(id => completedSteps[id]).length;
  const progressPercent = Math.round((completedCount / methodStepIds.length) * 100);
  const isFullyCompleted = progressPercent === 100;

  const handleResetProgress = () => {
    setCompletedSteps(prev => {
      const updated = { ...prev };
      methodStepIds.forEach(id => delete updated[id]);
      return updated;
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Station Banner */}
      <div className="clay-card p-6 sm:p-8 space-y-4 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="clay-badge px-3 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                BEGINNER FRIENDLY • 100% FACT-CHECKED
              </span>
              <span className="clay-badge px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                KALI 2024.x READY
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              Interactive Kali Linux Setup Station
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Follow step-by-step verified procedures to install, tune, and run an authentic Kali Linux security environment smoothly on your Windows or Mac machine.
            </p>
          </div>

          {/* Setup Progress Pill & Reset */}
          <div className="clay-inset p-4 sm:p-5 rounded-2xl w-full lg:w-72 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                Setup Progress
              </span>
              <span className="text-cyan-600 dark:text-cyan-400">
                {completedCount}/{methodStepIds.length} Steps ({progressPercent}%)
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                {isFullyCompleted ? '🎉 Ready for combat!' : 'Complete all steps below'}
              </span>
              {completedCount > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="text-[10px] font-mono text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reset method progress"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* System Specs Snapshot Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
          <div className="clay-badge p-2.5 flex items-center space-x-2.5">
            <Cpu className="w-4 h-4 text-cyan-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-mono font-semibold">CPU CORES</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{currentMethod.specs.cpuCores}</span>
            </div>
          </div>

          <div className="clay-badge p-2.5 flex items-center space-x-2.5">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-mono font-semibold">REC. RAM</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{currentMethod.specs.recRam}</span>
            </div>
          </div>

          <div className="clay-badge p-2.5 flex items-center space-x-2.5">
            <HardDrive className="w-4 h-4 text-purple-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-mono font-semibold">FREE STORAGE</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{currentMethod.specs.diskSpace}</span>
            </div>
          </div>

          <div className="clay-badge p-2.5 flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-mono font-semibold">SPEED CLASS</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 truncate">{currentMethod.performance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Controls: OS Selector & Deployment Methods */}
      <div className="space-y-4">
        
        {/* Primary OS Selector Pill */}
        <div className="flex items-center justify-center">
          <div className="clay-inset p-1.5 rounded-2xl flex items-center space-x-2 max-w-md w-full">
            <button
              onClick={() => handleOSChange('windows')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                activeOS === 'windows'
                  ? 'clay-btn-primary shadow-lg'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Windows 10 / 11</span>
            </button>

            <button
              onClick={() => handleOSChange('mac')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                activeOS === 'mac'
                  ? 'clay-btn-primary shadow-lg'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>macOS (Apple Silicon & Intel)</span>
            </button>
          </div>
        </div>

        {/* Method Switcher Tabs for Selected OS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeOS === 'windows' ? (
            <>
              {/* Method 1: WSL2 */}
              <button
                onClick={() => setSelectedMethodId('wsl')}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethodId === 'wsl'
                    ? 'clay-card border-2 border-cyan-500 shadow-cyan-500/10'
                    : 'clay-card opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="clay-badge text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                      ⭐ RECOMMENDED
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Beginner
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    WSL2 + Win-KeX
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-medium">
                    Zero VM lag, native GUI desktop, shared audio & copy-paste with Windows.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                  <span>Fastest 2-sec boot</span>
                </div>
              </button>

              {/* Method 2: VirtualBox / VMware */}
              <button
                onClick={() => setSelectedMethodId('vm')}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethodId === 'vm'
                    ? 'clay-card border-2 border-cyan-500 shadow-cyan-500/10'
                    : 'clay-card opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="clay-badge text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">
                      FULL SANDBOX
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Beginner
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    VirtualBox / VMware
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-medium">
                    Pre-built official OVA image with instant snapshot recovery and full network isolation.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
                  <span>Snapshot Rollbacks</span>
                </div>
              </button>

              {/* Method 3: Live USB */}
              <button
                onClick={() => setSelectedMethodId('usb')}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethodId === 'usb'
                    ? 'clay-card border-2 border-cyan-500 shadow-cyan-500/10'
                    : 'clay-card opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="clay-badge text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                      PORTABLE KEYCHAIN
                    </span>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                      Intermediate
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    Live USB Persistence
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-medium">
                    Zero host footprint with LUKS-encrypted persistence for on-the-go assessments.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                  <span>Hardware Wi-Fi injection</span>
                </div>
              </button>
            </>
          ) : (
            <>
              {/* Mac Method 1: UTM (Apple Silicon) */}
              <button
                onClick={() => setSelectedMethodId('utm')}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethodId === 'utm'
                    ? 'clay-card border-2 border-cyan-500 shadow-cyan-500/10'
                    : 'clay-card opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="clay-badge text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                      ⭐ M1 / M2 / M3 / M4
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Beginner
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    UTM for Mac (ARM64)
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-medium">
                    Native Apple Hypervisor virtualization with crisp Retina display scaling and zero battery drain.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                  <span>100% Free & Open-Source</span>
                </div>
              </button>

              {/* Mac Method 2: VMware Fusion Pro */}
              <button
                onClick={() => setSelectedMethodId('fusion')}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethodId === 'fusion'
                    ? 'clay-card border-2 border-cyan-500 shadow-cyan-500/10'
                    : 'clay-card opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="clay-badge text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">
                      NOW FREE (2024+)
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Beginner
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    VMware Fusion Pro
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-medium">
                    Official VMware pre-built ARM64 appliance with 3D Metal acceleration. Free for personal use!
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
                  <span>Broadcom Free License</span>
                </div>
              </button>

              {/* Mac Method 3: Intel Mac */}
              <button
                onClick={() => setSelectedMethodId('intel_vm')}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethodId === 'intel_vm'
                    ? 'clay-card border-2 border-cyan-500 shadow-cyan-500/10'
                    : 'clay-card opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="clay-badge text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                      INTEL ARCH (PRE-2020)
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      Legacy x86
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    VirtualBox for Intel Mac
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-medium">
                    Standard 64-bit AMD64 virtual machine image for older Intel Core i5/i7/i9 Apple computers.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                  <span>Classic x86 binaries</span>
                </div>
              </button>
            </>
          )}
        </div>

      </div>

      {/* Selected Method Details & Pros/Cons Box */}
      <div className="clay-card p-5 sm:p-6 space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
            {currentMethod.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5">
            {currentMethod.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Pros */}
          <div className="clay-inset p-4 rounded-2xl space-y-2 border-l-4 border-emerald-500">
            <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Key Advantages
            </span>
            <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
              {currentMethod.pros.map((p, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons & Considerations */}
          <div className="clay-inset p-4 rounded-2xl space-y-2 border-l-4 border-amber-500">
            <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Trade-offs & Constraints
            </span>
            <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
              {currentMethod.cons.map((c, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Step-by-Step Installation Procedure */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
              Deployment Roadmap ({currentMethod.steps.length} Steps)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Follow sequentially and tick the checkboxes as you complete each task
            </p>
          </div>
          <span className="clay-badge text-xs font-mono font-bold text-slate-800 dark:text-slate-200 px-3 py-1">
            ESTIMATED: ~15-20 MINS
          </span>
        </div>

        {/* Step Cards List */}
        <div className="space-y-4">
          {currentMethod.steps.map((step) => {
            const isDone = !!completedSteps[step.id];

            return (
              <div 
                key={step.id} 
                className={`clay-card p-5 sm:p-6 space-y-4 transition-all ${
                  isDone ? 'border-2 border-emerald-500/40 bg-emerald-500/5' : ''
                }`}
              >
                {/* Step Header with Checkbox */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3.5">
                    <button
                      onClick={() => toggleStepCompleted(step.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 ${
                        isDone 
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                          : 'clay-inset text-slate-600 dark:text-slate-400 hover:text-cyan-500'
                      }`}
                      title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                    >
                      {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : <span className="font-mono text-xs font-bold">{step.stepNumber}</span>}
                    </button>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                          STEP {step.stepNumber} • {step.estimatedTime}
                        </span>
                        {isDone && (
                          <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                            DONE
                          </span>
                        )}
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold font-mono transition-colors ${
                        isDone 
                          ? 'text-emerald-700 dark:text-emerald-300 line-through opacity-80' 
                          : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                        {step.summary}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStepCompleted(step.id)}
                    className="clay-btn text-[11px] font-mono px-3 py-1.5 hidden sm:block shrink-0 cursor-pointer text-slate-800 dark:text-slate-200 font-semibold"
                  >
                    {isDone ? 'Completed ✓' : 'Mark Done'}
                  </button>
                </div>

                {/* Instructions List */}
                <div className="clay-inset p-3.5 sm:p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono block">
                    Action Items:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200 font-sans font-medium">
                    {step.instructions.map((inst, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <span className="w-4 h-4 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5 font-bold">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Executable Command Snippet */}
                {step.commandToRun && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1 font-bold">
                        <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                        Execute in Terminal:
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Click icon to copy</span>
                    </div>

                    <div className="clay-inset p-3 rounded-xl flex items-center justify-between gap-3 font-mono text-xs">
                      <div className="overflow-x-auto text-emerald-600 dark:text-emerald-400 font-semibold select-all py-0.5">
                        <span className="text-slate-500 dark:text-slate-400 select-none mr-2 font-normal">$</span>
                        {step.commandToRun}
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => handleCopy(step.commandToRun!, step.id)}
                          title="Copy command"
                          className="clay-btn p-2 text-slate-700 dark:text-slate-300 hover:text-emerald-500 cursor-pointer"
                        >
                          {copiedCmd === step.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() => onRunInTerminal(step.commandToRun!)}
                          title="Preview in Kali Web Terminal"
                          className="clay-btn p-2 text-cyan-600 dark:text-cyan-400 cursor-pointer"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Simulated Output Preview */}
                {step.outputPreview && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold block uppercase tracking-wider">
                      Expected Terminal Response:
                    </span>
                    <div className="p-3 bg-[#060911] text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-40 scanlines border border-slate-800">
                      <pre className="whitespace-pre leading-relaxed">{step.outputPreview}</pre>
                    </div>
                  </div>
                )}

                {/* Warning / Pro Tip Footers */}
                {(step.warningNote || step.proTip) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    {step.warningNote && (
                      <div className="clay-inset p-3 rounded-xl text-amber-700 dark:text-amber-300 border-l-4 border-amber-500 flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold block text-[10px] uppercase font-mono">Watch out:</strong>
                          <span className="text-[11px] leading-snug">{step.warningNote}</span>
                        </div>
                      </div>
                    )}

                    {step.proTip && (
                      <div className="clay-inset p-3 rounded-xl text-cyan-700 dark:text-cyan-300 border-l-4 border-cyan-500 flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold block text-[10px] uppercase font-mono">Pro-Tip:</strong>
                          <span className="text-[11px] leading-snug">{step.proTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Setup Completion Celebration Card */}
        {isFullyCompleted && (
          <div className="clay-card p-6 sm:p-8 text-center space-y-4 border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 shadow-2xl animate-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
                🎉 Kali Linux Instance Fully Deployed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto mt-1">
                You have successfully configured, initialized, and verified your tactical Kali environment. You are now equipped to run real offensive tests and security audits.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onExploreCommands}
                className="clay-btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Explore Tactical Command Vault</span>
              </button>

              <button
                onClick={() => onRunInTerminal('neofetch')}
                className="clay-btn px-6 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span>Run System Banner in Terminal</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Troubleshooting Diagnostics Hub */}
      <div className="clay-card p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
              Diagnostic & Troubleshooting Matrix
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Instant battle-tested fixes for the 6 most common beginner installation blockers
            </p>
          </div>
        </div>

        {/* Troubleshooting Accordion List */}
        <div className="space-y-3">
          {COMMON_TROUBLESHOOTING.map((item) => {
            const isOpen = expandedTroubleId === item.id;

            return (
              <div key={item.id} className="clay-inset rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setExpandedTroubleId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                        {item.issue}
                      </h4>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider font-medium">
                        Platform: {item.platform.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-rose-600 dark:text-rose-400 text-[10px] uppercase font-mono block">
                        Root Cause:
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed">
                        {item.rootCause}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400 text-[10px] uppercase font-mono block">
                        Solution Steps:
                      </span>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                        {item.solutionSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-cyan-500 font-bold">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {item.fixCommand && (
                      <div className="pt-2">
                        <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 block mb-1 font-bold">
                          Quick 1-Line Fix:
                        </span>
                        <div className="clay-card p-2.5 rounded-xl flex items-center justify-between gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                          <code className="overflow-x-auto select-all">{item.fixCommand}</code>
                          <button
                            onClick={() => handleCopy(item.fixCommand!, item.id)}
                            className="clay-btn p-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-500 shrink-0 cursor-pointer"
                            title="Copy fix command"
                          >
                            {copiedCmd === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Post-Installation Power Checklist */}
      <div className="clay-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
              Essential Post-Install Tuning Checklist
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Top 5 commands to run immediately inside your fresh Kali Linux instance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {POST_INSTALL_CHECKLIST.map((task) => (
            <div key={task.id} className="clay-inset p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {task.task}
                  </h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    task.importance === 'Critical'
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400'
                  }`}>
                    {task.importance}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                  {task.desc}
                </p>
              </div>

              <div className="clay-card p-2 rounded-xl flex items-center justify-between gap-2 font-mono text-xs">
                <code className="text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto select-all">
                  $ {task.command}
                </code>
                <button
                  onClick={() => handleCopy(task.command, task.id)}
                  className="clay-btn p-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-500 shrink-0 cursor-pointer"
                  title="Copy command"
                >
                  {copiedCmd === task.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
