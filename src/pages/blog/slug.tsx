import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../lib/mdx';
import MdxLayout from '../../components/blog/MdxLayout';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        if (!slug) {
          throw new Error('No slug provided');
        }
        const postData = getPostBySlug(slug);
        setPost(postData);
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

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-300 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <MdxLayout frontmatter={post.frontmatter}>
      {post.content}
    </MdxLayout>
  );
};

export default BlogPost; 