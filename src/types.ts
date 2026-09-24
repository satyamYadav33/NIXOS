export type CommandCategory = 
  | 'osint'
  | 'scanning'
  | 'web'
  | 'exploitation'
  | 'password'
  | 'wireless'
  | 'privesc'
  | 'forensics'
  | 'pivoting';

export type NoiseLevel = 'stealth' | 'low' | 'moderate' | 'noisy';

export type KillChainPhase = 
  | 'Reconnaissance'
  | 'Weaponization'
  | 'Delivery'
  | 'Exploitation'
  | 'Privilege Escalation'
  | 'Credential Access'
  | 'Discovery'
  | 'Lateral Movement'
  | 'Execution'
  | 'Collection'
  | 'Forensics';

export interface CommandFlag {
  flag: string;
  description: string;
  required?: boolean;
}

export interface CommandItem {
  id: string;
  name: string;
  tool: string;
  category: CommandCategory;
  description: string;
  command: string;
  flags: CommandFlag[];
  scenario: string;
  noiseLevel: NoiseLevel;
  phase: KillChainPhase;
  mitreId?: string;
  outputExample?: string;
  tips?: string;
  docsUrl?: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
  timestamp?: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  toolRef: string;
}

export interface CategoryMeta {
  id: CommandCategory;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  color: string;
  borderColor: string;
  badgeBg: string;
}

export type ToolChangeType = 'new' | 'major_update' | 'replacement' | 'core_upgrade';

export interface LatestTool {
  id: string;
  name: string;
  packageName: string;
  releaseVersion: string;
  category: string;
  changeType: ToolChangeType;
  headline: string;
  description: string;
  whyItMatters: string;
  installCmd: string;
  keyFeatures: string[];
  replacedTool?: string;
  docsUrl: string;
  demoCommand?: string;
  badgeText?: string;
}

