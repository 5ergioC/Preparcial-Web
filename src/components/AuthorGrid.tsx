import React from "react";
import type { Author } from "@/lib/authorsApi";
import AuthorCard from "@/components/AuthorCard";

type Props = {
  authors: Author[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function AuthorGrid({ authors, onEdit, onDelete }: Props) {
  if (!authors?.length) return <p style={{ color: "var(--muted)" }}>No hay autores aún.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {authors.map((a) => (
        <AuthorCard key={a.id} author={a} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
