import type { Child } from "@/app/data/children";

export type ChildFormValues = {
  name: string;
  birthDate: string;
  classroom: string;
  allergies: string;
  notes: string;
};

export type ChildFormErrors = Partial<Record<keyof ChildFormValues, string>>;

export function parseBirthDate(value: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (year < 1) return null;

  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

export function validateChildForm(values: ChildFormValues, today: Date): ChildFormErrors {
  const errors: ChildFormErrors = {};
  const birthDate = parseBirthDate(values.birthDate);
  const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (!values.name.trim()) errors.name = "Ingresá el nombre completo.";
  if (!birthDate) {
    errors.birthDate = "Ingresá una fecha válida con formato dd/mm/aaaa.";
  } else if (birthDate > currentDay) {
    errors.birthDate = "La fecha de nacimiento no puede ser futura.";
  }
  if (values.classroom !== "Soles") errors.classroom = "Seleccioná la sala Soles.";

  return errors;
}

export function calculateAge(birthDate: Date, today: Date): number {
  const birthdayPending = today.getMonth() < birthDate.getMonth()
    || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

  return today.getFullYear() - birthDate.getFullYear() - Number(birthdayPending);
}

export function normalizeAllergies(value: string): string | null {
  const labels = value.split(",").map((label) => label.trim().toLocaleUpperCase("es")).filter(Boolean);
  return [...new Set(labels)].join(", ") || null;
}

export function isTemporaryChildId(id: string): boolean {
  return /^temporary-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id);
}

export function createChild(values: ChildFormValues, today: Date): Child {
  const birthDate = parseBirthDate(values.birthDate);
  if (!birthDate || Object.keys(validateChildForm(values, today)).length > 0) {
    throw new Error("Invalid child form values");
  }

  const dateFormat = new Intl.DateTimeFormat("es", { day: "numeric", month: "short", year: "numeric" });
  const name = values.name.trim();

  return {
    id: `temporary-${crypto.randomUUID()}`,
    name,
    age: calculateAge(birthDate, today),
    initial: Array.from(name)[0].toLocaleUpperCase("es"),
    avatarColor: "blue",
    birthDate: dateFormat.format(birthDate),
    classroom: "Soles",
    enrollmentDate: dateFormat.format(today),
    allergyLabel: normalizeAllergies(values.allergies),
    notes: values.notes.trim() || "Sin notas médicas",
    parents: [],
  };
}
