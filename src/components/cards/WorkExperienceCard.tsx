'use client';

import { WorkExperience } from '@/data/workExperience';

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

const WorkExperienceCard = ({ experience }: WorkExperienceCardProps) => {
  return (
    <div className="mb-4 sm:mb-5 md:mb-6">
      <h3 className="text-sm sm:text-base font-bold mb-1.5" style={{ color: '#FFFFFF' }}>
        {experience.company}
      </h3>

      <p className="text-xs sm:text-sm mb-3" style={{ color: '#727780' }}>
        {experience.position} ({experience.duration})
      </p>

      <p className="text-[10px] xs:text-xs sm:text-sm md:text-base leading-relaxed break-words" style={{ color: '#D1D5DB', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
        {experience.description}
      </p>
    </div>
  );
};

export default WorkExperienceCard;
