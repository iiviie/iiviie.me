import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import * as shiki from 'shiki';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Project not found: ${slug}` }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Initialize the syntax highlighter
    const highlighter = await shiki.createHighlighter({
      themes: ['one-dark-pro'],
      langs: ['typescript', 'javascript', 'python', 'bash', 'markdown', 'json', 'dockerfile', 'yaml'],
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

    return NextResponse.json({
      frontmatter: data,
      content: mdxSource,
    });
  } catch (error) {
    console.error('Error in getProjectBySlug:', error);
    return NextResponse.json({ error: 'Failed to load project' }, { status: 500 });
  }
}
