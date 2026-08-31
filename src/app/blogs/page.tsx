import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BlogsPageView from "@/components/BlogsPageView";
import { BUILD_STORIES } from "@/content/build-stories";

export const metadata: Metadata = {
  title: `Build Stories | Abhishek Mehta`,
  description: BUILD_STORIES.archiveSubtitle,
};

export const revalidate = 60;

async function getPublishedBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();
  return <BlogsPageView blogs={blogs} />;
}
