import type { BlogPost } from '../data/blog';

export function previewBlogPosts(posts: BlogPost[]): BlogPost[] {
  if (!import.meta.env.DEV || posts.length !== 3) return posts;
  return Array.from({ length: 5 }, () => posts).flat();
}
