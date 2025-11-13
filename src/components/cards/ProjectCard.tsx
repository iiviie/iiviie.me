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
      <div className="mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-base text-white leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-sm bg-zinc-800/50 text-white border border-zinc-700/50 rounded"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="px-2 py-1 text-sm bg-zinc-800/50 text-white border border-zinc-700/50 rounded">
            +{project.tech.length - 5}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-zinc-700/50">
        <span className="text-sm text-white">
          {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
