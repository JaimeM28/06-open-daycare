"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Child } from "@/app/data/children";

type ChildrenContextValue = {
  temporaryChildren: Child[];
  addChild: (child: Child) => void;
};

const ChildrenContext = createContext<ChildrenContextValue | null>(null);

export function ChildrenProvider({ children }: { children: ReactNode }) {
  const [temporaryChildren, setTemporaryChildren] = useState<Child[]>([]);

  function addChild(child: Child) {
    setTemporaryChildren((current) => current.some((item) => item.id === child.id) ? current : [...current, child]);
  }

  return (
    <ChildrenContext value={{ temporaryChildren, addChild }}>
      {children}
    </ChildrenContext>
  );
}

export function useChildren() {
  const context = useContext(ChildrenContext);
  if (!context) throw new Error("useChildren must be used within ChildrenProvider");
  return context;
}
