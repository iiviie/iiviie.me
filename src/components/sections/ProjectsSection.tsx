'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import type { ProjectMetadata } from '@/types/mdx';
import { MDXRemote } from 'next-mdx-remote';
import TerminalBackButton from '@/components/ui/terminal-back-button';
import { useProjectsQuery, useProjectQuery } from '@/hooks/useMdxQueries';

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-sm sm:text-lg md:text-xl font-bold text-purple-400 mb-2 sm:mb-4 font-mono" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-xs sm:text-base md:text-lg font-bold text-purple-300 mb-2 sm:mb-3 font-mono" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-[10px] sm:text-sm md:text-base font-bold text-purple-200 mb-1 sm:mb-2 font-mono" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-zinc-300 mb-2 sm:mb-4 font-mono text-[9px] sm:text-xs leading-relaxed" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-purple-900/30 text-purple-200 px-1 py-0.5 rounded font-mono text-[8px] sm:text-[9px]" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-zinc-900 p-2 sm:p-4 rounded-lg mb-2 sm:mb-4 overflow-x-auto font-mono text-[8px] sm:text-[9px] border border-zinc-800" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-purple-400 hover:text-purple-300 underline font-mono" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside mb-2 sm:mb-4 font-mono text-[9px] sm:text-xs space-y-1" {...props} />,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside mb-2 sm:mb-4 font-mono text-[9px] sm:text-xs space-y-1" {...props} />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed font-mono" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-purple-400 pl-2 sm:pl-4 italic mb-2 sm:mb-4 font-mono text-zinc-400 text-[9px] sm:text-xs" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => <table className="border-collapse w-full text-[8px] sm:text-[9px] mb-4" {...props} />,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th className="border border-zinc-600 px-2 py-1 bg-zinc-800/50 text-purple-300" {...props} />,
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td className="border border-zinc-600 px-2 py-1 text-zinc-300" {...props} />,
};

interface ProjectsSectionProps {
  onClose: (section?: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onClose }) => {
  const params = useParams();
  const router = useRouter();

  // Get slug from params
  const slug = params.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : null;

  // Use React Query hooks
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useProjectsQuery();
  const { data: currentProject, isLoading: projectLoading, error: projectError } = useProjectQuery(slug);

  const handleProjectClick = (projectSlug: string) => {
    router.push(`/projects/${projectSlug}`);
  };

  const getStatusColor = (status: ProjectMetadata['status']) => {
    switch (status) {
      case 'production': return 'text-green-400';
      case 'active': return 'text-blue-400';
      case 'stable': return 'text-purple-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-zinc-400';
    }
  };

  // Show content immediately if we have cached data, even if "loading"
  const showContent = projects.length > 0 || currentProject || !projectsLoading;

  return (
    <div className="fixed inset-4 sm:inset-8 md:inset-12 z-50 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="bg-zinc-900/50 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 cursor-pointer" onClick={() => onClose('home')}></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
          {params.slug && (
            <TerminalBackButton
              onClick={() => router.push('/projects')}
              variant="purple"
            />
          )}
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 truncate">~/projects{params.slug ? `/${params.slug}` : ''}</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs bg-zinc-900/95 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
        {projectError && (
          <div className="text-red-400 mb-4">Error: {projectError instanceof Error ? projectError.message : 'Failed to load project'}</div>
        )}
        {projectsError && (
          <div className="text-red-400 mb-4">Error: {projectsError instanceof Error ? projectsError.message : 'Failed to load projects'}</div>
        )}
        {showContent && currentProject ? (
          // Single Project View
          <article className="max-w-4xl mx-auto">
            <header className="mb-6 sm:mb-8">
              <h1 className="text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-4 text-purple-400">
                {currentProject.frontmatter.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {currentProject.frontmatter.tech.map((tech, index) => (
                  <span 
                    key={tech}
                    className={`px-1.5 py-0.5 text-[8px] sm:text-[10px] rounded border ${
                      index % 4 === 0 ? 'bg-terminal-pink/10 text-terminal-pink border-terminal-pink/30' :
                      index % 4 === 1 ? 'bg-terminal-amber/10 text-terminal-amber border-terminal-amber/30' :
                      index % 4 === 2 ? 'bg-terminal-purple/10 text-terminal-purple border-terminal-purple/30' :
                      'bg-terminal-blue/10 text-terminal-blue border-terminal-blue/30'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-[9px] sm:text-[10px] text-zinc-500 mb-2 sm:mb-3">
                <span>Last modified: {format(new Date(currentProject.frontmatter.date), 'MMM dd, yyyy')}</span>
                {currentProject.frontmatter.size && <span>Size: {currentProject.frontmatter.size}</span>}
                <span className="flex items-center gap-1">
                  Status: <span className={getStatusColor(currentProject.frontmatter.status)}>● {currentProject.frontmatter.status}</span>
                </span>
              </div>
              
              <p className="text-zinc-400 text-[9px] sm:text-[10px] leading-relaxed">{currentProject.frontmatter.description}</p>
            </header>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <MDXRemote {...currentProject.content} components={components} />
            </div>
          </article>
        ) : showContent ? (
          // Projects Index View
          <>
            <div className="space-y-2 mb-6">
              <div className="text-zinc-300">$ ls -la ~/projects/</div>
              <div className="text-zinc-500 text-xs ml-4">
                total {projects.length}
              </div>
            </div>

            <div className="mt-4 ml-4">
              <div className="text-zinc-500 grid grid-cols-12 gap-1 sm:gap-2 pb-1 sm:pb-2 border-b border-zinc-800 text-[9px] sm:text-[10px]">
                <span className="col-span-4">Name</span>
                <span className="col-span-2">Size</span>
                <span className="col-span-2">Modified</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-2">Action</span>
              </div>

              <div className="space-y-1 mt-2">
                {projects.map((project) => (
                  <div 
                    key={project.slug}
                    className="grid grid-cols-12 gap-1 sm:gap-2 py-0.5 sm:py-1 hover:bg-zinc-800/30 rounded cursor-pointer transition-colors text-[9px] sm:text-[10px]"
                    onClick={() => handleProjectClick(project.slug)}
                  >
                    <span className="col-span-4 text-terminal-amber">📁 {project.title.toLowerCase().replace(/\s+/g, '-')}/</span>
                    <span className="col-span-2 text-zinc-500">{project.size || 'N/A'}</span>
                    <span className="col-span-2 text-zinc-500">{format(new Date(project.date), 'MMM dd, yy')}</span>
                    <span className={`col-span-2 ${getStatusColor(project.status)}`}>
                      ● {project.status}
                    </span>
                    <span className="col-span-2 text-terminal-purple hover:text-terminal-pink transition-colors">
                      [view]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(ProjectsSection);