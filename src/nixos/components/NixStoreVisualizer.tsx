import React, { useState } from 'react';
import { NIX_STORE_PACKAGES } from '../data/nixosData';
import type { NixStorePackage } from '../types';
import { 
  Package, 
  Search, 
  Share2, 
  Hash, 
  Lock, 
  ArrowRight, 
  Layers, 
  CheckCircle2
} from 'lucide-react';

export const NixStoreVisualizer: React.FC = () => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-node18');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const selectedPkg = NIX_STORE_PACKAGES.find(p => p.id === selectedPkgId) || NIX_STORE_PACKAGES[0];

  const filteredPackages = NIX_STORE_PACKAGES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.version.includes(searchQuery);
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate dependency chains
  const getDependencies = (pkg: NixStorePackage) => {
    return NIX_STORE_PACKAGES.filter(p => pkg.dependencies.includes(p.id));
  };

  const getDependents = (pkg: NixStorePackage) => {
    return NIX_STORE_PACKAGES.filter(p => p.dependencies.includes(pkg.id));
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <Hash className="w-3.5 h-3.5" />
          <span>Content-Addressed Storage</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The <span className="font-mono text-cyan-600 dark:text-cyan-400">/nix/store</span> Visualizer
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Every package is isolated in its own directory named after the cryptographic hash of its inputs.
          No two packages ever collide, and zero dependency hell exists.
        </p>
      </div>

      {/* Anatomy of a /nix/store Path Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Anatomy of an Immutable Nix Store Path</span>
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Read-Only (chmod 0555)
          </span>
        </div>

        {/* Path Breakdown Display */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm overflow-x-auto">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-slate-500">/nix/store/</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
              3p7w9x1k4m8z2v5q8r1t4a6k2j8f0z3j
            </span>
            <span className="text-slate-500">-</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40">
              openssl
            </span>
            <span className="text-slate-500">-</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
              1.1.1u
            </span>
          </div>
        </div>

        {/* Explanation Legends */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-cyan-500/30">
            <span className="font-bold text-cyan-400 font-mono">1. Cryptographic Hash:</span>
            <p className="text-slate-300 text-[11px] mt-1">
              Base32 sha256 computed from source code, compiler version, CFLAGS, and hashes of all dependencies.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-blue-500/30">
            <span className="font-bold text-blue-400 font-mono">2. Package Name:</span>
            <p className="text-slate-300 text-[11px] mt-1">
              The canonical identifier defined in the Nixpkgs derivation attribute set.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-emerald-500/30">
            <span className="font-bold text-emerald-400 font-mono">3. Semantic Version:</span>
            <p className="text-slate-300 text-[11px] mt-1">
              The exact upstream release tag. Coexists with 1.1.1t or 3.0.13 with 0% risk.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Package Explorer & Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Package List & Filter */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter /nix/store packages..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1">
              {['all', 'runtime', 'library', 'service', 'core', 'tool'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Store Paths */}
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {filteredPackages.map((pkg) => {
              const isSelected = selectedPkgId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-sm'
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className={`w-4 h-4 ${isSelected ? 'text-cyan-500' : 'text-slate-400'}`} />
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {pkg.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {pkg.version}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {pkg.sizeMb} MB
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {pkg.path}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Selected Package Graph & Diamond Problem Solver */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Package Detail Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {selectedPkg.name}
                  </h3>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    v{selectedPkg.version}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {selectedPkg.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {selectedPkg.description}
                </p>
              </div>

              <div className="text-right sm:self-center">
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  {selectedPkg.sizeMb} MB
                </div>
                <div className="text-[10px] text-slate-400">Closure size</div>
              </div>
            </div>

            {/* Path Box */}
            <div className="p-3 rounded-xl bg-slate-900 font-mono text-xs text-cyan-300 break-all border border-slate-800">
              {selectedPkg.path}
            </div>

            {/* Direct Dependencies */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Direct Upstream Dependencies (Inputs)</span>
              </span>

              {getDependencies(selectedPkg).length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-500 italic">
                  Root core derivation (e.g. foundational toolchain or glibc). No internal nix store dependencies.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getDependencies(selectedPkg).map((dep) => (
                    <div
                      key={dep.id}
                      onClick={() => setSelectedPkgId(dep.id)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{dep.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{dep.version}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Packages that Depend on this (Downstream Dependents) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dependents Relying on this Path</span>
              </span>

              {getDependents(selectedPkg).length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-500 italic">
                  Top-level leaf application (e.g. system service or user tool).
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getDependents(selectedPkg).map((dep) => (
                    <div
                      key={dep.id}
                      onClick={() => setSelectedPkgId(dep.id)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{dep.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{dep.version}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Diamond Dependency Proof Box */}
          <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Diamond Dependency Immunity</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Notice how <span className="font-bold text-slate-900 dark:text-white">Node.js 18</span> links to <span className="font-mono text-cyan-600 dark:text-cyan-400">openssl-1.1.1u</span>, while <span className="font-bold text-slate-900 dark:text-white">Node.js 20</span> links to <span className="font-mono text-cyan-600 dark:text-cyan-400">openssl-3.0.13</span>. Both run simultaneously with zero LD_LIBRARY_PATH clashes because the ELF binary RPATH points directly into their respective /nix/store folders!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
