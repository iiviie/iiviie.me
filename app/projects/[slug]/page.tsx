import { getAllProjectsServer } from '@/lib/mdx-server';
import TerminalInterface from '@/components/TerminalInterface';
import Sidebar from '@/components/Sidebar';
import MobileBottomNav from '@/components/MobileBottomNav';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getAllProjectsServer();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage() {
  return (
    <>
      <div className="h-screen w-screen fixed inset-0 overflow-hidden flex p-2 sm:p-3 md:p-4 lg:p-6 pb-16 lg:pb-6" style={{ background: '#1a1a1a' }}>
        <Sidebar className="hidden lg:flex" />
        <div className="flex-1 h-full">
          <TerminalInterface />
        </div>
      </div>
      <MobileBottomNav />
    </>
  );
}
