import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../lib/mdx';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import MdxLayout from '../../components/blog/MdxLayout';

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-purple-400 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-purple-300 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-purple-200 mb-2" {...props} />,
  p: (props: any) => <p className="text-zinc-300 mb-4" {...props} />,
  code: (props: any) => (
    <code className="bg-purple-900/30 text-purple-200 px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-zinc-900 p-4 rounded-lg mb-4 overflow-x-auto" {...props} />
  ),
};

const BlogPost = () => {
  const { slug } = useParams();
  const [Content, setContent] = React.useState<React.ComponentType | null>(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        if (!slug) {
          throw new Error('No slug provided');
        }
        const { content, frontmatter } = getPostBySlug(slug);
        
        // Evaluate MDX content
        const { default: MDXContent } = await evaluate(content, {
          ...runtime,
          baseUrl: import.meta.url
        });

        setContent(() => () => (
          <MdxLayout frontmatter={frontmatter}>
            <MDXContent />
          </MdxLayout>
        ));
      } catch (error) {
        console.error('Error loading post:', error);
        setError('Failed to load post');
      }
    };
    loadPost();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-300 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-red-400">{error}</h1>
        </div>
      </div>
    );
  }

  if (!Content) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-300 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  );
};

export default BlogPost; 