"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { createParentInvitation, validateParentInvitation, type ParentInvitationErrors, type ParentInvitationValues } from "@/app/lib/parent-invitations";
import { useParentInvitations } from "./parent-invitations-provider";

const relationships = ["Mamá", "Papá", "Tutor/a"] as const;
const fieldClassName = "w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-foreground placeholder:text-[#B6A99B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-[#C5413A]";
const labelClassName = "mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-muted";

export function ParentInvitationForm({ childId, onClose }: { childId: string; onClose: () => void }) {
  const { invitationsByChild, addInvitation } = useParentInvitations();
  const [errors, setErrors] = useState<ParentInvitationErrors>({});
  const submitted = useRef(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const values: ParentInvitationValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      relationship: relationships.find((relationship) => relationship === formData.get("relationship")) ?? "Mamá",
    };
    const nextErrors = validateParentInvitation(values, invitationsByChild[childId] ?? [], emailInput.validity.valid);
    setErrors(nextErrors);

    const invalidField = Object.keys(nextErrors)[0];
    if (invalidField) {
      form.querySelector<HTMLElement>(`[name="${invalidField}"]`)?.focus();
      return;
    }

    submitted.current = true;
    addInvitation(childId, createParentInvitation(values));
    onClose();
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-[18px]">
        <label htmlFor="parent-name" className={labelClassName}>NOMBRE DEL PADRE/MADRE</label>
        <input id="parent-name" name="name" required placeholder="Ej. Diego Fernández" className={fieldClassName} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "parent-name-error" : undefined} />
        {errors.name && <p id="parent-name-error" className="mt-2 text-[13px] font-bold text-[#C5413A]">{errors.name}</p>}
      </div>
      <div className="mb-[18px]">
        <label htmlFor="parent-email" className={labelClassName}>EMAIL</label>
        <input id="parent-email" name="email" type="email" required placeholder="correo@ejemplo.com" className={fieldClassName} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "parent-email-error" : undefined} />
        {errors.email && <p id="parent-email-error" className="mt-2 text-[13px] font-bold text-[#C5413A]">{errors.email}</p>}
      </div>
      <fieldset className="mb-5">
        <legend className={`${labelClassName} mb-[10px]`}>PARENTESCO</legend>
        <div className="flex gap-[9px]">
          {relationships.map((relationship) => (
            <label key={relationship} className="min-w-0 flex-1 cursor-pointer">
              <input type="radio" name="relationship" value={relationship} defaultChecked={relationship === "Mamá"} className="peer sr-only" />
              <span className="block rounded-full border-[1.5px] border-border bg-[#FFFDF9] p-[11px] text-center text-[14px] font-extrabold text-[#6E6359] peer-checked:border-[#9FB8EC] peer-checked:bg-[#CCD8F4] peer-checked:text-[#4E72C8] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">{relationship}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mb-5 rounded-2xl border-[1.5px] border-dashed border-[#E6D08A] bg-[#FBF1D6] p-[18px] text-center">
        <div className="mb-2 text-[12px] font-extrabold tracking-[0.7px] text-[#A88526]">CÓDIGO DE INVITACIÓN</div>
        <div className="font-heading text-[34px] font-semibold tracking-[7px] text-[#8A7234]">7K4P9</div>
        <div className="mt-[6px] text-[13px] text-[#A88526]">Vence en 7 días</div>
      </div>
      <p className="mb-4 text-[13px] leading-[1.45] text-muted">Demostración: no se enviarán correos ni se activarán cuentas.</p>
      <button type="submit" className="flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-[14px] bg-linear-to-b from-[#F4977E] to-[#EE8164] p-[14px] text-[15.5px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></svg>
        Enviar invitación
      </button>
    </form>
  );
}
