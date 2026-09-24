import type { LatestTool } from '../types';

export const LATEST_TOOLS_DATA: LatestTool[] = [
  {
    id: 'tool-netexec',
    name: 'NetExec (nxc)',
    packageName: 'netexec',
    releaseVersion: 'Kali 2024.1+',
    category: 'Active Directory & Network Assessment',
    changeType: 'replacement',
    headline: 'The official modern successor to CrackMapExec',
    replacedTool: 'crackmapexec (cme)',
    description: 'When the legendary CrackMapExec tool was officially discontinued by its creator, the open-source community created NetExec (nxc). Kali Linux migrated CME directly to NetExec in package repositories.',
    whyItMatters: 'Every modern internal Active Directory penetration test relies on NetExec. It introduces native PKINIT Kerberos certificate authentication, DPAPI extraction, Coerced authentication modules, bloodhound-python automated exports, and support for modern SMBv2/v3, WMI, WinRM, LDAP, MSSQL, and RDP protocols.',
    installCmd: 'sudo apt update && sudo apt install -y netexec',
    keyFeatures: [
      'Multi-protocol password spraying with automatic lockout threshold protection',
      'Dump SAM database, LSA secrets, and NTDS.dit hashes with one command',
      'BloodHound integration: automate domain data collection via LDAP',
      'Execute commands via WMI, WinRM, and SMB without writing executables to disk'
    ],
    demoCommand: 'nxc smb 192.168.1.0/24 -u user.txt -p pass.txt --continue-on-success',
    docsUrl: 'https://www.netexec.org/',
    badgeText: 'CrackMapExec Successor'
  },
  {
    id: 'tool-bloodhound-ce',
    name: 'BloodHound Community Edition (CE)',
    packageName: 'bloodhound',
    releaseVersion: 'Kali 2024.2+',
    category: 'Attack Path Mapping & Cloud Identity',
    changeType: 'major_update',
    headline: 'Complete ground-up rewrite of the Active Directory attack path visualizer',
    replacedTool: 'Legacy Electron + Neo4j BloodHound (v4)',
    description: 'BloodHound CE replaces the legacy standalone Electron app and raw Neo4j database setup with a modern, microservice-based architecture powered by PostgreSQL and OpenCypher.',
    whyItMatters: 'Provides hybrid attack path mapping connecting on-prem Active Directory and Azure / Entra ID environments. It features a fast REST API, multi-user collaborative pentest workspaces, real-time edge calculations, and drastically lowers memory usage during massive enterprise audits.',
    installCmd: 'sudo apt update && sudo apt install -y bloodhound',
    keyFeatures: [
      'Unified Graph Analysis: Hybrid attack pathing between on-prem AD and Azure Entra ID',
      'Multi-User Pentest Collaboration: Team members share graph discoveries simultaneously',
      'Docker & Containerized deployment with automated migrations and RESTful APIs',
      'Graph queries with OpenCypher syntax: Find domain admin paths in sub-seconds'
    ],
    demoCommand: 'bloodhound-python -u user -p pass -d corp.local -c All -ns 192.168.1.10',
    docsUrl: 'https://bloodhound.readthedocs.io/',
    badgeText: 'Architecture Overhaul'
  },
  {
    id: 'tool-ligolo-ng',
    name: 'Ligolo-ng',
    packageName: 'ligolo-ng',
    releaseVersion: 'Kali 2024.2+',
    category: 'Network Pivoting & Tunneling',
    changeType: 'new',
    headline: 'Next-generation pivoting via TUN virtual interfaces (No more Proxychains!)',
    description: 'Ligolo-ng is an advanced, lightweight pivoting and tunneling tool that uses virtual TUN interfaces on the attacker machine to create native L3 network routing into compromised networks.',
    whyItMatters: 'Traditional pivoting required slow SOCKS proxies wrapped in proxychains, which frequently break Nmap SYN scans (-sS), UDP scans, and raw socket exploits. Ligolo-ng routes all Kali network traffic natively through a virtual network interface, allowing full speed Nmap scans and any Kali tool to work out of the box.',
    installCmd: 'sudo apt update && sudo apt install -y ligolo-ng',
    keyFeatures: [
      'Native TUN interface: No proxychains or SOCKS wrapping required',
      'Full TCP & UDP support: Run Nmap SYN scans (-sS) and UDP checks through the tunnel',
      'Multiplexed encrypted TLS connection: Resilient through firewalls and IDS/IPS',
      'Reverse pivoting: Connect back from restricted internal network segments'
    ],
    demoCommand: 'ligolo-proxy -selfcert -laddr 0.0.0.0:11601',
    docsUrl: 'https://github.com/nico-cha30/ligolo-ng',
    badgeText: 'Pivoting Game-Changer'
  },
  {
    id: 'tool-certipy',
    name: 'Certipy',
    packageName: 'certipy-ad',
    releaseVersion: 'Kali 2024.1+',
    category: 'Active Directory Certificate Services (ADCS)',
    changeType: 'new',
    headline: 'Automated ADCS attack chain enumeration and exploitation toolkit',
    description: 'Certipy is an offensive security tool designed to enumerate, analyze, and exploit Active Directory Certificate Services (ADCS) misconfigurations and certificate templates.',
    whyItMatters: 'ADCS vulnerabilities (ESC1 through ESC13) have become one of the most prominent privilege escalation vectors in Windows domains. Certipy automates discovering vulnerable templates, requesting rogue certificates, and exchanging them for Kerberos TGTs to compromise Domain Controllers.',
    installCmd: 'sudo apt update && sudo apt install -y certipy-ad',
    keyFeatures: [
      'Comprehensive vulnerability scanner for ESC1 through ESC13 template flaws',
      'Automated Golden Certificate and Diamond Certificate generation',
      'Request certificates on behalf of Domain Admins using SAN misconfigurations',
      'Kerberos PKINIT integration: Swap compromised certificates for Kerberos TGTs'
    ],
    demoCommand: 'certipy find -u user@domain.local -p "Password123!" -dc-ip 192.168.1.10 -vulnerable',
    docsUrl: 'https://github.com/ly4k/Certipy',
    badgeText: 'Essential ADCS Weapon'
  },
  {
    id: 'tool-snort3',
    name: 'Snort 3',
    packageName: 'snort3',
    releaseVersion: 'Kali 2024.3+',
    category: 'Network Intrusion Detection & Defense',
    changeType: 'core_upgrade',
    headline: 'Complete multithreaded overhaul of the open-source IDS/IPS engine',
    replacedTool: 'Snort 2.x Legacy Single-Threaded Engine',
    description: 'Snort 3 is the culmination of years of re-engineering Cisco Snort. Kali Linux upgraded the package ecosystem to Snort 3, bringing modern multithreading and unified configuration.',
    whyItMatters: 'Crucial for Blue Teams, SOC analysts, and Red Teams simulating detection evasion. Snort 3 processes gigabit network traffic with multiple CPU threads, uses LuaJIT configuration scripts instead of cumbersome legacy configs, and supports dynamic rule evaluation with Hyperscan regex engines.',
    installCmd: 'sudo apt update && sudo apt install -y snort3',
    keyFeatures: [
      'Multithreaded packet processing: Scales across multi-core processors easily',
      'Lua-based configuration: Clean, modular, and programmable syntax',
      'Hyperscan integration: Ultra-fast regex and pattern matching',
      'Improved HTTP/2 and deep protocol inspection inspection inspectors'
    ],
    demoCommand: 'snort -c /etc/snort/snort.lua -r traffic.pcap -A alert_fast',
    docsUrl: 'https://www.snort.org/snort3',
    badgeText: 'Core Engine Upgrade'
  },
  {
    id: 'tool-nuclei-v3',
    name: 'Nuclei v3 Engine',
    packageName: 'nuclei',
    releaseVersion: 'Kali 2024.2+',
    category: 'Vulnerability Scanning & Fuzzing',
    changeType: 'major_update',
    headline: 'Fast, community-driven vulnerability scanner with multi-protocol flow engine',
    description: 'ProjectDiscovery Nuclei received a massive v3 overhaul in Kali repositories, introducing interactive protocol-level code execution, multi-step flow execution, and AST-based payload fuzzing.',
    whyItMatters: 'Nuclei is the de facto standard tool for rapid zero-day and CVE triage. With over 7,000+ community templates, v3 enables testers to automate complex multi-request exploits (e.g. CSRF token extraction followed by authenticated RCE) with minimal false positives.',
    installCmd: 'sudo apt update && sudo apt install -y nuclei',
    keyFeatures: [
      'Multi-Protocol Engine: HTTP, DNS, TCP, SSL, SSH, Websockets, and WHOIS in one template',
      'Code Protocol: Execute system code or headless browser checks within templates',
      'Interactsh integration: Out-of-Band (OAST) detection for blind SSRF and RCE',
      'Interactive fuzzing and automatic template updates from official ProjectDiscovery repo'
    ],
    demoCommand: 'nuclei -u https://target.com -t cves/ -severity critical,high',
    docsUrl: 'https://docs.projectdiscovery.io/tools/nuclei/',
    badgeText: 'Massive v3 Overhaul'
  },
  {
    id: 'tool-havoc',
    name: 'Havoc C2 Framework',
    packageName: 'havoc',
    releaseVersion: 'Kali 2024.x+',
    category: 'Post-Exploitation & Command & Control',
    changeType: 'new',
    headline: 'Modern, malleable C2 framework with Demon payload and EDR evasion',
    description: 'Havoc is an open-source, post-exploitation Command and Control framework created as a modern alternative to legacy C2 systems like Cobalt Strike and Empire.',
    whyItMatters: 'Designed specifically to bypass modern Endpoint Detection and Response (EDR) agents. Havoc features Demon implants that utilize indirect syscalls, sleep obfuscation (Ekko/Zekro), hardware breakpoints, module stomping, and a sleek C++/Qt desktop operator interface.',
    installCmd: 'sudo apt update && sudo apt install -y havoc',
    keyFeatures: [
      'Demon Agent: Highly evasion-conscious payload written in C and assembly',
      'Sleep Obfuscation: Encrypts heap and stack memory while idling to evade scanners',
      'Indirect Syscalls: Bypasses userland AV/EDR hooks on Windows APIs',
      'Multi-tenant teamserver with Qt client supporting multiple operators'
    ],
    demoCommand: 'havoc server --profile ./profiles/havoc.yaotl -v',
    docsUrl: 'https://havocframework.com/',
    badgeText: 'Modern C2 Weapon'
  },
  {
    id: 'tool-caido',
    name: 'Caido CLI & Web Proxy',
    packageName: 'caido-cli',
    releaseVersion: 'Kali 2024.2+',
    category: 'Web Application Auditing',
    changeType: 'new',
    headline: 'Blazing-fast, lightweight web proxy written in Rust',
    description: 'Caido is a modern web security auditing toolkit built in Rust. It functions as a lightweight, resource-friendly alternative to Burp Suite and OWASP ZAP.',
    whyItMatters: 'Java-based proxies like Burp Suite consume gigabytes of RAM and CPU cycles. Caido runs as a headless, ultra-lean daemon consuming less than 50MB of memory with native multithreading, instant project loading, and clean web UI access from any browser.',
    installCmd: 'sudo apt update && sudo apt install -y caido-cli',
    keyFeatures: [
      'Ultra-low resource usage: Written in Rust for maximum speed and tiny footprint',
      'Remote Daemon mode: Run headless on a remote VPS and access UI from your local browser',
      'Automated Tampering & Advanced Replay: Fast HTTP/2 fuzzing with live diffing',
      'JavaScript-based Extensibility and scripting engine'
    ],
    demoCommand: 'caido-cli --listen 127.0.0.1:8080',
    docsUrl: 'https://caido.io/',
    badgeText: 'Rust Web Proxy'
  },
  {
    id: 'tool-coercer',
    name: 'Coercer',
    packageName: 'coercer',
    releaseVersion: 'Kali 2024.3+',
    category: 'Active Directory Coercion & Relaying',
    changeType: 'new',
    headline: 'Coerce Windows machines to authenticate against arbitrary listeners',
    description: 'Coercer is a Python tool designed to automatically trigger authentication from remote Windows servers via multiple exposed RPC interfaces (PetitPotam, PrinterBug, ShadowCoerce, DFSCoerce).',
    whyItMatters: 'NTLM relaying is one of the most reliable ways to escalate privileges in an Active Directory forest. Coercer automates attacking over 12 different RPC methods simultaneously to force Domain Controllers to authenticate back to your NTLM relay listener (Responder or ntlmrelayx).',
    installCmd: 'sudo apt update && sudo apt install -y coercer',
    keyFeatures: [
      'Multi-protocol coercion: Tests MS-EFSR, MS-RPRN, MS-DFSNM, MS-FSRVP, and more',
      'Automatic listener detection: Validates whether authentication was successfully triggered',
      'Non-destructive testing: Safely probes interfaces without disrupting production services',
      'Direct integration with ntlmrelayx and ADCS ESC8 relay attacks'
    ],
    demoCommand: 'coercer coerce -u user -p pass -d domain.local -t 192.168.1.10 -l 10.10.14.5',
    docsUrl: 'https://github.com/p0dalirius/Coercer',
    badgeText: 'Relaying Multiplier'
  },
  {
    id: 'tool-katana',
    name: 'Katana Web Crawler',
    packageName: 'katana',
    releaseVersion: 'Kali 2024.1+',
    category: 'Web Recon & Attack Surface Discovery',
    changeType: 'new',
    headline: 'Next-generation web crawler with headless Chrome automation',
    description: 'Katana is a high-speed web crawler developed by ProjectDiscovery. It features both standard pipeline HTTP crawling and headless Chromium rendering for modern Single Page Applications (SPAs).',
    whyItMatters: 'Legacy web spiders miss endpoints dynamically generated by React, Vue, and Angular apps. Katana parses HTML forms, JavaScript files, API endpoints, robots.txt, and sitemaps simultaneously, uncovering hidden attack surfaces in seconds.',
    installCmd: 'sudo apt update && sudo apt install -y katana',
    keyFeatures: [
      'Hybrid crawling: Fast standard HTTP mode or headless Chrome browser mode',
      'Deep JavaScript parsing: Automatically extracts regex endpoints from bundled JS',
      'Automatic form filling and stateful link exploration',
      'Direct pipeline integration: Pipe targets into Nuclei, ffuf, or SQLMap'
    ],
    demoCommand: 'katana -u https://target.com -jc -kf -d 3 -c 20',
    docsUrl: 'https://docs.projectdiscovery.io/tools/katana/',
    badgeText: 'Next-Gen Crawler'
  },
  {
    id: 'tool-donpapi',
    name: 'DonPAPI',
    packageName: 'donpapi',
    releaseVersion: 'Kali 2024.1+',
    category: 'Credential Harvesting & DPAPI',
    changeType: 'new',
    headline: 'Remote DPAPI credential harvester for Windows & Active Directory',
    description: 'DonPAPI (Dump Orphaned Non-Protected Assets Privileges and Info) automates remotely harvesting Windows Data Protection API (DPAPI) secrets from target machines without interacting with LSASS.',
    whyItMatters: 'Traditional LSASS dumping triggers modern EDR alerts instantly. DonPAPI queries machines remotely over SMB/WMI to dump Chrome/Edge saved passwords, Wi-Fi passphrases, remote desktop (RDP) connections, Outlook credentials, and certificate private keys using domain backup keys.',
    installCmd: 'sudo apt update && sudo apt install -y donpapi',
    keyFeatures: [
      'Remote credential dump: Extracts saved secrets without running binaries on the target',
      'Browser passwords: Dumps Google Chrome, MS Edge, Brave, and Opera vaults',
      'Windows Vaults: Recovers saved credentials, RDP logins, and Wi-Fi networks',
      'Domain Backup Key integration: Decrypts all enterprise DPAPI blobs automatically'
    ],
    demoCommand: 'donpapi -u user -p pass -d domain.local -t 192.168.1.50',
    docsUrl: 'https://github.com/login-securite/DonPAPI',
    badgeText: 'Stealth DPAPI Dumper'
  },
  {
    id: 'tool-enum4linux-ng',
    name: 'Enum4linux-ng',
    packageName: 'enum4linux-ng',
    releaseVersion: 'Kali 2024.1+',
    category: 'Active Directory & Windows Recon',
    changeType: 'replacement',
    headline: 'Modern Python3 rewrite of the classic enum4linux SMB enumeration tool',
    replacedTool: 'enum4linux (Legacy Perl script)',
    description: 'Enum4linux-ng is a modern, feature-rich rewrite of the classic enum4linux utility in Python 3, replacing the 15-year-old Perl script that had numerous compatibility issues with modern Windows versions.',
    whyItMatters: 'Provides clean structured JSON/YAML output for automated pipelines, colorized console output, multithreaded user rid-cycling, and reliable compatibility with Windows Server 2022 and modern SMBv2/v3 dialect requirements.',
    installCmd: 'sudo apt update && sudo apt install -y enum4linux-ng',
    keyFeatures: [
      'Python 3 & Impacket based: Completely fixes legacy Perl SMB compatibility issues',
      'Structured Exports: Output discovered shares and users directly to JSON or YAML',
      'Smart RID cycling: Fast enumeration of domain users and groups',
      'Colorized output with clean verbosity levels (-v, -vv)'
    ],
    demoCommand: 'enum4linux-ng -A 192.168.1.50 -oJ results.json',
    docsUrl: 'https://github.com/cddmp/enum4linux-ng',
    badgeText: 'Python3 Modernization'
  }
];
