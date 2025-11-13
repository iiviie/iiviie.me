'use client';

interface ProfileCardProps {
  name: string;
  description: string;
}

const ProfileCard = ({ name, description }: ProfileCardProps) => {
  return (
    <div>
      {/* IIVIIE ASCII Art - Centered (purple) */}
      <div className="mb-1 overflow-x-auto">
        <div className="text-center">
          <pre className="text-[0.3rem] xs:text-[0.35rem] sm:text-[0.45rem] crt-glow whitespace-pre scale-40 xs:scale-50 sm:scale-75 origin-center" style={{ color: '#9068F7' }}>
{`
██╗ ██╗ ██╗   ██╗ ██╗ ██╗ ███████╗
██║ ██║ ██║   ██║ ██║ ██║ ██╔════╝
██║ ██║ ██║   ██║ ██║ ██║ █████╗
██║ ██║ ╚██╗ ██╔╝ ██║ ██║ ██╔══╝
██║ ██║  ╚████╔╝  ██║ ██║ ███████╗
╚═╝ ╚═╝   ╚═══╝   ╚═╝ ╚═╝ ╚══════╝
`}
          </pre>
        </div>
      </div>

      {/* Profile Info - Left aligned */}
      <div>
        {/* Divyansh ASCII Art */}
        <div className="overflow-hidden -mb-2">
          <div style={{ transform: 'scale(0.35)', transformOrigin: 'left' }}>
            <pre className="text-xs leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
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
        </div>

        {/* Description - Left aligned */}
        <p className="text-base text-white leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
