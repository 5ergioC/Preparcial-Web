"use client";
import AuthorGrid from "@/components/AuthorGrid";
import useAuthors from "@/hooks/useAuthorsData";
import { useRouter } from "next/navigation";

export default function AuthorsPage() {
  const router = useRouter();
  const { authors, remove } = useAuthors(); 

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Autores</h1>
      </div>
      <AuthorGrid
        authors={authors}
        onEdit={(id) => router.push(`/authors/${id}/edit`)}
        onDelete={(id) => void remove(id)} 
      />
    </div>
  );
}
