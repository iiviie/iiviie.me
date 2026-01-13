import { useState, useEffect } from 'react';

interface HomeSectionProps {
  onCommand?: (command: string) => void;
}

const HomeSection = ({ onCommand: _onCommand }: HomeSectionProps) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-5 lg:p-6 font-mono text-sm space-y-6">
      {/* ASCII Art Header */}
      <div className="text-center mb-8">
        <pre className="text-xs crt-glow" style={{ color: '#9068F7' }}>
{`
██╗██╗██╗   ██╗██╗██╗███████╗
██║██║██║   ██║██║██║██╔════╝
██║██║██║   ██║██║██║█████╗
██║██║╚██╗ ██╔╝██║██║██╔══╝
██║██║ ╚████╔╝ ██║██║███████╗
╚═╝╚═╝  ╚═══╝  ╚═╝╚═╝╚══════╝
`}
        </pre>

        {/* Location and Position */}
        <div className="mt-4 space-y-1 text-xs sm:text-sm" style={{ color: '#727780' }}>
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>delhi, India</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <span>software engineer @ SDC-SI</span>
          </div>
        </div>

        <div className="mt-4 crt-glow" style={{ color: '#9068F7' }}>
          Backend Developer & API Architect
        </div>
      </div>
      
      {/* Terminal Output */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="command-prompt">
            $ whoami
          </div>
          <div className="ml-4" style={{ color: '#D1D5DB' }}>
            Divyansh Verma - Backend Developer specializing in Python ecosystem
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="command-prompt">
            $ echo $EXPERTISE
          </div>
          <div className="ml-4" style={{ color: '#D1D5DB' }}>
            "Building robust, scalable backend systems with Django and FastAPI.<br/>
            Passionate about clean code, efficient APIs, and server-side architecture."
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="command-prompt">
            $ ls -la ~/tech_stack/
          </div>
          <div className="ml-4 space-y-1 text-xs">
            <div className="status-muted">total 4</div>
            <div className="status-info">drwxr-xr-x  frameworks/    django, fastapi, flask</div>
            <div className="status-info">drwxr-xr-x  databases/     postgresql, mongodb, redis</div>
            <div className="status-info">drwxr-xr-x  languages/     python, sql, javascript</div>
            <div className="status-info">drwxr-xr-x  tools/         docker, git, linux, aws</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="command-prompt">
            $ cat ~/specializations.txt
          </div>
          <div className="ml-4 space-y-1">
            <div style={{ color: 'hsl(var(--terminal-purple))' }}>🐍 Django REST Framework - Complex web applications</div>
            <div style={{ color: 'hsl(var(--terminal-blue))' }}>⚡ FastAPI - High-performance async APIs</div>
            <div style={{ color: 'hsl(var(--terminal-green))' }}>🗄️ Database Design - Optimization & scaling</div>
            <div style={{ color: 'hsl(var(--terminal-purple-light))' }}>🔧 DevOps - Containerization & deployment</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-border">
        <div className="flex items-center">
          <span className="command-prompt">$ ready_to_build_amazing_backends</span>
          {showCursor && <span className="cursor ml-1 w-2 h-4 inline-block"></span>}
        </div>
        <div className="mt-2 text-xs" style={{ color: '#727780' }}>
          Type 'help' for available commands
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
