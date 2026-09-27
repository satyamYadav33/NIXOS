import React, { useState } from 'react';
import { 
  Package, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Boxes,
  Code2,
  HardDrive,
  Sparkles
} from 'lucide-react';

export const NixVsNixosExplorer: React.FC = () => {
  const [activeAnalogy, setActiveAnalogy] = useState<'npm' | 'cargo' | 'pip' | 'docker'>('npm');
  const [activeStackLayer, setActiveStackLayer] = useState<number>(3); // Default to NixOS Layer

  const stackLayers = [
    {
      level: 5,
      title: 'Layer 5: Home Manager (User Space)',
      badge: 'Dotfiles & Shell',
      desc: 'Manages user-level configs: ~/.config/nvim, ~/.zshrc, Git credentials, and desktop themes.',
      icon: <Code2 className="w-4 h-4 text-purple-500" />,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
      level: 4,
      title: 'Layer 4: NixOS System Modules',
      badge: 'Operating System',
      desc: 'Orchestrates /etc, systemd daemons (Nginx, Docker, PostgreSQL), networking, and kernel modules.',
      icon: <Cpu className="w-4 h-4 text-blue-500" />,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      level: 3,
      title: 'Layer 3: Nixpkgs Repository',
      badge: '100,000+ Packages',
      desc: 'The world\'s largest, most up-to-date collection of open-source software derivations.',
      icon: <Package className="w-4 h-4 text-cyan-500" />,
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
    },
    {
      level: 2,
      title: 'Layer 2: The Nix Package Manager',
      badge: 'Functional Engine',
      desc: 'Constructs isolated closures under /nix/store/<hash>-<name>-<version> with zero side effects.',
      icon: <Boxes className="w-4 h-4 text-teal-500" />,
      color: 'border-teal-500/40 bg-teal-500/10 text-teal-600 dark:text-teal-400'
    },
    {
      level: 1,
      title: 'Layer 1: Linux Kernel & Hardware',
      badge: 'Bare Metal',
      desc: 'systemd-boot, initramfs, EFI partition, CPU microcode, and GPU firmware modules.',
      icon: <HardDrive className="w-4 h-4 text-amber-500" />,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
    }
  ];

  const analogyMap = {
    npm: {
      name: 'npm (Node.js)',
      manifest: 'package.json',
      lock: 'package-lock.json',
      storage: 'node_modules/',
      scope: 'Single Node.js Project',
      command: 'npm install lodash',
      nixEquiv: 'nix-shell -p nodejs',
      nixosEquiv: 'environment.systemPackages = [ pkgs.nodejs ];'
    },
    cargo: {
      name: 'Cargo (Rust)',
      manifest: 'Cargo.toml',
      lock: 'Cargo.lock',
      storage: 'target/ & ~/.cargo/registry',
      scope: 'Single Rust Crate',
      command: 'cargo add tokio',
      nixEquiv: 'pkgs.rustPlatform.buildRustPackage',
      nixosEquiv: 'Kernel + systemd services compiled as pure derivations'
    },
    pip: {
      name: 'pip & venv (Python)',
      manifest: 'pyproject.toml',
      lock: 'poetry.lock',
      storage: '.venv/lib/python3.11/site-packages/',
      scope: 'Virtual Environment',
      command: 'pip install fastapi',
      nixEquiv: 'python3.withPackages (ps: [ ps.fastapi ])',
      nixosEquiv: 'services.nginx or custom services orchestrated declaratively'
    },
    docker: {
      name: 'Docker / Compose',
      manifest: 'compose.yaml',
      lock: 'Sha256 Image Digests',
      storage: '/var/lib/docker/overlay2/',
      scope: 'Container Sandbox',
      command: 'docker run -it alpine',
      nixEquiv: 'nix-shell -p alpine-tools (Native host speed, 0 VM overhead)',
      nixosEquiv: 'The entire host operating system is a container-free container'
    }
  };

  const currentAnalogy = analogyMap[activeAnalogy];

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Architecture Breakdown</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Nix <span className="text-slate-400 font-light">vs</span> NixOS
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Nix is the software tool; NixOS is the operating system that extends that declarative management to the entire machine.
        </p>
      </div>

      {/* Interactive 3D Architectural Layer Stack */}
      <div className="clay-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual System Stack</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              The 5 Layers of the Declarative Universe
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click any layer slab to inspect
          </span>
        </div>

        {/* 5 Stacked Clay Slabs with 3D Depth */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {stackLayers.map((layer) => {
            const isSelected = activeStackLayer === layer.level;
            return (
              <div
                key={layer.level}
                onClick={() => setActiveStackLayer(layer.level)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                  isSelected
                    ? `${layer.color} shadow-lg transform -translate-y-1`
                    : 'clay-card hover:border-cyan-400/40'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                    {layer.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {layer.title}
                      </h4>
                      <span className="clay-badge px-2 py-0.5 text-[9px] font-mono font-bold text-slate-600 dark:text-slate-300">
                        {layer.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </div>

                <div className="clay-badge px-2.5 py-1 text-xs font-mono font-black text-slate-700 dark:text-slate-300 shrink-0">
                  L{layer.level}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Side-by-Side Tactical Clay Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Nix: The Package Manager */}
        <div className="clay-card p-6 sm:p-8 space-y-5 relative overflow-hidden flex flex-col justify-between">
          <div className="clay-badge absolute top-4 right-4 px-3 py-1 text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
            Package Manager & Language
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-500 border border-cyan-500/30 shadow-sm">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Nix
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Pure Functional Package Manager
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Nix installs, manages, and isolates software packages on your system. It treats packages like mathematical values: compiling them has zero side effects, and outputs are strictly deterministic.
            </p>

            {/* Key Feature Bullets in Clay Insets */}
            <div className="space-y-2 pt-1">
              <div className="clay-inset p-2.5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Where it runs:</strong> Any Linux distro (Ubuntu, Fedora, Arch) AND macOS!
                </div>
              </div>
              <div className="clay-inset p-2.5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Location:</strong> All binaries live in <code className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">/nix/store/&lt;hash&gt;-name</code>
                </div>
              </div>
              <div className="clay-inset p-2.5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Zero Conflict:</strong> Incompatible library versions live side-by-side with zero collisions.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">CLI: nix, nix-shell, nix-env</span>
            <span className="clay-badge px-2.5 py-1 text-cyan-600 dark:text-cyan-400 font-bold">
              Multi-Platform
            </span>
          </div>
        </div>

        {/* NixOS: The Declarative Operating System */}
        <div className="clay-card p-6 sm:p-8 space-y-5 relative overflow-hidden flex flex-col justify-between">
          <div className="clay-badge absolute top-4 right-4 px-3 py-1 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
            Declarative Linux Distribution
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-500 border border-blue-500/30 shadow-sm">
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  NixOS
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  The Declarative Operating System
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              NixOS is a complete Linux distribution built around the Nix package manager. It treats your whole OS—kernel, users, network, systemd services, and desktop—as a single blueprint in <code className="text-blue-500 font-mono font-bold">configuration.nix</code>.
            </p>

            {/* Key Feature Bullets in Clay Insets */}
            <div className="space-y-2 pt-1">
              <div className="clay-inset p-2.5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Single Blueprint:</strong> Everything configured in <code className="text-blue-500 font-mono">configuration.nix</code>.
                </div>
              </div>
              <div className="clay-inset p-2.5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Atomic Generations:</strong> Upgrades never overwrite running files; switch is an atomic symlink flip.
                </div>
              </div>
              <div className="clay-inset p-2.5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Instant Rollback:</strong> Revert broken updates with <code className="text-blue-500 font-mono">nixos-rebuild switch --rollback</code>.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">CLI: nixos-rebuild, nixos-version</span>
            <span className="clay-badge px-2.5 py-1 text-blue-600 dark:text-blue-400 font-bold">
              Full Linux OS
            </span>
          </div>
        </div>

      </div>

      {/* The "Package Manager to Full Operating System" Analogy Visualizer */}
      <div className="clay-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-1">
              <Boxes className="w-4 h-4" />
              <span>Mental Model Analogy Matrix</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Understanding Nix by Comparing It to Your Favorite Tools
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Just like npm manages packages for JavaScript, Nix manages software packages, while NixOS elevates that to manage the entire operating system.
            </p>
          </div>

          {/* Analogy Selector Clay Tabs */}
          <div className="flex items-center gap-1.5 clay-inset p-1.5 self-start sm:self-center">
            {(['npm', 'cargo', 'pip', 'docker'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveAnalogy(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeAnalogy === key
                    ? 'clay-btn-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Mapping Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                {currentAnalogy.name}
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div><strong>Blueprint:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">{currentAnalogy.manifest}</code></div>
              <div><strong>Lockfile:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">{currentAnalogy.lock}</code></div>
              <div><strong>Store:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">{currentAnalogy.storage}</code></div>
            </div>
            <div className="clay-inset p-2.5 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold break-all">
              $ {currentAnalogy.command}
            </div>
          </div>

          <div className="clay-card p-5 space-y-3 border-2 border-cyan-500/40">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                Nix (Package Manager)
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div><strong>Blueprint:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">flake.nix</code></div>
              <div><strong>Lockfile:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">flake.lock</code></div>
              <div><strong>Store:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">/nix/store/&lt;hash&gt;...</code></div>
            </div>
            <div className="clay-inset p-2.5 font-mono text-[11px] text-cyan-600 dark:text-cyan-400 font-bold break-all">
              $ {currentAnalogy.nixEquiv}
            </div>
          </div>

          <div className="clay-card p-5 space-y-3 border-2 border-blue-500/40">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                NixOS (Operating System)
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div><strong>Blueprint:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">configuration.nix</code></div>
              <div><strong>Generations:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">/nix/var/nix/profiles/system</code></div>
              <div><strong>Store:</strong> <code className="px-1 bg-slate-200 dark:bg-slate-800 rounded font-mono">Entire OS in /nix/store</code></div>
            </div>
            <div className="clay-inset p-2.5 font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold break-all">
              {currentAnalogy.nixosEquiv}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
