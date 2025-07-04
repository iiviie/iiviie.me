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
    <pre className="text-xs crt-glow" style={{ color: '#9068F7' }}>
{`
 ██████╗ ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗
 ██╔══██╗██║██║   ██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██║  ██║
 ██║  ██║██║██║   ██║ ╚████╔╝ ███████║██╔██╗ ██║███████╗███████║
 ██║  ██║██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║██║╚██╗██║╚════██║██╔══██║
 ██████╔╝██║ ╚████╔╝    ██║   ██║  ██║██║ ╚████║███████║██║  ██║
 ╚═════╝ ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝

Backend Developer & API Architect
`}
    </pre>
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
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="flex-1 flex flex-col terminal-main crt-scanlines relative mx-4 mt-4 mb-2 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg">
        {/* Terminal Header */}
        <div className="bg-zinc-900/50 px-4 py-2 flex items-center gap-2 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-zinc-500">divyansh@backend-dev: ~</span>
        </div>

        {/* Navigation Bar */}
        <TerminalNav
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />
        
        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-sm bg-zinc-900/95 text-zinc-300">
          {commandHistory.map((item, index) => (
            <div key={index} className="mb-4">
              {item.type === 'command' ? (
                <div className="text-zinc-300">{item.content}</div>
              ) : item.type === 'ascii-art' ? (
                <div className="text-center mb-6">{item.content}</div>
              ) : (
                <div className="ml-4 text-zinc-300 whitespace-pre-line">{item.content}</div>
              )}
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>
        
        {/* Command Input */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/90 flex-shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-mono text-sm">
              divyansh@backend-dev:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 font-mono text-sm bg-transparent border-none outline-none text-zinc-300"
              placeholder={isProcessing ? "Processing..." : ""}
              disabled={isProcessing || showProjects || showSkills || showBlog}
              style={{ caretColor: 'hsl(var(--terminal-purple))' }}
            />
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-xs font-mono flex-shrink-0 rounded-b-lg backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="text-green-400">●</span>
            <span className="text-zinc-300">divyansh@backend-dev</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Django+FastAPI</span>
            <span>|</span>
            <span className="text-blue-400">Ready</span>
            <span>|</span>
            <span className="text-zinc-300">{new Date().toLocaleTimeString()}</span>
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
