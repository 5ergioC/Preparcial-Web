"use client";
import { useState } from "react";
import type { ReviewInput } from "@/lib/booksApi";

type Props = {
  onSubmit: (values: ReviewInput) => Promise<void> | void;
};

export default function ReviewForm({ onSubmit }: Props) {
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        reviewer: reviewer || undefined,
        rating: typeof rating === "number" ? rating : undefined,
        comment,
      });
      setReviewer("");
      setRating("");
      setComment("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {error ? <p className="text-red-600 text-sm">{error}</p> : null}
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input className="mt-1 w-full rounded border px-3 py-2" value={reviewer} onChange={(e) => setReviewer(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium">Calificación</label>
        <select className="mt-1 w-full rounded border px-3 py-2" value={rating} onChange={(e) => setRating(e.target.value ? Number(e.target.value) : "")}>
          <option value="">Sin calificar</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Comentario</label>
        <textarea className="mt-1 w-full rounded border px-3 py-2 min-h-24" value={comment} onChange={(e) => setComment(e.target.value)} required />
      </div>
      <button type="submit" className="btn" disabled={submitting}>{submitting ? "Enviando…" : "Agregar review"}</button>
    </form>
  );
}
