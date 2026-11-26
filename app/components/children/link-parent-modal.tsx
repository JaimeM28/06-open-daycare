"use client";

import { ModalDialog } from "@/app/components/ui/modal-dialog";
import { FeedIcon } from "@/app/components/feed/feed-icons";
import { ParentInvitationForm } from "./parent-invitation-form";

export function LinkParentModal({ childId, childName, onClose }: { childId: string; childName: string; onClose: () => void }) {
  return (
    <ModalDialog
      labelledBy="link-parent-heading"
      initialFocusId="parent-name"
      onClose={onClose}
      className="fixed inset-x-0 top-6 bottom-auto mx-auto my-0 max-h-[calc(100dvh-48px)] w-[calc(100%-32px)] max-w-[480px] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-[#FBF4EC] p-0 text-foreground shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] backdrop:bg-foreground/35 md:top-10 md:max-h-[calc(100dvh-80px)]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-5 sm:px-[26px]">
        <div>
          <h2 id="link-parent-heading" className="font-heading text-[18px] font-semibold">Vincular padre</h2>
          <p className="text-[13px] text-subtle">a {childName}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar vinculación de padre" className="flex size-[34px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#F0E6D8] text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <FeedIcon name="close" size={18} strokeWidth={2.2} />
        </button>
      </header>
      <div className="px-5 py-[22px] sm:px-[26px]">
        <div className="mb-5 flex gap-[11px] rounded-[14px] bg-[#E3ECFB] px-4 py-[13px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E72C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          <p className="text-[13.5px] leading-[1.45] text-[#3F5694]">Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {childName.split(" ")[0]}.</p>
        </div>
        <ParentInvitationForm childId={childId} onClose={onClose} />
      </div>
    </ModalDialog>
  );
}
