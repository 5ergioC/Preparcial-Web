"use client";
import React, { createContext, useContext } from "react";
import type { Author, AuthorInput } from "@/lib/authorsApi";
import useAuthorsData from "@/hooks/useAuthorsData";

type AuthorsCtx = {
  authors: Author[];
  loading: boolean;
  error: string | null;
  load: () => Promise<void>;
  create: (values: AuthorInput) => Promise<void>;
  update: (id: number, values: AuthorInput) => Promise<void>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Author | undefined>;
  count: number;
};

const Ctx = createContext<AuthorsCtx | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const value = useAuthorsData();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuthorsCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthorsCtx must be used within AuthorsProvider");
  return ctx;
}
