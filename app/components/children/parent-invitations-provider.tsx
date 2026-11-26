"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { children as originalChildren } from "@/app/data/children";
import { hasInvitationEmail, type ParentInvitation } from "@/app/lib/parent-invitations";

type ParentInvitationsContextValue = {
  invitationsByChild: Record<string, ParentInvitation[]>;
  addInvitation: (childId: string, invitation: ParentInvitation) => void;
};

const ParentInvitationsContext = createContext<ParentInvitationsContextValue | null>(null);

export function ParentInvitationsProvider({ children }: { children: ReactNode }) {
  const [invitationsByChild, setInvitationsByChild] = useState<Record<string, ParentInvitation[]>>({});

  function addInvitation(childId: string, invitation: ParentInvitation) {
    if (!originalChildren.some((child) => child.id === childId)) return;
    setInvitationsByChild((current) => {
      const invitations = current[childId] ?? [];
      if (hasInvitationEmail(invitations, invitation.email)) return current;
      return { ...current, [childId]: [...invitations, invitation] };
    });
  }

  return (
    <ParentInvitationsContext value={{ invitationsByChild, addInvitation }}>
      {children}
    </ParentInvitationsContext>
  );
}

export function useParentInvitations() {
  const context = useContext(ParentInvitationsContext);
  if (!context) throw new Error("useParentInvitations must be used within ParentInvitationsProvider");
  return context;
}
