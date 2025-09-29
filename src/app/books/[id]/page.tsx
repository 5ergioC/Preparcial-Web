"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Book } from "@/lib/authorsApi";
import type { Review, ReviewInput } from "@/lib/booksApi";
import { fetchBook, createReview } from "@/lib/booksApi";
import ReviewForm from "@/components/ReviewForm";

export default function BookDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [book, setBook] = useState<(Book & { reviews?: Review[] }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBook(Number(id));
      setBook(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) void reload();
  }, [id]);

  async function handleAddReview(values: ReviewInput) {
    if (!id) return;
    await createReview(Number(id), values);
    await reload();
  }

  if (!id) return <p className="text-red-600">No se encontró el ID del libro</p>;
  if (loading || !book) return <p>Cargando…</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;


  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-media">
          <img src={book.image || "https://via.placeholder.com/640x360?text=Libro"} alt={book.name} />
        </div>
        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-semibold">{book.name}</h1>
          <div className="text-sm" style={{ color: "var(--muted)" }}>{book.publishingDate ?? ""}</div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>{book.isbn ?? ""}</div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>{book.editorial?.name ?? ""}</div>
          <p className="text-sm" style={{ color: "var(--muted)", overflowWrap: "anywhere" }}>{book.description ?? ""}</p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Reviews</h2>
        {book.reviews?.length ? (
          <ul className="space-y-3">
            {book.reviews?.map((r) => (
              <li key={r.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.name?.trim() || "Anónimo"}</div>
                  {r.source ? (
                    <div className="text-sm" style={{ color: "var(--muted)" }}>
                      {r.source}
                    </div>
                  ) : null}
                </div>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  {r.description ?? ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "var(--muted)" }}>Sin reviews.</p>
        )}
      </section>


      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Agregar review</h2>
        <ReviewForm onSubmit={handleAddReview} />
      </section>
    </div>
  );
}
