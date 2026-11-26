"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { avatarColors, children } from "@/app/data/children";
import { postCategories, type PostType } from "@/app/data/posts";
import { validatePostForm, type PostFormErrors, type PostFormValues } from "@/app/lib/post-form";
import { FeedIcon } from "./feed-icons";

const legendClassName = "mb-[10px] block text-[12px] font-extrabold tracking-[0.7px] text-muted";
const recipientClassName = "flex items-center gap-2 rounded-full border-[1.5px] border-border bg-[#FFFDF9] py-[6px] pr-[14px] pl-[6px] text-[14px] font-bold text-[#6E6359] peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent";
const postTypes = Object.keys(postCategories) as PostType[];

export function PostForm({ onClose, onPublish }: { onClose: () => void; onPublish: (values: PostFormValues) => void }) {
  const [values, setValues] = useState<PostFormValues>({ recipientIds: ["mateo-fernandez"], isClassroom: false, type: "activity", text: "" });
  const [errors, setErrors] = useState<PostFormErrors>({});
  const firstRecipientRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const submitted = useRef(false);

  function toggleRecipient(id: string) {
    setValues((current) => ({
      ...current,
      isClassroom: false,
      recipientIds: current.recipientIds.includes(id) ? current.recipientIds.filter((recipientId) => recipientId !== id) : [...current.recipientIds, id],
    }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;
    const nextErrors = validatePostForm(values);
    setErrors(nextErrors);
    if (nextErrors.recipients) {
      firstRecipientRef.current?.focus();
    } else if (nextErrors.text) {
      textRef.current?.focus();
    } else {
      submitted.current = true;
      onPublish(values);
    }
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-5 sm:px-[26px]">
        <button type="button" onClick={onClose} className="shrink-0 cursor-pointer rounded-sm text-[14px] font-bold text-muted focus-visible:outline-2 focus-visible:outline-accent sm:text-[15px]">Cancelar</button>
        <h2 id="create-post-heading" className="text-center font-heading text-[17px] font-semibold sm:text-[18px]">Nueva publicación</h2>
        <button type="submit" className="shrink-0 cursor-pointer rounded-sm text-[14px] font-extrabold text-[#D9583C] focus-visible:outline-2 focus-visible:outline-accent sm:text-[15px]">Publicar</button>
      </header>
      <div className="px-5 py-6 sm:px-[26px]">
        <fieldset className="mb-[22px]" aria-invalid={Boolean(errors.recipients)} aria-describedby={errors.recipients ? "post-recipients-error" : undefined}>
          <legend className={legendClassName}>PARA</legend>
          <div className="flex flex-wrap gap-[9px]">
            {children.map((child, index) => (
              <label key={child.id} className="relative cursor-pointer">
                <input ref={index === 0 ? firstRecipientRef : undefined} id={index === 0 ? "post-first-recipient" : undefined} type="checkbox" name="recipientIds" value={child.id} aria-label={child.name} checked={values.recipientIds.includes(child.id)} onChange={() => toggleRecipient(child.id)} className="peer sr-only" aria-invalid={Boolean(errors.recipients)} aria-describedby={errors.recipients ? "post-recipients-error" : undefined} />
                <span className={recipientClassName}>
                  <span aria-hidden="true" className={`flex size-[26px] items-center justify-center rounded-full font-heading text-[13px] font-semibold ${avatarColors[child.avatarColor]}`}>{child.initial}</span>
                  {child.name.split(" ")[0]}
                </span>
              </label>
            ))}
            <label className="relative cursor-pointer">
              <input type="checkbox" name="isClassroom" checked={values.isClassroom} onChange={(event) => setValues((current) => ({ ...current, isClassroom: event.target.checked, recipientIds: [] }))} className="peer sr-only" />
              <span className={`${recipientClassName} h-full px-4`}>Toda la sala</span>
            </label>
          </div>
          {errors.recipients && <p id="post-recipients-error" className="mt-2 text-[13px] font-bold text-[#C5413A]">{errors.recipients}</p>}
        </fieldset>
        <fieldset className="mb-[22px]">
          <legend className={legendClassName}>TIPO</legend>
          <div className="flex flex-wrap gap-[9px]">
            {postTypes.map((type) => {
              const category = postCategories[type];
              return (
                <label key={type} className="relative cursor-pointer">
                  <input type="radio" name="type" value={type} checked={values.type === type} onChange={() => setValues((current) => ({ ...current, type }))} className="peer sr-only" />
                  <span className={`block rounded-full px-4 py-2 text-[13.5px] font-extrabold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${category.className} ${category.selectedClassName}`}>{category.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <div className="mb-[22px]">
          <label htmlFor="post-text" className={legendClassName}>DESCRIPCIÓN</label>
          <textarea ref={textRef} id="post-text" name="text" required value={values.text} onChange={(event) => setValues((current) => ({ ...current, text: event.target.value }))} placeholder="Contá cómo le fue hoy…" className="block min-h-[120px] w-full resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] text-[15px] leading-[1.5] text-foreground placeholder:text-[#B6A99B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-[#C5413A]" aria-invalid={Boolean(errors.text)} aria-describedby={errors.text ? "post-text-error" : undefined} />
          {errors.text && <p id="post-text-error" className="mt-2 text-[13px] font-bold text-[#C5413A]">{errors.text}</p>}
        </div>
        <section aria-labelledby="post-photos-heading">
          <h3 id="post-photos-heading" className={legendClassName}>FOTOS</h3>
          <div className="flex flex-wrap gap-3">
            <div aria-label="Miniatura ilustrativa" className="flex size-24 items-center justify-center rounded-[14px] border border-border bg-[#F4ECE1] text-[#CBB89F]">
              <FeedIcon name="photo" size={26} strokeWidth={1.7} />
            </div>
            <button type="button" disabled className="flex size-24 cursor-default flex-col items-center justify-center gap-[6px] rounded-[14px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]">
              <FeedIcon name="plus" size={22} className="text-[#C5503A]" />
              <span className="text-[12px]">Agregar</span>
            </button>
          </div>
        </section>
      </div>
    </form>
  );
}
