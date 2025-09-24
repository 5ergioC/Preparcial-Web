"use client";
import type { Book } from "@/lib/authorsApi";
import BookCard from "@/components/BookCard";

type Props = {
  books: Book[];
  onOpen?: (id: number) => void;
};

export default function BookGrid({ books, onOpen }: Props) {
  if (!books?.length) return <p style={{ color: "var(--muted)" }}>No hay libros.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onOpen={onOpen} />
      ))}
    </div>
  );
}
