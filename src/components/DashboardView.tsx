'use client';

import ProfileCard from './cards/ProfileCard';
import WorkExperienceCard from './cards/WorkExperienceCard';
import ProjectCard from './cards/ProjectCard';
import { workExperiences } from '@/data/workExperience';
import { useProjectsQuery, usePostsQuery } from '@/hooks/useMdxQueries';
import { useRouter } from 'next/navigation';
import { HoverRow } from '@/components/ui/HoverRow';
import { format } from 'date-fns';

// Helper to format date in lowercase "jan 21, 2023" format
const formatDateLowercase = (date: Date) => {
  return format(date, 'MMM dd, yyyy').toLowerCase();
};

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
            description="21-year-old co-founder building Crosmos — memory infrastructure that gives AI agents a brain that actually remembers, instead of waking up amnesiac every prompt. Won Smart India Hackathon (India's largest, 1M+ participants), got backed by the LocalHostHQ Founders Program, and currently moving to Bangalore to build. I live in the terminal, cook questionably bangin food, and debug broken configs at 4 AM for fun. "
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
            <div className="space-y-1">
              {posts.length > 0 ? (
                posts.slice(0, 3).map((post) => (
                  <HoverRow
                    key={post.slug}
                    onClick={() => router.push(`/blog/${post.slug}`)}
                  >
                    <div className="flex justify-between items-center py-3">
                      <h3 className="text-base font-bold text-white">
                        {post.title}
                      </h3>
                      <span className="text-sm text-terminal-muted ml-4 whitespace-nowrap">
                        {formatDateLowercase(new Date(post.date))}
                      </span>
                    </div>
                  </HoverRow>
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
