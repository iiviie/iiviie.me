import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getAllPosts, type PostMetadata } from '../../lib/mdx';

interface BlogSectionProps {
  onClose: () => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onClose }) => {
  const [posts, setPosts] = React.useState<PostMetadata[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setError(error instanceof Error ? error.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-10 z-50 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between flex-shrink-0 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="ml-4 text-sm text-zinc-500">~/blog</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-zinc-900">
          <div className="text-center">
            <div className="text-purple-400 animate-pulse">Loading blog posts...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-10 z-50 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between flex-shrink-0 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="ml-4 text-sm text-zinc-500">~/blog</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-zinc-900">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-10 z-50 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between flex-shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" onClick={onClose}></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-zinc-500">~/blog</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-zinc-900">
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
                className="terminal-section border border-zinc-800 rounded p-4 hover:border-purple-800/30 transition-colors"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block space-y-2"
                >
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection; 