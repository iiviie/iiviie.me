import React from 'react';
import { format } from 'date-fns';

interface MdxLayoutProps {
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
  };
  children: React.ReactNode;
}

const MdxLayout: React.FC<MdxLayoutProps> = ({ frontmatter, children }) => {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300">
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-zinc-100">{frontmatter.title}</h1>
          <div className="text-zinc-500 mb-4">
            {format(new Date(frontmatter.date), 'MMMM dd, yyyy')}
          </div>
          {frontmatter.description && (
            <p className="text-xl text-zinc-400">{frontmatter.description}</p>
          )}
          {frontmatter.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="prose prose-invert max-w-none prose-zinc">
          {children}
        </div>
      </article>
    </div>
  );
};

export default MdxLayout; 