import type { SetupStep, TroubleshootingItem } from '../types';

export interface MethodConfig {
  id: string;
  name: string;
  tagline: string;
  recommendedFor: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  performance: 'Near-Native (Fastest)' | 'High (Isolated)' | 'Hardware Direct';
  specs: {
    minRam: string;
    recRam: string;
    diskSpace: string;
    cpuCores: string;
  };
  pros: string[];
  cons: string[];
  steps: SetupStep[];
}

export const WINDOWS_SETUP_METHODS: Record<'wsl' | 'vm' | 'usb', MethodConfig> = {
  wsl: {
    id: 'wsl',
    name: 'WSL2 + Win-KeX (Windows Subsystem for Linux)',
    tagline: 'Modern, ultra-fast, zero-overhead Kali desktop embedded directly into Windows 10/11',
    recommendedFor: 'Complete beginners, laptops with limited RAM (8GB), and users who want instant terminal & GUI access without virtual machine lag.',
    difficulty: 'Beginner',
    performance: 'Near-Native (Fastest)',
    specs: {
      minRam: '4 GB',
      recRam: '8 GB - 16 GB',
      diskSpace: '25 GB SSD',
      cpuCores: '2+ Cores (VT-x/AMD-V enabled)'
    },
    pros: [
      'Instant boot in ~2 seconds with zero VM boot wait time',
      'Shared Windows clipboard, audio/sound, and files (/mnt/c/Users/...)',
      'Win-KeX provides full graphical XFCE desktop (windowed, seamless, or sound mode)',
      'Lowest CPU, RAM, and battery drain of any setup method'
    ],
    cons: [
      'Raw Wi-Fi monitor mode (airodump-ng) not supported on internal Wi-Fi (requires USB Wi-Fi adapter pass-through via usbipd-win)',
      'Raw packet sniffing on host interfaces has some hypervisor abstractions'
    ],
    steps: [
      {
        id: 'wsl-step-1',
        stepNumber: 1,
        title: 'Enable Windows Subsystem for Linux (WSL2)',
        estimatedTime: '2 mins',
        summary: 'Install WSL and download official Kali Linux distribution directly from Microsoft Store.',
        instructions: [
          'Press the Windows Key, type "PowerShell", right-click and choose "Run as Administrator".',
          'Execute the WSL installation command with the Kali Linux distribution flag.',
          'If WSL is already installed, ensure it is updated to WSL2 using wsl --update.'
        ],
        commandToRun: 'wsl --install -d kali-linux',
        outputPreview: `Installing: Windows Subsystem for Linux
Downloading: Kali Linux
Installing: Kali Linux
[==========================100.0%==========================]
Installation complete. Reboot may be required to finalize virtual machine platform features.`,
        warningNote: 'If you get error 0x80370102, Virtualization is disabled in your PC BIOS/UEFI. Reboot your PC, enter BIOS (F2/Del), and enable Intel VT-x or AMD SVM.',
        proTip: 'Run "wsl -l -v" in PowerShell anytime to verify that Kali-Linux is running version "2".'
      },
      {
        id: 'wsl-step-2',
        stepNumber: 2,
        title: 'First Launch & Create Your Kali User Account',
        estimatedTime: '2 mins',
        summary: 'Initialize the Kali instance, configure your non-root operator username and master password.',
        instructions: [
          'Launch "Kali Linux" from your Windows Start Menu (or type "kali" in PowerShell).',
          'Enter your desired username (e.g., kali or your name) when prompted.',
          'Type a strong password. Note: Linux does not show asterisks (*) while typing for security.'
        ],
        commandToRun: 'kali',
        outputPreview: `Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
Enter new UNIX username: kali
New password:
Retype new password:
passwd: password updated successfully
Installation successful!
kali@DESKTOP-WIN11:~$`,
        proTip: 'Remember this password! You will use it whenever you prefix commands with "sudo" for administrative privileges.'
      },
      {
        id: 'wsl-step-3',
        stepNumber: 3,
        title: 'Update Kali Repositories & Install Win-KeX GUI',
        estimatedTime: '8 mins',
        summary: 'Fetch the latest security tools from Kali mirrors and install the Win-KeX desktop environment.',
        instructions: [
          'Inside the Kali bash terminal, refresh the apt package index and upgrade packages.',
          'Install "kali-win-kex" which bundles the customized TigerVNC and seamless XFCE desktop components.'
        ],
        commandToRun: 'sudo apt update && sudo apt install -y kali-win-kex',
        outputPreview: `Get:1 http://http.kali.org/kali kali-rolling InRelease [41.5 kB]
Get:2 http://http.kali.org/kali kali-rolling/main amd64 Packages [19.8 MB]
Fetched 19.8 MB in 4s (4,950 kB/s)
...
Setting up kali-win-kex (3.2.0) ...
Win-KeX is successfully installed. Run 'kex --win -s' for Window Mode with sound!`,
        proTip: 'During win-kex setup, you may be asked to set a VNC password (min 6 characters). Choose a memorable password like "kalipass".'
      },
      {
        id: 'wsl-step-4',
        stepNumber: 4,
        title: 'Launch Graphical Kali Desktop (Win-KeX)',
        estimatedTime: '1 min',
        summary: 'Experience the full Kali Linux graphical desktop inside Windows with audio and copy-paste.',
        instructions: [
          'Choose your preferred Win-KeX mode and run the command in your Kali terminal:',
          '• Window Mode (Recommended): Opens Kali XFCE in a standalone resizable Windows window with sound.',
          '• Seamless Mode: Embeds the Kali top panel directly into your Windows desktop alongside your taskbar!',
          '• Enhanced Session Mode: Uses Microsoft RDP protocol with native client scaling.'
        ],
        commandToRun: 'kex --win -s',
        outputPreview: `Starting Win-KeX in Window Mode with sound support...
TigerVNC server started successfully on display :1.
Launching Win-KeX client window [1920x1080 @ 60Hz]...
Connected to Kali Desktop!`,
        warningNote: 'To cleanly stop Win-KeX when you are finished, run "kex stop" in your Kali terminal or press F8 in the window to open the VNC menu.',
        proTip: 'You can create a Windows Desktop shortcut with target: "wsl -d kali-linux kex --win -s" to launch the Kali GUI in 1 click!'
      },
      {
        id: 'wsl-step-5',
        stepNumber: 5,
        title: 'Verify Your Security Lab & First Command Test',
        estimatedTime: '2 mins',
        summary: 'Verify internet connectivity and run your first tactical reconnaissance command.',
        instructions: [
          'Open the terminal inside Kali Linux (or in Windows Terminal).',
          'Test DNS and internet connectivity to ensure your lab can reach security targets.',
          'Run a quick test scan on scanme.nmap.org (official public testing server authorized by Nmap).'
        ],
        commandToRun: 'nmap -sV -p 80,443 scanme.nmap.org',
        outputPreview: `Starting Nmap 7.94 ( https://nmap.org ) at 2024-09-24 10:00 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.045s latency).
PORT    STATE SERVICE VERSION
80/tcp  open  http    Apache httpd 2.4.7 ((Ubuntu))
443/tcp open  ssl/ssl Apache httpd (SSL-only)

Nmap done: 1 IP address (1 host up) scanned in 3.12 seconds`,
        proTip: 'Congratulations! Your WSL2 Kali Linux instance is fully operational with near bare-metal performance.'
      }
    ]
  },

  vm: {
    id: 'vm',
    name: 'VirtualBox / VMware Workstation (Isolated VM)',
    tagline: 'Completely isolated sandbox virtual machine with custom networking and snapshot rollback',
    recommendedFor: 'Penetration testing labs, malware analysis, network isolation, and users who want snapshots to revert mistakes instantly.',
    difficulty: 'Beginner',
    performance: 'High (Isolated)',
    specs: {
      minRam: '4096 MB (4 GB)',
      recRam: '8192 MB (8 GB)+',
      diskSpace: '35 GB+ Free Space',
      cpuCores: '2 to 4 Virtual Cores'
    },
    pros: [
      '100% sandbox isolation: attacks and payloads cannot harm your Windows host system',
      'Instant Snapshots: take a snapshot before testing exploits; revert in 3 seconds if system breaks',
      'Full USB Device Pass-through: plug in Alfa/Panda Wi-Fi adapters for aircrack-ng monitor mode',
      'Custom Virtual Networks: create isolated target subnets with Metasploitable & Active Directory labs'
    ],
    cons: [
      'Higher RAM usage (allocates dedicated RAM chunk from your Windows host)',
      'Slightly slower boot time compared to WSL2 (~15-25 seconds)'
    ],
    steps: [
      {
        id: 'vm-step-1',
        stepNumber: 1,
        title: 'Download VirtualBox & Extension Pack',
        estimatedTime: '4 mins',
        summary: 'Install Oracle VirtualBox 7.x along with the Extension Pack for USB 3.0 and NVMe support.',
        instructions: [
          'Visit official VirtualBox website: https://www.virtualbox.org/wiki/Downloads',
          'Download "Windows hosts" installer and the "VirtualBox Extension Pack".',
          'Run the installer, accept default network adapter drivers, and reboot if prompted.'
        ],
        commandToRun: 'winget install Oracle.VirtualBox',
        outputPreview: `Found Oracle VM VirtualBox [Oracle.VirtualBox]
Downloading https://download.virtualbox.org/virtualbox/7.0.x/VirtualBox-7.0.x-Win.exe
Installing Oracle VM VirtualBox...
Successfully installed!`,
        warningNote: 'Make sure Windows Hyper-V does not conflict with VirtualBox. If VMs run sluggishly, disable "Virtual Machine Platform" in Windows Optional Features or update to VirtualBox 7.0.8+.'
      },
      {
        id: 'vm-step-2',
        stepNumber: 2,
        title: 'Download Pre-Built Kali VirtualBox Appliance (NOT the ISO!)',
        estimatedTime: '5 mins',
        summary: 'Save hours of manual installation by downloading the official pre-configured Kali OVA appliance.',
        instructions: [
          'Go to official Kali portal: https://www.kali.org/get-kali/#kali-virtual-machines',
          'Click on the "VirtualBox" tab and download the 64-bit 7z archive (e.g. kali-linux-2024.x-virtualbox-amd64.7z).',
          'Why pre-built? It includes VirtualBox Guest Additions, dynamic display scaling, and kernel drivers pre-tuned!'
        ],
        commandToRun: 'Get-FileHash -Algorithm SHA256 .\\kali-linux-*-virtualbox-amd64.7z',
        outputPreview: `Algorithm       Hash                                                               Path
---------       ----                                                               ----
SHA256          4a3b82f9d6c81e2b5e0a4f3b1e8a9c2d7f4e1a0b3c5d6e7f8a9b0c1d2e3f4a5b kali-linux-virtualbox.7z`,
        proTip: 'Always verify the SHA256 checksum in PowerShell to ensure your download was not corrupted or tampered with.'
      },
      {
        id: 'vm-step-3',
        stepNumber: 3,
        title: 'Extract with 7-Zip & Open Virtual Machine',
        estimatedTime: '3 mins',
        summary: 'Extract the 7z archive and double-click the .vbox machine definition.',
        instructions: [
          'Install 7-Zip (https://7-zip.org) if you don\'t have it.',
          'Right-click the downloaded 7z file -> 7-Zip -> "Extract to kali-linux-..."',
          'Open the extracted folder and double-click the blue .vbox file (or click "Add" inside VirtualBox).',
          'VirtualBox will instantly load Kali Linux with optimal hardware profile already configured!'
        ],
        proTip: 'Before starting, go to Settings -> System -> Processor and ensure at least 2 CPU cores are allocated, and Display -> Video Memory is set to 128 MB with 3D Acceleration enabled.'
      },
      {
        id: 'vm-step-4',
        stepNumber: 4,
        title: 'First Boot & Login Credentials',
        estimatedTime: '1 min',
        summary: 'Start the virtual machine and log into Kali with official default credentials.',
        instructions: [
          'Select "Kali-Linux" in VirtualBox and click the green "Start" button.',
          'Wait ~15 seconds for the GRUB boot menu and XFCE login screen to appear.',
          'Enter the default credentials below:'
        ],
        commandToRun: 'Username: kali  |  Password: kali',
        outputPreview: `[  OK  ] Started VirtualBox Guest Additions.
[  OK  ] Reached target Graphical Interface.
Kali Linux LightDM Display Manager:
User: kali
Password: ****
Welcome to Kali Linux 2024.x (GNU/Linux 6.8.x-kali-amd64)!`,
        warningNote: 'Crucial Security Step: Immediately open terminal and change default password by running "passwd" to prevent unauthorized local network access.',
        proTip: 'Take a snapshot now! In VirtualBox menu: Machine -> Take Snapshot -> name it "Fresh Clean Install". You can always revert here if any package breaks.'
      },
      {
        id: 'vm-step-5',
        stepNumber: 5,
        title: 'Post-Install Guest Additions & Display Auto-Resize',
        estimatedTime: '3 mins',
        summary: 'Ensure auto-resizing, shared clipboard, and drag-and-drop are active.',
        instructions: [
          'In VirtualBox top menu, click Devices -> Shared Clipboard -> choose "Bidirectional".',
          'Click Devices -> Drag and Drop -> choose "Bidirectional".',
          'Resize the VirtualBox window; the Kali resolution should instantly adjust to fit your screen resolution.'
        ],
        commandToRun: 'sudo apt update && sudo apt install -y virtualbox-guest-x11',
        outputPreview: `virtualbox-guest-x11 is already the newest version (7.0.x).
Display resolution seamlessly synchronized to host window dimensions.`,
        proTip: 'Press Host Key (Right Ctrl) + F to toggle Fullscreen Mode. Kali will behave just like a dedicated native operating system!'
      }
    ]
  },

  usb: {
    id: 'usb',
    name: 'Live USB with Encrypted Persistence (Portable Hardware)',
    tagline: 'Carry your entire offensive security toolkit on a bootable keychain flash drive with encrypted storage',
    recommendedFor: 'Physical penetration testers, air-gapped security audits, and users who want zero footprint on the host computer.',
    difficulty: 'Intermediate',
    performance: 'Hardware Direct',
    specs: {
      minRam: '4 GB RAM',
      recRam: '8 GB+ RAM',
      diskSpace: '32 GB+ USB 3.2 Drive',
      cpuCores: 'x86_64 CPU'
    },
    pros: [
      'Zero footprint: Leaves no trace on the internal hard drive of the host computer',
      'Direct access to internal Wi-Fi and Bluetooth chips for native packet injection without pass-through hurdles',
      'LUKS Encrypted persistence: Stored documents, custom scripts, and hashes remain military-grade encrypted if drive is lost'
    ],
    cons: [
      'Requires rebooting host machine to boot from USB',
      'I/O speed depends on USB drive quality (recommend Samsung Bar or SanDisk Extreme USB 3.2)'
    ],
    steps: [
      {
        id: 'usb-step-1',
        stepNumber: 1,
        title: 'Download Kali Live ISO & Rufus Flasher',
        estimatedTime: '4 mins',
        summary: 'Download the official "Live Boot" ISO from kali.org and Rufus for Windows.',
        instructions: [
          'Visit https://www.kali.org/get-kali/#kali-live and download "Kali Linux Live 64-bit".',
          'Download Rufus flasher from https://rufus.ie (portable version is fine).',
          'Insert your 32GB+ USB 3.0/3.2 flash drive into your PC.'
        ],
        warningNote: 'BACK UP YOUR USB DRIVE! Flashing will completely erase all existing data on the USB drive.'
      },
      {
        id: 'usb-step-2',
        stepNumber: 2,
        title: 'Flash USB with Persistent Partition in Rufus',
        estimatedTime: '6 mins',
        summary: 'Configure Rufus with persistent partition sizing to save files and tools across reboots.',
        instructions: [
          'Open Rufus as Administrator.',
          'Select your USB Drive in "Device".',
          'In "Boot selection", browse and select the downloaded "kali-linux-live-amd64.iso".',
          'Crucial setting: Set "Persistent partition size" slider to at least 15 GB (or maximum).',
          'Click START and select "Write in ISO Image mode (Recommended)".'
        ],
        outputPreview: `Rufus v4.x
Device: [E:] SanDisk Ultra (64 GB)
Boot: kali-linux-2024.x-live-amd64.iso
Partition scheme: MBR / BIOS or UEFI
Persistence: 20 GB EXT4
Writing ISO blocks... Done in 4m 12s.`
      },
      {
        id: 'usb-step-3',
        stepNumber: 3,
        title: 'Boot from USB & Choose Encrypted Persistence',
        estimatedTime: '2 mins',
        summary: 'Restart your PC, trigger the BIOS Boot Menu, and boot into persistent Kali.',
        instructions: [
          'Reboot your PC while tapping the Boot Menu hotkey: F12 (Dell/Lenovo), F11 (MSI), F9 (HP), or Esc/F8 (Asus).',
          'Select your USB drive (UEFI option preferred).',
          'On the Kali Boot Menu, select "Live USB Encrypted Persistence" (or "Live USB Persistence").',
          'Enter your encryption passphrase when prompted.'
        ],
        proTip: 'Any files you save in /home/kali, installed packages, or Wi-Fi configurations will now persist forever across reboots!'
      }
    ]
  }
};

export const MAC_SETUP_METHODS: Record<'utm' | 'fusion' | 'intel_vm', MethodConfig> = {
  utm: {
    id: 'utm',
    name: 'UTM Hypervisor (Apple Silicon M1/M2/M3/M4)',
    tagline: 'Native ARM64 virtualization leveraging Apple Hypervisor framework with Retina display scaling',
    recommendedFor: 'All modern Mac users (MacBook Air/Pro, Mac Mini, Mac Studio with M1, M2, M3, or M4 chips).',
    difficulty: 'Beginner',
    performance: 'Near-Native (Fastest)',
    specs: {
      minRam: '8 GB Unified Memory',
      recRam: '16 GB+ Unified Memory',
      diskSpace: '30 GB Free SSD Space',
      cpuCores: 'Apple M-Series (ARM64)'
    },
    pros: [
      'Free, open-source, and specifically designed for Apple Silicon macOS',
      'Runs Kali ARM64 at near bare-metal hardware speeds without battery drain',
      'Retina display auto-scaling and seamless trackpad gesture support',
      'Effortless shared folders and bidirectional clipboard via SPICE webdav'
    ],
    cons: [
      'Cannot run legacy x86_64 only binaries without Rosetta emulation flags',
      'USB Wi-Fi passthrough requires compatible macOS-supported USB-C hubs'
    ],
    steps: [
      {
        id: 'mac-utm-step-1',
        stepNumber: 1,
        title: 'Install UTM for macOS',
        estimatedTime: '2 mins',
        summary: 'Download and install UTM via Homebrew or official DMG installer.',
        instructions: [
          'Option A (Homebrew): Open macOS Terminal and run "brew install --cask utm".',
          'Option B: Download the free installer DMG directly from https://mac.getutm.app and drag UTM to your Applications folder.'
        ],
        commandToRun: 'brew install --cask utm',
        outputPreview: `==> Downloading https://github.com/utmapp/UTM/releases/download/v4.5.x/UTM.dmg
==> Installing Cask utm
==> Moving App 'UTM.app' to '/Applications/UTM.app'
🍺  utm was successfully installed!`
      },
      {
        id: 'mac-utm-step-2',
        stepNumber: 2,
        title: 'Download Kali Linux Apple Silicon ARM64 ISO',
        estimatedTime: '5 mins',
        summary: 'Download the ARM64 installer architecture tailored for Apple Silicon.',
        instructions: [
          'CRITICAL FACT-CHECK: Do NOT download the default 64-bit AMD64 ISO! It will run 10x slower under emulation and cause kernel panics.',
          'Go to official Kali ARM portal: https://www.kali.org/get-kali/#kali-arm',
          'Download "Apple Silicon (ARM64) Installer" ISO (e.g., kali-linux-2024.x-installer-arm64.iso).'
        ],
        warningNote: 'Verify your file has "arm64" in its filename, NOT "amd64" or "i386".',
        proTip: 'Verify file hash in Terminal: "shasum -a 256 ~/Downloads/kali-linux-*-installer-arm64.iso"'
      },
      {
        id: 'mac-utm-step-3',
        stepNumber: 3,
        title: 'Create Optimized ARM64 VM in UTM',
        estimatedTime: '3 mins',
        summary: 'Configure hardware parameters in UTM with Apple Virtualization enabled.',
        instructions: [
          'Open UTM and click the large "+" button (Create a New Virtual Machine).',
          'Select "Virtualize" (DO NOT select "Emulate" — Virtualize runs natively on M-chips!).',
          'Select "Linux" as the Guest OS.',
          'Check "Use Apple Virtualization" for optimal kernel throughput.',
          'Click Browse under "Boot ISO Image" and select your downloaded Kali ARM64 ISO.',
          'Allocate 4096 MB RAM (or 8192 MB) and 4 CPU Cores.',
          'Set Virtual Disk size to 30 GB and click Save.'
        ],
        proTip: 'In UTM VM Settings -> Display, ensure Retina Mode is checked for ultra-crisp Kali terminal fonts on MacBook Liquid Retina displays.'
      },
      {
        id: 'mac-utm-step-4',
        stepNumber: 4,
        title: 'Run Fast Graphical Install',
        estimatedTime: '7 mins',
        summary: 'Boot the installer, select default desktop options, and complete installation.',
        instructions: [
          'Press the big Play button in UTM to boot the VM.',
          'Select "Graphical Install" in the GRUB menu.',
          'Set your language, keyboard layout, and create your default user account (kali / password).',
          'On Software Selection screen, keep default XFCE and standard security tools checked.',
          'When finished, click Continue to reboot. Remove the ISO from UTM CD drive settings.'
        ],
        outputPreview: `Installation is complete, so it is time to boot into your new system.
Removing installation media...
Rebooting into Kali Linux ARM64 on Apple Hypervisor...`
      },
      {
        id: 'mac-utm-step-5',
        stepNumber: 5,
        title: 'Install SPICE Guest Tools (Dynamic Window Resizing)',
        estimatedTime: '2 mins',
        summary: 'Enable auto-scaling display resolution so Kali automatically fills your Mac screen when resized.',
        instructions: [
          'Log in with your newly created account (or default kali / kali).',
          'Open terminal and install the SPICE guest agent package:',
          'Restart the VM or start the spice service. Now resizing the UTM window dynamically adapts the Kali display!'
        ],
        commandToRun: 'sudo apt update && sudo apt install -y spice-vdagent',
        outputPreview: `Setting up spice-vdagent (0.22.x) ...
Created symlink /etc/systemd/system/multi-user.target.wants/spice-vdagent.service.
[  OK  ] Started SPICE Guest Agent. Dynamic display scaling enabled.`,
        proTip: 'Press Control + Option to release mouse cursor if UTM captures it, or install spice-vdagent to enable seamless cursor movement.'
      }
    ]
  },

  fusion: {
    id: 'fusion',
    name: 'VMware Fusion Pro (Apple Silicon & Intel - 100% Free)',
    tagline: 'Enterprise-grade hypervisor made completely free for personal use by Broadcom in 2024',
    recommendedFor: 'Mac users who prefer the polished VMware ecosystem and want official VMware Tools integration.',
    difficulty: 'Beginner',
    performance: 'Near-Native (Fastest)',
    specs: {
      minRam: '8 GB Unified Memory',
      recRam: '16 GB+ Unified Memory',
      diskSpace: '35 GB Free Space',
      cpuCores: '4 Cores'
    },
    pros: [
      'Now 100% free for personal use with official VMware licensing',
      'Direct official pre-built Kali VMware ARM64 images available on kali.org',
      'Superb 3D acceleration and fluid metal rendering on macOS Sonoma/Sequoia'
    ],
    cons: [
      'Requires free Broadcom account registration to download official license key'
    ],
    steps: [
      {
        id: 'fusion-step-1',
        stepNumber: 1,
        title: 'Download VMware Fusion Pro for Personal Use',
        estimatedTime: '5 mins',
        summary: 'Get the free personal use license from Broadcom portal or install via Homebrew.',
        instructions: [
          'Broadcom officially made VMware Fusion Pro free for personal use in May 2024.',
          'Install directly using Homebrew cask: "brew install --cask vmware-fusion".',
          'Launch VMware Fusion and choose "Personal Use" when prompted.'
        ],
        commandToRun: 'brew install --cask vmware-fusion',
        outputPreview: `==> Downloading VMware Fusion...
==> Installing Cask vmware-fusion
🍺  vmware-fusion was successfully installed!`
      },
      {
        id: 'fusion-step-2',
        stepNumber: 2,
        title: 'Download Kali VMware ARM64 Pre-built Appliance',
        estimatedTime: '6 mins',
        summary: 'Download the pre-configured VMware image designed for Apple Silicon.',
        instructions: [
          'Visit https://www.kali.org/get-kali/#kali-arm and download the VMware Apple Silicon image.',
          'Unzip the downloaded archive to access the .vmwarevm bundle.',
          'Double-click the bundle; VMware Fusion Pro will automatically open and configure the VM.'
        ],
        commandToRun: 'Username: kali  |  Password: kali',
        proTip: 'VMware Tools are pre-installed in this image, meaning full resolution scaling and clipboard synchronization work immediately!'
      }
    ]
  },

  intel_vm: {
    id: 'intel_vm',
    name: 'VirtualBox / VMware for Intel Mac (x86_64)',
    tagline: 'Standard 64-bit virtualization for older Macs powered by Intel Core i5/i7/i9 processors',
    recommendedFor: 'Macs manufactured prior to November 2020 with Intel x86 processors.',
    difficulty: 'Beginner',
    performance: 'High (Isolated)',
    specs: {
      minRam: '4 GB RAM',
      recRam: '8 GB - 16 GB',
      diskSpace: '30 GB SSD Space',
      cpuCores: '2 to 4 Cores'
    },
    pros: [
      'Standard AMD64 image compatibility with all classic x86 pentest binaries and exploits',
      'VirtualBox 7.x runs smoothly with Guest Additions'
    ],
    cons: [
      'Intel Mac hardware runs hotter than Apple Silicon M-series chips; keep cooling fans unobstructed'
    ],
    steps: [
      {
        id: 'intel-step-1',
        stepNumber: 1,
        title: 'Install VirtualBox for Intel Mac',
        estimatedTime: '3 mins',
        summary: 'Install Oracle VirtualBox for macOS x86_64 architecture.',
        instructions: [
          'Run "brew install --cask virtualbox" in Mac Terminal or download macOS installer from virtualbox.org.',
          'If macOS blocks the kernel extension, go to System Settings -> Privacy & Security and click "Allow" for Oracle.'
        ],
        commandToRun: 'brew install --cask virtualbox'
      },
      {
        id: 'intel-step-2',
        stepNumber: 2,
        title: 'Download & Launch Standard Pre-Built VirtualBox Image',
        estimatedTime: '5 mins',
        summary: 'Download standard 64-bit x86 VirtualBox pre-built image from kali.org.',
        instructions: [
          'Download the pre-built VirtualBox image from https://www.kali.org/get-kali/#kali-virtual-machines',
          'Extract with The Unarchiver and double-click the .vbox file.',
          'Default credentials: kali / kali'
        ]
      }
    ]
  }
};

export const COMMON_TROUBLESHOOTING: TroubleshootingItem[] = [
  {
    id: 'tb-1',
    issue: 'VirtualBox: "VT-x / AMD-V is not available in the host" (VERR_VMX_NO_VMX)',
    platform: 'windows',
    symptom: 'VirtualBox fails to start any 64-bit Kali VM and throws an error about hardware virtualization being disabled.',
    rootCause: 'Intel Virtualization Technology (VT-x) or AMD SVM Mode is turned off in your motherboard BIOS/UEFI, or Windows Hyper-V / Device Guard is monopolizing the hypervisor.',
    solutionSteps: [
      'Restart your computer and enter BIOS/UEFI setup (press F2, F10, F12, or Del during computer startup).',
      'Navigate to CPU Configuration or Advanced Settings.',
      'Enable "Intel Virtualization Technology" (or "Intel VT-x" / "SVM Mode" for AMD CPUs).',
      'Save settings (F10) and reboot into Windows.',
      'If error persists, open PowerShell as Admin and disable Windows hypervisor conflict: bcdedit /set hypervisorlaunchtype off'
    ],
    fixCommand: 'bcdedit /set hypervisorlaunchtype off'
  },
  {
    id: 'tb-2',
    issue: 'WSL2: "Win-KeX unable to connect to socket / client connection refused"',
    platform: 'windows',
    symptom: 'Running "kex --win -s" hangs or displays "Failed to connect to socket /tmp/.X11-unix/X1".',
    rootCause: 'A stale VNC lock file or leftover server process was not cleanly terminated during the last session.',
    solutionSteps: [
      'Inside your Kali WSL terminal, kill all background Win-KeX processes: kex kill',
      'Remove stale temporary lock files: rm -rf /tmp/.X11-unix/X1 /tmp/.X1-lock',
      'Restart Win-KeX with sound support: kex --esm --sound (or kex --win -s)'
    ],
    fixCommand: 'kex kill && rm -rf /tmp/.X11-unix/X1 && kex --win -s'
  },
  {
    id: 'tb-3',
    issue: 'Mac Apple Silicon (M1/M2/M3/M4): "Architecture Mismatch / Kernel Panic on Boot"',
    platform: 'mac',
    symptom: 'UTM or VMware shows black screen, boots into EFI shell, or crashes with "Bad CPU type in executable".',
    rootCause: 'You accidentally downloaded the x86_64 / AMD64 ISO instead of the ARM64 ISO. Apple Silicon cannot run x86 kernels natively.',
    solutionSteps: [
      'Open your Downloads folder and check the ISO filename.',
      'If the filename contains "amd64", delete it immediately.',
      'Download the official ARM64 version from https://www.kali.org/get-kali/#kali-arm (look for "Apple Silicon ARM64").',
      'In UTM, make sure the VM architecture is set to "aarch64 (ARM64)" and "Virtualize" is checked.'
    ]
  },
  {
    id: 'tb-4',
    issue: 'Virtual Machine display stuck at 800x600 resolution (cannot resize)',
    platform: 'both',
    symptom: 'The Kali desktop is a tiny box in the center of your screen and does not scale when maximizing the VM window.',
    rootCause: 'Guest additions / SPICE display agent drivers are missing or not running.',
    solutionSteps: [
      'Open the terminal inside Kali Linux.',
      'For VirtualBox, run: sudo apt update && sudo apt install -y virtualbox-guest-x11',
      'For UTM / KVM / SPICE on Mac, run: sudo apt update && sudo apt install -y spice-vdagent',
      'Reboot the VM: sudo reboot',
      'Resize the host window; Kali will now dynamically adapt to your exact native resolution (1080p, 1440p, 4K Retina).'
    ],
    fixCommand: 'sudo apt update && sudo apt install -y virtualbox-guest-x11 spice-vdagent && sudo reboot'
  },
  {
    id: 'tb-5',
    issue: 'Kali VM has no internet connection ("Temporary failure in name resolution")',
    platform: 'both',
    symptom: 'Cannot run apt update, ping 8.8.8.8 fails, and browser cannot load any websites inside Kali.',
    rootCause: 'VM Network Adapter is configured as "Host-Only" or internal virtual NAT DNS resolver has failed.',
    solutionSteps: [
      'Open your VM software settings (VirtualBox/VMware/UTM) while the VM is powered down.',
      'Go to Network Settings: Change Adapter 1 from "Host-Only" to "NAT" (or "Bridged Adapter" to receive an IP from your home router).',
      'Boot Kali, open terminal, and test if raw IP connectivity works: ping -c 2 1.1.1.1',
      'If raw ping works but domain names fail, fix your DNS resolver: echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf'
    ],
    fixCommand: 'echo -e "nameserver 1.1.1.1\\nnameserver 8.8.8.8" | sudo tee /etc/resolv.conf'
  },
  {
    id: 'tb-6',
    issue: 'apt update fails with "Repository changed its Suite value from kali-rolling to..." or GPG key error',
    platform: 'both',
    symptom: 'Running "sudo apt update" aborts with error: "Repository changed its Suite value" or signature verification failed.',
    rootCause: 'Kali Linux is a rolling-release distribution (Kali-Rolling). When a quarterly release transitions, apt requires explicit confirmation.',
    solutionSteps: [
      'Run the update command with the release info override flag: sudo apt update --allow-releaseinfo-change',
      'If GPG keys expired, reinstall the Kali archive keyring: sudo apt install -y kali-archive-keyring',
      'Now run full upgrade safely: sudo apt full-upgrade -y'
    ],
    fixCommand: 'sudo apt update --allow-releaseinfo-change && sudo apt install -y kali-archive-keyring'
  }
];

export const POST_INSTALL_CHECKLIST = [
  {
    id: 'post-1',
    task: 'Change Default Password',
    command: 'passwd',
    desc: 'Change default "kali" password to protect your lab from unauthorized access.',
    importance: 'Critical'
  },
  {
    id: 'post-2',
    task: 'Full System Upgrade',
    command: 'sudo apt update && sudo apt -y full-upgrade',
    desc: 'Fetch the latest security patches, kernel fixes, and modernized exploits.',
    importance: 'Essential'
  },
  {
    id: 'post-3',
    task: 'Install Default Kali Metapackage',
    command: 'sudo apt install -y kali-linux-default',
    desc: 'Ensures top 100+ standard offensive tools (nmap, wireshark, burpsuite, metasploit) are fully installed.',
    importance: 'Recommended'
  },
  {
    id: 'post-4',
    task: 'Enable Zsh History Search & Auto-Suggestions',
    command: 'sudo apt install -y zsh-autosuggestions zsh-syntax-highlighting',
    desc: 'Provides lightning-fast terminal auto-completion and syntax color coding.',
    importance: 'Productivity'
  },
  {
    id: 'post-5',
    task: 'Verify Network Adapter & IP Address',
    command: 'ip -c a && ip r',
    desc: 'Check your assigned IP address and default gateway route.',
    importance: 'Verification'
  }
];
