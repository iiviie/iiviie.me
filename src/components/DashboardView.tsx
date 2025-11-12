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

  const [drips, setDrips] = useState<Array<{ id: number; x: number; y: number; section: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sections = ['work', 'projects', 'blog'];
      const randomSection = sections[Math.floor(Math.random() * sections.length)];

      const newDrip = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 0,
        section: randomSection,
      };

      setDrips(prev => [...prev, newDrip]);

      setTimeout(() => {
        setDrips(prev => prev.filter(d => d.id !== newDrip.id));
      }, 2000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
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
            <div className="mb-2 relative overflow-hidden">
              <div className="transform scale-[0.35] origin-left">
                <pre className="text-xs leading-none text-white whitespace-pre" style={{ fontFamily: 'monospace', textShadow: '0 0 2px rgba(255,255,255,0.3)' }}>
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
              {/* Dripping animation for Work Experience */}
              {drips.filter(d => d.section === 'work').map(drip => (
                <div
                  key={drip.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${drip.x}%`,
                    top: '24px',
                  }}
                >
                  <div className="drip-drop text-white">▪</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {workExperiences.map((experience) => (
                <WorkExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section - Vertical Stack */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-2 flex items-center justify-between">
              <div className="relative overflow-hidden">
                <div className="transform scale-[0.35] origin-left">
                  <pre className="text-xs leading-none text-white whitespace-pre" style={{ fontFamily: 'monospace', textShadow: '0 0 2px rgba(255,255,255,0.3)' }}>
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
                {/* Dripping animation for Projects */}
                {drips.filter(d => d.section === 'projects').map(drip => (
                  <div
                    key={drip.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${drip.x}%`,
                      top: '18px',
                    }}
                  >
                    <div className="drip-drop text-white">▪</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push('/projects')}
                className="text-xs text-white hover:text-zinc-200 border border-zinc-700/50 px-3 py-1 rounded hover:border-zinc-600 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* Blog Section - Vertical Stack */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-2 flex items-center justify-between">
              <div className="relative overflow-hidden">
                <div className="transform scale-[0.35] origin-left">
                  <pre className="text-xs leading-none text-white whitespace-pre" style={{ fontFamily: 'monospace', textShadow: '0 0 2px rgba(255,255,255,0.3)' }}>
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
                {/* Dripping animation for Blog */}
                {drips.filter(d => d.section === 'blog').map(drip => (
                  <div
                    key={drip.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${drip.x}%`,
                      top: '18px',
                    }}
                  >
                    <div className="drip-drop text-white">▪</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push('/blog')}
                className="text-xs text-white hover:text-zinc-200 border border-zinc-700/50 px-3 py-1 rounded hover:border-zinc-600 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {posts.length > 0 ? (
                posts.slice(0, 3).map((post) => (
                  <div
                    key={post.slug}
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 hover:border-zinc-600 transition-all cursor-pointer backdrop-blur-sm group"
                  >
                    <div className="mb-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-xs text-white mb-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-700/50">
                      <span className="text-[10px] text-white">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-[10px] text-white group-hover:text-zinc-200 transition-colors">
                        Read more
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-sm font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-xs text-white">
                    Blog posts will be added here. Stay tuned for insights on backend development, cloud architecture, and more.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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

export default DashboardView;
