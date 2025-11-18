'use client';

import { WorkExperience } from '@/data/workExperience';

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

const WorkExperienceCard = ({ experience }: WorkExperienceCardProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-base font-bold mb-1.5" style={{ color: '#FFFFFF' }}>
        {experience.company}
      </h3>

      <p className="text-sm mb-3" style={{ color: '#727780' }}>
        {experience.position} ({experience.duration})
      </p>

      <p className="text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
        {experience.description}
      </p>
    </div>
  );
};

export default WorkExperienceCard;
