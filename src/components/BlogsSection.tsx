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

  if (blogs.length === 0) {
    return null; // Don't show the section if no blogs exist
  }

  return (
    <section id="blogs" className="py-20 md:py-32 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900/50 dark:to-blue-900/10 relative overflow-hidden px-6">
      <BlogsList blogs={blogs} />
    </section>
  );
}
