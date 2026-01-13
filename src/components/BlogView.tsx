'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePostsQuery, usePostQuery } from '@/hooks/useMdxQueries';
import { MDXRemote } from 'next-mdx-remote';
import { format } from 'date-fns';
import { mdxComponents } from '@/components/mdx/components';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const BlogView = () => {
    const params = useParams();
    const slug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : null;

  const { data: posts = [], isLoading: postsLoading } = usePostsQuery();
  const { data: currentPost } = usePostQuery(slug);

    // Show post detail if slug exists
    if (slug && currentPost) {
        return (
            <div className="h-full overflow-y-auto overflow-x-hidden">
                <div className="max-w-article mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-6">
                    {/* Back Button */}
                    <Link href="/blog" className="inline-block mb-4 text-sm text-terminal-muted hover:underline">
                        ← back to blog
                    </Link>

                    {/* Post Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-4 text-white">
                            {currentPost.frontmatter.title}
                        </h1>

                        <div className="text-xs sm:text-sm mb-3 text-terminal-muted">
                            {format(new Date(currentPost.frontmatter.date), 'MMMM dd, yyyy')}
                        </div>

                        <p className="text-sm mb-4 leading-relaxed text-terminal-text">
                            {currentPost.frontmatter.description}
                        </p>

                        {/* Tags */}
                        {currentPost.frontmatter.tags && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {currentPost.frontmatter.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-sm bg-zinc-800/50 border border-zinc-700/50 rounded text-terminal-muted"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* MDX Content */}
                    <div className="prose prose-invert max-w-none">
                        <ErrorBoundary>
                            <MDXRemote {...currentPost.content} components={mdxComponents} />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        );
    }

    // Show blog list
    return (
        <div className="h-full overflow-y-auto overflow-x-hidden">
            <div className="max-w-content mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-6">
                {/* Header */}
                <div className="mt-6 sm:mt-8 mb-8">
                    <div className="overflow-hidden mb-4 w-full max-w-full">
                        <pre className="text-[2.25px] xs:text-[2.7px] sm:text-[3.6px] md:text-[4.5px] leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
                            {`
 █████     ████
░░███     ░░███
 ░███████  ░███   ██████   ███████
 ░███░░███ ░███  ███░░███ ███░░███
 ░███ ░███ ░███ ░███ ░███░███ ░███
 ░███ ░███ ░███ ░███ ░███░███ ░███
 ████████  █████░░██████ ░░███████
░░░░░░░░  ░░░░░  ░░░░░░   ░░░░░███
                          ███ ░███
                         ░░██████
                          ░░░░░░
`}
                        </pre>
                    </div>
                    <p className="text-base text-terminal-muted">
                        thoughts & tutorials
                    </p>
                </div>

                        {/* Posts List */}
                        {postsLoading ? (
                            <div className="text-terminal-muted">Loading...</div>
                        ) : (
                            <div className="space-y-6 sm:space-y-7 md:space-y-8">
                                {posts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="block group p-2 -m-2 rounded-lg hover:bg-zinc-900/30 transition-all"
                                    >
                                        <div>
                                            {/* Post Title */}
                                            <h2 className="text-lg font-bold mb-3 text-white group-hover:text-gray-200 transition-colors">
                                                {post.title}
                                            </h2>

                                            {/* Date */}
                                            <div className="text-xs sm:text-sm mb-2 text-terminal-muted">
                                                {format(new Date(post.date), 'MMMM dd, yyyy')}
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm leading-relaxed mb-4 break-words text-terminal-text">
                                                {post.description}
                                            </p>

                                            {/* Tags */}
                                            {post.tags && (
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {post.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-zinc-800/50 border border-zinc-700/50 rounded text-terminal-muted"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
            </div>
        </div>
    );
};

export default BlogView;
