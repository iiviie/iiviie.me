import TerminalInterface from '@/components/TerminalInterface';
import Sidebar from '@/components/Sidebar';

export default function BlogPage() {
  return (
    <div className="h-screen w-screen fixed inset-0 overflow-hidden flex p-4" style={{ background: '#1a1a1a' }}>
      <Sidebar />
      <div className="flex-1 h-full">
        <TerminalInterface />
      </div>
    </div>
  );
}
