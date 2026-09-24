# 🐉 KaliVault — Cybersecurity Command Hub & Terminal Simulator

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

**An interactive, battle-tested Kali Linux reference platform for Penetration Testers, Red Teamers, and SOC Analysts.**

[Live Demo](#-deploying-to-vercel) • [Features](#-key-features) • [Installation](#-getting-started) • [Deployment](#-deploying-to-vercel) • [Disclaimer](#%EF%B8%8F-legal--ethical-disclaimer)

</div>

---

## 🌟 Overview

**KaliVault** is a web-based cybersecurity command intelligence hub and interactive Kali Linux terminal simulator. It bridges the gap between static cheat-sheets and practical tactical application, cataloging **45+ essential commands** across 9 offensive and defensive security domains with flag-by-flag breakdowns, real-world engagement contexts, and authentic simulated outputs.

---

## ⚡ Key Features

### 🔥 1. Latest Tools & Releases Radar (New in Kali Linux)
- Dedicated section with a **direct navbar shortcut** tracking tools recently added, upgraded, or replaced in modern Kali releases (Kali 2024.x & 2025+).
- **Major Highlights & Successors**:
  - **NetExec (`nxc`)**: Official successor replacing CrackMapExec with PKINIT, Kerberos certificates, and modern AD dumping.
  - **BloodHound CE**: Ground-up rewrite replacing legacy Electron/Neo4j with a containerized PostgreSQL + OpenCypher stack and Azure / Entra ID attack pathing.
  - **Ligolo-ng**: Next-generation pivoting creating native TUN interfaces on the attacker machine, eliminating proxychains and SOCKS performance bottlenecks.
  - **Certipy**: Automated Active Directory Certificate Services (ADCS) enumeration and escalation (ESC1 - ESC13).
  - **Snort 3**: Multithreaded modern network intrusion detection/prevention engine upgrade.
  - **Nuclei v3**: Overhauled AST fuzzing and multi-protocol flow engine.
  - **Havoc C2**: Modern post-exploitation command and control with EDR-evasive Demon payloads.
  - **Caido CLI**: Lightweight, high-speed Rust-based alternative to Burp Suite.
  - **DonPAPI, Katana, Coercer, Enum4linux-ng**: Modernized toolsets for stealth credential harvesting, deep crawling, and NTLM coercion.
- **Interactive features**: Filter by change type (`New Tool`, `Major Upgrade`, `Replacement`, `Core Upgrade`), 1-click APT install command copy, and simulated terminal execution.

### 🛡️ 2. Curated Cybersecurity Command Vault
- **45+ production-grade commands** mapped to real-world offensive engagements and the MITRE ATT&CK matrix.
- **9 Core Security Domains**:
  - 🔍 **OSINT & Reconnaissance** (`theHarvester`, `whois`, `amass`, `dnsrecon`, `sublist3r`)
  - 🌐 **Network & Port Scanning** (`nmap`, `masscan`, `netdiscover`, `arp-scan`)
  - 🛡️ **Web Application Pentesting** (`sqlmap`, `nikto`, `gobuster`, `ffuf`, `wpscan`, `commix`)
  - ⚡ **Exploitation & Weaponization** (`msfconsole`, `msfvenom`, `searchsploit`, `netexec`)
  - 🔑 **Password Attacks & Cracking** (`hydra`, `john the ripper`, `hashcat`, `cewl`)
  - 📡 **Wireless & RF Security** (`airmon-ng`, `airodump-ng`, `aireplay-ng`, `aircrack-ng`)
  - 🕵️ **Privilege Escalation & Post-Exploit** (`linpeas`, `chisel`, `pypykatz`, `pspy`, `find SUID`)
  - 🔬 **Digital Forensics & Reverse Engineering** (`binwalk`, `volatility`, `strings`, `exiftool`, `radare2`)
  - 🛠️ **Pivoting & Network Traffic** (`tcpdump`, `tshark`, `netcat / nc`, `socat`)

### 📋 2. Deep Technical Command Cards
- **Exact Syntax & Real-World Examples**: Copy-ready commands with realistic parameters.
- **Flag-by-Flag Explanations**: Deep breakdown of every argument (`-sC`, `-sV`, `-p-`, `-T4`, `--batch`, etc.).
- **OpSec Noise Rating Badges**: `Stealth / Passive`, `Low Noise`, `Moderate Noise`, and `High Noise / Active`.
- **Analyst Scenario & Context**: Explains when and why security professionals use each tool during an assessment.
- **Simulated Terminal Output**: Expandable authentic outputs demonstrating expected tool behavior.
- **One-Click Copy & Bookmarks**: Save favorite commands with local persistence.

### 💻 3. Interactive Kali Terminal Simulator (`kali@kali:~$`)
- Retro-modern Kali Linux terminal interface with scanlines and zsh prompt.
- **Command History**: Browse through previous commands with <kbd>↑</kbd> and <kbd>↓</kbd> keys.
- **Built-in Shell Commands**: `help`, `clear`, `whoami`, `id`, `uname -a`, `neofetch`, `ls`, `history`, `matrix`.
- **Pre-Programmed Simulation**: Type or click "Run in Terminal" on any command card to see colored, realistic tool output.

### ⚙️ 4. Dynamic Interactive Command Builder
- Visual parameter builder for top complex tools:
  - **Nmap**: Configure scan types (SYN, Connect, UDP, ACK), port ranges, timing templates, NSE scripts, and evasion flags.
  - **SQLMap**: Set target URL, extraction targets (`--dbs`, `--tables`, `--dump`, `--os-shell`), level, risk, and threads.
  - **Hydra**: Select service (SSH, FTP, RDP, SMB, HTTP), user/password lists, and concurrency.
  - **Msfvenom**: Choose OS platform (Windows, Linux, Android, PHP), architecture, payload type, and output formats.
- Live real-time command generation with 1-click execution into the terminal simulator.

### 🎯 5. Cybersecurity Scenario Challenge (Quiz)
- Interactive scenario questions testing tactical decision-making in realistic pentest conditions.
- Instant feedback with technical explanations and scoring rank.

### 📥 6. Cheat Sheet Exporter
- Export all commands or only bookmarked favorites into formatted Markdown (`.md`) or plain text (`.txt`).

---

## 📁 Project Structure

```
kalivault/
├── public/                 # Static assets & icons
├── src/
│   ├── components/
│   │   ├── CommandBuilder.tsx      # Interactive command generator
│   │   ├── CommandCard.tsx         # In-depth card with flags & output
│   │   ├── CommandVault.tsx        # Search, filters, and category grid
│   │   ├── CyberQuiz.tsx           # Scenario quiz challenge
│   │   ├── ExportModal.tsx         # Markdown/Text exporter
│   │   ├── Header.tsx              # Navigation & stats header
│   │   └── TerminalSimulator.tsx   # Interactive Kali web CLI
│   ├── data/
│   │   ├── commandsData.ts         # 45+ curated commands catalog
│   │   └── quizData.ts             # Scenario quiz questions
│   ├── App.tsx                     # Main layout & tab coordinator
│   ├── index.css                   # Cyber dark theme & scanlines
│   ├── main.tsx                    # React DOM entrypoint
│   └── types.ts                    # TypeScript interfaces & types
├── package.json
├── tsconfig.json
├── vercel.json                     # Vercel deployment configuration
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `pnpm`

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/kalivault.git
   cd kalivault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📤 Pushing to GitHub

1. Initialize git and commit your files:
   ```bash
   git init -b main
   git add .
   git commit -m "feat: initial commit for KaliVault"
   ```

2. Create a new repository on [GitHub](https://github.com/new) (e.g., `kalivault`).

3. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/kalivault.git
   git push -u origin main
   ```

---

## 🌐 Deploying to Vercel

The project includes `vercel.json` pre-configured for Vite SPA deployments.

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import the `kalivault` repository.
3. Vercel will automatically detect **Vite** as the framework.
4. Click **Deploy**. Your app will be live with an SSL certificate in seconds!

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## ⚖️ Legal & Ethical Disclaimer

> [!CAUTION]
> **For Authorized Security Testing & Educational Research Only.**  
> The tools, commands, techniques, and syntax showcased in **KaliVault** are provided exclusively for educational purposes, authorized penetration testing, and security posture assessment conducted under explicit, written authorization from the system owners. Unauthorized access to computer systems, networks, or digital assets is illegal under applicable local, national, and international laws (such as the Computer Fraud and Abuse Act - CFAA). The authors and contributors assume no liability for misuse.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
