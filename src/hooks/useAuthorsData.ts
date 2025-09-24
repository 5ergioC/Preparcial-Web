"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Author, AuthorInput } from "@/lib/authorsApi";
import { fetchAuthors, fetchAuthor, createAuthor, updateAuthor, deleteAuthor } from "@/lib/authorsApi";

export default function useAuthorsData() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);

  const load = useCallback(async () => {
    if (loadedRef.current) return;
    setLoading(true); setError(null);
    try { setAuthors(await fetchAuthors()); loadedRef.current = true; }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "No se pudo cargar"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const create = useCallback(async (values: AuthorInput) => {
    const created = await createAuthor(values);                 // ← persistente
    setAuthors(prev => [created, ...prev]);                     // sync estado
  }, []);

  const update = useCallback(async (id: number, values: AuthorInput) => {
    const updated = await updateAuthor(id, values);             // ← persistente
    setAuthors(prev => prev.map(a => Number(a.id) === id ? (updated ?? { ...a, ...values }) : a));
  }, []);

  const remove = useCallback(async (id: number) => {
    await deleteAuthor(id);                                     // ← persistente
    setAuthors(prev => prev.filter(a => Number(a.id) !== id));
  }, []);

  const getById = useCallback(async (id: number) => {
    // Si ya lo tengo en memoria, devuélvelo; si no, pide al servidor
    return authors.find(a => Number(a.id) === id) ?? (await fetchAuthor(id));
  }, [authors]);

  return { authors, loading, error, load, create, update, remove, getById };
}
