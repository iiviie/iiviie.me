import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  slug: string;
}

interface PostModule {
  default: string;
}

// Import all MDX files from the posts directory
const posts = import.meta.glob<PostModule>('../posts/*.mdx', { eager: true });

export function getAllPosts(): PostMetadata[] {
  const allPostsData = Object.entries(posts).map(([filepath, module]) => {
    const slug = filepath.replace('../posts/', '').replace('.mdx', '');
    const { data } = matter(module.default);

    return {
      slug,
      ...(data as Omit<PostMetadata, 'slug'>),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const filepath = `../posts/${slug}.mdx`;
  const post = posts[filepath];

  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  const { data, content } = matter(post.default);

  return {
    frontmatter: data,
    content,
  };
} 