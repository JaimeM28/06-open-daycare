"use client";

import { notFound } from "next/navigation";
import { ChildProfile } from "./child-profile";
import { useChildren } from "./children-provider";

export function TemporaryChildProfile({ id }: { id: string }) {
  const { temporaryChildren } = useChildren();
  const child = temporaryChildren.find((item) => item.id === id);

  if (!child) notFound();

  return <ChildProfile child={child} showAllergyLabels />;
}
