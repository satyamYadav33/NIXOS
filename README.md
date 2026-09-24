# 🐉 KaliVault — Tactical Kali Linux Cybersecurity Hub & Terminal Simulator

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Design](https://img.shields.io/badge/UI_Aesthetic-Claymorphism-8b5cf6?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deploy_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

**A tactile Claymorphic, battle-tested Kali Linux reference platform for Penetration Testers, Red Teamers, and SOC Analysts.**

[Features](#-key-features) • [Claymorphism & Motion](#-claymorphism--motion-experience) • [Installation](#-getting-started) • [Deployment](#-deploying-to-vercel) • [Disclaimer](#%EF%B8%8F-legal--ethical-disclaimer)

</div>

---

## 🌟 Overview

**KaliVault** is a web-based cybersecurity command intelligence hub and interactive Kali Linux terminal simulator built entirely in a high-fidelity **Claymorphism** design system. It bridges the gap between static cheat-sheets and practical tactical tradecraft, cataloging **45+ essential offensive and defensive security commands** across 9 domains with flag-by-flag breakdowns, MITRE ATT&CK mapping, and authentic simulated outputs.

---

## 🎨 Claymorphism & Motion Experience

### 🫧 1. Volumetric Tactile Claymorphism
- **Dual Outer Shadows & Dual Inset Highlights**: Every card, button, badge, input, and drawer is sculpted with soft, pillowy, volumetric 3D clay depth.
- **Both Light & Dark Modes**: Carefully calibrated light clay palettes (`#e8ecf3` base, `#eff3f9` cards) and dark cyber clay palettes (`#0a0f1d` base, `#11182c` cards) that maintain rich tangible tactile volume.
- **Micro-Interactions**: Tactile button depressions (`active:translate-y-0.5`), floating hover elevations, and embossed inset terminal screen wells.

### 🌊 2. Fluid Theme Shockwave Transition
- Switching between Dark and Light mode is **never abrupt**.
- Clicking the tactile sun/moon slider pill triggers an **expanding circular clay shockwave ripple** originating exactly from the toggle's physical coordinates `(x, y)`.
- The morphing shockwave washes across the viewport with glowing chromatic edges before cleanly dissolving into the new theme.

### 🐉 3. 3-Second Kali Dragon Logo Splash Screen
- Greets visitors upon initial load and page refresh with a **3-second cinematic lazy-loading intro**.
- **Random Corner Trajectory**: On every launch, the Kali dragon emblem spawns from a randomized screen corner (`top-left`, `top-right`, `bottom-left`, or `bottom-right`).
- **Swoop & Hover**: Sweeps into the exact center of the screen with a customized spring easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`), pulses with glowing clay typography, and gently expands.
- **Fullscreen Blast**: Rapidly scales to 28x-32x full-screen proportions and smoothly blends out into the background, seamlessly unveiling the application.
- Includes a replay button in the navbar and an instant <kbd>ESC</kbd> skip mechanism.

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

### 📋 3. Deep Technical Command Cards
- **Exact Syntax & Real-World Examples**: Copy-ready commands with realistic parameters.
- **Flag-by-Flag Explanations**: Deep breakdown of every argument (`-sC`, `-sV`, `-p-`, `-T4`, `--batch`, etc.).
- **OpSec Noise Rating Badges**: `Stealth / Passive`, `Low Noise`, `Moderate Noise`, and `High Noise / Active`.
- **Analyst Scenario & Context**: Explains when and why security professionals use each tool during an assessment.
- **Simulated Terminal Output**: Expandable authentic outputs demonstrating expected tool behavior.
- **One-Click Copy & Bookmarks**: Save favorite commands with local persistence.

### 💻 4. Interactive Kali Terminal Simulator (`kali@kali:~$`)
- Tactile clay shell container with scanlines and authentic zsh prompt.
- **Command History**: Browse through previous commands with <kbd>↑</kbd> and <kbd>↓</kbd> keys.
- **Built-in Shell Commands**: `help`, `clear`, `whoami`, `id`, `uname -a`, `neofetch`, `ls`, `history`, `matrix`.
- **Pre-Programmed Simulation**: Type or click "Run in Terminal" on any command card to see colored, realistic tool output.

### ⚙️ 5. Dynamic Interactive Command Builder
- Visual parameter builder for top complex tools:
  - **Nmap**: Configure scan types (SYN, Connect, UDP, ACK), port ranges, timing templates, NSE scripts, and evasion flags.
  - **SQLMap**: Set target URL, extraction targets (`--dbs`, `--tables`, `--dump`, `--os-shell`), level, risk, and threads.
  - **Hydra**: Select service (SSH, FTP, RDP, SMB, HTTP), user/password lists, and concurrency.
  - **Msfvenom**: Choose OS platform (Windows, Linux, Android, PHP), architecture, payload type, and output formats.
- Live real-time command generation with 1-click execution into the terminal simulator.

### 🎯 6. Cybersecurity Scenario Challenge (Quiz)
- Interactive scenario questions testing tactical decision-making in realistic pentest conditions.
- Instant feedback with technical explanations and scoring rank.

### 📥 7. Tactical Cheat Sheet Exporter
- Export all commands or only bookmarked favorites into formatted Markdown (`.md`) or plain text (`.txt`).

---

## 📁 Project Structure

```
kalivault/
├── public/                     # Static assets & icons
├── src/
│   ├── components/
│   │   ├── ClayKaliSplash.tsx          # 3s Kali logo random-corner intro animation
│   │   ├── CommandBuilder.tsx          # Interactive command generator
│   │   ├── CommandCard.tsx             # In-depth card with flags & output
│   │   ├── CommandVault.tsx            # Search, filters, and category grid
│   │   ├── CyberQuiz.tsx               # Scenario quiz challenge
│   │   ├── ExportModal.tsx             # Markdown/Text exporter
│   │   ├── Header.tsx                  # Navigation, theme slider & stats header
│   │   ├── LatestReleases.tsx          # Latest Tools & Releases Radar
│   │   ├── TerminalSimulator.tsx       # Interactive Kali web CLI
│   │   └── ThemeTransitionWave.tsx     # Morphing shockwave theme ripple
│   ├── data/
│   │   ├── commandsData.ts             # 45+ curated commands catalog
│   │   ├── latestToolsData.ts          # Updated/added Kali tools database
│   │   └── quizData.ts                 # Scenario quiz questions
│   ├── App.tsx                         # Main layout & theme coordinator
│   ├── index.css                       # Claymorphism CSS tokens & animations
│   ├── main.tsx                        # React DOM entrypoint
│   └── types.ts                        # TypeScript interfaces & types
├── package.json
├── tsconfig.json
├── vercel.json                         # Vercel deployment configuration
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

1. Ensure all changes are committed:
   ```bash
   git add .
   git commit -m "feat: complete KaliVault with Claymorphism and Kali logo splash"
   ```

2. Create a new repository on [GitHub](https://github.com/new) (e.g., `kalivault`).

3. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/kalivault.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Deploying to Vercel

The project includes `vercel.json` pre-configured for Vite Single Page Application routing.

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import your `kalivault` repository.
3. Vercel will automatically detect **Vite** as the framework preset.
4. Click **Deploy**. Your app will be live with free SSL in seconds!

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
