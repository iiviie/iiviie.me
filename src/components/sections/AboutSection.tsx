
interface AboutSectionProps {
  onCommand?: (command: string) => void;
}

const AboutSection = ({ onCommand: _onCommand }: AboutSectionProps) => {
  return (
    <div className="p-3 sm:p-4 md:p-5 lg:p-6 font-mono text-sm space-y-6">
      <div className="space-y-2">
        <div className="command-prompt">$ cat ~/about_divyansh.md</div>
        <div className="ml-4 text-xs sm:text-sm" style={{ color: '#727780' }}>
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
            <h1 className="text-terminal-purple crt-glow text-2xl mb-4"># Divyansh Verma</h1>
            <div className="space-y-4" style={{ color: '#D1D5DB' }}>
              <p className="mb-4">
                Backend-focused software developer with expertise in Python ecosystem.
                Specialized in building scalable APIs and robust server-side applications using Django and FastAPI.
              </p>
              <p className="mb-4">
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
              <div className="mt-1 text-xs" style={{ color: '#D1D5DB' }}>
                Building complex web applications with robust ORM, authentication,
                and RESTful API development. Expert in Django's ecosystem and best practices.
              </div>
            </div>

            <div className="border-l-2 border-terminal-blue pl-4">
              <div className="text-terminal-blue font-semibold">⚡ FastAPI</div>
              <div className="mt-1 text-xs" style={{ color: '#D1D5DB' }}>
                High-performance async APIs with automatic documentation generation.
                Leveraging Python's async capabilities for scalable microservices.
              </div>
            </div>

            <div className="border-l-2 border-terminal-green pl-4">
              <div className="text-terminal-green font-semibold">🗄️ Database Technologies</div>
              <div className="mt-1 text-xs" style={{ color: '#D1D5DB' }}>
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
            <div className="space-y-1 text-sm" style={{ color: '#D1D5DB' }}>
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
            <div className="italic border-l-2 border-terminal-purple pl-4 text-sm" style={{ color: '#D1D5DB' }}>
              "Great backends are invisible to users but essential to developers.
              Build APIs that are intuitive, performant, and maintainable."
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border text-xs" style={{ color: '#727780' }}>
        <div>EOF - Ready to architect your next backend solution</div>
      </div>
    </div>
  );
};

export default AboutSection;
