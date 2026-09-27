# 🐉 KaliVault — Tactical Kali Linux Cybersecurity Hub & Terminal Simulator

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Design](https://img.shields.io/badge/UI_Aesthetic-Claymorphism-8b5cf6?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deploy_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

**A tactile Claymorphic, beginner-friendly, battle-tested Kali Linux reference platform for Penetration Testers, Red Teamers, and SOC Analysts.**

[Setup Guide](#-interactive-kali-linux-setup-station-windows--mac) • [Learning Curve](#-beginner-friendly-progressive-learning-curve) • [Features](#-key-features) • [Installation](#-getting-started) • [Deployment](#-deploying-to-vercel)

</div>

## ❄️ Featured: Nix & NixOS Declarative OS Studio

> **"The distinction between the two is fundamental to understanding how the system works. Nix is the package manager. NixOS is the operating system that extends that management to the entire machine configuration."**

KaliVault now includes a premier **NixOS & Nix Interactive Declarative Operating System Studio**:
- **Nix vs NixOS Architecture Explorer**: Understand the difference between Nix (pure functional package manager running on Linux & macOS) and NixOS (full declarative Linux OS).
- **The "npm vs Operating System" Analogy Matrix**: Compare how npm manages `package.json -> node_modules/` with how NixOS manages `configuration.nix -> /run/current-system`.
- **Content-Addressed `/nix/store` Visualizer**: Visual graph showing how multiple versions of libraries (e.g. OpenSSL 1.1 vs OpenSSL 3.0) coexist concurrently with zero diamond dependency collisions.
- **Rollback Time Machine & Bootloader Simulator**: Experience atomic symlink flipping and sub-second disaster recovery with `sudo nixos-rebuild switch --rollback` and interactive `systemd-boot` / GRUB menu emulation.
- **Live `configuration.nix` & `flake.nix` Studio**: Real-time module toggles, syntax generation, and dry-run build simulation.
- **Interactive Nix Terminal Simulator**: Test commands like `nix-shell`, `nixos-rebuild`, and `nix-collect-garbage` directly in browser.
- **Mastery Quiz & Production Cheat-Sheet**: Comprehensive questions and categorized commands.

Easily switch between **❄️ NixOS Studio** and **🐉 KaliVault Hub** via the navbar switcher or `#nixos` / `#kali` URL hashes.

---

## 🌟 Overview

**KaliVault** is a web-based cybersecurity command intelligence hub, interactive setup guide, and Kali Linux terminal simulator built entirely in a high-fidelity **Claymorphism** design system. Designed specifically with a progressive learning curve for beginners while retaining deep technical fidelity for experienced operators, it catalogs **45+ essential commands** across 9 domains with plain-English mental models, common pitfall warnings, and 100% fact-checked Kali Linux 2024.x syntax.

---

## 🖥️ Interactive Kali Linux Setup Station (Windows & Mac)

KaliVault features a dedicated **Setup Guide** with a top navbar shortcut key providing an interactive, distraction-free environment to get your personal Kali Linux lab running smoothly:

### 🪟 Windows Deployment Methods
1. **WSL2 + Win-KeX (Windows Subsystem for Linux - ⭐ Recommended)**:
   - Ultra-fast ~2-second boot with zero virtual machine lag.
   - Full graphical XFCE desktop inside Windows with shared audio, clipboard, and `/mnt/c/` filesystem integration.
   - Command: `wsl --install -d kali-linux && sudo apt install -y kali-win-kex && kex --win -s`.
2. **VirtualBox / VMware Workstation (Isolated Sandbox)**:
   - Pre-configured official OVA appliances from `kali.org`.
   - Complete sandbox isolation, instant snapshot rollbacks, and USB Wi-Fi adapter pass-through for wireless auditing.
3. **Live USB with Encrypted Persistence**:
   - Zero-footprint, LUKS-encrypted portable pentest drive created via Rufus.

### 🍎 macOS Deployment Methods
1. **UTM for Apple Silicon (M1/M2/M3/M4 - ⭐ Recommended)**:
   - Native ARM64 virtualization utilizing Apple's Hypervisor framework.
   - Near bare-metal speed, crisp Retina display auto-scaling via `spice-vdagent`, and minimal battery consumption.
   - **Crucial Fact-Check**: Uses native ARM64 installer ISO (`kali-linux-*-installer-arm64.iso`), avoiding sluggish x86 emulation.
2. **VMware Fusion Pro (Free for Personal Use)**:
   - Official Broadcom free personal license with official pre-built ARM64 VMware appliance.
3. **Intel Mac (x86_64)**:
   - VirtualBox configuration for legacy Intel-based Mac hardware.

### 🧭 Interactive Setup Features
- **Live Step-by-Step Progress Tracker**: Check off completed steps with persistent local storage saving and celebratory completion badges.
- **Interactive Code Blocks & Outputs**: 1-click command copying and simulated terminal execution.
- **Diagnostic Troubleshooting Matrix**: Instant, battle-tested solutions for the 6 most common beginner installation blockers:
  - *VirtualBox VT-x / AMD-V disabled in BIOS*
  - *WSL2 Win-KeX socket connection refused*
  - *Mac Apple Silicon architecture mismatch*
  - *VM display stuck at 800x600 resolution*
  - *No internet inside Kali VM / DNS failure*
  - *apt update repository suite change errors*
- **Essential Post-Install Tuning Checklist**: `passwd`, `sudo apt full-upgrade`, `kali-linux-default` metapackage, and Zsh productivity tweaks.

---

## 🎓 Beginner-Friendly Progressive Learning Curve

Every command and tool has been rigorously fact-checked and structured into progressive mastery levels:

- **Level 1: Core Fundamentals (🌱 Beginner)**: Passive OSINT, basic network sweeps, whois lookups, local file analysis. Zero risk of detection or misconfiguration.
- **Level 2: Tactical Assessment (⚡ Intermediate)**: Targeted port scanning with Nmap, web fuzzing with Gobuster/FFuF, automated SQL injection testing with SQLMap, password auditing with Hydra.
- **Level 3: Red Team Operator (🔥 Advanced)**: Metasploit handlers, LinPEAS privilege escalation, pivoting tunnels via Chisel/Ligolo-ng, and reverse engineering.

### 🧠 Under-the-Hood Mental Models
Expandable cards explain the **plain-English networking and OS mechanics**:
- *Why does a SYN scan work?* (Knocking on the door and walking away before the 3-way handshake completes).
- *What happens during an ARP sweep?* (Broadcasting Layer-2 identity queries across the local subnet).
- *What is blind SQL injection?* (Inferring true/false conditions via mathematical delays).

### ⚠️ Common Beginner Pitfall Warnings
Actionable warnings highlight real-world traps:
- Forgetting `sudo` on Nmap scans (silently falling back to TCP connect mode).
- Excessive threading (`-t 64`) triggering immediate Fail2Ban firewalls.
- Single Page Applications producing false-positive 200 OKs during directory fuzzing.

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
- **Interactive features**: Filter by change type (`New Tool`, `Major Upgrade`, `Replacement`, `Core Upgrade`), 1-click APT install command copy, and simulated terminal execution.

### 🛡️ 2. Curated Cybersecurity Command Vault
- **45+ production-grade commands** mapped to real-world offensive engagements and the MITRE ATT&CK matrix.
- Filter by Category, OpSec Noise Level, MITRE Phase, and **Learning Level**.

### 💻 3. Interactive Kali Terminal Simulator (`kali@kali:~$`)
- Retro-modern Kali Linux terminal interface with scanlines and zsh prompt.
- **Command History**: Browse through previous commands with <kbd>↑</kbd> and <kbd>↓</kbd> keys.
- **Built-in Shell Commands**: `help`, `clear`, `whoami`, `id`, `uname -a`, `neofetch`, `ls`, `history`, `matrix`.

### ⚙️ 4. Dynamic Interactive Command Builder
- Visual parameter builder for complex tools (Nmap, SQLMap, Hydra, Msfvenom). Live real-time command generation with 1-click execution into the terminal simulator.

### 🎯 5. Cybersecurity Scenario Challenge (Quiz)
- Interactive scenario questions testing tactical decision-making in realistic pentest conditions.

### 📥 6. Tactical Cheat Sheet Exporter
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
│   │   ├── CommandCard.tsx             # Card with learning levels, mental models & output
│   │   ├── CommandVault.tsx            # Search, learning filters & category grid
│   │   ├── CyberQuiz.tsx               # Scenario quiz challenge
│   │   ├── ExportModal.tsx             # Markdown/Text exporter
│   │   ├── Header.tsx                  # Navigation, theme slider & stats header
│   │   ├── KaliSetupGuide.tsx          # Interactive Win & Mac Setup Station
│   │   ├── LatestReleases.tsx          # Latest Tools & Releases Radar
│   │   ├── TerminalSimulator.tsx       # Interactive Kali web CLI
│   │   └── ThemeTransitionWave.tsx     # Morphing shockwave theme ripple
│   ├── data/
│   │   ├── commandsData.ts             # 45+ curated commands catalog
│   │   ├── latestToolsData.ts          # Updated/added Kali tools database
│   │   ├── quizData.ts                 # Scenario quiz questions
│   │   └── setupGuideData.ts           # Windows & Mac step-by-step setup guides
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
   git commit -m "feat: complete KaliVault with Setup Guide and Learning Curves"
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
