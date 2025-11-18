'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProjectsQuery, useProjectQuery } from '@/hooks/useMdxQueries';
import { MDXRemote } from 'next-mdx-remote';

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-xl font-bold mb-4 font-mono" style={{ color: '#FFFFFF' }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-lg font-bold mb-3 font-mono" style={{ color: '#FFFFFF' }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-base font-bold mb-2 font-mono" style={{ color: '#FFFFFF' }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 font-mono text-sm leading-relaxed" style={{ color: '#D1D5DB' }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-zinc-800/50 px-1 py-0.5 rounded font-mono text-sm"
      style={{ color: '#D1D5DB' }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-zinc-900 p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm border border-zinc-800"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-purple-400 hover:text-purple-300 underline font-mono" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 font-mono text-sm space-y-1" style={{ color: '#D1D5DB' }} {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 font-mono text-sm space-y-1" style={{ color: '#D1D5DB' }} {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed font-mono" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-purple-400 pl-4 italic mb-4 font-mono text-sm"
      style={{ color: '#727780' }}
      {...props}
    />
  ),
};

const ProjectsView = () => {
  const params = useParams();
  const slug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : null;

  const { data: projects = [], isLoading: projectsLoading } = useProjectsQuery();
  const { data: currentProject, isLoading: projectLoading } = useProjectQuery(slug);

  // Show project detail if slug exists
  if (slug && currentProject) {
    return (
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Back Button */}
          <Link href="/projects" className="inline-block mb-4 text-sm hover:underline" style={{ color: '#727780' }}>
            ← back to projects
          </Link>

          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
              {currentProject.frontmatter.title}
            </h1>

            <p className="text-sm mb-3" style={{ color: '#727780' }}>
              {currentProject.frontmatter.role}
            </p>

            <p className="text-base mb-4 leading-relaxed" style={{ color: '#D1D5DB' }}>
              {currentProject.frontmatter.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentProject.frontmatter.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-sm bg-zinc-800/50 border border-zinc-700/50 rounded"
                  style={{ color: '#727780' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* MDX Content */}
          <div className="prose prose-invert max-w-none">
            <MDXRemote {...currentProject.content} components={mdxComponents} />
          </div>
        </div>
      </div>
    );
  }

  // Show projects list
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <pre className="text-[0.3rem] xs:text-[0.35rem] sm:text-[0.45rem] crt-glow whitespace-pre mb-4" style={{ color: '#9068F7' }}>
{`                                   ███                     █████
                                 ░░░                     ░░███
████████  ████████   ██████      █████  ██████   ██████  ███████    █████
░░███░░███░░███░░███ ███░░███    ░░███  ███░░███ ███░░███░░░███░    ███░░
░███ ░███ ░███ ░░░ ░███ ░███     ░███ ░███████ ░███ ░░░   ░███    ░░█████
░███ ░███ ░███     ░███ ░███     ░███ ░███░░░  ░███  ███  ░███ ███ ░░░░███
░███████  █████    ░░██████      ░███ ░░██████ ░░██████   ░░█████  ██████
░███░░░  ░░░░░      ░░░░░░       ░███  ░░░░░░   ░░░░░░     ░░░░░  ░░░░░░
░███                         ███ ░███
█████                       ░░██████
░░░░░                         ░░░░░░`}
          </pre>
          <p className="text-base" style={{ color: '#727780' }}>
            things i've built
          </p>
        </div>

        {/* Projects List */}
        {projectsLoading ? (
          <div style={{ color: '#727780' }}>Loading...</div>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block group"
              >
                <div>
                  {/* Project Name */}
                  <h2 className="text-base font-bold mb-1.5 group-hover:text-gray-200 transition-colors" style={{ color: '#FFFFFF' }}>
                    {project.title}
                  </h2>

                  {/* Role */}
                  <p className="text-sm mb-2" style={{ color: '#727780' }}>
                    {project.role}
                  </p>

                  {/* Description */}
                  <p className="text-base leading-relaxed mb-3" style={{ color: '#D1D5DB' }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm bg-zinc-800/50 border border-zinc-700/50 rounded"
                        style={{ color: '#727780' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsView;
