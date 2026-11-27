"use client";

import { FeedIcon } from "./feed-icons";
import { usePosts } from "./posts-provider";

export function PostComposer() {
  const { openPostForm } = usePosts();
  return (
    <button
      type="button"
      onClick={openPostForm}
      className="mb-6 flex w-full cursor-pointer items-center gap-[14px] rounded-[18px] border border-border bg-surface px-[18px] py-[14px] text-left shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2937A] font-heading text-[16px] font-semibold text-white">
        C
      </span>
      <span className="flex-1 text-[15px] text-subtle">
        Compartí un momento…
      </span>
      <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <FeedIcon name="camera" />
      </span>
    </button>
  );
}
