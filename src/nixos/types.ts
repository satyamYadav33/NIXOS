export type NixHubTab = 
  | 'overview'
  | 'architecture'
  | 'imperative-vs-declarative'
  | 'store-graph'
  | 'rollback-timemachine'
  | 'config-builder'
  | 'terminal'
  | 'cheatsheet'
  | 'quiz';

export interface NixGeneration {
  id: string;
  generationNumber: number;
  timestamp: string;
  kernelVersion: string;
  nixpkgsChannel: string;
  status: 'active' | 'previous' | 'broken' | 'rolled-back';
  summary: string;
  changes: {
    addedPackages: string[];
    removedPackages: string[];
    serviceChanges: string[];
  };
  storePath: string;
  isBootable: boolean;
  bootLabel: string;
}

export interface NixStorePackage {
  id: string;
  hash: string;
  name: string;
  version: string;
  sizeMb: number;
  category: 'core' | 'runtime' | 'library' | 'tool' | 'service';
  dependencies: string[]; // package ids
  description: string;
  path: string;
  isShared: boolean;
}

export interface ConfigModuleOption {
  id: string;
  category: 'system' | 'desktop' | 'networking' | 'services' | 'users' | 'packages';
  title: string;
  description: string;
  nixCodeSnippet: string;
  enabledByDefault: boolean;
  iconName: string;
  badge?: string;
  tags: string[];
}

export interface ComparisonPoint {
  id: string;
  dimension: string;
  traditional: {
    title: string;
    description: string;
    mechanism: string;
    drawback: string;
  };
  nixos: {
    title: string;
    description: string;
    mechanism: string;
    benefit: string;
  };
}

export interface NixCommand {
  id: string;
  command: string;
  category: 'rebuild' | 'package' | 'shell' | 'flake' | 'garbage' | 'inspection';
  title: string;
  description: string;
  flags?: { flag: string; description: string }[];
  exampleOutput: string;
  proTip: string;
}

export interface NixQuizQuestion {
  id: string;
  title: string;
  scenario: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  badge: 'Foundation' | 'Rollbacks' | 'Nix Store' | 'Declarative' | 'Flakes';
}
