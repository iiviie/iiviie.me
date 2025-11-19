import { getAllProjectsServer } from '@/lib/mdx-server';
import TerminalInterface from '@/components/TerminalInterface';
import Sidebar from '@/components/Sidebar';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getAllProjectsServer();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage() {
  return (
    <div className="h-screen w-screen fixed inset-0 overflow-hidden flex p-4" style={{ background: '#1a1a1a' }}>
      <Sidebar />
      <div className="flex-1 h-full">
        <TerminalInterface />
      </div>
    </div>
  );
}
