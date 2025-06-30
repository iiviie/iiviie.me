
interface AboutSectionProps {
  onCommand?: (command: string) => void;
}

const AboutSection = ({ onCommand }: AboutSectionProps) => {
  return (
    <div className="p-6 font-mono text-sm space-y-6">
      <div className="space-y-2">
        <div className="command-prompt">$ cat ~/about_divyansh.md</div>
        <div className="ml-4 text-muted-foreground text-xs">
          Last modified: {new Date().toLocaleDateString()} | Backend Focus | Python Specialist
        </div>
      </div>
      
      <div className="ml-4 space-y-4">
        {/* Profile Header Section */}
        <div className="terminal-section">
          <div className="terminal-section-header">
            PROFILE OVERVIEW
          </div>
          <div className="terminal-section-content">
            <h1 className="text-terminal-purple crt-glow text-lg mb-3"># Divyansh Verma</h1>
            <div className="text-foreground space-y-2">
              <p>
                Backend-focused software developer with expertise in Python ecosystem.
                Specialized in building scalable APIs and robust server-side applications using Django and FastAPI.
              </p>
              <p>
                Passionate about clean architecture, performance optimization, and creating
                developer-friendly APIs that power modern applications.
              </p>
            </div>
          </div>
        </div>
        
        {/* Core Technologies Section */}
        <div className="terminal-section">
          <div className="terminal-section-header">
            CORE TECHNOLOGIES
          </div>
          <div className="terminal-section-content space-y-3">
            <div className="border-l-2 border-terminal-purple pl-4">
              <div className="text-terminal-purple font-semibold">🐍 Django & Django REST Framework</div>
              <div className="text-foreground mt-1 text-xs">
                Building complex web applications with robust ORM, authentication,
                and RESTful API development. Expert in Django's ecosystem and best practices.
              </div>
            </div>
            
            <div className="border-l-2 border-terminal-blue pl-4">
              <div className="text-terminal-blue font-semibold">⚡ FastAPI</div>
              <div className="text-foreground mt-1 text-xs">
                High-performance async APIs with automatic documentation generation.
                Leveraging Python's async capabilities for scalable microservices.
              </div>
            </div>
            
            <div className="border-l-2 border-terminal-green pl-4">
              <div className="text-terminal-green font-semibold">🗄️ Database Technologies</div>
              <div className="text-foreground mt-1 text-xs">
                PostgreSQL, MongoDB, Redis - from relational design to NoSQL
                and caching strategies for optimal performance.
              </div>
            </div>
          </div>
        </div>
        
        {/* Development Approach Section */}
        <div className="terminal-section">
          <div className="terminal-section-header">
            DEVELOPMENT APPROACH
          </div>
          <div className="terminal-section-content">
            <div className="text-foreground space-y-1 text-sm">
              <div>🔧 Test-Driven Development (TDD)</div>
              <div>📊 Performance monitoring & optimization</div>
              <div>🛡️ Security-first API design</div>
              <div>📝 Comprehensive API documentation</div>
              <div>🐳 Containerized deployment strategies</div>
            </div>
          </div>
        </div>
        
        {/* Philosophy Section */}
        <div className="terminal-section">
          <div className="terminal-section-header">
            PHILOSOPHY
          </div>
          <div className="terminal-section-content">
            <div className="text-foreground italic border-l-2 border-terminal-purple pl-4 text-sm">
              "Great backends are invisible to users but essential to developers.
              Build APIs that are intuitive, performant, and maintainable."
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border text-muted-foreground text-xs">
        <div>EOF - Ready to architect your next backend solution</div>
      </div>
    </div>
  );
};

export default AboutSection;
