'use client';

import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  stats: {
    experience: string;
    projects: number;
    technologies: number;
  };
}

const ProfileCard = ({ name, title, description, stats }: ProfileCardProps) => {
  const router = useRouter();

  return (
    <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-6 backdrop-blur-sm shadow-lg">
      {/* ASCII Art - Exact from original */}
      <div className="mb-6 overflow-x-auto">
        <div className="text-center">
          <pre className="text-[0.3rem] xs:text-[0.35rem] sm:text-[0.45rem] crt-glow whitespace-pre scale-40 xs:scale-50 sm:scale-75 origin-center" style={{ color: '#9068F7', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
{`
██╗ ██╗ ██╗   ██╗ ██╗ ██╗ ███████╗
██║ ██║ ██║   ██║ ██║ ██║ ██╔════╝
██║ ██║ ██║   ██║ ██║ ██║ █████╗
██║ ██║ ╚██╗ ██╔╝ ██║ ██║ ██╔══╝
██║ ██║  ╚████╔╝  ██║ ██║ ███████╗
╚═╝ ╚═╝   ╚═══╝   ╚═╝ ╚═╝ ╚══════╝
`}
          </pre>
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-purple-400 font-mono mb-1">
            {name}
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 font-mono">{stats.experience}</div>
            <div className="text-xs text-zinc-400 font-mono">experience</div>
          </div>
          <div className="text-center border-x border-zinc-700/50">
            <div className="text-2xl font-bold text-purple-400 font-mono">{stats.projects}+</div>
            <div className="text-xs text-zinc-400 font-mono">projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 font-mono">{stats.technologies}+</div>
            <div className="text-xs text-zinc-400 font-mono">technologies</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-300 font-mono leading-relaxed">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.push('/contact')}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-mono px-4 py-2 rounded transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => router.push('/projects')}
            className="px-4 py-2 border border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-purple-300 text-sm font-mono rounded transition-colors"
          >
            Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
