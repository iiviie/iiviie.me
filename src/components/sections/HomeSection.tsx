
import { useState, useEffect } from 'react';

interface HomeSectionProps {
  onCommand?: (command: string) => void;
}

const HomeSection = ({ onCommand }: HomeSectionProps) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 font-mono text-sm space-y-6">
      {/* ASCII Art Header */}
      <div className="text-center mb-8">
        <pre className="text-xs" style={{ color: 'hsl(var(--terminal-purple))' }}>
{`
 ██████╗ ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗
 ██╔══██╗██║██║   ██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██║  ██║
 ██║  ██║██║██║   ██║ ╚████╔╝ ███████║██╔██╗ ██║███████╗███████║
 ██║  ██║██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║██║╚██╗██║╚════██║██╔══██║
 ██████╔╝██║ ╚████╔╝    ██║   ██║  ██║██║ ╚████║███████║██║  ██║
 ╚═════╝ ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
`}
        </pre>
        <div className="mt-2 text-terminal-purple crt-glow">
          Backend Developer & API Architect
        </div>
      </div>
      
      {/* Terminal Output */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="command-prompt">
            $ whoami
          </div>
          <div className="ml-4 text-foreground">
            Divyansh Verma - Backend Developer specializing in Python ecosystem
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="command-prompt">
            $ echo $EXPERTISE
          </div>
          <div className="ml-4 text-foreground">
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
          <div className="ml-4 text-foreground space-y-1">
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
        <div className="mt-2 text-xs text-muted-foreground">
          Type 'help' for available commands
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
