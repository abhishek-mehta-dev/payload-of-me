import { supabase } from '@/lib/supabase';
import BlogsList from './BlogsList';

async function getRecentBlogs() {
  const { data } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);
  return data || [];
}

export default async function BlogsSection() {
  const blogs = await getRecentBlogs();
  if (blogs.length === 0) return null;
  return <BlogsList blogs={blogs} />;
}
