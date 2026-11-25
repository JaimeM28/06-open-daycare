import { FeedIcon } from "./feed-icons";

const postCategories = {
  achievement: { label: "LOGRO", className: "bg-[#CFEBD8] text-[#3E9B6C]" },
  activity: { label: "ACTIVIDAD", className: "bg-[#C7E7F1] text-[#2E89A6]" },
  announcement: { label: "ANUNCIO", className: "bg-[#CCD8F4] text-[#4E72C8]" },
};

export type FeedPost = {
  id: string;
  type: keyof typeof postCategories;
  name: string;
  time: string;
  recipient: string;
  text: string;
  reactionCount: number;
  commentCount: number;
  hasPhoto: boolean;
};

function PostHeader({ post }: { post: FeedPost }) {
  const category = postCategories[post.type];
  const isAnnouncement = post.type === "announcement";
  const avatarColors = isAnnouncement
    ? "bg-[#CCD8F4] text-[#4E72C8]"
    : "bg-[#A9D9E8] text-[#1F7A93]";

  return (
    <header className="mb-[14px] flex flex-wrap items-center gap-3 md:flex-nowrap">
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-full font-heading text-[17px] font-semibold ${avatarColors}`}
      >
        {isAnnouncement ? <FeedIcon name="announcement" size={20} /> : post.name[0]}
      </div>
      <div className="min-w-0 flex-1 basis-[150px] md:basis-0">
        <h2 className="font-heading text-[16.5px] font-semibold">{post.name}</h2>
        <div className="text-[12.5px] text-subtle">
          {post.time} · publicado por vos
        </div>
      </div>
      <div
        className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${category.className}`}
      >
        <span className="size-2 rounded-full bg-current" />
        <span className="text-[12px] font-extrabold tracking-[0.5px]">
          {category.label}
        </span>
      </div>
    </header>
  );
}

function PostFooter({ post }: { post: FeedPost }) {
  return (
    <footer className="mt-4 flex items-center gap-[18px] border-t border-[#F0E6D8] pt-[14px] text-[14px] font-bold">
      <span
        aria-label={`${post.reactionCount} reacciones`}
        className="flex items-center gap-[7px] text-accent"
      >
        <FeedIcon name="heart" fill="currentColor" />
        {post.reactionCount}
      </span>
      <button
        type="button"
        disabled
        aria-label={`${post.commentCount} comentarios`}
        className="flex cursor-default items-center gap-[7px] text-muted"
      >
        <FeedIcon name="comment" size={18} />
        {post.commentCount}
      </button>
      <button
        type="button"
        disabled
        className="ml-auto cursor-default font-extrabold text-[#C5503A]"
      >
        Editar
      </button>
    </footer>
  );
}

function PhotoPlaceholder() {
  return (
    <div className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]">
      <FeedIcon name="photo" size={30} strokeWidth={1.7} />
      <span className="text-[13.5px]">Foto · pintando con témperas</span>
    </div>
  );
}

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <article
      aria-label={`${post.name}: ${postCategories[post.type].label}`}
      className="rounded-[20px] border border-border bg-surface px-4 py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)] md:px-[22px]"
    >
      <PostHeader post={post} />
      <div className="mb-2.5 text-[12.5px] text-subtle">Para: {post.recipient}</div>
      <p className="text-[15.5px] leading-[1.55] text-[#4A4038]">{post.text}</p>
      {post.hasPhoto && <PhotoPlaceholder />}
      <PostFooter post={post} />
    </article>
  );
}
