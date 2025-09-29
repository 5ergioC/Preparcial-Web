"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Author, AuthorInput, BookInput, PrizeInput } from "@/lib/authorsApi";
import {
  fetchAuthors,
  fetchAuthor,
  createAuthor,
  createBook,
  associateBookToAuthor,
  createPrize,
  associatePrizeToAuthor,
  updateAuthor,
  deleteAuthor,
} from "@/lib/authorsApi";

export default function useAuthorsData() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);

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

  useEffect(() => {
    void load();
  }, [load]);

  const createWithRelations = useCallback(
    async (author: AuthorInput, book: BookInput, prize: PrizeInput) => {
      const createdAuthor = await createAuthor(author);

      const createdBook = await createBook({
        ...book,
        editorial: { id: 1000, name: "BLOOMSBURY" },
      });
      await associateBookToAuthor(createdAuthor.id, createdBook.id);

      const createdPrize = await createPrize({
        ...prize,
        organization: { id: 1000, name: "org1", tipo: "PUBLICA" },
      });
      await associatePrizeToAuthor(createdPrize.id, createdAuthor.id);

      const refreshed = await fetchAuthor(createdAuthor.id);
      setAuthors((prev) => [refreshed, ...prev]);
    },
    []
  );

  const update = useCallback(async (id: number, values: AuthorInput) => {
    const updated = await updateAuthor(id, values);
    setAuthors((prev) =>
      prev.map((a) => (Number(a.id) === id ? updated ?? { ...a, ...values } : a))
    );
  }, []);

  const remove = useCallback(async (id: number) => {
    await deleteAuthor(id);
    setAuthors((prev) => prev.filter((a) => Number(a.id) !== id));
  }, []);

  const getById = useCallback(
    async (id: number) => {
      const found = authors.find((a) => Number(a.id) === id);
      if (found) return found;
      return await fetchAuthor(id);
    },
    [authors]
  );

  return { authors, loading, error, load, createWithRelations, update, remove, getById };
}
