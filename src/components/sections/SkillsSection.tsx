import React from 'react';

interface SkillsSectionProps {
  onClose: (section?: string) => void;
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
    <div className="fixed inset-4 sm:inset-8 md:inset-12 z-50 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="bg-zinc-900/50 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 cursor-pointer" onClick={() => onClose('home')}></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 truncate">~/skills</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs bg-zinc-900/95 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
        <div className="space-y-4 sm:space-y-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <div className="text-terminal-purple mb-2 sm:mb-3 crt-glow text-xs sm:text-sm">
                == {category.title} ==
              </div>
              <div className="space-y-2 sm:space-y-3 ml-2 sm:ml-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="flex justify-between items-center text-zinc-300">
                      <span>{skill.name}</span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-500">{skill.experience}</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] ml-1 sm:ml-2">
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
