
import { useState, useEffect } from 'react';
import TerminalBoot from '../components/TerminalBoot';
import TerminalInterface from '../components/TerminalInterface';

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
