import TerminalInterface from '@/components/TerminalInterface';
import { DataProvider } from '@/components/DataProvider';
import { getAllPostsServer, getAllProjectsServer } from '@/lib/mdx-server';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getAllProjectsServer();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage() {
  // Pre-fetch data on server for instant load
  const [posts, projects] = await Promise.all([
    getAllPostsServer(),
    getAllProjectsServer(),
  ]);

  return (
    <DataProvider posts={posts} projects={projects}>
      <div className="h-screen bg-zinc-900 relative overflow-hidden">
        <div className="h-full pt-4">
          <TerminalInterface />
        </div>
      </div>
    </DataProvider>
  );
}
