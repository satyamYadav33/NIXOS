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
  CheckCircle2,
  Zap
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
        <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <Hash className="w-3.5 h-3.5" />
          <span>Content-Addressed Isolation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          The <span className="font-mono text-cyan-600 dark:text-cyan-400">/nix/store</span> Visualizer
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Every package is isolated in its own directory named after the cryptographic hash of its inputs.
        </p>
      </div>

      {/* Visual Diamond Dependency Solver Diagram */}
      <div className="clay-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Diamond Conflict Resolution Visualized</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Two Conflicting Libraries Living in Harmony
            </h3>
          </div>
          <span className="clay-badge px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            Zero DLL/SO Hell
          </span>
        </div>

        {/* Visual Dual Pipeline Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Silo 1: Node.js 18 + OpenSSL 1.1 */}
          <div className="clay-card p-5 space-y-3 border-2 border-cyan-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">
                APPLICATION A (Legacy Service)
              </span>
              <span className="clay-badge px-2 py-0.5 text-[10px] font-mono text-slate-500">
                Node.js 18.20
              </span>
            </div>

            <div className="space-y-2">
              <div className="clay-inset p-2.5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 dark:text-slate-300 font-bold">ELF Binary RPATH</span>
                <span className="text-cyan-500">➔ /nix/store/3p7w...-openssl-1.1</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-700 dark:text-cyan-300 font-mono">
                🔒 Cryptographic Isolation: 1.1.1u protected from system upgrades
              </div>
            </div>
          </div>

          {/* Silo 2: Node.js 20 + OpenSSL 3.0 */}
          <div className="clay-card p-5 space-y-3 border-2 border-blue-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">
                APPLICATION B (Modern API)
              </span>
              <span className="clay-badge px-2 py-0.5 text-[10px] font-mono text-slate-500">
                Node.js 20.14
              </span>
            </div>

            <div className="space-y-2">
              <div className="clay-inset p-2.5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 dark:text-slate-300 font-bold">ELF Binary RPATH</span>
                <span className="text-blue-500">➔ /nix/store/8r1t...-openssl-3.0</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-700 dark:text-blue-300 font-mono">
                ⚡ Modern TLS 1.3 Active: Coexists with OpenSSL 1.1 on same machine
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Anatomy of a Store Path in Claymorphism */}
      <div className="clay-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Anatomy of an Immutable Nix Store Path</span>
          </span>
          <span className="clay-badge px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            Read-Only (chmod 0555)
          </span>
        </div>

        {/* Path Breakdown */}
        <div className="clay-inset p-4 font-mono text-xs sm:text-sm overflow-x-auto">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-slate-400">/nix/store/</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-500/40">
              3p7w9x1k4m8z2v5q8r1t4a6k2j8f0z3j
            </span>
            <span className="text-slate-400">-</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-300 font-bold border border-blue-500/40">
              openssl
            </span>
            <span className="text-slate-400">-</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold border border-emerald-500/40">
              1.1.1u
            </span>
          </div>
        </div>

        {/* Legend Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="clay-inset p-3 space-y-1">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono">1. Cryptographic Hash:</span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Computed from source code, compiler flags, and exact hashes of all dependencies.
            </p>
          </div>
          <div className="clay-inset p-3 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">2. Package Name:</span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              The canonical identifier defined in the Nixpkgs derivation.
            </p>
          </div>
          <div className="clay-inset p-3 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">3. Version:</span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Upstream release tag. Coexists with any other version with zero collision.
            </p>
          </div>
        </div>
      </div>

      {/* Package Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: List & Filter */}
        <div className="lg:col-span-5 clay-card p-5 space-y-4">
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter /nix/store packages..."
                className="w-full pl-9 pr-4 py-2 clay-inset text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono font-medium"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1">
              {['all', 'runtime', 'library', 'service', 'core', 'tool'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`clay-btn px-2.5 py-1 text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'clay-btn-primary text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Package Items */}
          <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
            {filteredPackages.map((pkg) => {
              const isSelected = selectedPkgId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-sm'
                      : 'clay-card hover:border-cyan-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className={`w-4 h-4 ${isSelected ? 'text-cyan-500' : 'text-slate-400'}`} />
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {pkg.name}
                      </span>
                      <span className="clay-badge text-[10px] font-mono px-1.5 py-0.2 text-slate-600 dark:text-slate-300">
                        {pkg.version}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {pkg.sizeMb} MB
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 truncate">
                    {pkg.path}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detail & Dependency Trees */}
        <div className="lg:col-span-7 clay-card p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {selectedPkg.name}
                  </h3>
                  <span className="clay-badge text-xs font-mono font-bold px-2 py-0.5 text-cyan-600 dark:text-cyan-400">
                    v{selectedPkg.version}
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

            <div className="clay-inset p-3 font-mono text-xs text-cyan-600 dark:text-cyan-300 font-bold break-all">
              {selectedPkg.path}
            </div>

            {/* Direct Dependencies */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Direct Upstream Dependencies (Inputs)</span>
              </span>

              {getDependencies(selectedPkg).length === 0 ? (
                <div className="clay-inset p-3 text-xs text-slate-400 italic">
                  Root core derivation (e.g. glibc).
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getDependencies(selectedPkg).map((dep) => (
                    <div
                      key={dep.id}
                      onClick={() => setSelectedPkgId(dep.id)}
                      className="clay-card p-2.5 flex items-center justify-between cursor-pointer hover:border-cyan-500/40 transition-all"
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

            {/* Downstream Dependents */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dependents Relying on this Path</span>
              </span>

              {getDependents(selectedPkg).length === 0 ? (
                <div className="clay-inset p-3 text-xs text-slate-400 italic">
                  Top-level leaf application.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getDependents(selectedPkg).map((dep) => (
                    <div
                      key={dep.id}
                      onClick={() => setSelectedPkgId(dep.id)}
                      className="clay-card p-2.5 flex items-center justify-between cursor-pointer hover:border-indigo-500/40 transition-all"
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

          <div className="clay-inset p-3 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Immutable and Read-Only Filesystem Guarantee</span>
          </div>
        </div>

      </div>

    </div>
  );
};
