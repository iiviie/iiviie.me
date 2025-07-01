import React from 'react';

interface ProjectsSectionProps {
  onClose: () => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-10 bg-background border border-border rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="terminal-header px-4 py-2 flex items-center justify-between flex-shrink-0 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" onClick={onClose}></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-muted-foreground">~/projects</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6 font-mono text-sm">
        <h2 className="text-lg font-semibold mb-6 text-foreground">Featured Projects</h2>
        
        <div className="space-y-8">
          {/* Project 1 */}
          <div className="project-card">
            <h3 className="text-md font-semibold text-foreground">API Gateway</h3>
            <p className="text-muted-foreground mt-2">
              High-performance API routing and management system built with FastAPI and Redis.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-muted text-xs rounded">FastAPI</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">Redis</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">Docker</span>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <a href="https://github.com/yourusername/api-gateway" className="hover:text-foreground">
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card">
            <h3 className="text-md font-semibold text-foreground">Database Optimizer</h3>
            <p className="text-muted-foreground mt-2">
              Advanced query optimization tool for PostgreSQL with machine learning capabilities.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-muted text-xs rounded">Python</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">PostgreSQL</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">TensorFlow</span>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <a href="https://github.com/yourusername/db-optimizer" className="hover:text-foreground">
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card">
            <h3 className="text-md font-semibold text-foreground">Auth Service</h3>
            <p className="text-muted-foreground mt-2">
              Secure authentication service with OAuth2 implementation and JWT token management.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-muted text-xs rounded">Django</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">OAuth2</span>
              <span className="px-2 py-1 bg-muted text-xs rounded">JWT</span>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <a href="https://github.com/yourusername/auth-service" className="hover:text-foreground">
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
