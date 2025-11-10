import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import * as shiki from 'shiki';

export interface ProjectMetadata {
  title: string;
  description: string;
  tech: string[];
  status: 'production' | 'active' | 'stable' | 'maintenance';
  date: string;
  size?: string;
  slug: string;
}

export interface ProjectData {
  frontmatter: ProjectMetadata;
  content: MDXRemoteSerializeResult;
}

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
    console.log('Projects directory:', projectsDirectory);
    
    if (!fs.existsSync(projectsDirectory)) {
      console.error('Projects directory does not exist:', projectsDirectory);
      return [];
    }
    
    const filenames = fs.readdirSync(projectsDirectory);
    console.log('Found project files:', filenames);
    
    const projects = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(projectsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = filename.replace('.mdx', '');
        
        return {
          slug,
          ...(data as Omit<ProjectMetadata, 'slug'>),
        };
      });

    return projects.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectData> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);
    
    console.log('Trying to read project file:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error('Project file does not exist:', filePath);
      throw new Error(`Project not found: ${slug}`);
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

    return {
      frontmatter: data as ProjectMetadata,
      content: mdxSource,
    };
  } catch (error) {
    console.error('Error in getProjectBySlug:', error);
    throw error;
  }
}