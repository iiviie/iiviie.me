'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePostsQuery, usePostQuery } from '@/hooks/useMdxQueries';
import { MDXRemote } from 'next-mdx-remote';
import { format } from 'date-fns';
import { Table } from './mdx/Table';

const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-2xl font-bold mb-4 font-mono" style={{ color: '#FFFFFF' }} {...props} />
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
    Table: Table,
};

const BlogView = () => {
    const params = useParams();
    const slug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : null;

    const { data: posts = [], isLoading: postsLoading } = usePostsQuery();
    const { data: currentPost, isLoading: postLoading } = usePostQuery(slug);

    // Show post detail if slug exists
    if (slug && currentPost) {
        return (
            <div className="h-full overflow-y-auto overflow-x-hidden">
                <div className="max-w-article mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-6">
                    {/* Back Button */}
                    <Link href="/blog" className="inline-block mb-4 text-sm hover:underline" style={{ color: '#727780' }}>
                        ← back to blog
                    </Link>

                    {/* Post Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                            {currentPost.frontmatter.title}
                        </h1>

                        <div className="text-xs sm:text-sm mb-3" style={{ color: '#727780' }}>
                            {format(new Date(currentPost.frontmatter.date), 'MMMM dd, yyyy')}
                        </div>

                        <p className="text-sm mb-4 leading-relaxed" style={{ color: '#D1D5DB' }}>
                            {currentPost.frontmatter.description}
                        </p>

                        {/* Tags */}
                        {currentPost.frontmatter.tags && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {currentPost.frontmatter.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-sm bg-zinc-800/50 border border-zinc-700/50 rounded"
                                        style={{ color: '#727780' }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* MDX Content */}
                    <div className="prose prose-invert max-w-none">
                        <MDXRemote {...currentPost.content} components={mdxComponents} />
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
                    <p className="text-base" style={{ color: '#727780' }}>
                        thoughts & tutorials
                    </p>
                </div>

                        {/* Posts List */}
                        {postsLoading ? (
                            <div style={{ color: '#727780' }}>Loading...</div>
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
                                            <h2 className="text-lg font-bold mb-3 group-hover:text-gray-200 transition-colors" style={{ color: '#FFFFFF' }}>
                                                {post.title}
                                            </h2>

                                            {/* Date */}
                                            <div className="text-xs sm:text-sm mb-2" style={{ color: '#727780' }}>
                                                {format(new Date(post.date), 'MMMM dd, yyyy')}
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm leading-relaxed mb-4 break-words" style={{ color: '#D1D5DB' }}>
                                                {post.description}
                                            </p>

                                            {/* Tags */}
                                            {post.tags && (
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {post.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-zinc-800/50 border border-zinc-700/50 rounded"
                                                            style={{ color: '#727780' }}
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
