
interface SkillsSectionProps {
  onCommand?: (command: string) => void;
}

const SkillsSection = ({ onCommand }: SkillsSectionProps) => {
  const skillCategories = [
    {
      category: 'backend_frameworks',
      skills: [
        { name: 'Django', level: 95, experience: '4 years' },
        { name: 'FastAPI', level: 90, experience: '3 years' },
        { name: 'Flask', level: 85, experience: '3 years' },
        { name: 'Django REST Framework', level: 92, experience: '4 years' },
        { name: 'SQLAlchemy', level: 80, experience: '2 years' }
      ]
    },
    {
      category: 'databases',
      skills: [
        { name: 'PostgreSQL', level: 90, experience: '4 years' },
        { name: 'MongoDB', level: 85, experience: '3 years' },
        { name: 'Redis', level: 80, experience: '2 years' },
        { name: 'MySQL', level: 75, experience: '2 years' },
        { name: 'SQLite', level: 88, experience: '3 years' }
      ]
    },
    {
      category: 'languages_tools',
      skills: [
        { name: 'Python', level: 95, experience: '5 years' },
        { name: 'SQL', level: 90, experience: '4 years' },
        { name: 'Docker', level: 85, experience: '3 years' },
        { name: 'Git', level: 92, experience: '5 years' },
        { name: 'Linux', level: 88, experience: '4 years' }
      ]
    },
    {
      category: 'cloud_devops',
      skills: [
        { name: 'AWS', level: 80, experience: '2 years' },
        { name: 'Nginx', level: 75, experience: '2 years' },
        { name: 'Celery', level: 85, experience: '3 years' },
        { name: 'GitHub Actions', level: 70, experience: '1 year' },
        { name: 'Gunicorn', level: 80, experience: '3 years' }
      ]
    }
  ];

  const renderProgressBar = (level: number) => {
    const filled = Math.floor(level / 5);
    const empty = 20 - filled;
    
    return (
      <span className="font-mono text-xs">
        [
        <span className="progress-bar-filled">{'█'.repeat(filled)}</span>
        <span className="progress-bar-empty">{'-'.repeat(empty)}</span>
        ] {level}%
      </span>
    );
  };

  return (
    <div className="p-6 font-mono text-sm space-y-6">
      <div className="space-y-2">
        <div className="command-prompt">$ ./skills --list --backend-focus</div>
        <div className="ml-4 text-muted-foreground text-xs">
          Analyzing backend capabilities...
        </div>
      </div>
      
      <div className="ml-4 space-y-6">
        {skillCategories.map((category) => (
          <div key={category.category} className="space-y-3">
            <div className="text-terminal-lavender text-base crt-glow">
              == {category.category.toUpperCase().replace('_', ' & ')} ==
            </div>
            
            <div className="ml-4 space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {skill.experience}
                    </span>
                  </div>
                  
                  <div className="pl-2">
                    {renderProgressBar(skill.level)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="command-prompt">$ python --version && django --version</div>
            <div className="ml-4 text-sm space-y-1">
              <div className="text-foreground">
                Backend technologies mastered: {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </div>
              <div className="text-foreground">
                Average expertise level: {Math.round(
                  skillCategories.reduce((acc, cat) => 
                    acc + cat.skills.reduce((sum, skill) => sum + skill.level, 0), 0
                  ) / skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
                )}%
              </div>
              <div className="text-terminal-orange">
                Specialization: Django + FastAPI + PostgreSQL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
