import React from 'react';

interface SkillsSectionProps {
  onClose: () => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-10 bg-background border border-border rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="terminal-header px-4 py-2 flex items-center justify-between flex-shrink-0 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" onClick={onClose}></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-muted-foreground">~/skills</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6 font-mono text-sm">
        <h2 className="text-lg font-semibold mb-6 text-foreground">Technical Skills</h2>
        
        <div className="space-y-8">
          {/* Frameworks */}
          <div className="skill-section">
            <h3 className="text-md font-semibold text-foreground mb-4">Frameworks & Libraries</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="skill-card">
                <span className="text-terminal-purple">Django</span>
                <div className="mt-1 text-xs text-muted-foreground">Advanced</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-purple h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <span className="text-terminal-blue">FastAPI</span>
                <div className="mt-1 text-xs text-muted-foreground">Expert</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-blue h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <span className="text-terminal-green">Flask</span>
                <div className="mt-1 text-xs text-muted-foreground">Intermediate</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-green h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Databases */}
          <div className="skill-section">
            <h3 className="text-md font-semibold text-foreground mb-4">Databases</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="skill-card">
                <span className="text-terminal-amber">PostgreSQL</span>
                <div className="mt-1 text-xs text-muted-foreground">Expert</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-amber h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <span className="text-terminal-pink">MongoDB</span>
                <div className="mt-1 text-xs text-muted-foreground">Advanced</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-pink h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <span className="text-terminal-red">Redis</span>
                <div className="mt-1 text-xs text-muted-foreground">Advanced</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-red h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="skill-section">
            <h3 className="text-md font-semibold text-foreground mb-4">Tools & Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="skill-card">
                <span className="text-terminal-cyan">Docker</span>
                <div className="mt-1 text-xs text-muted-foreground">Advanced</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-cyan h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <span className="text-terminal-orange">Git</span>
                <div className="mt-1 text-xs text-muted-foreground">Expert</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-orange h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <span className="text-terminal-lavender">AWS</span>
                <div className="mt-1 text-xs text-muted-foreground">Advanced</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div className="bg-terminal-lavender h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
