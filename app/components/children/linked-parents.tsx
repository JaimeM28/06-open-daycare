import { avatarColors, type Parent } from "@/app/data/children";
import { FeedIcon } from "@/app/components/feed/feed-icons";

function ParentRow({ parent }: { parent: Parent }) {
  const isActive = parent.status === "active";
  const activeLabel = parent.relationship === "Mamá" ? "activa" : "activo";

  return (
    <div className="flex items-center gap-3">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-[16px] font-semibold ${avatarColors[parent.avatarColor]}`}>
        {parent.initial}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-extrabold">{parent.name}</div>
        <div className="text-[12.5px] text-subtle">
          {parent.relationship} · {isActive ? activeLabel : "invitación enviada"}
        </div>
      </div>
      <span className={`shrink-0 rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${isActive ? "bg-[#CFEBD8] text-[#3E9B6C]" : "bg-[#F7E7A6] text-[#9A7B1E]"}`}>
        {isActive ? activeLabel.toLocaleUpperCase("es") : "PENDIENTE"}
      </span>
    </div>
  );
}

export function LinkedParents({ parents }: { parents: Parent[] }) {
  return (
    <section className="rounded-2xl border border-border bg-surface px-[18px] py-4" aria-label="Padres vinculados">
      <h2 className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
        PADRES VINCULADOS
      </h2>
      <div className="flex flex-col gap-[14px]">
        {parents.length === 0 && <p className="text-[14.5px] text-muted">Sin padres vinculados.</p>}
        {parents.map((parent) => <ParentRow key={parent.id} parent={parent} />)}
        <button type="button" disabled className="flex cursor-default items-center gap-3 pt-2 text-left">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-[#B0A290]">
            <FeedIcon name="plus" size={18} strokeWidth={2.2} />
          </span>
          <span className="text-[14.5px] font-extrabold text-[#C5503A]">
            {parents.length === 0 ? "Vincular padre" : "Vincular otro padre"}
          </span>
        </button>
      </div>
    </section>
  );
}
