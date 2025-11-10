'use client';

import { useState, useEffect } from 'react';
import TerminalBoot from '@/components/TerminalBoot';
import TerminalInterface from '@/components/TerminalInterface';

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    // Check if we've already booted in this session
    const booted = sessionStorage.getItem('terminalBooted') === 'true';
    if (booted) {
      setIsBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    setIsBooted(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('terminalBooted', 'true');
    }
  };

  return (
    <div className="h-screen bg-zinc-900 relative overflow-hidden">
      {/* Boot Sequence */}
      {!isBooted && (
        <TerminalBoot onBootComplete={handleBootComplete} />
      )}

      {/* Terminal Interface */}
      {isBooted && (
        <div className="h-full pt-4">
          <TerminalInterface />
        </div>
      )}
    </div>
  );
}
