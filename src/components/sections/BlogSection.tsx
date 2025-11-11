'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import { Table } from '../../components/mdx/Table';
import TerminalBackButton from '@/components/ui/terminal-back-button';
import { usePostsQuery, usePostQuery } from '@/hooks/useMdxQueries';

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-4xl font-bold text-purple-400 mb-4 font-mono" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-3xl font-bold text-purple-300 mb-3 font-mono" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-2xl font-bold text-purple-200 mb-2 font-mono" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-zinc-300 mb-4 font-mono" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-purple-900/30 text-purple-200 px-1 py-0.5 rounded font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-zinc-900 p-4 rounded-lg mb-4 overflow-x-auto font-mono" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-purple-400 hover:text-purple-300 underline font-mono" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside mb-4 font-mono" {...props} />,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside mb-4 font-mono" {...props} />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="mb-2 font-mono" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-purple-400 pl-4 italic mb-4 font-mono" {...props} />
  ),
  Table: Table,
};

interface BlogSectionProps {
  onClose: (section?: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onClose }) => {
  const params = useParams();
  const router = useRouter();

  // Get slug from params
  const slug = params.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : null;

  // Use React Query hooks
  const { data: posts = [], isLoading: postsLoading, error: postsError } = usePostsQuery();
  const { data: currentPost, isLoading: postLoading, error: postError } = usePostQuery(slug);

  const handlePostClick = (postSlug: string) => {
    router.push(`/blog/${postSlug}`);
  };

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
              onClick={() => router.push('/blog')}
              variant="purple"
            />
          )}
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 truncate">~/blog{params.slug ? `/${params.slug}` : ''}</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs bg-zinc-900/95 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
        {postError && (
          <div className="text-red-400 mb-4">Error: {postError instanceof Error ? postError.message : 'Failed to load post'}</div>
        )}
        {postsError && (
          <div className="text-red-400 mb-4">Error: {postsError instanceof Error ? postsError.message : 'Failed to load posts'}</div>
        )}
        {currentPost ? (
          // Single Post View
          <article className="max-w-4xl mx-auto prose prose-invert prose-purple">
            <header className="mb-12">
              <h1 className="text-lg sm:text-xl md:text-2xl font-mono font-bold mb-2 sm:mb-4 text-purple-400 [text-shadow:0_0_10px_#a855f7]">
                {currentPost.frontmatter.title}
              </h1>
              <div className="text-purple-400/70 mb-2 sm:mb-4 font-mono text-xs sm:text-sm">
                {format(new Date(currentPost.frontmatter.date), 'MMMM dd, yyyy')}
              </div>
              <p className="text-zinc-400 font-mono text-xs sm:text-sm">{currentPost.frontmatter.description}</p>
              {currentPost.frontmatter.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentPost.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded-md text-[10px] sm:text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div className="prose prose-invert prose-purple max-w-none">
              <div className="font-mono [&_pre]:bg-zinc-800/50 [&_pre]:border [&_pre]:border-purple-800/30 [&_code]:text-purple-300 [&_h1]:text-purple-400 [&_h2]:text-purple-300 [&_h3]:text-purple-200 [&_a]:text-purple-400 [&_a:hover]:text-purple-300 [&_blockquote]:border-l-purple-400">
                <MDXRemote {...currentPost.content} components={components} />
              </div>
            </div>
          </article>
        ) : (
          // Blog Index View
          <>
            <div className="text-center mb-8">
              <pre className="text-purple-400 animate-pulse [text-shadow:0_0_10px_#a855f7] transition-all font-mono whitespace-pre inline-block">
{`
██████╗ ██╗      ██████╗  ██████╗ ███████╗
██╔══██╗██║     ██╔═══██╗██╔════╝ ██╔════╝
██████╔╝██║     ██║   ██║██║  ███╗███████╗
██╔══██╗██║     ██║   ██║██║   ██║╚════██║
██████╔╝███████╗╚██████╔╝╚██████╔╝███████║
╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝
`}
              </pre>
            </div>

            <div className="space-y-6">
              <div className="command-prompt text-zinc-300">$ ls -la ~/blog/posts/</div>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="terminal-section border border-zinc-800 rounded p-4 hover:border-purple-800/30 transition-colors cursor-pointer"
                    onClick={() => handlePostClick(post.slug)}
                  >
                    <div className="block space-y-2">
                      <h2 className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
                        {post.title}
                      </h2>
                      <div className="text-zinc-400 text-xs">
                        {format(new Date(post.date), 'MMMM dd, yyyy')}
                      </div>
                      <p className="text-zinc-300 text-sm">
                        {post.description}
                      </p>
                      <div className="text-xs text-purple-400/70">
                        Click to read more...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(BlogSection); 