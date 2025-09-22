import React from "react";
import type { Author } from "@/lib/authorsApi";

type Props = {
  author: Author;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function AuthorRow({ author, onEdit, onDelete }: Props) {
  return (
    <tr className="border-b align-top">
      <td className="p-2">
        <div className="flex items-center gap-3">
          {author.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={author.image} alt={author.name} className="w-12 h-12 rounded object-cover" />
          ) : null}
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-sm text-gray-600">{author.birthDate ?? "—"}</div>
          </div>
        </div>
      </td>
      <td className="p-2 text-sm">
        <p className="line-clamp-2">{author.description ?? "—"}</p>
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded bg-gray-200" onClick={() => onEdit?.(Number(author.id))}>
            Editar
          </button>
          <button className="px-2 py-1 rounded bg-red-200" onClick={() => onDelete?.(Number(author.id))}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
