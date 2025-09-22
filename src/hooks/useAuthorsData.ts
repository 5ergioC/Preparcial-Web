"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Author, AuthorInput } from "@/lib/authorsApi";
import { fetchAuthors } from "@/lib/authorsApi";

export default function useAuthorsData() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);

  // Cargar una sola vez desde /api/authors
  const load = useCallback(async () => {
    if (loadedRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAuthors();
      setAuthors(data);
      loadedRef.current = true;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "No se pudo cargar");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  // Generar ID local incremental para "crear" en estado
  const nextId = useMemo(
    () => (base?: Author[]) => {
      const arr = base ?? authors;
      const max = arr.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0);
      return max + 1;
    },
    [authors]
  );

  // Acciones de CRUD en estado (sin persistir en backend)
  const create = useCallback(async (values: AuthorInput) => {
    setAuthors(prev => [{ id: nextId(prev), ...values }, ...prev]);
  }, [nextId]);

  const update = useCallback(async (id: number, values: AuthorInput) => {
    setAuthors(prev => prev.map(a => Number(a.id) === id ? { ...a, ...values } : a));
  }, []);

  const remove = useCallback(async (id: number) => {
    setAuthors(prev => prev.filter(a => Number(a.id) !== id));
  }, []);

  const getById = useCallback(async (id: number) => {
    return authors.find(a => Number(a.id) === id);
  }, [authors]);

  const count = authors.length;

  return { authors, loading, error, load, create, update, remove, getById, count };
}
