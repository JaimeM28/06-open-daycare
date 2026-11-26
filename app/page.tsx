"use client";

import { useEffect, useRef } from "react";
import { FeedHeader } from "@/app/components/feed/feed-header";
import { PostComposer } from "@/app/components/feed/post-composer";
import { PostCard } from "@/app/components/feed/post-card";
import { Sidebar } from "@/app/components/feed/sidebar";
import { usePosts } from "@/app/components/feed/posts-provider";
import { originalPosts } from "@/app/data/posts";

export default function Home() {
  const { newPosts } = usePosts();
  const mainRef = useRef<HTMLElement>(null);
  const posts = [...newPosts, ...originalPosts];

  useEffect(() => {
    if (newPosts.length === 0) return;
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [newPosts]);

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar activeSection="feed" />
      <main ref={mainRef} className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-4 pt-6 pb-20 md:px-10 md:pt-[34px]">
          <FeedHeader />
          <PostComposer />
          <section aria-labelledby="today-heading">
            <div className="mb-[14px] flex items-center gap-[14px]">
              <h2
                id="today-heading"
                className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]"
              >
                PUBLICADO HOY
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-[#E7DAC8]" />
            </div>
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
