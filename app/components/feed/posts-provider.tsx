"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { FeedPost } from "@/app/data/posts";
import { createPost, validatePostForm, type PostFormValues } from "@/app/lib/post-form";
import { CreatePostModal } from "./create-post-modal";

type PostsContextValue = {
  newPosts: FeedPost[];
  openPostForm: () => void;
};

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [newPosts, setNewPosts] = useState<FeedPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();

  function publishPost(values: PostFormValues) {
    if (Object.keys(validatePostForm(values)).length > 0) return;
    const post = createPost(values, new Date());
    setNewPosts((current) => [post, ...current]);
    setIsFormOpen(false);
    if (window.location.pathname !== "/") router.push("/");
  }

  return (
    <PostsContext value={{ newPosts, openPostForm: () => setIsFormOpen(true) }}>
      {children}
      {isFormOpen && <CreatePostModal onClose={() => setIsFormOpen(false)} onPublish={publishPost} />}
    </PostsContext>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within PostsProvider");
  return context;
}
