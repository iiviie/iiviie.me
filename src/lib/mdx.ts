import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import * as shiki from 'shiki';

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  slug: string;
}

export interface PostData {
  frontmatter: PostMetadata;
  content: any;
}

export interface ProjectMetadata {
  title: string;
  description: string;
  tech: string[];
  status: 'production' | 'active' | 'stable' | 'maintenance';
  date: string;
  size?: string;
  slug: string;
}

export interface ProjectData {
  frontmatter: ProjectMetadata;
  content: any;
}

const API_URL = 'http://localhost:3001/api';

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const response = await fetch(`${API_URL}/posts/${slug}`);
  if (!response.ok) {
    throw new Error(`Post not found: ${slug}`);
  }
  return await response.json();
}

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  try {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectData> {
  const response = await fetch(`${API_URL}/projects/${slug}`);
  if (!response.ok) {
    throw new Error(`Project not found: ${slug}`);
  }
  return await response.json();
} 