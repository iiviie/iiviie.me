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
      className="mb-6 cursor-pointer group"
    >
      {/* Header */}
      <div className="mb-1.5">
        <h3 className="text-base font-bold transition-colors" style={{ color: '#FFFFFF' }}>
          {project.title}
        </h3>
      </div>

      {/* Role */}
      <p className="text-sm mb-2" style={{ color: '#727780' }}>
        {project.role}
      </p>

      {/* Description */}
      <p className="text-base leading-relaxed mb-3" style={{ color: '#D1D5DB' }}>
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-sm bg-zinc-800/50 border border-zinc-700/50 rounded"
            style={{ color: '#727780' }}
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="px-2 py-1 text-sm bg-zinc-800/50 border border-zinc-700/50 rounded" style={{ color: '#727780' }}>
            +{project.tech.length - 5}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
