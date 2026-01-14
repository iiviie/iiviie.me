import { ReactNode } from 'react';

interface HoverRowProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function HoverRow({ children, onClick, className = '' }: HoverRowProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      className={`
        -mx-4 px-4 
        hover:bg-cyan-500/20 
        focus:bg-cyan-500/20
        focus:outline-none
        transition-colors duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}
