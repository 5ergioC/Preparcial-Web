import React from "react";
import type { Author } from "@/lib/authorsApi";

type Props = {
  author: Author;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function AuthorCard({ author, onEdit, onDelete }: Props) {
  const idNum = Number(author.id);
  return (
    <div className="card">
      <div className="card-media">
        <img
          src={author.image || "https://via.placeholder.com/640x360?text=Autor"}
          alt={author.name}
        />
      </div>
      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{author.name}</h3>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {author.birthDate ?? "—"}
          </p>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)", overflowWrap: "anywhere" }}>
          {author.description ?? "Sin descripción"}
        </p>
        <div className="flex gap-2 pt-2">
          <button className="btn" onClick={() => onEdit?.(idNum)}>Editar</button>
          <button className="btn" onClick={() => onDelete?.(idNum)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
