import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TerminalInterface from '@/components/TerminalInterface';
import TerminalBoot from '@/components/TerminalBoot';

export default function Index() {
  const [isBooted, setIsBooted] = useState(() => {
    // Check if we've already booted in this session
    return sessionStorage.getItem('terminalBooted') === 'true';
  });

  const handleBootComplete = () => {
    setIsBooted(true);
    sessionStorage.setItem('terminalBooted', 'true');
  };

  return (
    <div className="h-full bg-zinc-900 relative overflow-hidden pt-5">
      {/* Boot Sequence */}
      {!isBooted && (
        <TerminalBoot onBootComplete={handleBootComplete} />
      )}

      {/* Terminal Interface */}
      {isBooted && (
        <Routes>
          <Route path="/blog/:slug" element={<TerminalInterface />} />
          <Route path="*" element={<TerminalInterface />} />
        </Routes>
      )}
    </div>
  );
}
