
import { useState } from 'react';

interface ProjectsSectionProps {
  onCommand?: (command: string) => void;
}

const ProjectsSection = ({ onCommand }: ProjectsSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'status-success';
      case 'active': return 'status-active';
      case 'stable': return 'status-info';
      case 'maintenance': return 'status-muted';
      default: return 'text-muted-foreground';
    }
  };

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return null;
    
    return (
      <div className="p-6 font-mono text-sm space-y-6">
        <div className="space-y-2">
          <div className="command-prompt">$ cat ~/projects/{project.name}README.md</div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedProject(null)}
              className="text-terminal-amber hover:text-terminal-lavender text-xs"
            >
              ← back to projects/
            </button>
          </div>
        </div>
        
        <div className="ml-4 space-y-4">
          <div>
            <div className="text-terminal-lavender text-lg mb-2"># {project.name.replace('/', '')}</div>
            <div className="text-foreground">{project.description}</div>
          </div>
          
          <div>
            <div className="text-terminal-orange text-base mb-2">## Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span 
                  key={tech}
                  className={`px-2 py-1 text-xs rounded border ${
                    index % 4 === 0 ? 'bg-terminal-pink/20 text-terminal-pink border-terminal-pink/30' :
                    index % 4 === 1 ? 'bg-terminal-amber/20 text-terminal-amber border-terminal-amber/30' :
                    index % 4 === 2 ? 'bg-terminal-lavender/20 text-terminal-lavender border-terminal-lavender/30' :
                    'bg-terminal-purple/20 text-terminal-purple border-terminal-purple/30'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-terminal-orange text-base mb-2">## Project Info</div>
            <div className="space-y-1 text-xs">
              <div className="text-foreground">Size: {project.size}</div>
              <div className="text-foreground">Last modified: {project.modified}</div>
              <div className="flex items-center gap-2">
                <span className="text-foreground">Status:</span>
                <span className={getStatusColor(project.status)}>● {project.status}</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-terminal-orange text-base mb-2">## Commands</div>
            <div className="space-y-2 text-xs bg-background/50 p-3 rounded border border-border">
              <div className="text-muted-foreground"># Clone repository</div>
              <div className="command-prompt">git clone https://github.com/divyansh/{project.id}</div>
              <div className="text-muted-foreground"># Setup environment</div>
              <div className="command-prompt">pip install -r requirements.txt</div>
              <div className="text-muted-foreground"># Run development server</div>
              <div className="command-prompt">python manage.py runserver</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 font-mono text-sm space-y-6">
      <div className="space-y-2">
        <div className="command-prompt">$ ls -la ~/projects/</div>
        <div className="ml-4 text-muted-foreground text-xs">
          total {projects.length}
        </div>
      </div>
      
      <div className="ml-4">
        <div className="text-muted-foreground grid grid-cols-12 gap-2 pb-2 border-b border-border text-xs">
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
              className="grid grid-cols-12 gap-2 py-1 hover:bg-muted/10 rounded cursor-pointer transition-colors text-xs"
              onClick={() => setSelectedProject(project.id)}
            >
              <span className="col-span-4 text-terminal-amber">📁 {project.name}</span>
              <span className="col-span-2 text-muted-foreground">{project.size}</span>
              <span className="col-span-2 text-muted-foreground">{project.modified}</span>
              <span className={`col-span-2 ${getStatusColor(project.status)}`}>
                ● {project.status}
              </span>
              <span className="col-span-2 terminal-link hover:text-terminal-lavender transition-colors">
                [view]
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
