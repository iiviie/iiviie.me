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
      <pre className="text-[0.3rem] xs:text-[0.35rem] sm:text-[0.45rem] crt-glow whitespace-pre scale-40 xs:scale-50 sm:scale-75 transform-gpu origin-center" style={{ color: '#9068F7' }}>
{`
██████╗ ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗
██╔══██╗██║██║   ██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██║  ██║
██║  ██║██║██║   ██║ ╚████╔╝ ███████║██╔██╗ ██║███████╗███████║
██║  ██║██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║██║╚██╗██║╚════██║██╔══██║
██████╔╝██║ ╚████╔╝    ██║   ██║  ██║██║ ╚████║███████║██║  ██║
╚═════╝ ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
`}
      </pre>
      <div className="mt-1 text-[0.45rem] xs:text-[0.5rem] sm:text-xs crt-glow" style={{ color: '#9068F7' }}>
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
  const [showContact, setShowContact] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Initialize state based on current route
  useEffect(() => {
    const path = location.pathname;
    setShowProjects(path.startsWith('/projects'));
    setShowSkills(path === '/skills');
    setShowBlog(path.startsWith('/blog'));
    setShowContact(path === '/contact');
  }, [location]);

  useEffect(() => {
    setCommandHistory(initialCommands);
  }, []);

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
      if (event.key === 'Escape' && isInputFocused && !showProjects && !showSkills && !showBlog && !showContact) {
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
      const isOnHomePage = !showProjects && !showSkills && !showBlog && !showContact;

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
        case 's':
          event.preventDefault();
          handleSectionChange('skills');
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
  }, [isInputFocused, showProjects, showSkills, showBlog, showContact]);

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
        setShowContact(false);
        navigate('/projects');
        break;
      case 'skills':
        setShowProjects(false);
        setShowSkills(true);
        setShowBlog(false);
        setShowContact(false);
        navigate('/skills');
        break;
      case 'blog':
        setShowProjects(false);
        setShowSkills(false);
        setShowBlog(true);
        setShowContact(false);
        navigate('/blog');
        break;
      case 'contact':
        setShowProjects(false);
        setShowSkills(false);
        setShowBlog(false);
        setShowContact(true);
        navigate('/contact');
        break;
      case 'home':
      default:
        setShowProjects(false);
        setShowSkills(false);
        setShowBlog(false);
        setShowContact(false);
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
    'contact': () => {
      setShowContact(true);
      navigate('/contact');
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
      <div className="flex flex-col terminal-main crt-scanlines relative mx-1 sm:mx-2 md:mx-3 mt-1 sm:mt-2 mb-1 sm:mb-2 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg" style={{ height: 'calc(100vh - 1rem)' }}>
        {/* Terminal Header */}
        <div className="bg-zinc-900/50 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 truncate">divyansh@backend-dev: ~</span>
        </div>

        {/* Navigation Bar */}
        <TerminalNav
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />
        
        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 font-mono text-[10px] sm:text-xs bg-zinc-900/95 text-zinc-300 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
          {commandHistory.map((item, index) => (
            <div key={index} className="mb-2 sm:mb-3">
              {item.type === 'command' ? (
                <div className="text-purple-600 break-all">{item.content}</div>
              ) : item.type === 'ascii-art' ? (
                <div className="text-center mb-3 sm:mb-4">{item.content}</div>
              ) : (
                <div className="ml-1.5 sm:ml-2 text-zinc-300 whitespace-pre-line break-words">{item.content}</div>
              )}
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>
        
        {/* Command Input */}
        <div className={`px-2 sm:px-3 py-1.5 sm:py-2 border-t border-zinc-800 flex-shrink-0 backdrop-blur-sm transition-all duration-200 ${
          isInputFocused 
            ? 'bg-zinc-800/90 border-purple-500/30 shadow-lg shadow-purple-500/10' 
            : 'bg-zinc-900/90'
        }`}>
          <div 
            className="flex items-center gap-1.5 overflow-hidden cursor-text"
            onClick={() => {
              if (!isProcessing && !showProjects && !showSkills && !showBlog && !showContact) {
                inputRef.current?.focus();
                setIsInputFocused(true);
              }
            }}
          >
            <span className="text-zinc-300 font-mono text-[10px] sm:text-xs whitespace-nowrap">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleCommand}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="flex-1 min-w-0 font-mono text-[10px] sm:text-xs bg-transparent border-none outline-none text-zinc-300"
              placeholder={isProcessing ? "Processing..." : ""}
              disabled={isProcessing || showProjects || showSkills || showBlog || showContact}
              style={{ caretColor: 'hsl(var(--terminal-purple))' }}
            />
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="px-2 sm:px-3 py-1 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-[8px] sm:text-[10px] font-mono flex-shrink-0 rounded-b-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-green-400">●</span>
            <span className="text-zinc-300 hidden sm:inline">divyansh@backend-dev</span>
            <span className="text-zinc-300 sm:hidden">dev</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-zinc-500">
            <span className="hidden sm:inline">ARCH</span>
            <span className="sm:hidden">AR</span>
            <span>|</span>
            <span className="text-blue-400">Ready</span>
            <span>|</span>
            <span className={`font-semibold ${
              isInputFocused ? 'text-yellow-400' : 'text-zinc-400'
            }`}>
              {isInputFocused ? 'INSERT' : 'NORMAL'}
            </span>
            <span>|</span>
            <span className="text-zinc-300">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Blur Backdrop */}
      {(showProjects || showSkills || showBlog || showContact) && (
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
      {showContact && (
        <ContactSection onClose={handleSectionChange} />
      )}
    </div>
  );
};

export default TerminalInterface;
