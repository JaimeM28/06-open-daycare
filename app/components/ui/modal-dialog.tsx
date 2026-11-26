"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalDialogProps = {
  children: ReactNode;
  labelledBy: string;
  className: string;
  onClose: () => void;
  initialFocusId?: string;
};

export function ModalDialog({ children, labelledBy, className, onClose, initialFocusId }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartedOutside = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollContainers = [document.documentElement, document.body, ...document.querySelectorAll("main")];
    const previousOverflow = scrollContainers.map((element) => element.style.overflow);
    scrollContainers.forEach((element) => { element.style.overflow = "hidden"; });
    dialog.showModal();
    if (initialFocusId) document.getElementById(initialFocusId)?.focus();

    return () => {
      dialog.close();
      scrollContainers.forEach((element, index) => { element.style.overflow = previousOverflow[index]; });
      if (previousFocus?.isConnected && previousFocus.getClientRects().length > 0) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [initialFocusId]);

  function isOutside(clientX: number, clientY: number) {
    const bounds = dialogRef.current?.getBoundingClientRect();
    return bounds && (clientX < bounds.left || clientX > bounds.right || clientY < bounds.top || clientY > bounds.bottom);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      aria-modal="true"
      className={className}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;

        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea, [tabindex]")]
          .filter((element) => !element.matches(':disabled, [tabindex="-1"]') && element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) {
          event.preventDefault();
          event.currentTarget.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onPointerDown={(event) => { pointerStartedOutside.current = Boolean(isOutside(event.clientX, event.clientY)); }}
      onClick={(event) => {
        if (pointerStartedOutside.current && isOutside(event.clientX, event.clientY)) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
