"use client";

import { useRef, useState, type ReactNode, type SubmitEvent } from "react";
import { createChild, validateChildForm, type ChildFormErrors, type ChildFormValues } from "@/app/lib/child-form";
import { FeedIcon } from "@/app/components/feed/feed-icons";
import { useChildren } from "./children-provider";

const fieldClassName = "w-full min-w-0 rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-foreground placeholder:text-[#B6A99B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-[#C5413A]";

function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-muted">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-2 text-[13px] font-bold text-[#C5413A]">{error}</p>}
    </div>
  );
}

export function ChildForm({ onClose }: { onClose: () => void }) {
  const { addChild } = useChildren();
  const [errors, setErrors] = useState<ChildFormErrors>({});
  const submitted = useRef(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values: ChildFormValues = {
      name: String(formData.get("name") ?? ""),
      birthDate: String(formData.get("birthDate") ?? ""),
      classroom: String(formData.get("classroom") ?? ""),
      allergies: String(formData.get("allergies") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };
    const today = new Date();
    const nextErrors = validateChildForm(values, today);
    setErrors(nextErrors);

    const invalidField = Object.keys(nextErrors)[0];
    if (invalidField) {
      form.querySelector<HTMLElement>(`[name="${invalidField}"]`)?.focus();
      return;
    }

    submitted.current = true;
    addChild(createChild(values, today));
    onClose();
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-5 sm:px-[26px]">
        <button type="button" onClick={onClose} className="cursor-pointer rounded-sm text-[15px] font-bold text-muted focus-visible:outline-2 focus-visible:outline-accent">Cancelar</button>
        <h2 id="add-child-heading" className="font-heading text-[18px] font-semibold">Agregar niño</h2>
        <button type="submit" className="cursor-pointer rounded-sm text-[15px] font-extrabold text-[#D9583C] focus-visible:outline-2 focus-visible:outline-accent">Guardar</button>
      </header>
      <div className="space-y-[18px] px-5 py-6 sm:px-[26px]">
        <FormField id="child-name" label="NOMBRE COMPLETO" error={errors.name}>
          <input id="child-name" name="name" required placeholder="Ej. Martina López" className={fieldClassName} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "child-name-error" : undefined} />
        </FormField>
        <div className="flex flex-col gap-[14px] sm:flex-row">
          <FormField id="child-birth-date" label="FECHA DE NACIMIENTO" error={errors.birthDate}>
            <input id="child-birth-date" name="birthDate" required placeholder="dd/mm/aaaa" className={fieldClassName} aria-invalid={Boolean(errors.birthDate)} aria-describedby={errors.birthDate ? "child-birth-date-error" : undefined} />
          </FormField>
          <FormField id="child-classroom" label="SALA" error={errors.classroom}>
            <div className="relative">
              <select id="child-classroom" name="classroom" required defaultValue="Soles" className={`${fieldClassName} appearance-none pr-10 font-bold`} aria-invalid={Boolean(errors.classroom)} aria-describedby={errors.classroom ? "child-classroom-error" : undefined}>
                <option value="Soles">Soles</option>
              </select>
              <FeedIcon name="chevronDown" size={16} strokeWidth={2.2} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#B0A290]" />
            </div>
          </FormField>
        </div>
        <FormField id="child-allergies" label="ALERGIAS (ETIQUETAS)">
          <input id="child-allergies" name="allergies" placeholder="Ej. Maní, Lactosa" className={fieldClassName} />
        </FormField>
        <FormField id="child-notes" label="NOTAS MÉDICAS">
          <textarea id="child-notes" name="notes" placeholder="Indicaciones, medicación, contactos…" className={`${fieldClassName} min-h-[90px] resize-y leading-[1.5]`} />
        </FormField>
      </div>
    </form>
  );
}
