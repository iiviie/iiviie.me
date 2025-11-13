'use client';

import { useEffect, useState } from 'react';

interface ProfileCardProps {
  name: string;
  description: string;
}

const ProfileCard = ({ name, description }: ProfileCardProps) => {
  const [drips, setDrips] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDrip = {
        id: Date.now(),
        x: Math.random() * 100,
        y: 0,
      };

      setDrips(prev => [...prev, newDrip]);

      setTimeout(() => {
        setDrips(prev => prev.filter(d => d.id !== newDrip.id));
      }, 2000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* IIVIIE ASCII Art - Centered (purple) */}
      <div className="mb-1 overflow-x-auto">
        <div className="text-center">
          <pre className="text-[0.3rem] xs:text-[0.35rem] sm:text-[0.45rem] crt-glow whitespace-pre scale-40 xs:scale-50 sm:scale-75 origin-center" style={{ color: '#9068F7', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
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
        {/* Divyansh ASCII Art with dripping animation */}
        <div className="relative overflow-hidden -mb-2">
          <div className="transform scale-[0.35] origin-left">
            <pre className="text-xs leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
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

          {/* Dripping animation */}
          {drips.map(drip => (
            <div
              key={drip.id}
              className="absolute pointer-events-none"
              style={{
                left: `${drip.x}%`,
                top: '24px',
              }}
            >
              <div className="drip-drop text-white">
                ▪
              </div>
            </div>
          ))}
        </div>

        {/* Description - Left aligned */}
        <p className="text-base text-white leading-relaxed">
          {description}
        </p>
      </div>

      <style jsx>{`
        .drip-drop {
          font-size: 8px;
          animation: drip 2s ease-in forwards;
        }

        @keyframes drip {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;
