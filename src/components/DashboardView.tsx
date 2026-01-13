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
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="relative overflow-hidden">
        <div className="max-w-content mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-6 relative z-10">
          {/* Profile Card */}
          <ProfileCard
            description="Building robust, scalable backend systems with Django and FastAPI. Passionate about clean code, efficient APIs, and server-side architecture."
          />

          {/* Work Experience */}
          <div className="mt-8">
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

          {/* Projects Section */}
          <div className="mt-8">
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

          {/* Blog Section */}
          <div className="mt-8">
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
                      <h3 className="text-xs xs:text-sm sm:text-base transition-colors break-words text-terminal-text">
                        {post.title}
                      </h3>
                      <span className="text-[10px] xs:text-xs sm:text-sm ml-2 sm:ml-4 whitespace-nowrap flex-shrink-0 text-terminal-muted">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="mb-3">
                    <h3 className="text-sm sm:text-base mb-2 text-terminal-text">Coming Soon</h3>
                    <p className="text-xs sm:text-sm text-terminal-muted">
                      Blog posts will be added here. Stay tuned for insights on backend development, cloud architecture, and more.
                    </p>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
