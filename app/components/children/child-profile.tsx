import Link from "next/link";
import { avatarColors, type Child } from "@/app/data/children";
import { FeedIcon } from "@/app/components/feed/feed-icons";
import { LinkedParents } from "./linked-parents";

function ProfileHeader({ child }: { child: Child }) {
  return (
    <header className="flex flex-wrap items-center gap-[18px] md:flex-nowrap">
      <span className={`flex size-[84px] shrink-0 items-center justify-center rounded-full font-heading text-[34px] font-semibold ${avatarColors[child.avatarColor]}`}>
        {child.initial}
      </span>
      <div className="min-w-0 flex-1 basis-[160px] md:basis-0">
        <h1 className="font-heading text-[28px] font-semibold">{child.name}</h1>
        <p className="mt-[3px] text-[15px] text-muted">
          {child.age} años · Sala {child.classroom}
        </p>
      </div>
      <button type="button" disabled className="cursor-default rounded-xl border-[1.5px] border-border bg-surface px-4 py-[9px] text-[14px] font-bold text-[#6E6359]">
        Editar
      </button>
    </header>
  );
}

function ChildDetails({ child }: { child: Child }) {
  const details = [
    { label: "Fecha de nacimiento", value: child.birthDate },
    { label: "Sala", value: child.classroom },
    { label: "Ingreso", value: child.enrollmentDate },
  ];

  return (
    <dl className="overflow-hidden rounded-2xl border border-border bg-surface">
      {details.map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-3 border-b border-[#F0E6D8] px-[18px] py-[15px] text-[14.5px] last:border-b-0">
          <dt className="text-muted">{label}</dt>
          <dd className="text-right font-extrabold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ChildProfile({ child }: { child: Child }) {
  return (
    <>
      <Link href="/ninos" className="mb-5 flex w-fit items-center gap-[7px] text-[14px] font-bold text-muted focus-visible:outline-2 focus-visible:outline-accent">
        <FeedIcon name="chevronLeft" size={18} strokeWidth={2.2} />
        Volver a Niños
      </Link>
      <div className="flex flex-wrap items-start gap-[26px]">
        <div className="flex min-w-0 flex-1 basis-full flex-col gap-[18px] md:min-w-[300px] md:basis-0">
          <ProfileHeader child={child} />
          <section className="flex gap-[14px] rounded-2xl bg-[#FBDAD6] px-[18px] py-4" aria-label={child.allergyLabel ? "Alergias y notas" : "Notas"}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#F4A8A0] text-white">
              <FeedIcon name="warning" size={22} strokeWidth={2.2} />
            </span>
            <div>
              <h2 className="mb-0.5 text-[15px] font-extrabold text-[#C5413A]">
                {child.allergyLabel ? "Alergias y notas" : "Notas"}
              </h2>
              <p className="text-[14.5px] leading-[1.5] text-[#B25249]">{child.notes}</p>
            </div>
          </section>
          <ChildDetails child={child} />
        </div>
        <div className="flex w-full shrink-0 flex-col gap-[14px] md:w-[300px]">
          <button type="button" disabled className="flex w-full cursor-default items-center justify-center gap-[9px] rounded-[14px] bg-foreground p-[13px] text-[15px] font-extrabold text-white">
            <FeedIcon name="sun" size={18} />
            Resumen del día
          </button>
          <LinkedParents parents={child.parents} />
        </div>
      </div>
    </>
  );
}
