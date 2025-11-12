'use client';

import { useRouter, usePathname } from 'next/navigation';
import { usePrefetchPosts, usePrefetchProjects } from '@/hooks/useMdxQueries';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const prefetchPosts = usePrefetchPosts();
  const prefetchProjects = usePrefetchProjects();

  const sections = [
    { id: 'home', label: 'Home', icon: '⌂', path: '/', onHover: () => {} },
    { id: 'projects', label: 'Projects', icon: '▶', path: '/projects', onHover: prefetchProjects },
    { id: 'skills', label: 'Skills', icon: '◆', path: '/skills', onHover: () => {} },
    { id: 'blog', label: 'Blog', icon: '■', path: '/blog', onHover: prefetchPosts },
    { id: 'contact', label: 'Contact', icon: '◐', path: '/contact', onHover: () => {} },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="h-full w-32 flex flex-col py-4 mr-4">
      {/* Logo */}
      <div className="px-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-zinc-700 rounded border border-zinc-600 flex items-center justify-center">
            <span className="text-xs font-mono text-purple-400">&gt;_</span>
          </div>
          <span className="font-mono text-sm font-bold text-zinc-300">DEV</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => router.push(section.path)}
            onMouseEnter={section.onHover}
            onFocus={section.onHover}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all font-mono text-xs ${
              isActive(section.path)
                ? 'bg-zinc-900 text-purple-400 border-l-2 border-purple-400'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <span className="text-sm">{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer section */}
      <div className="px-4 mt-auto space-y-2">
        <div className="h-px bg-zinc-700 mb-4" />
        <button className="w-full px-2 py-2 flex items-center gap-3 text-zinc-500 hover:text-zinc-300 transition-all font-mono text-xs hover:bg-zinc-900/50 rounded">
          <span>◐</span>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
