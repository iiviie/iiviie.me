import { useState } from 'react';

interface TerminalNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const TerminalNav = ({ currentSection, onSectionChange }: TerminalNavProps) => {
  const sections = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-1 sm:px-2 py-0.5 sm:py-1 flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`px-1.5 sm:px-2 py-0.5 text-xs sm:text-sm rounded transition-all whitespace-nowrap ${
            currentSection === section.id
              ? 'bg-purple-400/20 text-purple-400'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};

export default TerminalNav;
