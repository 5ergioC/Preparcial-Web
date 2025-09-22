"use client";
import { useEffect, useState } from "react";
import AuthorForm from "@/components/AuthorForm";
import useAuthors from "@/hooks/useAuthors";
import { useParams, useRouter } from "next/navigation";
import type { AuthorInput } from "@/lib/authorsApi";

export default function EditAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update } = useAuthors();
  const [initial, setInitial] = useState<AuthorInput | null>(null);

  useEffect(() => {
    void (async () => {
      const a = await getById(Number(id));
      if (a) setInitial({
        name: a.name ?? "", birthDate: a.birthDate ?? "",
        description: a.description ?? "", image: a.image ?? ""
      });
    })();
  }, [getById, id]);

  if (!initial) return <p>Cargando…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Editar autor</h1>
      <AuthorForm
        initialValues={initial}
        onSubmit={async (values) => { await update(Number(id), values); router.push("/authors"); }}
      />
    </div>
  );
}
