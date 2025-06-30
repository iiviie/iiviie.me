
import { useState, useEffect, useRef } from 'react';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

const TerminalInterface = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sections = {
    'home': '~',
    'about': '~/about',
    'projects': '~/projects',
    'skills': '~/skills',
    'contact': '~/contact'
  };

  const commands = {
    'about': 'about',
    'whoami': 'about',
    'projects': 'projects',
    'ls': 'projects',
    'skills': 'skills',
    'contact': 'contact',
    'mail': 'contact',
    'home': 'home',
    'cd ~': 'home',
    'clear': 'clear',
    'help': 'help'
  };

  useEffect(() => {
    // Focus input on mount and keep it focused
    inputRef.current?.focus();
    
    const handleClick = () => {
      inputRef.current?.focus();
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Always focus input when typing
      if (e.key.length === 1 || e.key === 'Backspace') {
        inputRef.current?.focus();
      }
    };
    
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && commandInput.trim()) {
      const command = commandInput.trim().toLowerCase();
      setCommandHistory(prev => [...prev, `$ ${commandInput}`]);
      setIsProcessing(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (command === 'clear') {
        setCommandHistory([]);
      } else if (command === 'help') {
        setCommandHistory(prev => [...prev, 
          'Available commands:',
          '  about, whoami     - View profile information',
          '  projects, ls      - List projects',
          '  skills            - Show technical skills',
          '  contact, mail     - Contact form',
          '  home, cd ~        - Return to home',
          '  clear             - Clear terminal',
          '  help              - Show this help'
        ]);
      } else if (commands[command]) {
        if (commands[command] !== currentSection) {
          setCurrentSection(commands[command]);
          setCommandHistory(prev => [...prev, `Loading ${sections[commands[command] as keyof typeof sections]}...`]);
        }
      } else {
        setCommandHistory(prev => [...prev, `bash: ${command}: command not found`]);
      }
      
      setCommandInput('');
      setIsProcessing(false);
    }
  };

  const renderSection = () => {
    const sectionProps = { onCommand: (cmd: string) => setCommandInput(cmd) };
    
    switch (currentSection) {
      case 'about':
        return <AboutSection {...sectionProps} />;
      case 'projects':
        return <ProjectsSection {...sectionProps} />;
      case 'skills':
        return <SkillsSection {...sectionProps} />;
      case 'contact':
        return <ContactSection {...sectionProps} />;
      default:
        return <HomeSection {...sectionProps} />;
    }
  };

  return (
    <div className="h-screen flex flex-col terminal-main crt-scanlines relative m-2">
      {/* Terminal Header */}
      <div className="terminal-header px-4 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <span className="ml-4 text-sm text-muted-foreground">divyansh@backend-dev: {sections[currentSection as keyof typeof sections]}</span>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Command History */}
        {commandHistory.length > 0 && (
          <div className="px-6 py-2 text-sm font-mono space-y-1 flex-shrink-0">
            {commandHistory.map((line, index) => (
              <div key={index} className={line.startsWith('$') ? 'command-prompt' : 'text-muted-foreground'}>
                {line}
              </div>
            ))}
          </div>
        )}
        
        {/* Current Section */}
        <div className="flex-1 overflow-auto scroll-in">
          {renderSection()}
        </div>
        
        {/* Command Input - Fixed positioning */}
        <div className="px-6 py-3 border-t border-border flex-shrink-0">
          <div className="flex items-center gap-2 command-line">
            <span className="command-prompt font-mono text-sm">
              divyansh@backend-dev:{sections[currentSection as keyof typeof sections]}$
            </span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleCommand}
                className="command-input w-full font-mono text-sm bg-transparent border-none outline-none"
                placeholder={isProcessing ? "Processing..." : ""}
                disabled={isProcessing}
                style={{ caretColor: 'hsl(var(--terminal-purple))' }}
              />
              {!isProcessing && (
                <span 
                  className="cursor w-2 h-4 absolute top-0"
                  style={{ 
                    left: `${commandInput.length * 0.6}em`,
                    backgroundColor: 'hsl(var(--terminal-purple))'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="px-4 py-2 border-t border-border flex items-center justify-between text-xs font-mono flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="status-success">●</span>
          <span className="text-foreground">divyansh@backend-dev</span>
          <span className="status-muted">|</span>
          <span className="text-foreground">Section: {currentSection}</span>
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>Django+FastAPI</span>
          <span>|</span>
          <span className="status-active">Ready</span>
          <span>|</span>
          <span className="status-info">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;
