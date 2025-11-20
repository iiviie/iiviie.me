import TerminalInterface from '@/components/TerminalInterface';
import Sidebar from '@/components/Sidebar';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function ProjectsPage() {
  return (
    <>
      <div className="h-screen w-screen fixed inset-0 overflow-hidden flex p-1 sm:p-1.5 md:p-2 lg:p-3 pb-16 lg:pb-3" style={{ background: '#1a1a1a' }}>
        <Sidebar className="hidden lg:flex" />
        <div className="flex-1 h-full">
          <TerminalInterface />
        </div>
      </div>
      <MobileBottomNav />
    </>
  );
}
