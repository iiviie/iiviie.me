'use client';

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

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Profile Card - Centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <ProfileCard
              name="Kunwar Divyansh Verma"
              title="Backend Developer & API Architect"
              description="Building robust, scalable backend systems with Django and FastAPI. Passionate about clean code, efficient APIs, and server-side architecture."
              stats={{
                experience: '1.5y+',
                projects: 2,
                technologies: 25
              }}
            />
          </div>
        </div>

        {/* Work Experience - Below Profile */}
        <div>
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-bold text-purple-400 font-mono">
              Work Experience
            </h2>
          </div>
          <div className="space-y-3">
            {workExperiences.map((experience) => (
              <WorkExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>

        {/* Projects Section - Vertical Stack */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-purple-400 font-mono">
              Projects
            </h2>
            <button
              onClick={() => router.push('/projects')}
              className="text-xs text-purple-400 hover:text-purple-300 font-mono border border-purple-500/30 px-3 py-1 rounded hover:border-purple-400/50 transition-colors"
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

        {/* Blog Section - Vertical Stack */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-purple-400 font-mono">
              Latest Blog Posts
            </h2>
            <button
              onClick={() => router.push('/blog')}
              className="text-xs text-purple-400 hover:text-purple-300 font-mono border border-purple-500/30 px-3 py-1 rounded hover:border-purple-400/50 transition-colors"
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
                  className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 hover:border-purple-500/30 transition-all cursor-pointer backdrop-blur-sm group"
                >
                  <div className="mb-2">
                    <h3 className="text-sm font-bold text-purple-400 font-mono group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono mb-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono group-hover:text-purple-300 transition-colors">
                      Read more
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-purple-400 font-mono mb-2">Coming Soon</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Blog posts will be added here. Stay tuned for insights on backend development, cloud architecture, and more.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
