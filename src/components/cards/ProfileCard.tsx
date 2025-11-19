'use client';

interface ProfileCardProps {
  name: string;
  description: string;
}

const ProfileCard = ({ name, description }: ProfileCardProps) => {
  return (
    <div className="mt-6 sm:mt-8">
      {/* Divyansh ASCII Art */}
      <div className="overflow-hidden mb-4 w-full max-w-full">
        <pre className="text-[2.25px] xs:text-[2.7px] sm:text-[3.6px] md:text-[4.5px] leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
          {`     █████  ███                                                      █████
    ░░███  ░░░                                                      ░░███
  ███████  ████  █████ █████ █████ ████  ██████   ████████    █████  ░███████
 ███░░███ ░░███ ░░███ ░░███ ░░███ ░███  ░░░░░███ ░░███░░███  ███░░   ░███░░███
░███ ░███  ░███  ░███  ░███  ░███ ░███   ███████  ░███ ░███ ░░█████  ░███ ░███
░███ ░███  ░███  ░░███ ███   ░███ ░███  ███░░███  ░███ ░███  ░░░░███ ░███ ░███
░░████████ █████  ░░█████    ░░███████ ░░████████ ████ █████ ██████  ████ █████
 ░░░░░░░░ ░░░░░    ░░░░░      ░░░░░███  ░░░░░░░░ ░░░░ ░░░░░ ░░░░░░  ░░░░ ░░░░░
                              ███ ░███
                             ░░██████
                              ░░░░░░`}
        </pre>
      </div>

      {/* Location and Position */}
      <div className="space-y-1 text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: '#727780' }}>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>delhi, India</span>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span>software engineer @ SDC-SI</span>
        </div>
      </div>

      {/* Description - Left aligned */}
      <p className="text-[10px] xs:text-xs sm:text-sm md:text-base leading-relaxed break-words" style={{ color: '#D1D5DB', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', marginBottom: '2rem' }}
      >  {description}
      </p>
    </div>
  );
};

export default ProfileCard;
