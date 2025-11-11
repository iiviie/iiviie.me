import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getPostBySlug, getAllProjects, getProjectBySlug, type PostMetadata, type PostData, type ProjectMetadata, type ProjectData } from '@/lib/mdx';

// Query keys
const queryKeys = {
  posts: ['posts'] as const,
  post: (slug: string) => ['posts', slug] as const,
  projects: ['projects'] as const,
  project: (slug: string) => ['projects', slug] as const,
};

// Posts hooks
export function usePostsQuery() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: getAllPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePostQuery(slug: string | null) {
  return useQuery({
    queryKey: queryKeys.post(slug || ''),
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Projects hooks
export function useProjectsQuery() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: getAllProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProjectQuery(slug: string | null) {
  return useQuery({
    queryKey: queryKeys.project(slug || ''),
    queryFn: () => getProjectBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
