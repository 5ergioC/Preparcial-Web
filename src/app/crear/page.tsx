"use client";
import AuthorForm from "@/components/AuthorForm";
import useAuthors from "@/hooks/useAuthorsData";
import { useRouter } from "next/navigation";

export default function CreateAuthorPage() {
  const router = useRouter();
  const { createWithRelations } = useAuthors();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Crear autor</h1>
      <AuthorForm
        mode="create"
        initialValues={{
          author: { name: "", birthDate: "", description: "", image: "" },
          book:   { name: "", isbn: "", publishingDate: "", image: "", description: "" },
          prize:  { name: "", premiationDate: "", description: "" }
        }}
        onSubmit={async ({ author, book, prize }) => {
          await createWithRelations(author, book, prize);
          router.push("/authors");
        }}
      />
    </div>
  );
}
