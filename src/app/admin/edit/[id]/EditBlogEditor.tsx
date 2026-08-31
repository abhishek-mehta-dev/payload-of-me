"use client";

import StoryForm from "../../StoryForm";
import { updateBlog } from "../../actions";
import { BUILD_STORIES } from "@/content/build-stories";
import { useRouter } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
};

export default function EditBlogEditor({ blog }: { blog: Blog }) {
  const router = useRouter();

  return (
    <StoryForm
      initial={{
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        published: blog.published,
      }}
      submitLabel={BUILD_STORIES.admin.saveChanges}
      onSubmit={async (data) => {
        const result = await updateBlog(blog.id, data);
        if (result?.error) return result;
        router.push("/admin");
        router.refresh();
      }}
    />
  );
}
