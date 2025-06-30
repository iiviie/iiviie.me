
import { useState, useEffect } from 'react';

const TerminalBoot = ({ onBootComplete }: { onBootComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  const bootSequence = [
    "Initializing backend portfolio system...",
    "Loading Django & FastAPI modules...",
    "Mounting project repositories...",
    "Starting API documentation services...",
    "Enabling developer contact protocols...",
    "Backend systems ready.",
    "",
    "Welcome to Divyansh Verma's terminal.",
    "",
    "Backend Developer | Django & FastAPI Specialist",
  ];

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, currentLine < 6 ? 400 : 800);
      
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(() => {
        setIsBooting(false);
        onBootComplete();
      }, 2000);
      
      return () => clearTimeout(finalTimeout);
    }
  }, [currentLine, onBootComplete]);

  if (!isBooting) return null;

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="terminal-main w-full max-w-2xl p-8 crt-scanlines relative">
        <div className="terminal-header px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-muted-foreground">divyansh.terminal</span>
        </div>
        
        <div className="p-6 font-mono text-sm">
          {bootSequence.slice(0, currentLine).map((line, index) => (
            <div key={index} className="mb-2">
              {line === "" ? (
                <br />
              ) : index === currentLine - 1 && index === bootSequence.length - 1 ? (
                <span className="text-terminal-lavender crt-glow typewriter">
                  {line}
                </span>
              ) : (
                <span className={
                  line.includes("Backend systems ready") 
                    ? "text-terminal-orange crt-glow" 
                    : line.includes("Welcome") || line.includes("Backend Developer")
                    ? "text-terminal-lavender crt-glow"
                    : "text-foreground"
                }>
                  {line.startsWith("[") ? line : `> ${line}`}
                </span>
              )}
            </div>
          ))}
          
          {currentLine < bootSequence.length && (
            <div className="inline-block w-2 h-4 bg-terminal-orange animate-pulse ml-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalBoot;
