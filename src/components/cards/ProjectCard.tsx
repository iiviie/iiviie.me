'use client';

import { useRouter } from 'next/navigation';
import { ProjectMetadata } from '@/lib/mdx';

interface ProjectCardProps {
  project: ProjectMetadata;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();

  const getStatusColor = (status: ProjectMetadata['status']) => {
    switch (status) {
      case 'production': return 'text-green-400';
      case 'active': return 'text-blue-400';
      case 'stable': return 'text-purple-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-zinc-400';
    }
  };

  const handleClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 hover:border-zinc-600 transition-all cursor-pointer backdrop-blur-sm group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors flex-1">
          {project.title}
        </h3>
        <span className="ml-2 text-xs text-white">
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-white leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-[10px] bg-zinc-800/50 text-white border border-zinc-700/50 rounded"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="px-2 py-1 text-[10px] bg-zinc-800/50 text-white border border-zinc-700/50 rounded">
            +{project.tech.length - 5}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-700/50">
        <span className="text-[10px] text-white">
          {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
        <span className="text-[10px] text-white group-hover:text-zinc-200 transition-colors">
          View Details
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
