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
      <div className="max-w-4xl mx-auto text-center">
        <pre className="text-purple-400 animate-pulse [text-shadow:0_0_10px_#a855f7] transition-all font-mono whitespace-pre mb-12 inline-block">
{`
██████╗ ██╗      ██████╗  ██████╗ ███████╗
██╔══██╗██║     ██╔═══██╗██╔════╝ ██╔════╝
██████╔╝██║     ██║   ██║██║  ███╗███████╗
██╔══██╗██║     ██║   ██║██║   ██║╚════██║
██████╔╝███████╗╚██████╔╝╚██████╔╝███████║
╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝
`}
        </pre>
        <div className="space-y-8">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="border border-purple-800/30 rounded-lg p-6 hover:bg-purple-900/20 transition-all hover:border-purple-600/50 hover:[text-shadow:0_0_5px_#a855f7]"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl font-mono font-semibold mb-2 text-purple-200">{post.title}</h2>
                <div className="text-purple-400/70 mb-3 font-mono">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </div>
                <p className="text-zinc-400 mb-4 font-mono">{post.description}</p>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded-md text-sm font-mono"
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