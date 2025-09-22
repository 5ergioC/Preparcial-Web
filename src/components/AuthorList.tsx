import React from "react";
import AuthorRow from "@/components/AuthorRow";
import type { Author } from "@/lib/authorsApi";

type Props = {
  authors: Author[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function AuthorList({ authors, onEdit, onDelete }: Props) {
  if (!authors?.length) {
    return <p className="text-gray-600">No hay autores aún.</p>;
  }

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b font-semibold">
          <th className="p-2 w-1/3">Autor</th>
          <th className="p-2">Descripción</th>
          <th className="p-2 w-40">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((a) => (
          <AuthorRow key={a.id} author={a} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
