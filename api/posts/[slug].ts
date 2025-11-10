import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPostBySlug } from '../../src/api/blog';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Slug is required' });
    }

    const post = await getPostBySlug(slug);
    res.status(200).json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(404).json({ error: 'Post not found' });
  }
}
