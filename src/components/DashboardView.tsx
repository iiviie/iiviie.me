'use client';

import { useEffect, useState } from 'react';
import ProfileCard from './cards/ProfileCard';
import WorkExperienceCard from './cards/WorkExperienceCard';
import ProjectCard from './cards/ProjectCard';
import { workExperiences } from '@/data/workExperience';
import { useProjectsQuery, usePostsQuery } from '@/hooks/useMdxQueries';
import { useRouter } from 'next/navigation';

const DashboardView = () => {
  const router = useRouter();
  const { data: projects = [] } = useProjectsQuery();
  const { data: posts = [] } = usePostsQuery();

  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Probabilistic spawning: favor left and right edges over center
      let x;
      const spawnInCenter = Math.random() < 0.3; // 30% chance to spawn in center

      if (spawnInCenter) {
        // Center region (30-70%)
        x = 30 + Math.random() * 40;
      } else {
        // Edge regions (0-30% or 70-100%)
        if (Math.random() < 0.5) {
          x = Math.random() * 30; // Left edge
        } else {
          x = 70 + Math.random() * 30; // Right edge
        }
      }

      const newSnowflake = {
        id: Date.now() + Math.random(),
        x: x,
        y: Math.random() * 100,
      };

      setSnowflakes(prev => [...prev, newSnowflake]);

      setTimeout(() => {
        setSnowflakes(prev => prev.filter(d => d.id !== newSnowflake.id));
      }, 3000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="relative overflow-hidden">
        {/* Global Snowfall Effect - covers entire page */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {snowflakes.map(flake => (
            <div
              key={flake.id}
              className="absolute snowflake"
              style={{
                left: `${flake.x}%`,
                top: `${flake.y}%`,
              }}
            >
              ▪
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-6 relative z-10">
          {/* Profile Card - Centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <ProfileCard
                name="Divyansh"
                description="Building robust, scalable backend systems with Django and FastAPI. Passionate about clean code, efficient APIs, and server-side architecture."
              />
            </div>
          </div>

          {/* Work Experience - Below Profile */}
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-full sm:max-w-2xl min-w-0">
              <div className="overflow-hidden mb-4 w-full max-w-full">
                <pre className="text-[2.25px] xs:text-[2.7px] sm:text-[3.6px] md:text-[4.5px] leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
                  {`                                    █████
                                   ░░███
 █████ ███ █████  ██████  ████████  ░███ █████
░░███ ░███░░███  ███░░███░░███░░███ ░███░░███
 ░███ ░███ ░███ ░███ ░███ ░███ ░░░  ░██████░
 ░░███████████  ░███ ░███ ░███      ░███░░███
  ░░████░████   ░░██████  █████     ████ █████
   ░░░░ ░░░░     ░░░░░░  ░░░░░     ░░░░ ░░░░░`}
                </pre>
              </div>
              <div className="space-y-6 mb-8">
                {workExperiences.map((experience) => (
                  <WorkExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          </div>

          {/* Projects Section - Vertical Stack */}
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-full sm:max-w-2xl min-w-0">
              <div className="overflow-hidden mb-4 w-full max-w-full">
                <pre className="text-[2.25px] xs:text-[2.7px] sm:text-[3.6px] md:text-[4.5px] leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
                  {`                                   ███                     █████
                                   ░░░                     ░░███
 ████████  ████████   ██████      █████  ██████   ██████  ███████    █████
░░███░░███░░███░░███ ███░░███    ░░███  ███░░███ ███░░███░░░███░    ███░░
 ░███ ░███ ░███ ░░░ ░███ ░███     ░███ ░███████ ░███ ░░░   ░███    ░░█████
 ░███ ░███ ░███     ░███ ░███     ░███ ░███░░░  ░███  ███  ░███ ███ ░░░░███
 ░███████  █████    ░░██████      ░███ ░░██████ ░░██████   ░░█████  ██████
 ░███░░░  ░░░░░      ░░░░░░       ░███  ░░░░░░   ░░░░░░     ░░░░░  ░░░░░░
 ░███                         ███ ░███
 █████                       ░░██████
░░░░░                         ░░░░░░`}
                </pre>
              </div>
              <div className="space-y-6 mb-8">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard key={project.slug} project={project} linkToGithub={true} />
                ))}
              </div>
            </div>
          </div>

          {/* Blog Section - Vertical Stack */}
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-full sm:max-w-2xl min-w-0">
              <div className="overflow-hidden mb-4 w-full max-w-full">
                <pre className="text-[2.25px] xs:text-[2.7px] sm:text-[3.6px] md:text-[4.5px] leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
                  {` █████     ████
░░███     ░░███
 ░███████  ░███   ██████   ███████
 ░███░░███ ░███  ███░░███ ███░░███
 ░███ ░███ ░███ ░███ ░███░███ ░███
 ░███ ░███ ░███ ░███ ░███░███ ░███
 ████████  █████░░██████ ░░███████
░░░░░░░░  ░░░░░  ░░░░░░   ░░░░░███
                          ███ ░███
                         ░░██████
                          ░░░░░░`}
                </pre>
              </div>
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.slice(0, 3).map((post) => (
                    <div
                      key={post.slug}
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="flex justify-between items-start cursor-pointer group mb-4"
                    >
                      <h3 className="text-xs xs:text-sm sm:text-base transition-colors break-words" style={{ color: '#D1D5DB' }}>
                        {post.title}
                      </h3>
                      <span className="text-[10px] xs:text-xs sm:text-sm ml-2 sm:ml-4 whitespace-nowrap flex-shrink-0" style={{ color: '#727780' }}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="mb-3">
                    <h3 className="text-sm sm:text-base mb-2" style={{ color: '#D1D5DB' }}>Coming Soon</h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#727780' }}>
                      Blog posts will be added here. Stay tuned for insights on backend development, cloud architecture, and more.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .snowflake {
          color: rgba(255, 255, 255, 0.7);
          font-size: 8px;
          animation: fall-stages 3s ease-in forwards;
        }

        @keyframes fall-stages {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          33% {
            opacity: 0.7;
          }
          66% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(60px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardView;
