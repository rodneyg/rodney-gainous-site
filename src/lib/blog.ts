export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
}

// Define blog posts metadata manually for now
const blogPostsMetadata: BlogPost[] = [
  {
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    description: 'The first post on my new blog - why I decided to start writing and what you can expect.',
    date: '2025-04-13',
    author: 'Rodney Gainous Jr.',
    tags: ['meta', 'personal'],
    published: true,
  },
  {
    slug: 'building-ai-products',
    title: 'Building AI Products That Matter',
    description: 'Lessons from building SafeDose and other AI-powered health tech products.',
    date: '2025-04-10',
    author: 'Rodney Gainous Jr.',
    tags: ['ai', 'health-tech', 'product'],
    published: true,
  },
  {
    slug: 'lessons-from-fundraising',
    title: 'Lessons from Raising $1M in 2 Minutes',
    description: 'What I learned from successfully raising capital and what I wish I knew beforehand.',
    date: '2025-04-05',
    author: 'Rodney Gainous Jr.',
    tags: ['fundraising', 'startups', 'entrepreneurship'],
    published: true,
  },
];

export function getAllPosts(): BlogPost[] {
  // Sort by date descending (newest first)
  return blogPostsMetadata
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsMetadata.find(post => post.slug === slug && post.published);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPostsMetadata
    .filter(post => post.published && post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
