import { children } from "@/app/data/children";
import type { FeedPost, PostType } from "@/app/data/posts";

export type PostFormValues = {
  recipientIds: string[];
  isClassroom: boolean;
  type: PostType;
  text: string;
};

export type PostFormErrors = Partial<Record<"recipients" | "text", string>>;

export function validatePostForm(values: PostFormValues): PostFormErrors {
  const errors: PostFormErrors = {};
  const hasRecipients = children.some((child) => values.recipientIds.includes(child.id));
  if (!values.isClassroom && !hasRecipients) errors.recipients = "Seleccioná al menos un niño o toda la sala.";
  if (!values.text.trim()) errors.text = "Escribí una descripción para la publicación.";
  return errors;
}

export function createPost(values: PostFormValues, now: Date): FeedPost {
  const recipients = children.filter((child) => values.recipientIds.includes(child.id));
  const names = recipients.map((child) => child.name).join(", ");
  return {
    id: crypto.randomUUID(),
    type: values.type,
    name: values.isClassroom ? "Toda la sala" : names,
    time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
    recipient: values.isClassroom ? "toda la sala" : `${recipients.length === 1 ? "familia" : "familias"} de ${names}`,
    text: values.text.trim(),
    reactionCount: 0,
    commentCount: 0,
    hasPhoto: values.type === "photo",
  };
}
