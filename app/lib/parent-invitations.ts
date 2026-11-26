import type { Parent } from "@/app/data/children";

export type ParentInvitationValues = {
  name: string;
  email: string;
  relationship: Parent["relationship"];
};

export type ParentInvitation = Parent & { email: string; status: "pending" };
export type ParentInvitationErrors = Partial<Record<"name" | "email", string>>;

export function normalizeInvitationEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hasInvitationEmail(invitations: ParentInvitation[], email: string) {
  return invitations.some((invitation) => normalizeInvitationEmail(invitation.email) === normalizeInvitationEmail(email));
}

export function validateParentInvitation(values: ParentInvitationValues, invitations: ParentInvitation[], validEmail: boolean) {
  const errors: ParentInvitationErrors = {};
  if (!values.name.trim()) errors.name = "Introduce el nombre del padre, madre o tutor/a.";
  if (!values.email.trim() || !validEmail) {
    errors.email = "Introduce un email válido.";
  } else if (hasInvitationEmail(invitations, values.email)) {
    errors.email = "Ya hay una invitación para este email en este niño.";
  }
  return errors;
}

export function createParentInvitation(values: ParentInvitationValues): ParentInvitation {
  const name = values.name.trim();
  return {
    id: crypto.randomUUID(),
    name,
    initial: Array.from(name)[0].toLocaleUpperCase("es"),
    email: normalizeInvitationEmail(values.email),
    relationship: values.relationship,
    avatarColor: values.relationship === "Mamá" ? "parentPurple" : "parentBlue",
    status: "pending",
  };
}
