import { useState } from 'react';

interface TerminalNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const TerminalNav = ({ currentSection, onSectionChange }: TerminalNavProps) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-2 py-1 flex items-center gap-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`px-2 py-0.5 text-sm rounded transition-all ${
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
