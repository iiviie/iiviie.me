'use client';

import { WorkExperience } from '@/data/workExperience';

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

const WorkExperienceCard = ({ experience }: WorkExperienceCardProps) => {
  return (
    <div className="bg-zinc-900/90 border border-zinc-700/50 rounded-lg p-4 hover:border-zinc-600 transition-all">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-white">
          {experience.company}
        </h3>
      </div>

      <p className="text-base text-white mb-1">
        {experience.position}
      </p>

      <p className="text-base text-white">
        {experience.duration}
      </p>
    </div>
  );
};

export default WorkExperienceCard;
