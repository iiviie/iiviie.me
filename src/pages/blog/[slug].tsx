import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDXRemote } from 'next-mdx-remote';
import MdxLayout from '../../components/blog/MdxLayout';
import { Table } from '../../components/mdx/Table';

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  slug: string;
}

export interface PostData {
  frontmatter: PostMetadata;
  content: any;
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-purple-400 mb-4 font-mono" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-purple-300 mb-3 font-mono" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-purple-200 mb-2 font-mono" {...props} />,
  p: (props: any) => <p className="text-zinc-300 mb-4 font-mono" {...props} />,
  code: (props: any) => (
    <code className="bg-purple-900/30 text-purple-200 px-1 py-0.5 rounded font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-zinc-900 p-4 rounded-lg mb-4 overflow-x-auto font-mono" {...props} />
  ),
  a: (props: any) => (
    <a className="text-purple-400 hover:text-purple-300 underline font-mono" {...props} />
  ),
  ul: (props: any) => <ul className="list-disc list-inside mb-4 font-mono" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 font-mono" {...props} />,
  li: (props: any) => <li className="mb-2 font-mono" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-purple-400 pl-4 italic mb-4 font-mono" {...props} />
  ),
  Table: Table,
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = React.useState<PostData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!slug) {
          throw new Error('No slug provided');
        }

        console.log('Loading post with slug:', slug);
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        console.log('Post data loaded:', data);
        setPostData(data);
      } catch (error) {
        console.error('Error loading post:', error);
        setError(error instanceof Error ? error.message : 'Failed to load post');
        // Redirect to blog index after 3 seconds on error
        setTimeout(() => navigate('/blog'), 3000);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-300 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-purple-400">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-300 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-red-400">{error}</h1>
            <p className="mt-4 text-zinc-400">Redirecting to blog index...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-300 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-red-400">Post not found</h1>
            <p className="mt-4 text-zinc-400">Redirecting to blog index...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MdxLayout frontmatter={postData.frontmatter}>
      <div className="prose prose-invert prose-purple max-w-none">
        <div className="font-mono [&_pre]:bg-zinc-800/50 [&_pre]:border [&_pre]:border-purple-800/30 [&_code]:text-purple-300 [&_h1]:text-purple-400 [&_h2]:text-purple-300 [&_h3]:text-purple-200 [&_a]:text-purple-400 [&_a:hover]:text-purple-300 [&_blockquote]:border-l-purple-400">
          <MDXRemote {...postData.content} components={components} />
        </div>
      </div>
    </MdxLayout>
  );
};

export default BlogPost; 