import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  slug: string;
}

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    console.log('Posts directory:', postsDirectory);

    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist:', postsDirectory);
      return NextResponse.json([]);
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

    const sortedPosts = posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return NextResponse.json([], { status: 500 });
  }
}
