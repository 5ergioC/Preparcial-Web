"use client";
import AuthorForm from "@/components/AuthorForm";
import useAuthors from "@/hooks/useAuthors";
import { useRouter } from "next/navigation";

export default function CreateAuthorPage() {
  const router = useRouter();
  const { create } = useAuthors();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Crear autor</h1>
      <AuthorForm
        initialValues={{ name: "", birthDate: "", description: "", image: "" }}
        onSubmit={async (values) => { await create(values); router.push("/authors"); }}
      />
    </div>
  );
}