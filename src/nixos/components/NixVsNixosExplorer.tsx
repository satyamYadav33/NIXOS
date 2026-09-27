import React, { useState } from 'react';
import { 
  Package, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Boxes
} from 'lucide-react';

export const NixVsNixosExplorer: React.FC = () => {
  const [activeAnalogy, setActiveAnalogy] = useState<'npm' | 'cargo' | 'pip' | 'docker'>('npm');

  const analogyMap = {
    npm: {
      name: 'npm (Node.js)',
      manifest: 'package.json',
      lock: 'package-lock.json',
      storage: 'node_modules/',
      scope: 'Single Node.js Project',
      command: 'npm install lodash',
      nixEquiv: 'nix-shell -p nodejs or nix-env -iA nixpkgs.lodash',
      nixosEquiv: 'environment.systemPackages = [ pkgs.nodejs ]; in configuration.nix'
    },
    cargo: {
      name: 'Cargo (Rust)',
      manifest: 'Cargo.toml',
      lock: 'Cargo.lock',
      storage: 'target/ & ~/.cargo/registry',
      scope: 'Single Rust Crate / Workspace',
      command: 'cargo add tokio',
      nixEquiv: 'pkgs.rustPlatform.buildRustPackage in flake.nix',
      nixosEquiv: 'Entire system kernel + daemons compiled as pure derivations'
    },
    pip: {
      name: 'pip & venv (Python)',
      manifest: 'requirements.txt / pyproject.toml',
      lock: 'poetry.lock / requirements.txt',
      storage: '.venv/lib/python3.11/site-packages/',
      scope: 'Virtual Environment',
      command: 'pip install fastapi',
      nixEquiv: 'python3.withPackages (ps: [ ps.fastapi ])',
      nixosEquiv: 'services.nginx or custom services orchestrated declaratively'
    },
    docker: {
      name: 'Docker / Compose',
      manifest: 'Dockerfile / compose.yaml',
      lock: 'Sha256 image digests',
      storage: '/var/lib/docker/overlay2/',
      scope: 'Containerized Sandbox',
      command: 'docker run -it alpine',
      nixEquiv: 'nix-shell -p alpine-tools (native speeds, no VM layer)',
      nixosEquiv: 'The host system ITSELF is a deterministic container-free container'
    }
  };

  const currentAnalogy = analogyMap[activeAnalogy];

  return (
    <div className="space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Conceptual Breakdown</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nix <span className="text-slate-400 font-light">vs</span> NixOS
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          The distinction between the two is fundamental to understanding how the system works.
          Nix is the software tool; NixOS is the operating system that extends that power to the entire machine.
        </p>
      </div>

      {/* Dual Side-by-Side Architectural Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Nix: The Package Manager */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-cyan-500/30 dark:border-cyan-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold border-l border-b border-cyan-500/20">
            Package Manager & Language
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Nix
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  The Purely Functional Package Manager
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Nix is responsible for installing, managing, and isolating software packages on your system. It treats packages like values in a purely functional programming language: building them has no side effects, and outputs are strictly deterministic.
            </p>

            {/* Key Attributes */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Where it runs:</span> Any Linux distro (Ubuntu, Fedora, Arch, Debian) AND macOS!
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Location:</span> All packages reside in <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-cyan-600 dark:text-cyan-300">/nix/store/&lt;hash&gt;-name</code>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Zero Conflict:</span> Multiple versions of Python, OpenSSL, or Node live side-by-side without interference.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">No Root Required:</span> Non-privileged users can install their own isolated software portfolios.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">CLI: nix, nix-shell, nix-env</span>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold font-mono">
              Multi-Platform
            </span>
          </div>
        </div>

        {/* NixOS: The Declarative Operating System */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/30 dark:border-blue-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold border-l border-b border-blue-500/20">
            Declarative Linux Distribution
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
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

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              NixOS is a complete Linux distribution built around the Nix package manager. It leverages Nix to treat your entire operating system—kernel, networking, user accounts, systemd services, and desktop environment—as a single declarative blueprint in <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-blue-600 dark:text-blue-300">configuration.nix</code>.
            </p>

            {/* Key Attributes */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Single Source of Truth:</span> Everything is configured inside <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-blue-500">configuration.nix</code>.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Atomic Generations:</span> Upgrades never touch active files; changes take effect via atomic symlink flips.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Built-in Rollbacks:</span> Instantly boot into past generations from the bootloader or CLI.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">No Mutable Drift:</span> No manual editing of <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono">/etc</code> files that gets lost or forgotten.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">CLI: nixos-rebuild, nixos-version</span>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
              Full Linux OS
            </span>
          </div>
        </div>

      </div>

      {/* The "Package Manager to Full Operating System" Analogy Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-1">
              <Boxes className="w-4 h-4" />
              <span>Mental Model Analogy</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Understanding Nix by Comparing It to Your Favorite Tools
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Just like <span className="font-bold text-slate-700 dark:text-slate-300">npm</span> manages packages for JavaScript runtimes, Nix manages software packages, while NixOS elevates that concept to manage your entire machine.
            </p>
          </div>

          {/* Analogy Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1.5 rounded-xl self-start sm:self-center">
            {(['npm', 'cargo', 'pip', 'docker'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveAnalogy(key)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeAnalogy === key
                    ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Mapping Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Traditional Developer Tool Column */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                {currentAnalogy.name}
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div><span className="font-semibold text-slate-900 dark:text-white">Blueprint:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">{currentAnalogy.manifest}</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Lockfile:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">{currentAnalogy.lock}</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Store Dir:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">{currentAnalogy.storage}</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Scope:</span> {currentAnalogy.scope}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 font-mono text-[11px] text-amber-600 dark:text-amber-300 break-all">
              $ {currentAnalogy.command}
            </div>
          </div>

          {/* Nix (Package Manager) Column */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-cyan-500/30 space-y-3 relative shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                Nix (Package Manager)
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div><span className="font-semibold text-slate-900 dark:text-white">Blueprint:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">flake.nix / default.nix</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Lockfile:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">flake.lock (cryptographic)</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Store Dir:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">/nix/store/&lt;hash&gt;-...</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Scope:</span> Any Software on Mac / Linux</div>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 font-mono text-[11px] text-cyan-600 dark:text-cyan-300 break-all">
              $ {currentAnalogy.nixEquiv}
            </div>
          </div>

          {/* NixOS (The Operating System) Column */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-500/30 space-y-3 relative shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                NixOS (Operating System)
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div><span className="font-semibold text-slate-900 dark:text-white">Blueprint:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">/etc/nixos/configuration.nix</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Generations:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">/nix/var/nix/profiles/system</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Store Dir:</span> <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">Entire OS compiled into /nix/store</code></div>
              <div><span className="font-semibold text-slate-900 dark:text-white">Scope:</span> Kernel, Users, Services, UI</div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 font-mono text-[11px] text-blue-600 dark:text-blue-300 break-all">
              {currentAnalogy.nixosEquiv}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
