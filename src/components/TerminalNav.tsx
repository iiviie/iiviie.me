
import { useState } from 'react';

interface TerminalNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const TerminalNav = ({ currentSection, onSectionChange }: TerminalNavProps) => {
  const [commandInput, setCommandInput] = useState('');

  const sections = [
    { id: 'home', label: 'home', command: 'cd ~' },
    { id: 'about', label: 'about', command: 'cat README.md' },
    { id: 'projects', label: 'projects', command: 'ls -la projects/' },
    { id: 'skills', label: 'skills', command: './skills --list' },
    { id: 'contact', label: 'contact', command: 'mail -s "Hello"' },
  ];

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const section = sections.find(s => 
        commandInput.includes(s.id) || commandInput === s.command
      );
      if (section) {
        onSectionChange(section.id);
        setCommandInput('');
      }
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="terminal-window mx-4 mt-4 mb-2">
        <div className="terminal-header px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm text-muted-foreground">navigator.term</span>
        </div>
        
        <div className="px-4 py-3 flex items-center gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`retro-button px-3 py-1 text-sm rounded transition-all ${
                currentSection === section.id
                  ? 'text-primary bg-primary/10 crt-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Command Line Interface */}
      <div className="terminal-window mx-4 mb-4">
        <div className="px-4 py-2 flex items-center gap-2 text-sm">
          <span className="text-accent">$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type command or section name..."
            className="bg-transparent border-none outline-none flex-1 text-foreground font-mono"
          />
          <span className="text-muted-foreground text-xs">
            Press Enter to execute
          </span>
        </div>
      </div>
    </>
  );
};

export default TerminalNav;
