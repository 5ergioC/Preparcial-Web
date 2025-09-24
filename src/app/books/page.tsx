"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/authorsApi";
import { fetchBooks } from "@/lib/booksApi";
import BookGrid from "@/components/BookGrid";

export default function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBooks();
        if (alive) setBooks(data);
      } catch (e: unknown) {
        if (alive) setError(e instanceof Error ? e.message : "Error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Libros</h1>
      <BookGrid books={books} onOpen={(id) => router.push(`/books/${id}`)} />
    </div>
  );
}
