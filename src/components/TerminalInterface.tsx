import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import BlogSection from './sections/BlogSection';
import TerminalNav from './TerminalNav';

interface CommandOutput {
  type: 'command' | 'output' | 'ascii-art';
  content: string | JSX.Element;
}

const initialCommands: CommandOutput[] = [
  { type: 'ascii-art', content: (
    <div className="overflow-x-auto">
      <pre className="text-[0.35rem] xs:text-[0.45rem] sm:text-xs md:text-sm crt-glow whitespace-pre scale-50 xs:scale-75 sm:scale-90 md:scale-100 transform-gpu origin-center" style={{ color: '#9068F7' }}>
{`
██████╗ ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗
██╔══██╗██║██║   ██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██║  ██║
██║  ██║██║██║   ██║ ╚████╔╝ ███████║██╔██╗ ██║███████╗███████║
██║  ██║██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║██║╚██╗██║╚════██║██╔══██║
██████╔╝██║ ╚████╔╝    ██║   ██║  ██║██║ ╚████║███████║██║  ██║
╚═════╝ ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
`}
      </pre>
      <div className="mt-1 sm:mt-2 text-[0.5rem] xs:text-[0.6rem] sm:text-sm md:text-base crt-glow" style={{ color: '#9068F7' }}>
        Backend Developer & API Architect
      </div>
    </div>
  )},
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
  const navigate = useNavigate();
  const location = useLocation();
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Initialize state based on current route
  useEffect(() => {
    const path = location.pathname;
    setShowProjects(path === '/projects');
    setShowSkills(path === '/skills');
    setShowBlog(path.startsWith('/blog'));
  }, [location]);

  useEffect(() => {
    setCommandHistory(initialCommands);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
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
  }, [commandHistory]);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    switch (section) {
      case 'projects':
        setShowProjects(true);
        setShowSkills(false);
        setShowBlog(false);
        navigate('/projects');
        break;
      case 'skills':
        setShowProjects(false);
        setShowSkills(true);
        setShowBlog(false);
        navigate('/skills');
        break;
      case 'blog':
        setShowProjects(false);
        setShowSkills(false);
        setShowBlog(true);
        navigate('/blog');
        break;
      default:
        setShowProjects(false);
        setShowSkills(false);
        setShowBlog(false);
        navigate('/');
        break;
    }
  };

  const commands: Record<string, () => void> = {
    'projects': () => {
      setShowProjects(true);
      navigate('/projects');
    },
    'skills': () => {
      setShowSkills(true);
      navigate('/skills');
    },
    'blog': () => {
      setShowBlog(true);
      navigate('/blog');
    },
    'clear': () => setCommandHistory([]),
    'help': () => {
      setCommandHistory(prev => [...prev,
        { type: 'output', content: `Available commands:
  projects          - View detailed projects
  skills            - Show technical skills
  blog              - Read my blog posts
  clear             - Clear terminal
  help              - Show this help` }
      ]);
    }
  };

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && commandInput.trim()) {
      const command = commandInput.trim().toLowerCase();
      setCommandHistory(prev => [...prev, { type: 'command', content: `$ ${commandInput}` }]);
      setIsProcessing(true);
      setCommandInput('');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const commandFn = commands[command];
      if (commandFn) {
        commandFn();
      } else {
        setCommandHistory(prev => [...prev, { type: 'output', content: `bash: ${command}: command not found` }]);
      }
      
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Terminal Window */}
      <div className="flex flex-col terminal-main crt-scanlines relative mx-2 sm:mx-4 lg:mx-8 mt-2 sm:mt-4 mb-2 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg" style={{ height: 'calc(100vh - 2rem)' }}>
        {/* Terminal Header */}
        <div className="bg-zinc-900/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
          <div className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-green-400"></div>
          <span className="ml-2 sm:ml-4 text-xs sm:text-sm md:text-base text-zinc-500 truncate">divyansh@backend-dev: ~</span>
        </div>

        {/* Navigation Bar */}
        <TerminalNav
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />
        
        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base bg-zinc-900/95 text-zinc-300 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
          {commandHistory.map((item, index) => (
            <div key={index} className="mb-3 sm:mb-4">
              {item.type === 'command' ? (
                <div className="text-zinc-300 break-all">{item.content}</div>
              ) : item.type === 'ascii-art' ? (
                <div className="text-center mb-4 sm:mb-6">{item.content}</div>
              ) : (
                <div className="ml-2 sm:ml-4 text-zinc-300 whitespace-pre-line break-words">{item.content}</div>
              )}
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>
        
        {/* Command Input */}
        <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-t border-zinc-800 bg-zinc-900/90 flex-shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-zinc-300 font-mono text-xs sm:text-sm md:text-base whitespace-nowrap">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 min-w-0 font-mono text-xs sm:text-sm md:text-base bg-transparent border-none outline-none text-zinc-300"
              placeholder={isProcessing ? "Processing..." : ""}
              disabled={isProcessing || showProjects || showSkills || showBlog}
              style={{ caretColor: 'hsl(var(--terminal-purple))' }}
            />
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-[10px] sm:text-xs md:text-sm font-mono flex-shrink-0 rounded-b-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-green-400">●</span>
            <span className="text-zinc-300 hidden sm:inline">divyansh@backend-dev</span>
            <span className="text-zinc-300 sm:hidden">dev</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 text-zinc-500 text-[9px] sm:text-xs md:text-sm">
            <span className="hidden md:inline">Django+FastAPI</span>
            <span className="hidden sm:inline md:hidden">Django</span>
            <span className="sm:hidden">DJ</span>
            <span>|</span>
            <span className="text-blue-400">Ready</span>
            <span>|</span>
            <span className="text-zinc-300">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Blur Backdrop */}
      {(showProjects || showSkills || showBlog) && (
        <div className="fixed inset-0 backdrop-blur-sm bg-zinc-900/10 z-40" />
      )}

      {/* Floating Windows */}
      {showProjects && (
        <ProjectsSection onClose={handleSectionChange} />
      )}
      {showSkills && (
        <SkillsSection onClose={handleSectionChange} />
      )}
      {showBlog && (
        <BlogSection onClose={handleSectionChange} />
      )}
    </div>
  );
};

export default TerminalInterface;
