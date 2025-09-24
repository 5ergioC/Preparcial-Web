"use client";
import React, { useState } from "react";
import type { AuthorInput, BookInput, PrizeInput } from "@/lib/authorsApi";

type CreateValues = { author: AuthorInput; book: BookInput; prize: PrizeInput };

type CreateProps = {
  mode: "create";
  initialValues: CreateValues;
  onSubmit: (values: CreateValues) => Promise<void> | void;
};

type EditProps = {
  mode: "edit";
  initialValues: AuthorInput;
  onSubmit: (values: AuthorInput) => Promise<void> | void;
};

type Props = CreateProps | EditProps;

export default function AuthorForm(props: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados según modo
  const [author, setAuthor] = useState<AuthorInput>(
    props.mode === "create" ? props.initialValues.author : props.initialValues
  );
  const [book, setBook] = useState<BookInput>(
    props.mode === "create" ? props.initialValues.book : { name: "" }
  );
  const [prize, setPrize] = useState<PrizeInput>(
    props.mode === "create" ? props.initialValues.prize : { name: "" }
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setSubmitting(true);
    try {
      if (props.mode === "create") {
        await props.onSubmit({ author, book, prize });
      } else {
        await props.onSubmit(author);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6 max-w-2xl" onSubmit={handleSubmit}>
      {error ? <p className="text-red-600 text-sm">{error}</p> : null}

      {/* ===== Autor ===== */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Autor</h2>
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input className="mt-1 w-full rounded border px-3 py-2" required
            value={author.name} onChange={(e) => setAuthor(a => ({ ...a, name: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha de nacimiento</label>
          <input type="date" className="mt-1 w-full rounded border px-3 py-2"
            value={author.birthDate ?? ""} onChange={(e) => setAuthor(a => ({ ...a, birthDate: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium">Imagen (URL)</label>
          <input className="mt-1 w-full rounded border px-3 py-2"
            value={author.image ?? ""} onChange={(e) => setAuthor(a => ({ ...a, image: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea className="mt-1 w-full rounded border px-3 py-2 min-h-28"
            value={author.description ?? ""} onChange={(e) => setAuthor(a => ({ ...a, description: e.target.value }))} />
        </div>
      </section>

      {props.mode === "create" && (
        <>
          {/* ===== Libro ===== */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Libro</h2>
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input className="mt-1 w-full rounded border px-3 py-2" required
                value={book.name} onChange={(e) => setBook(b => ({ ...b, name: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">ISBN</label>
                <input className="mt-1 w-full rounded border px-3 py-2"
                  value={book.isbn ?? ""} onChange={(e) => setBook(b => ({ ...b, isbn: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium">Fecha publicación</label>
                <input type="date" className="mt-1 w-full rounded border px-3 py-2"
                  value={book.publishingDate ?? ""} onChange={(e) => setBook(b => ({ ...b, publishingDate: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Imagen (URL)</label>
              <input className="mt-1 w-full rounded border px-3 py-2"
                value={book.image ?? ""} onChange={(e) => setBook(b => ({ ...b, image: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium">Descripción</label>
              <textarea className="mt-1 w-full rounded border px-3 py-2 min-h-24"
                value={book.description ?? ""} onChange={(e) => setBook(b => ({ ...b, description: e.target.value }))} />
            </div>
          </section>

          {/* ===== Premio ===== */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Premio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input className="mt-1 w-full rounded border px-3 py-2" required
                  value={prize.name} onChange={(e) => setPrize(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium">Fecha de premiación</label>
                <input type="date" className="mt-1 w-full rounded border px-3 py-2"
                  value={prize.premiationDate ?? ""} onChange={(e) => setPrize(p => ({ ...p, premiationDate: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Descripción</label>
              <textarea className="mt-1 w-full rounded border px-3 py-2 min-h-24"
                value={prize.description ?? ""} onChange={(e) => setPrize(p => ({ ...p, description: e.target.value }))} />
            </div>
          </section>
        </>
      )}

      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className="btn">
          {submitting ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
