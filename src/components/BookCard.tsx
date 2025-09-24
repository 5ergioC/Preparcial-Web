"use client";
import type { Book } from "@/lib/authorsApi";

type Props = {
  book: Book;
  onOpen?: (id: number) => void;
};

export default function BookCard({ book, onOpen }: Props) {
  const idNum = Number(book.id);
  return (
    <div className="card cursor-pointer" onClick={() => onOpen?.(idNum)}>
      <div className="card-media">
        <img src={book.image || "https://via.placeholder.com/640x360?text=Libro"} alt={book.name} />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold leading-tight">{book.name}</h3>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{book.publishingDate ?? ""}</p>
        <p className="text-sm line-clamp-3" style={{ color: "var(--muted)" }}>{book.description ?? ""}</p>
      </div>
    </div>
  );
}
