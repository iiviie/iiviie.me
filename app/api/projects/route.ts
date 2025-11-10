import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectMetadata {
  title: string;
  description: string;
  tech: string[];
  status: 'production' | 'active' | 'stable' | 'maintenance';
  date: string;
  size?: string;
  slug: string;
}

export async function GET() {
  try {
    const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
    console.log('Projects directory:', projectsDirectory);

    if (!fs.existsSync(projectsDirectory)) {
      console.error('Projects directory does not exist:', projectsDirectory);
      return NextResponse.json([]);
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

    const sortedProjects = projects.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    return NextResponse.json(sortedProjects);
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    return NextResponse.json([], { status: 500 });
  }
}
