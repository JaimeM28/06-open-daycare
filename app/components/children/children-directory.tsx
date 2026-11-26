"use client";

import { useState } from "react";
import type { Child } from "@/app/data/children";
import { FeedIcon } from "@/app/components/feed/feed-icons";
import { ChildCard } from "./child-card";
import { AddChildModal } from "./add-child-modal";
import { useChildren } from "./children-provider";

function normalizeSearch(value: string) {
  return value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}

export function ChildrenDirectory({ items }: { items: Child[] }) {
  const [search, setSearch] = useState("");
  const [isAddingChild, setIsAddingChild] = useState(false);
  const { temporaryChildren } = useChildren();
  const query = normalizeSearch(search);
  const filteredChildren = [...items, ...temporaryChildren].filter((child) => normalizeSearch(child.name).includes(query));

  return (
    <>
      <header className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-[#D9583C]">GESTIÓN</div>
          <h1 className="font-heading text-[30px] font-semibold">Niños</h1>
        </div>
        <button type="button" onClick={() => setIsAddingChild(true)} className="flex cursor-pointer items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <FeedIcon name="plus" size={17} strokeWidth={2.4} />
          Agregar niño
        </button>
      </header>
      <label className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-border bg-surface px-4 py-3 focus-within:ring-2 focus-within:ring-accent">
        <FeedIcon name="search" size={18} className="shrink-0 text-[#B0A290]" />
        <span className="sr-only">Buscar niño</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar niño…"
          className="min-w-0 flex-1 border-none bg-transparent px-[2px] py-px text-[15px] text-foreground outline-none placeholder:text-[#B6A99B]"
        />
      </label>
      <section aria-labelledby="classroom-heading">
        <div className="mb-[14px] flex items-center gap-3">
          <h2 id="classroom-heading" className="text-[12.5px] font-extrabold tracking-[0.8px]">SALA SOLES</h2>
          <span aria-live="polite" className="text-[13px] text-subtle">
            {filteredChildren.length} {filteredChildren.length === 1 ? "niño" : "niños"}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#E7DAC8]" />
        </div>
        {filteredChildren.length === 0 ? (
          <p role="status" className="rounded-[18px] border border-border bg-surface p-6 text-center text-muted">No se encontraron niños</p>
        ) : (
          <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
            {filteredChildren.map((child) => <ChildCard key={child.id} child={child} />)}
          </div>
        )}
      </section>
      {isAddingChild && <AddChildModal onClose={() => setIsAddingChild(false)} />}
    </>
  );
}
