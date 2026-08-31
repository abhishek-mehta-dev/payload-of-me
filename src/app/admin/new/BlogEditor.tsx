"use client";

import StoryForm, { emptyStoryForm } from "../StoryForm";
import { saveBlog } from "../actions";
import { BUILD_STORIES } from "@/content/build-stories";
import { useRouter } from "next/navigation";

export default function BlogEditor() {
  const router = useRouter();

  return (
    <StoryForm
      initial={emptyStoryForm()}
      submitLabel={BUILD_STORIES.admin.saveStory}
      onSubmit={async (data) => {
        const result = await saveBlog(data);
        if (result?.error) return result;
        router.push("/admin");
        router.refresh();
      }}
    />
  );
}
