import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllPosts } from '../../src/api/blog';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ error: 'Failed to get posts' });
  }
}
