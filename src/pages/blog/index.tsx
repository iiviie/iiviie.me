import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getAllPosts } from '../../lib/mdx';

const BlogIndex = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    // Load posts on component mount
    const loadPosts = async () => {
      try {
        const allPosts = getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition">
              <Link to={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl font-semibold mb-2 text-zinc-100">{post.title}</h2>
                <div className="text-zinc-500 mb-3">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </div>
                <p className="text-zinc-400 mb-4">{post.description}</p>
                {post.tags && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex; 