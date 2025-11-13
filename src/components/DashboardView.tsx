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
    }, 200);

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
        <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-2 relative z-10">
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
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="overflow-hidden -mb-3">
              <div style={{ transform: 'scale(0.35)', transformOrigin: 'left' }}>
                <pre className="text-xs leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
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
            </div>
            <div className="space-y-1.5">
              {workExperiences.map((experience) => (
                <WorkExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section - Vertical Stack */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="overflow-hidden -mb-3">
              <div style={{ transform: 'scale(0.35)', transformOrigin: 'left' }}>
                <pre className="text-xs leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
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
            </div>
            <div className="space-y-1.5">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* Blog Section - Vertical Stack */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="overflow-hidden -mb-3">
              <div style={{ transform: 'scale(0.35)', transformOrigin: 'left' }}>
                <pre className="text-xs leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
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
            </div>
            <div className="space-y-1.5">
              {posts.length > 0 ? (
                posts.slice(0, 3).map((post) => (
                  <div
                    key={post.slug}
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 hover:border-zinc-600 transition-all cursor-pointer backdrop-blur-sm group"
                  >
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-base text-white mb-3">
                      {post.description}
                    </p>
                    <div className="pt-2 border-t border-zinc-700/50">
                      <span className="text-sm text-white">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-base text-white">
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
