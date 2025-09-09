import React, { useState } from 'react';
import TerminalBackButton from '@/components/ui/terminal-back-button';

interface ProjectsSectionProps {
  onClose: (section?: string) => void;
}

interface Project {
  id: string;
  name: string;
  type: 'dir';
  size: string;
  modified: string;
  description: string;
  tech: string[];
  status: 'production' | 'active' | 'stable' | 'maintenance';
}

const projects: Project[] = [
  {
    id: 'ecommerce-api',
    name: 'ecommerce-api/',
    type: 'dir',
    size: '2.4MB',
    modified: '2024-01-15',
    description: 'RESTful e-commerce API with Django REST Framework and PostgreSQL',
    tech: ['Django', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
    status: 'production'
  },
  {
    id: 'fastapi-microservice',
    name: 'fastapi-microservice/',
    type: 'dir',
    size: '892KB',
    modified: '2024-01-20',
    description: 'High-performance async microservice with FastAPI and MongoDB',
    tech: ['FastAPI', 'MongoDB', 'Pydantic', 'Docker', 'Pytest'],
    status: 'active'
  },
  {
    id: 'django-blog-api',
    name: 'django-blog-api/',
    type: 'dir',
    size: '1.1MB',
    modified: '2023-12-28',
    description: 'Blog API with JWT authentication and content management',
    tech: ['Django', 'JWT', 'PostgreSQL', 'Swagger'],
    status: 'stable'
  },
  {
    id: 'api-monitoring',
    name: 'api-monitoring/',
    type: 'dir',
    size: '756KB',
    modified: '2024-01-10',
    description: 'Real-time API monitoring dashboard with alerts',
    tech: ['Flask', 'InfluxDB', 'Grafana', 'WebSockets'],
    status: 'maintenance'
  }
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'production': return 'text-green-400';
      case 'active': return 'text-blue-400';
      case 'stable': return 'text-purple-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-zinc-400';
    }
  };

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return null;

    return (
      <div className="fixed inset-4 sm:inset-8 md:inset-12 z-50 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="bg-zinc-900/50 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 cursor-pointer" onClick={() => onClose('home')}></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
            {selectedProject && (
              <TerminalBackButton
                onClick={() => setSelectedProject(null)}
                variant="purple"
              />
            )}
            <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 truncate">~/projects/{project.name}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs bg-zinc-900/95 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
          <div className="space-y-6">
            <div className="space-y-4 ml-2 sm:ml-3">
              <div>
                <div className="text-terminal-purple text-sm sm:text-base mb-1 sm:mb-2"># {project.name.replace('/', '')}</div>
                <div className="text-zinc-300">{project.description}</div>
              </div>

              <div>
                <div className="text-terminal-amber text-xs sm:text-sm mb-1 sm:mb-2">## Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={tech}
                      className={`px-2 py-1 text-xs rounded border ${
                        index % 4 === 0 ? 'bg-terminal-pink/10 text-terminal-pink border-terminal-pink/30' :
                        index % 4 === 1 ? 'bg-terminal-amber/10 text-terminal-amber border-terminal-amber/30' :
                        index % 4 === 2 ? 'bg-terminal-purple/10 text-terminal-purple border-terminal-purple/30' :
                        'bg-terminal-blue/10 text-terminal-blue border-terminal-blue/30'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-terminal-amber text-xs sm:text-sm mb-1 sm:mb-2">## Project Info</div>
                <div className="space-y-1 text-xs">
                  <div className="text-zinc-300">Size: {project.size}</div>
                  <div className="text-zinc-300">Last modified: {project.modified}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-300">Status:</span>
                    <span className={getStatusColor(project.status)}>● {project.status}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-terminal-amber text-xs sm:text-sm mb-1 sm:mb-2">## Commands</div>
                <div className="space-y-1 text-[9px] sm:text-[10px] bg-zinc-900/50 p-2 sm:p-3 rounded border border-zinc-800">
                  <div className="text-zinc-500"># Clone repository</div>
                  <div className="text-zinc-300">git clone https://github.com/divyansh/{project.id}</div>
                  <div className="text-zinc-500"># Setup environment</div>
                  <div className="text-zinc-300">pip install -r requirements.txt</div>
                  <div className="text-zinc-500"># Run development server</div>
                  <div className="text-zinc-300">python manage.py runserver</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-4 sm:inset-8 md:inset-12 z-50 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="bg-zinc-900/50 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 cursor-pointer" onClick={() => onClose('home')}></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 truncate">~/projects</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs bg-zinc-900/95 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
        <div className="space-y-2">
          <div className="text-zinc-300">$ ls -la ~/projects/</div>
          <div className="text-zinc-500 text-xs ml-4">
            total {projects.length}
          </div>
        </div>

        <div className="mt-4 ml-4">
          <div className="text-zinc-500 grid grid-cols-12 gap-1 sm:gap-2 pb-1 sm:pb-2 border-b border-zinc-800 text-[9px] sm:text-[10px]">
            <span className="col-span-4">Name</span>
            <span className="col-span-2">Size</span>
            <span className="col-span-2">Modified</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Action</span>
          </div>

          <div className="space-y-1 mt-2">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="grid grid-cols-12 gap-1 sm:gap-2 py-0.5 sm:py-1 hover:bg-zinc-800/30 rounded cursor-pointer transition-colors text-[9px] sm:text-[10px]"
                onClick={() => setSelectedProject(project.id)}
              >
                <span className="col-span-4 text-terminal-amber">📁 {project.name}</span>
                <span className="col-span-2 text-zinc-500">{project.size}</span>
                <span className="col-span-2 text-zinc-500">{project.modified}</span>
                <span className={`col-span-2 ${getStatusColor(project.status)}`}>
                  ● {project.status}
                </span>
                <span className="col-span-2 text-terminal-purple hover:text-terminal-pink transition-colors">
                  [view]
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
