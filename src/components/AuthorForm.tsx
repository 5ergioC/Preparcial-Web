import React, { useState } from "react";
import type { AuthorInput } from "@/lib/authorsApi";

type Props = {
  initialValues: AuthorInput;
  onSubmit: (values: AuthorInput) => Promise<void> | void;
};

export default function AuthorForm({ initialValues, onSubmit }: Props) {
  const [values, setValues] = useState<AuthorInput>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof AuthorInput>(key: K, val: AuthorInput[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al guardar";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
      {error ? <p className="text-red-600 text-sm">{error}</p> : null}
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          className="mt-1 w-full rounded border px-3 py-2"
          value={values.birthDate}
          onChange={(e) => update("birthDate", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Imagen (URL)</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={values.image}
          onChange={(e) => update("image", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          className="mt-1 w-full rounded border px-3 py-2 min-h-28"
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-3 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {submitting ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
