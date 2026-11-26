import Link from "next/link";
import { FeedIcon, type FeedIconName } from "./feed-icons";

const navigationItems: { label: string; icon: FeedIconName }[] = [
  { label: "Avisos", icon: "bell" },
  { label: "Mi cuenta", icon: "user" },
];

type SidebarSection = "feed" | "children";

const pageLinks: { label: string; icon: FeedIconName; href: string; section: SidebarSection }[] = [
  { label: "Feed", icon: "home", href: "/", section: "feed" },
  { label: "Niños", icon: "children", href: "/ninos", section: "children" },
];

export function Sidebar({ activeSection }: { activeSection: SidebarSection }) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-surface px-4 py-6 md:sticky md:top-0 md:h-screen md:w-[248px] md:border-r md:border-b-0">
      <div className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]">
        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] text-white">
          <FeedIcon name="sun" size={21} strokeWidth={2.2} />
        </div>
        <div>
          <div className="font-heading text-[17px] leading-none font-semibold">
            OpenDayCare
          </div>
          <div className="mt-0.5 text-[11.5px] text-subtle">Sala Soles</div>
        </div>
      </div>

      <button
        type="button"
        disabled
        className="mb-[18px] flex w-full cursor-default items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <FeedIcon name="plus" size={17} strokeWidth={2.4} />
        Nueva publicación
      </button>

      <nav aria-label="Navegación principal" className="grid grid-cols-2 gap-1 md:flex md:flex-1 md:flex-col">
        {pageLinks.map(({ label, icon, href, section }) => (
          <Link
            key={section}
            href={href}
            aria-current={activeSection === section ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] focus-visible:outline-2 focus-visible:outline-accent ${activeSection === section ? "bg-accent-soft font-extrabold text-[#D9583C]" : "font-semibold text-[#6E6359]"}`}
          >
            <FeedIcon name={icon} />
            {label}
          </Link>
        ))}
        {navigationItems.map(({ label, icon }) => (
          <button
            key={icon}
            type="button"
            disabled
            className="flex cursor-default items-center gap-3 rounded-xl px-3 py-[11px] text-left text-[14.5px] font-semibold text-[#6E6359]"
          >
            <FeedIcon name={icon} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-2.5 border-t border-border pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#F2937A] font-heading text-[16px] font-semibold text-white">
            C
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-extrabold">Caro Giménez</div>
            <div className="text-[12px] text-subtle">Maestra · Soles</div>
          </div>
          <button
            type="button"
            disabled
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            className="flex size-8 shrink-0 cursor-default items-center justify-center rounded-[10px] bg-background text-muted"
          >
            <FeedIcon name="logout" size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
