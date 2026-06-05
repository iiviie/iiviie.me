'use client';

import { useEffect, useState } from 'react';

// Fake shell commands that type/delete on a loop — purely decorative
const COMMANDS = [
  'cd ~/projects',
  'cat about.md',
  'git push origin main',
  './build --watch',
  'ls -la ~/blog',
  'whoami',
];

const TYPE_MS = 80;
const DELETE_MS = 40;
const PAUSE_MS = 1500;

const TypewriterPrompt = () => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = COMMANDS[wordIndex % COMMANDS.length];

    // Finished typing -> pause, then start deleting
    if (!deleting && text === word) {
      const timeout = setTimeout(() => setDeleting(true), PAUSE_MS);
      return () => clearTimeout(timeout);
    }

    // Finished deleting -> advance to next command
    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((index) => (index + 1) % COMMANDS.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setText((current) =>
          deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1)
        );
      },
      deleting ? DELETE_MS : TYPE_MS
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex]);

  return (
    <div className="text-[10px] font-mono text-zinc-600 leading-relaxed overflow-hidden">
      {/* Prompt path on its own line so the narrow sidebar never clips the command */}
      <div className="whitespace-nowrap">
        <span className="text-purple-400/80">visitor@iiviie</span>
        <span>:~</span>
      </div>
      <div className="whitespace-nowrap">
        <span>$ </span>
        <span className="text-zinc-400">{text}</span>
        <span
          className="cursor ml-[1px] inline-block w-[5px] h-[10px] translate-y-[1px]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default TypewriterPrompt;
