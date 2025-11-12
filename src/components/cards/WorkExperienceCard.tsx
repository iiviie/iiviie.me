'use client';

import { WorkExperience } from '@/data/workExperience';

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

const WorkExperienceCard = ({ experience }: WorkExperienceCardProps) => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 hover:border-purple-500/30 transition-all backdrop-blur-sm">
      <div className="mb-2">
        <h3 className="text-sm font-bold text-zinc-300 font-mono">
          {experience.company}
        </h3>
      </div>

      <p className="text-xs text-purple-400 font-mono mb-1">
        {experience.position}
      </p>

      <p className="text-xs text-zinc-500 font-mono">
        {experience.duration}
      </p>
    </div>
  );
};

export default WorkExperienceCard;
