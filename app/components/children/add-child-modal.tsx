"use client";

import { ModalDialog } from "@/app/components/ui/modal-dialog";
import { ChildForm } from "./child-form";

export function AddChildModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalDialog
      labelledBy="add-child-heading"
      initialFocusId="child-name"
      onClose={onClose}
      className="fixed inset-x-0 top-6 bottom-auto mx-auto my-0 max-h-[calc(100dvh-48px)] w-[calc(100%-32px)] max-w-[520px] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-[#FBF4EC] p-0 text-foreground shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] backdrop:bg-foreground/35 md:top-10 md:max-h-[calc(100dvh-80px)]"
    >
      <ChildForm onClose={onClose} />
    </ModalDialog>
  );
}
