import { useState, useEffect } from 'react';
import TerminalBoot from '../components/TerminalBoot';
import TerminalInterface from '../components/TerminalInterface';

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="h-full bg-zinc-900 relative overflow-hidden">
      {/* Boot Sequence */}
      {!isBooted && (
        <TerminalBoot onBootComplete={() => setIsBooted(true)} />
      )}
      
      {/* Main Terminal Interface */}
      {isBooted && (
        <TerminalInterface />
      )}
    </div>
  );
};

export default Index;
