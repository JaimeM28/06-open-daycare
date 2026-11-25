import Link from "next/link";
import { avatarColors, type Child } from "@/app/data/children";
import { FeedIcon } from "@/app/components/feed/feed-icons";

function parentCountLabel(count: number) {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

export function ChildCard({ child }: { child: Child }) {
  return (
    <Link
      href={`/nino/${child.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-border bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[#F2A78E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className={`flex size-12 shrink-0 items-center justify-center rounded-full font-heading text-[19px] font-semibold ${avatarColors[child.avatarColor]}`}>
        {child.initial}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-[16px] font-semibold">{child.name}</h2>
        <p className="text-[13px] text-subtle">
          {child.age} años · {parentCountLabel(child.parents.length)}
        </p>
      </div>
      {child.allergyLabel ? (
        <span className="shrink-0 rounded-full bg-[#FBD8CC] px-[9px] py-[5px] text-[11px] font-extrabold text-[#D9684A]">
          {child.allergyLabel}
        </span>
      ) : child.parents.length === 0 ? (
        <span className="shrink-0 rounded-full bg-[#F9D2DE] px-[9px] py-[5px] text-[11px] font-extrabold text-[#C56486]">
          VINCULAR
        </span>
      ) : (
        <FeedIcon name="chevronRight" size={18} strokeWidth={2.2} className="shrink-0 text-[#CBB89F]" />
      )}
    </Link>
  );
}
