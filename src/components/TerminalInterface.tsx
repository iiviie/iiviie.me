'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BlogView from './BlogView';
import ContactView from './ContactView';

import DashboardView from './DashboardView';
import ProjectsView from './ProjectsView';
import { usePrefetchPosts, usePrefetchProjects } from '@/hooks/useMdxQueries';

interface CommandOutput {
  type: 'command' | 'output' | 'ascii-art';
  content: string | JSX.Element;
}

import AsciiArtAnimator from './AsciiArtAnimator';

const asciiArt = `
██████╗ ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗
██╔══██╗██║██║   ██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██║  ██║
██║  ██║██║██║   ██║ ╚████╔╝ ███████║██╔██╗ ██║███████╗███████║
██║  ██║██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║██║╚██╗██║╚════██║██╔══██║
██████╔╝██║ ╚████╔╝    ██║   ██║  ██║██║ ╚████║███████║██║  ██║
╚═════╝ ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚══╝╚╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
`;

const initialCommands: CommandOutput[] = [
  {
    type: 'ascii-art', content: (
      <div className="overflow-x-auto mb-6">
        <AsciiArtAnimator
          art={asciiArt}
          className="text-[0.2rem] xs:text-[0.225rem] sm:text-[0.3rem] md:text-[0.45rem] lg:text-[0.54rem] crt-glow whitespace-pre"
          style={{ color: '#9068F7' }}
        />
        <div className="mt-1 text-[0.5rem] xs:text-[0.55rem] sm:text-xs md:text-sm crt-glow typewriter" style={{ color: '#9068F7' }}>
          Backend Developer & API Architect
        </div>
      </div>
    )
  },
  { type: 'command', content: '$ whoami' },
  { type: 'output', content: 'Divyansh Verma - Backend Developer specializing in Python ecosystem' },
  { type: 'command', content: '$ echo $ABOUT' },
  { type: 'output', content: 'Building robust, scalable backend systems with Django and FastAPI.\nPassionate about clean code, efficient APIs, and server-side architecture.' },
  { type: 'command', content: '$ cat ~/work_experience.txt' },
  { type: 'output', content: '🚀 Senior Backend Developer @ TechCorp\n   - Led development of high-scale microservices\n   - Optimized database performance\n   - Mentored junior developers\n\n💼 API Architect @ StartupX\n   - Designed RESTful API architecture\n   - Implemented authentication systems\n   - Reduced response times by 60%' },
  { type: 'command', content: '$ ls ~/projects/' },
  { type: 'output', content: '📁 API Gateway - High-performance API routing and management\n📁 Database Optimizer - Advanced query optimization tool\n📁 Auth Service - OAuth2 implementation with JWT\n\nType "projects" to view detailed project information' },
];

const TerminalInterface = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState('--:--');
  const [hasInitialized, setHasInitialized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Prefetch hooks for performance
  const prefetchPosts = usePrefetchPosts();
  const prefetchProjects = usePrefetchProjects();

  // Initialize state based on current route - batched for atomic updates
  useEffect(() => {
    // React 18 automatically batches these, but let's ensure they update together
    const isProjects = pathname.startsWith('/projects');
    const isBlog = pathname.startsWith('/blog');
    const isContact = pathname === '/contact';

    // Update currentSection based on pathname
    if (isProjects) {
      setCurrentSection('projects');
    } else if (isBlog) {
      setCurrentSection('blog');
    } else if (isContact) {
      setCurrentSection('contact');
    } else {
      setCurrentSection('home');
    }
  }, [pathname]);

  useEffect(() => {
    setCommandHistory(initialCommands);

    // Ensure terminal starts at top
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = 0;
    }

    setHasInitialized(true);

    // Initialize time on client
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    // Prefetch data on mount for instant navigation
    prefetchPosts();
    prefetchProjects();

    // Warm up routes in dev mode by triggering Next.js compilation
    if (process.env.NODE_ENV === 'development') {
      // Use requestIdleCallback or setTimeout to not block initial render
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Warm routes by prefetching them
          router.prefetch('/projects');
          router.prefetch('/blog');
          router.prefetch('/contact');
        });
      } else {
        setTimeout(() => {
          router.prefetch('/projects');
          router.prefetch('/blog');
          router.prefetch('/contact');
        }, 1000);
      }
    }

    return () => clearInterval(timer);
  }, [prefetchPosts, prefetchProjects, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        inputRef.current.blur();
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle ESC key when input is focused (exit INSERT mode)
      if (event.key === 'Escape' && isInputFocused) {
        event.preventDefault();
        inputRef.current?.blur();
        setIsInputFocused(false);
        return;
      }

      // Don't trigger other shortcuts if input is focused or if user is typing in any input/textarea
      if (isInputFocused ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Only allow I key and ESC when on home page (no sections open)
      const isOnHomePage = pathname === '/';

      switch (event.key.toLowerCase()) {
        case 'i':
          if (isOnHomePage) {
            event.preventDefault();
            inputRef.current?.focus();
            setIsInputFocused(true);
          }
          break;
        case 'p':
          event.preventDefault();
          handleSectionChange('projects');
          break;
        case 'b':
          event.preventDefault();
          handleSectionChange('blog');
          break;
        case 'c':
          event.preventDefault();
          handleSectionChange('contact');
          break;
        case 'escape':
          event.preventDefault();
          handleSectionChange('home');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isInputFocused, pathname]);

  useEffect(() => {
    // Skip auto-scroll until initial commands are loaded
    if (!hasInitialized) {
      return;
    }

    // Only auto-scroll if terminal content area is scrolled near the bottom
    const terminalContent = historyEndRef.current?.parentElement;
    if (terminalContent) {
      const { scrollTop, scrollHeight, clientHeight } = terminalContent;
      const isNearBottom = scrollHeight - scrollTop <= clientHeight + 100;

      // Only auto-scroll if user is already near the bottom
      if (isNearBottom) {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [commandHistory, hasInitialized]);

  const handleSectionChange = (section: string) => {
    // Only update the route - let the useEffect handle state updates
    switch (section) {
      case 'projects':
        router.push('/projects');
        break;
      case 'blog':
        router.push('/blog');
        break;
      case 'contact':
        router.push('/contact');
        break;
      case 'home':
      default:
        router.push('/');
        break;
    }
  };

  const commands: Record<string, () => void> = {
    'projects': () => {
      router.push('/projects');
    },
    'blog': () => {
      router.push('/blog');
    },
    'contact': () => {
      router.push('/contact');
    },
    'clear': () => setCommandHistory([]),
    'help': () => {
      setCommandHistory(prev => [...prev,
      {
        type: 'output', content: `Available commands:
  projects          - View detailed projects
  blog              - Read my blog posts
  contact           - Get in touch
  clear             - Clear terminal
  help              - Show this help` }
      ]);
    }
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && commandInput.trim()) {
      const command = commandInput.trim().toLowerCase();
      setCommandHistory(prev => [...prev, { type: 'command', content: `$ ${commandInput}` }]);
      setCommandInput('');

      const commandFn = commands[command];
      if (commandFn) {
        commandFn();
      } else {
        setCommandHistory(prev => [...prev, { type: 'output', content: `bash: ${command}: command not found` }]);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Terminal Window */}
      <div className="flex flex-col terminal-main crt-scanlines relative h-full rounded-lg shadow-lg" style={{ background: '#111111' }}>
        {/* Terminal Header */}
        <div className="px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm" style={{ background: 'rgba(17, 17, 17, 0.5)' }}>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 rounded-full bg-green-400"></div>
        </div>

        {/* Terminal Content - Conditional Views */}
        <div ref={terminalContentRef} className="flex-1 overflow-y-auto overflow-x-hidden" style={{ background: '#111111' }}>
          {pathname.startsWith('/projects') ? (
            <ProjectsView />
          ) : pathname.startsWith('/blog') ? (
            <BlogView />
          ) : pathname === '/contact' ? (
            <ContactView />
          ) : (
            <DashboardView />
          )}
        </div>

        {/* Status Bar */}
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-t border-zinc-800 flex items-center justify-between text-[9px] xs:text-[10px] sm:text-xs font-mono flex-shrink-0 rounded-b-lg backdrop-blur-sm" style={{ background: 'rgba(17, 17, 17, 0.8)' }}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-green-400">●</span>
            <span className="text-zinc-300">bash</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-zinc-500">
            <span className="hidden sm:inline">ARCH</span>
            <span className="sm:hidden">AR</span>
            <span>|</span>
            <span className="text-blue-400">Ready</span>
            <span>|</span>
            <span className={`font-semibold ${isInputFocused ? 'text-yellow-400' : 'text-zinc-400'
              }`}>
              {isInputFocused ? 'INSERT' : 'NORMAL'}
            </span>
            <span>|</span>
            <span className="text-zinc-300">{currentTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;
