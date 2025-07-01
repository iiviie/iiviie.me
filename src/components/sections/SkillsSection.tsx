import React from 'react';

interface SkillsSectionProps {
  onClose: () => void;
}

interface Skill {
  name: string;
  level: number;
  experience: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "BACKEND & FRAMEWORKS",
    skills: [
      { name: "Django", level: 95, experience: "4 years" },
      { name: "FastAPI", level: 90, experience: "3 years" },
      { name: "Flask", level: 85, experience: "3 years" },
      { name: "Django REST Framework", level: 92, experience: "4 years" },
      { name: "SQLAlchemy", level: 80, experience: "2 years" }
    ]
  },
  {
    title: "DATABASES",
    skills: [
      { name: "PostgreSQL", level: 90, experience: "4 years" },
      { name: "MongoDB", level: 85, experience: "3 years" },
      { name: "Redis", level: 80, experience: "2 years" },
      { name: "MySQL", level: 75, experience: "2 years" },
      { name: "SQLite", level: 88, experience: "3 years" }
    ]
  },
  {
    title: "LANGUAGES & TOOLS",
    skills: [
      { name: "Python", level: 95, experience: "5 years" },
      { name: "SQL", level: 90, experience: "4 years" },
      { name: "Docker", level: 85, experience: "3 years" },
      { name: "Git", level: 92, experience: "5 years" },
      { name: "Linux", level: 88, experience: "4 years" }
    ]
  }
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ onClose }) => {
  const renderProgressBar = (level: number) => {
    const barWidth = 20; // Total width of the progress bar
    const filled = Math.floor((level / 100) * barWidth);
    const empty = barWidth - filled;
    
    return (
      <span className="font-mono">
        [<span className="text-terminal-purple">{"█".repeat(filled)}</span>
        <span className="text-muted-foreground">{"-".repeat(empty)}</span>] {level}%
      </span>
    );
  };

  return (
    <div className="fixed inset-10 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between flex-shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" onClick={onClose}></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-zinc-500">~/skills</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-zinc-900">
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <div className="text-terminal-purple mb-4 crt-glow">
                == {category.title} ==
              </div>
              <div className="space-y-3 ml-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="flex justify-between items-center text-zinc-300">
                      <span>{skill.name}</span>
                      <span className="text-xs text-zinc-500">{skill.experience}</span>
                    </div>
                    <div className="text-xs ml-2">
                      {renderProgressBar(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
