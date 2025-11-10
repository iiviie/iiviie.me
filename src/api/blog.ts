import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import * as shiki from 'shiki';

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  slug: string;
}

export interface PostData {
  frontmatter: PostMetadata;
  content: MDXRemoteSerializeResult;
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    console.log('Posts directory:', postsDirectory);
    
    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist:', postsDirectory);
      return [];
    }
    
    const filenames = fs.readdirSync(postsDirectory);
    console.log('Found files:', filenames);
    
    const posts = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = filename.replace('.mdx', '');
        
        return {
          slug,
          ...(data as Omit<PostMetadata, 'slug'>),
        };
      });

    return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    
    console.log('Trying to read file:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      throw new Error(`Post not found: ${slug}`);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Initialize the syntax highlighter
    const highlighter = await shiki.createHighlighter({
      themes: ['one-dark-pro'],
      langs: ['typescript', 'javascript', 'python', 'bash', 'markdown', 'json'],
    });

    // Serialize MDX content with syntax highlighting
    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
        format: 'mdx',
      },
      scope: {
        // Make highlighter available in MDX content
        highlight: async (code: string, lang: string) => {
          try {
            return await highlighter.codeToHtml(code, { 
              lang,
              themes: {
                light: 'one-dark-pro',
                dark: 'one-dark-pro'
              }
            });
          } catch (error) {
            console.warn(`Failed to highlight code block with language ${lang}:`, error);
            return code;
          }
        }
      }
    });

    return {
      frontmatter: data as PostMetadata,
      content: mdxSource,
    };
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    throw error;
  }
} 