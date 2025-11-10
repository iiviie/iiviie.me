'use client';

import { useState, useEffect } from 'react';
import TerminalBoot from '@/components/TerminalBoot';
import TerminalInterface from '@/components/TerminalInterface';

export default function ProjectsPage() {
  const [isBooted, setIsBooted] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('terminalBooted') === 'true';
    }
    return false;
  });

  const handleBootComplete = () => {
    setIsBooted(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('terminalBooted', 'true');
    }
  };

  return (
    <div className="h-screen bg-zinc-900 relative overflow-hidden">
      {!isBooted && (
        <TerminalBoot onBootComplete={handleBootComplete} />
      )}

      {isBooted && (
        <div className="h-full pt-4">
          <TerminalInterface />
        </div>
      )}
    </div>
  );
}
