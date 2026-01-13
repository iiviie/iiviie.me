import { TERMINAL_COLORS } from '@/constants/terminal';

interface TerminalStatusBarProps {
  currentTime: string;
}

export function TerminalStatusBar({ currentTime }: TerminalStatusBarProps) {
  return (
    <div
      className="px-3 sm:px-4 py-1.5 sm:py-2 border-t border-zinc-800 flex items-center justify-between text-[9px] xs:text-[10px] sm:text-xs font-mono flex-shrink-0 rounded-b-lg backdrop-blur-sm"
      style={{ background: TERMINAL_COLORS.backgroundSemiTransparent }}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-green-400">●</span>
        <span className="text-zinc-300">bash</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 text-zinc-500">
        <span className="hidden sm:inline">ARCH</span>
        <span className="sm:hidden">AR</span>
        <span>|</span>
        <span className="text-blue-400">Ready</span>
        <span>|</span>
        <span className="font-semibold text-zinc-400">NORMAL</span>
        <span>|</span>
        <span className="text-zinc-300">{currentTime}</span>
      </div>
    </div>
  );
}
