'use client';

interface ProfileCardProps {
  name: string;
  description: string;
}

const ProfileCard = ({ name, description }: ProfileCardProps) => {
  return (
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
  );
};

export default ProfileCard;
