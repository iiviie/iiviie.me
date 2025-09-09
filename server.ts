import express from 'express';
import cors from 'cors';
import { getAllPosts, getPostBySlug } from './src/api/blog';
import { getAllProjects, getProjectBySlug } from './src/api/projects';

const app = express();
const port = 3001; // Different from Vite's port

app.use(cors());
app.use(express.json());

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ error: 'Failed to get posts' });
  }
});

// Get post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await getPostBySlug(slug);
    res.json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(404).json({ error: 'Post not found' });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

// Get project by slug
app.get('/api/projects/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await getProjectBySlug(slug);
    res.json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(404).json({ error: 'Project not found' });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
}); 