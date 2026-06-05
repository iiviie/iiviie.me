'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { usePrefetchPosts, usePrefetchProjects } from '@/hooks/useMdxQueries';
import AsciiArtAnimator from './AsciiArtAnimator';
import TypewriterPrompt from './TypewriterPrompt';

const socialLinks = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/iiviie' },
  { label: 'X / Twitter', icon: Twitter, href: 'https://x.com/iiviieee' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/divyansh-verma-aa001b308/' },
  { label: 'Email', icon: Mail, href: 'mailto:divyanshverma158@gmail.com' },
];

const sidebarLogo = `
██╗ ██╗ ██╗   ██╗ ██╗ ██╗ ███████╗
██║ ██║ ██║   ██║ ██║ ██║ ██╔════╝
██║ ██║ ██║   ██║ ██║ ██║ █████╗
██║ ██║ ╚██╗ ██╔╝ ██║ ██║ ██╔══╝
██║ ██║  ╚████╔╝  ██║ ██║ ███████╗
╚═╝ ╚═╝   ╚═══╝   ╚═╝ ╚═╝ ╚══════╝
`;

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = '' }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const prefetchPosts = usePrefetchPosts();
  const prefetchProjects = usePrefetchProjects();

  const sections = [
    { id: 'home', label: 'Home', icon: '⌂', path: '/', shortcut: 'esc', onHover: () => { } },
    { id: 'projects', label: 'Projects', icon: '▶', path: '/projects', shortcut: 'P', onHover: prefetchProjects },
    { id: 'blog', label: 'Blog', icon: '■', path: '/blog', shortcut: 'B', onHover: prefetchPosts },
    { id: 'contact', label: 'Contact', icon: '◐', path: '/contact', shortcut: 'C', onHover: () => { } },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className={`h-full w-48 flex flex-col py-1 mr-4 ${className}`}>
      {/* Logo - IIVIIE ASCII Art */}
      <div className="px-2 mb-4 py-1 mt-3">
        <div className="text-center">
          <AsciiArtAnimator
            art={sidebarLogo}
            className="text-[0.26rem] sm:text-[0.32rem] lg:text-[0.36rem] crt-glow-strong whitespace-pre scale-32 sm:scale-39 lg:scale-49 origin-center"
            style={{ color: '#9068F7' }}
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1" aria-label="Main navigation">
        <p className="px-4 mb-2 text-[10px] font-mono text-zinc-600 select-none">// navigation</p>
        {sections.map((section) => {
          const active = isActive(section.path);
          return (
            <button
              key={section.id}
              onClick={() => router.push(section.path)}
              onMouseEnter={section.onHover}
              onFocus={section.onHover}
              aria-label={`Navigate to ${section.label}`}
              aria-current={active ? 'page' : undefined}
              className={`group/nav glitch-hover w-full px-4 py-1.5 sm:py-2 md:py-2.5 flex items-center gap-2.5 transition-all font-mono text-xs sm:text-sm ${active
                ? 'bg-zinc-900 text-purple-400 border-l-2 border-purple-400'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
            >
              {/* Active caret — keeps a fixed slot so rows stay aligned */}
              <span
                className={`w-2 text-purple-400 transition-opacity ${active ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
                aria-hidden="true"
              >
                ▸
              </span>
              <span className="text-xs" aria-hidden="true">{section.icon}</span>
              <span>{section.label}</span>
              <kbd
                className={`ml-auto text-[10px] leading-none px-1 py-0.5 rounded border transition-colors ${active
                  ? 'text-purple-300 border-purple-500/40'
                  : 'text-zinc-600 border-zinc-700/60 group-hover/nav:text-zinc-400'
                  }`}
              >
                {section.shortcut}
              </kbd>
            </button>
          );
        })}
      </nav>

      {/* Footer - socials, prompt */}
      <div className="mt-auto px-4 pt-4 pb-1 space-y-3">
        {/* Social links */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-zinc-500 hover:text-purple-400 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        {/* Terminal prompt — typewrites looping commands */}
        <div className="pt-3 border-t border-zinc-800/60">
          <TypewriterPrompt />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
