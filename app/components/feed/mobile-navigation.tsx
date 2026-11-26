"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ModalDialog } from "@/app/components/ui/modal-dialog";
import { FeedIcon } from "./feed-icons";

export function MobileNavigation({ brand, children }: { brand: ReactNode; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const headingId = useId();
  const panelId = useId();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    function handleViewportChange() {
      if (desktop.matches) setIsOpen(false);
    }
    desktop.addEventListener("change", handleViewportChange);
    return () => desktop.removeEventListener("change", handleViewportChange);
  }, []);

  return (
    <div className="border-b border-border bg-surface md:hidden">
      <header className="flex items-center justify-between gap-4 px-6 py-4">
        {brand}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          aria-controls={isOpen ? panelId : undefined}
          onClick={() => setIsOpen(true)}
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          <FeedIcon name="menu" size={24} />
        </button>
      </header>
      {isOpen && (
        <ModalDialog
          labelledBy={headingId}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 m-0 h-dvh max-h-none w-[min(320px,calc(100vw-48px))] max-w-none overflow-y-auto overscroll-contain border-0 bg-surface p-0 text-foreground shadow-xl backdrop:bg-foreground/35"
        >
          <div
            id={panelId}
            className="relative flex min-h-full flex-col px-4 py-6"
            onClickCapture={(event) => {
              if (event.target instanceof Element && event.target.closest("a[href]")) setIsOpen(false);
            }}
          >
            <h2 id={headingId} className="sr-only">Menú de navegación</h2>
            <button type="button" aria-label="Cerrar menú" onClick={() => setIsOpen(false)} className="absolute top-3 right-2 flex size-9 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-accent">
              <FeedIcon name="close" size={20} />
            </button>
            {children}
          </div>
        </ModalDialog>
      )}
    </div>
  );
}
