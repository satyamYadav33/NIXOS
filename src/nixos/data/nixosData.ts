import type { NixGeneration, NixStorePackage, ConfigModuleOption, ComparisonPoint, NixCommand, NixQuizQuestion } from '../types';

export const NIX_GENERATIONS: NixGeneration[] = [
  {
    id: 'gen-41',
    generationNumber: 41,
    timestamp: '2026-09-24 10:14:02',
    kernelVersion: 'Linux 6.6.48-lts',
    nixpkgsChannel: 'nixos-24.05',
    status: 'previous',
    summary: 'Initial baseline setup with systemd-boot, NetworkManager & OpenSSH',
    changes: {
      addedPackages: ['git', 'curl', 'zsh', 'neovim', 'htop'],
      removedPackages: [],
      serviceChanges: ['+ sshd.service', '+ NetworkManager.service']
    },
    storePath: '/nix/store/1a7c8z9x2m4k-nixos-system-nixbox-24.05.41',
    isBootable: true,
    bootLabel: 'NixOS - Generation 41 (2026-09-24 10:14:02) [Linux 6.6.48-lts]'
  },
  {
    id: 'gen-42',
    generationNumber: 42,
    timestamp: '2026-09-25 14:30:19',
    kernelVersion: 'Linux 6.6.50-lts',
    nixpkgsChannel: 'nixos-24.05',
    status: 'previous',
    summary: 'Added Docker virtualization, PostgreSQL 16 database, and Tailscale mesh VPN',
    changes: {
      addedPackages: ['docker-26.1', 'postgresql-16.3', 'tailscale-1.66', 'ripgrep', 'tmux'],
      removedPackages: [],
      serviceChanges: ['+ docker.socket', '+ postgresql.service', '+ tailscaled.service']
    },
    storePath: '/nix/store/7v9x4p1k8w3m-nixos-system-nixbox-24.05.42',
    isBootable: true,
    bootLabel: 'NixOS - Generation 42 (2026-09-25 14:30:19) [Linux 6.6.50-lts] (STABLE)'
  },
  {
    id: 'gen-43',
    generationNumber: 43,
    timestamp: '2026-09-26 18:22:45',
    kernelVersion: 'Linux 6.11.0-rc7 (Unstable)',
    nixpkgsChannel: 'nixos-unstable',
    status: 'broken',
    summary: '⚠️ Faulty Experimental Upgrade: Custom bleeding-edge kernel + broken graphics drivers caused display server failure',
    changes: {
      addedPackages: ['linux-6.11-rc7', 'nvidia-beta-560.31', 'wayland-git'],
      removedPackages: ['linux-6.6.50-lts', 'nvidia-stable-550'],
      serviceChanges: ['! display-manager.service (CRASHED: Status 1/FAILURE)', '! drm-kms driver panic']
    },
    storePath: '/nix/store/9k2m4x7v1a8z-nixos-system-nixbox-unstable.43',
    isBootable: true,
    bootLabel: '⚠️ NixOS - Generation 43 (2026-09-26 18:22:45) [Linux 6.11.0-rc7] [BROKEN]'
  },
  {
    id: 'gen-44',
    generationNumber: 44,
    timestamp: '2026-09-26 18:24:12',
    kernelVersion: 'Linux 6.6.50-lts',
    nixpkgsChannel: 'nixos-24.05',
    status: 'rolled-back',
    summary: '⚡ Instant Atomic Rollback: Restored Generation 42 via `nixos-rebuild switch --rollback` in 0.4 seconds!',
    changes: {
      addedPackages: ['linux-6.6.50-lts', 'nvidia-stable-550'],
      removedPackages: ['linux-6.11-rc7', 'nvidia-beta-560.31'],
      serviceChanges: ['+ display-manager.service (RESTARTED: OK)', '+ postgresql.service (HEALTHY)']
    },
    storePath: '/nix/store/7v9x4p1k8w3m-nixos-system-nixbox-24.05.42',
    isBootable: true,
    bootLabel: 'NixOS - Generation 44 [Rollback to Gen 42] (2026-09-26 18:24:12)'
  },
  {
    id: 'gen-45',
    generationNumber: 45,
    timestamp: '2026-09-27 15:45:00',
    kernelVersion: 'Linux 6.6.52-lts',
    nixpkgsChannel: 'nixos-24.05',
    status: 'active',
    summary: 'Current Live System: Clean declarative merge with Hyprland Wayland compositor, PipeWire audio, and Nginx reverse proxy',
    changes: {
      addedPackages: ['hyprland-0.41', 'pipewire-1.0.7', 'nginx-1.26.1', 'waybar'],
      removedPackages: [],
      serviceChanges: ['+ nginx.service', '+ pipewire.service', '+ wireplumber.service']
    },
    storePath: '/nix/store/4m8k2z7x9v1p-nixos-system-nixbox-24.05.45',
    isBootable: true,
    bootLabel: '❄️ NixOS - Generation 45 (Current Default) [Linux 6.6.52-lts]'
  }
];

export const NIX_STORE_PACKAGES: NixStorePackage[] = [
  {
    id: 'pkg-glibc',
    hash: '0z3j8fk7x12a9v4p6m8k2z5q8r1t4w7x',
    name: 'glibc',
    version: '2.39',
    sizeMb: 34.2,
    category: 'core',
    dependencies: [],
    description: 'GNU C Library: The foundational standard C library for Linux system calls and thread control.',
    path: '/nix/store/0z3j8fk7x12a9v4p6m8k2z5q8r1t4w7x-glibc-2.39',
    isShared: true
  },
  {
    id: 'pkg-openssl-11',
    hash: '3p7w9x1k4m8z2v5q8r1t4a6k2j8f0z3j',
    name: 'openssl',
    version: '1.1.1u',
    sizeMb: 8.4,
    category: 'library',
    dependencies: ['pkg-glibc'],
    description: 'Legacy cryptography library required by older microservices, coexisting without collision.',
    path: '/nix/store/3p7w9x1k4m8z2v5q8r1t4a6k2j8f0z3j-openssl-1.1.1u',
    isShared: true
  },
  {
    id: 'pkg-openssl-30',
    hash: '8r1t4w7x0z3j8fk7x12a9v4p6m8k2z5q',
    name: 'openssl',
    version: '3.0.13',
    sizeMb: 12.1,
    category: 'library',
    dependencies: ['pkg-glibc'],
    description: 'Modern cryptographic library powering contemporary web runtimes and TLS 1.3 handshakes.',
    path: '/nix/store/8r1t4w7x0z3j8fk7x12a9v4p6m8k2z5q-openssl-3.0.13',
    isShared: true
  },
  {
    id: 'pkg-node18',
    hash: '2m4k6p8r1t4w7x0z3j8fk7x12a9v5q8z',
    name: 'nodejs',
    version: '18.20.4',
    sizeMb: 88.5,
    category: 'runtime',
    dependencies: ['pkg-glibc', 'pkg-openssl-11'],
    description: 'Node.js LTS runtime compiled specifically against OpenSSL 1.1.1u with zero system pollution.',
    path: '/nix/store/2m4k6p8r1t4w7x0z3j8fk7x12a9v5q8z-nodejs-18.20.4',
    isShared: false
  },
  {
    id: 'pkg-node20',
    hash: '9v5q8z2m4k6p8r1t4w7x0z3j8fk7x12a',
    name: 'nodejs',
    version: '20.14.0',
    sizeMb: 94.2,
    category: 'runtime',
    dependencies: ['pkg-glibc', 'pkg-openssl-30'],
    description: 'Current Node.js runtime compiled against OpenSSL 3.0.13, running simultaneously alongside Node 18.',
    path: '/nix/store/9v5q8z2m4k6p8r1t4w7x0z3j8fk7x12a-nodejs-20.14.0',
    isShared: false
  },
  {
    id: 'pkg-python311',
    hash: '5q8r1t4a6k2j8f0z3j3p7w9x1k4m8z2v',
    name: 'python3',
    version: '3.11.9',
    sizeMb: 62.4,
    category: 'runtime',
    dependencies: ['pkg-glibc', 'pkg-openssl-30'],
    description: 'Python interpreter built with isolated site-packages and hermetic bytecode compilation.',
    path: '/nix/store/5q8r1t4a6k2j8f0z3j3p7w9x1k4m8z2v-python3-3.11.9',
    isShared: true
  },
  {
    id: 'pkg-nginx',
    hash: '7x12a9v4p6m8k2z5q8r1t4w7x0z3j8fk',
    name: 'nginx',
    version: '1.26.1',
    sizeMb: 14.8,
    category: 'service',
    dependencies: ['pkg-glibc', 'pkg-openssl-30'],
    description: 'High-performance HTTP server configured exclusively through NixOS declarative options.',
    path: '/nix/store/7x12a9v4p6m8k2z5q8r1t4w7x0z3j8fk-nginx-1.26.1',
    isShared: false
  },
  {
    id: 'pkg-neovim',
    hash: '4a6k2j8f0z3j3p7w9x1k4m8z2v5q8r1t',
    name: 'neovim',
    version: '0.10.0',
    sizeMb: 28.6,
    category: 'tool',
    dependencies: ['pkg-glibc'],
    description: 'Vim-fork text editor bundled with LuaJIT and isolated treesitter parsers.',
    path: '/nix/store/4a6k2j8f0z3j3p7w9x1k4m8z2v5q8r1t-neovim-0.10.0',
    isShared: false
  }
];

export const CONFIG_MODULE_OPTIONS: ConfigModuleOption[] = [
  {
    id: 'mod-bootloader',
    category: 'system',
    title: 'systemd-boot EFI Bootloader',
    description: 'Enables modern systemd-boot with automatic generation menu entries for rollback at boot.',
    nixCodeSnippet: `boot.loader.systemd-boot.enable = true;
boot.loader.efi.canTouchEfiVariables = true;
boot.loader.systemd-boot.configurationLimit = 10;`,
    enabledByDefault: true,
    iconName: 'Cpu',
    badge: 'Core',
    tags: ['boot', 'efi', 'systemd']
  },
  {
    id: 'mod-networking',
    category: 'networking',
    title: 'NetworkManager & Firewall',
    description: 'Declarative network configuration with stateful packet filtering and hostname assignment.',
    nixCodeSnippet: `networking.hostName = "nixbox";
networking.networkmanager.enable = true;
networking.firewall = {
  enable = true;
  allowedTCPPorts = [ 80 443 22 ];
};`,
    enabledByDefault: true,
    iconName: 'Network',
    badge: 'Security',
    tags: ['network', 'firewall', 'ports']
  },
  {
    id: 'mod-hyprland',
    category: 'desktop',
    title: 'Hyprland Wayland Compositor',
    description: 'Dynamic tiling Wayland compositor with fluid physics animations, PipeWire portal, and XWayland.',
    nixCodeSnippet: `programs.hyprland = {
  enable = true;
  xwayland.enable = true;
};
xdg.portal = {
  enable = true;
  extraPortals = [ pkgs.xdg-desktop-portal-hyprland ];
};`,
    enabledByDefault: true,
    iconName: 'Layout',
    badge: 'UI/UX',
    tags: ['wayland', 'desktop', 'hyprland']
  },
  {
    id: 'mod-pipewire',
    category: 'services',
    title: 'PipeWire Low-Latency Audio',
    description: 'Replaces legacy PulseAudio and ALSA with modern zero-jitter PipeWire audio processing.',
    nixCodeSnippet: `security.rtkit.enable = true;
services.pipewire = {
  enable = true;
  alsa.enable = true;
  alsa.support32Bit = true;
  pulse.enable = true;
  jack.enable = true;
};`,
    enabledByDefault: true,
    iconName: 'Volume2',
    badge: 'Media',
    tags: ['audio', 'pipewire', 'pulse']
  },
  {
    id: 'mod-nginx',
    category: 'services',
    title: 'Nginx Reverse Proxy & SSL',
    description: 'Declarative virtual hosts with automatic reverse proxy routing and security headers.',
    nixCodeSnippet: `services.nginx = {
  enable = true;
  virtualHosts."app.local" = {
    locations."/" = {
      proxyPass = "http://127.0.0.1:3000";
      proxyWebsockets = true;
    };
  };
};`,
    enabledByDefault: false,
    iconName: 'Server',
    badge: 'Web',
    tags: ['web', 'reverse-proxy', 'http']
  },
  {
    id: 'mod-docker',
    category: 'services',
    title: 'Docker & Containerd Engine',
    description: 'Hardware-accelerated rootless or daemonized containerization runtime.',
    nixCodeSnippet: `virtualisation.docker = {
  enable = true;
  autoPrune = {
    enable = true;
    dates = "weekly";
  };
};`,
    enabledByDefault: true,
    iconName: 'Container',
    badge: 'DevOps',
    tags: ['containers', 'docker', 'virtualization']
  },
  {
    id: 'mod-tailscale',
    category: 'networking',
    title: 'Tailscale Zero-Trust Mesh VPN',
    description: 'WireGuard-powered peer-to-peer overlay network connecting servers, laptops, and mobile devices.',
    nixCodeSnippet: `services.tailscale = {
  enable = true;
  useRoutingFeatures = "client";
};`,
    enabledByDefault: false,
    iconName: 'ShieldCheck',
    badge: 'Mesh VPN',
    tags: ['vpn', 'wireguard', 'tailscale']
  },
  {
    id: 'mod-users',
    category: 'users',
    title: 'Declarative User Accounts & Sudo',
    description: 'Immutable user profiles with hashed passwords, authorized SSH keys, and wheel permissions.',
    nixCodeSnippet: `users.users.satyam = {
  isNormalUser = true;
  extraGroups = [ "wheel" "networkmanager" "docker" ];
  shell = pkgs.zsh;
  openssh.authorizedKeys.keys = [
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGo4... developer@matrix"
  ];
};`,
    enabledByDefault: true,
    iconName: 'Users',
    badge: 'Identity',
    tags: ['users', 'ssh', 'sudo']
  },
  {
    id: 'mod-packages',
    category: 'packages',
    title: 'System-Wide Packages (Nixpkgs)',
    description: 'Globally available CLI utilities, developer runtimes, and system monitoring tools.',
    nixCodeSnippet: `environment.systemPackages = with pkgs; [
  git
  neovim
  ripgrep
  htop
  tmux
  curl
  wget
  fastfetch
];`,
    enabledByDefault: true,
    iconName: 'Package',
    badge: 'Software',
    tags: ['pkgs', 'cli', 'utilities']
  }
];

export const COMPARISON_POINTS: ComparisonPoint[] = [
  {
    id: 'paradigm',
    dimension: 'Architecture & Mental Model',
    traditional: {
      title: 'Imperative (Step-by-Step Mutations)',
      description: 'You run commands that alter system state sequentially (e.g. apt update, apt install, systemctl enable). System state is the accumulated sum of years of manual modifications.',
      mechanism: 'State = State + Action_1 + Action_2 ... (Non-linear history)',
      drawback: 'Configuration drift: Impossible to know the exact state or replicate on another machine without extensive manual logging.'
    },
    nixos: {
      title: 'Declarative (Pure Mathematical Function)',
      description: 'You describe the desired END STATE in configuration.nix. Nix compiles the specification into an immutable system derivation.',
      mechanism: 'SystemState = f(configuration.nix, nixpkgs) (Deterministic)',
      benefit: '100% Reproducibility: Copy one file to a blank computer and run nixos-rebuild, and you get the exact bit-for-bit identical machine.'
    }
  },
  {
    id: 'package-storage',
    dimension: 'Filesystem & Package Storage',
    traditional: {
      title: 'Global FHS Hierarchy (/usr/bin, /lib)',
      description: 'All packages dump their binaries into /usr/bin and shared libraries into /usr/lib. A newer package can overwrite a library needed by another program.',
      mechanism: 'Direct filesystem overwrites in global shared folders',
      drawback: 'Dependency Hell: Installing Python 3.12 can break system tools expecting Python 3.10. DLL/SO hell.'
    },
    nixos: {
      title: 'Content-Addressed Immutable Store (/nix/store)',
      description: 'Every package is isolated in its own read-only folder identified by a cryptographic hash of its inputs: /nix/store/<hash>-<name>-<version>.',
      mechanism: 'Cryptographic hash isolation (e.g. /nix/store/7v9x...-nginx-1.26)',
      benefit: 'Zero Dependency Conflicts: 10 versions of OpenSSL, Python, or glibc can run simultaneously without ever colliding.'
    }
  },
  {
    id: 'system-upgrades',
    dimension: 'Upgrades & Atomic Transactions',
    traditional: {
      title: 'In-Place Live Overwrites',
      description: 'Packages are upgraded in-place while the operating system is actively executing. If power cuts or apt crashes halfway, the system is left in a broken, half-installed state.',
      mechanism: 'Destructive in-place file replacement',
      drawback: 'Corrupted states: Can render the machine unbootable if libc or the kernel module installation fails mid-way.'
    },
    nixos: {
      title: 'Atomic Symlink Flipping',
      description: 'Nix builds the entire new system closure in /nix/store BEFORE touching the running machine. When complete, an atomic symlink switch points to the new generation.',
      mechanism: 'ln -sfn /nix/store/...-system /run/current-system (Atomic)',
      benefit: 'Zero Half-Broken Upgrades: If compilation fails or disk fills up, the existing active system remains completely untouched.'
    }
  },
  {
    id: 'rollbacks',
    dimension: 'Rollback & Disaster Recovery',
    traditional: {
      title: 'Painful Reinstallation or Block Snapshots',
      description: 'No native command to undo an apt upgrade. Users rely on full filesystem snapshots (Btrfs/ZFS) or manual package downgrades.',
      mechanism: 'Manual downgrade / Snapshot rollback (heavy block-level restore)',
      drawback: "Time-consuming, doesn't explain what package broke what, and easy to lose recent personal data."
    },
    nixos: {
      title: 'Sub-Second Generation Switcher & Boot Menu',
      description: 'Every rebuild creates a numbered Generation. Type `nixos-rebuild switch --rollback` or select the generation in your bootloader menu to instantly restore.',
      mechanism: 'nixos-rebuild switch --rollback (Flips symlink in 0.4 seconds)',
      benefit: 'Instant Peace of Mind: A broken kernel or display driver can be bypassed in seconds right from the boot screen!'
    }
  },
  {
    id: 'development-environments',
    dimension: 'Developer Environments (Ad-Hoc vs Nix Shell)',
    traditional: {
      title: 'Docker Overhead or Global Mess',
      description: 'Developers install nvm, pyenv, rbenv, rustup globally or run heavy Docker containers with file permission hassles.',
      mechanism: 'Global version managers or VM/Docker virtualization',
      drawback: 'Pollutes host machine, high RAM overhead, slow disk mounts inside Docker on Windows/Mac.'
    },
    nixos: {
      title: 'Instant Ephemeral Shells (nix-shell / nix develop)',
      description: 'Run `nix-shell -p ripgrep htop go` to spawn a subshell with tools available immediately. When you type `exit`, nothing remains on your PATH.',
      mechanism: 'Dynamic PATH derivation scoping without containers',
      benefit: 'Native Host Performance with 100% isolation and instant shell sharing via shell.nix or flake.nix.'
    }
  }
];

export const NIX_COMMANDS: NixCommand[] = [
  {
    id: 'cmd-rebuild-switch',
    command: 'sudo nixos-rebuild switch',
    category: 'rebuild',
    title: 'Rebuild & Apply Configuration',
    description: 'Evaluates /etc/nixos/configuration.nix, compiles all derivations, creates a new numbered generation, atomically updates /run/current-system, and reloads systemd units.',
    flags: [
      { flag: '--rollback', description: 'Reverts to the immediately preceding system generation' },
      { flag: '--upgrade', description: 'Updates channels/flake inputs before rebuilding the closure' },
      { flag: '--show-trace', description: 'Displays full stack trace if Nix evaluation encounters an error' }
    ],
    exampleOutput: `building Nix...
building the system configuration...
these 12 derivations will be built:
  /nix/store/1a7...-nginx.conf.drv
  /nix/store/9k2...-etc-system.drv
updating GRUB 2 / systemd-boot menu...
activating the configuration...
setting up /etc...
reloading the following units: nginx.service, sshd.service
done. System is now Generation 45.`,
    proTip: 'Use `nixos-rebuild test` first if you want to try changes without registering a permanent bootloader generation!'
  },
  {
    id: 'cmd-rollback',
    command: 'sudo nixos-rebuild switch --rollback',
    category: 'rebuild',
    title: 'Instant System Rollback',
    description: 'The golden safety net: Switches the active operating system profile pointer to the previously working generation in sub-second time.',
    flags: [
      { flag: '-p <number>', description: 'Switch to a specific historical generation number' }
    ],
    exampleOutput: `switching from generation 43 to 42...
activating the configuration...
setting up /etc...
stopping the following units: nvidia-beta-daemon.service
starting the following units: display-manager.service
done. System successfully restored to Generation 42.`,
    proTip: 'If your monitor is black and you cannot reach a terminal, simply reboot and choose Generation 42 from the GRUB / systemd-boot boot menu!'
  },
  {
    id: 'cmd-nix-shell',
    command: 'nix-shell -p ripgrep python311Packages.requests',
    category: 'shell',
    title: 'Ephemeral Dev Environment',
    description: 'Creates a temporary isolated interactive shell with specified packages downloaded to /nix/store and added to $PATH without modifying your global system.',
    exampleOutput: `[nix-shell:~]$ python3 -c "import requests; print(requests.__file__)"
/nix/store/7v9x...-python3.11-requests-2.31.0/lib/python3.11/site-packages/requests/__init__.py
[nix-shell:~]$ exit
exit
[user@nixbox:~]$ python3
bash: python3: command not found (Global system remains pristine!)`,
    proTip: 'Add `shell.nix` to any git repository so every teammate can type `nix-shell` and get identical compilers and libraries.'
  },
  {
    id: 'cmd-nix-flake-check',
    command: 'nix flake check',
    category: 'flake',
    title: 'Flake Verification & Lock Testing',
    description: 'Verifies that all inputs in flake.lock are pinned, hashes match, and derivations build cleanly without impure environment leaks.',
    exampleOutput: `evaluating flake...
checking 'packages.x86_64-linux.default'...
checking 'nixosConfigurations.nixbox'...
all checks passed in 1.42s (zero impurities detected)`,
    proTip: 'Commit flake.lock to your Git repo to guarantee that anyone in 2030 will build the exact same binary hash!'
  },
  {
    id: 'cmd-diff-closures',
    command: 'nix store diff-closures /nix/var/nix/profiles/system-42-link /nix/var/nix/profiles/system-43-link',
    category: 'inspection',
    title: 'Diff Generations Closures',
    description: 'Shows the exact package additions, removals, and version diffs between any two system generations before or after upgrading.',
    exampleOutput: `linux: 6.6.50 -> 6.11.0-rc7 (+14.2 MiB)
nginx: ∅ -> 1.26.1 (+14.8 MiB)
postgresql: 16.2 -> 16.3 (+0.4 MiB)
openssl: 3.0.12 -> 3.0.13`,
    proTip: 'Never wonder "what changed on my system" again. The closure diff tells the absolute cryptographic truth.'
  },
  {
    id: 'cmd-garbage-collection',
    command: 'nix-collect-garbage -d',
    category: 'garbage',
    title: 'Delete Old Generations & Free Disk',
    description: 'Deletes all historical system generations except the currently active one and purges unreferenced packages from /nix/store.',
    exampleOutput: `finding garbage collector roots...
deleting old generation 39
deleting old generation 40
deleting old generation 41
deleting /nix/store/3p7w...-old-kernel-6.5.drv
deleting /nix/store/8r1t...-unused-libs
freed 14,820 MiB of disk space across 1,842 store paths.`,
    proTip: 'Only run `-d` once you are certain your current generation is rock solid, as it removes the ability to roll back to deleted generations.'
  }
];

export const NIX_QUIZ_QUESTIONS: NixQuizQuestion[] = [
  {
    id: 'q1',
    title: 'Nix vs NixOS Core Distinction',
    scenario: 'A developer asks: "Can I use Nix if I am already running Ubuntu 24.04 LTS or macOS Sequoia?"',
    options: [
      'No, Nix only works if you format your drive and install the NixOS Linux distribution.',
      'Yes, Nix is a standalone package manager that runs as an isolated user space tool on Ubuntu, Debian, Arch, Fedora, and macOS.',
      'No, Nix requires the Linux kernel to be rewritten with functional hooks.',
      'Yes, but only inside a Docker container or virtual machine.'
    ],
    correctIndex: 1,
    explanation: 'Nix is the package manager and purely functional language, whereas NixOS is the Linux distribution built entirely around it. You can install Nix on top of macOS, Ubuntu, Arch, or Debian alongside apt/brew with zero conflict!',
    badge: 'Foundation'
  },
  {
    id: 'q2',
    title: 'Rollback Command Execution',
    scenario: 'You edited `/etc/nixos/configuration.nix` to update your graphics drivers, executed `nixos-rebuild switch`, and your GUI won\'t start. How do you recover?',
    codeSnippet: '$ sudo ???',
    options: [
      'sudo apt-get install --reinstall xorg && sudo systemctl restart gdm',
      'sudo nixos-rebuild switch --rollback',
      'sudo btrfs subvolume restore / @last_snapshot',
      'sudo rm -rf /etc/nixos && reboot'
    ],
    correctIndex: 1,
    explanation: '`sudo nixos-rebuild switch --rollback` immediately points the `/run/current-system` symlink back to the previous known good generation in sub-second time. You can also select the previous generation in the bootloader menu at startup!',
    badge: 'Rollbacks'
  },
  {
    id: 'q3',
    title: 'Cryptographic Hash in /nix/store',
    scenario: 'Why does `/nix/store/7v9x4p1k8w3m-nginx-1.26.1` contain a 32-character alphanumeric prefix in its path?',
    options: [
      'It is a random UUID generated each time to prevent duplicate folder names.',
      'It is the cryptographic hash of all build inputs (source code, compiler flags, dependencies), guaranteeing immutability and reproducibility.',
      'It is an encrypted password protecting the binary from unauthorized execution.',
      'It represents the Unix timestamp of when the developer clicked build.'
    ],
    correctIndex: 1,
    explanation: 'The hash is computed from the entire input derivation (source tarball hash, compiler version, exact dependency hashes, and build script). If even a single byte of OpenSSL changes, the hash changes, guaranteeing pure deterministic isolation!',
    badge: 'Nix Store'
  },
  {
    id: 'q4',
    title: 'Traditional OS vs NixOS Analogy',
    scenario: 'How does the user prompt describe the relationship between package managers and NixOS?',
    options: [
      'Just like npm manages packages for Node.js, Nix manages software packages, while NixOS extends that declarative management to the entire operating system configuration.',
      'Nix is a compiler like GCC, and NixOS is a programming language like C++.',
      'Nix is an antivirus scanner, and NixOS is a firewall.',
      'Nix is a cloud provider, and NixOS is a virtual private server.'
    ],
    correctIndex: 0,
    explanation: 'Just like npm/pnpm/pip manages libraries for an application runtime, Nix manages packages. NixOS takes that exact paradigm and elevates it to govern the kernel, bootloader, users, networking, and systemd daemons in `configuration.nix`!',
    badge: 'Declarative'
  },
  {
    id: 'q5',
    title: 'Atomic Upgrades Guarantee',
    scenario: 'What happens if your power cord is unplugged or Wi-Fi cuts out in the middle of a `nixos-rebuild switch` command?',
    options: [
      'The filesystem becomes corrupted and you must boot into a Live USB rescue environment.',
      'Your running system is completely untouched because Nix compiles derivations into isolated store paths before atomically switching the profile symlink.',
      'Half of your packages will be on the new version and half on the old version.',
      'The bootloader will be erased.'
    ],
    correctIndex: 1,
    explanation: 'Nix builds new software into `/nix/store` in parallel without touching the active system. The actual switch is a single atomic symlink update (`ln -sfn`). If the build is interrupted, the active symlink never changed!',
    badge: 'Foundation'
  },
  {
    id: 'q6',
    title: 'Ephemeral Dev Environments',
    scenario: 'You want to run a quick test with `htop` and `ripgrep` without permanently installing them into your system configuration. What command do you use?',
    options: [
      'sudo apt install htop ripgrep',
      'nix-shell -p htop ripgrep',
      'docker run -it ubuntu apt-get install htop ripgrep',
      'brew install --temporary htop ripgrep'
    ],
    correctIndex: 1,
    explanation: '`nix-shell -p htop ripgrep` creates a temporary subshell with those utilities available immediately in $PATH. When you exit the shell, they disappear from your environment without leaving any global clutter!',
    badge: 'Nix Store'
  },
  {
    id: 'q7',
    title: 'What is configuration.nix?',
    scenario: 'What is the role of `/etc/nixos/configuration.nix` in NixOS?',
    options: [
      'It is just an optional bash script that runs at system startup.',
      'It is the single declarative source of truth defining users, networking, services, kernel parameters, and installed packages for the entire machine.',
      'It is a read-only log generated by the Linux kernel.',
      'It is a backup file created when you rollback a system.'
    ],
    correctIndex: 1,
    explanation: 'In NixOS, `/etc/nixos/configuration.nix` is the central declarative blueprint of the machine. The entire operating system state is derived purely from evaluating this file!',
    badge: 'Declarative'
  },
  {
    id: 'q8',
    title: 'Garbage Collection & Disk Space',
    scenario: 'You have been running NixOS for 6 months and have 50 historical generations taking up 40GB of disk space. Which command safely deletes old generations and purges unreferenced packages?',
    options: [
      'rm -rf /nix/store/*',
      'sudo nix-collect-garbage -d',
      'sudo apt-get autoremove --purge',
      'killall nix-daemon'
    ],
    correctIndex: 1,
    explanation: '`nix-collect-garbage -d` deletes all historical generation profile symlinks (except the current active one) and purges every orphaned store path. Never run `rm -rf /nix/store` as that would destroy the database and active system closures!',
    badge: 'Foundation'
  }
];
