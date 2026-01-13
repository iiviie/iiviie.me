'use client';

import { useRef } from 'react';
import { TerminalHeader, TerminalStatusBar, TerminalContent } from './terminal';
import { useClock, useKeyboardShortcuts, usePrefetch } from '@/hooks/terminal';
import { TERMINAL_COLORS } from '@/constants/terminal';

const TerminalInterface = () => {
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const currentTime = useClock();
  usePrefetch();
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex flex-col terminal-main crt-scanlines relative h-full rounded-lg shadow-lg"
        style={{ background: TERMINAL_COLORS.background }}
      >
        <TerminalHeader />
        <TerminalContent ref={terminalContentRef} />
        <TerminalStatusBar currentTime={currentTime} />
      </div>
    </div>
  );
};

export default TerminalInterface;
