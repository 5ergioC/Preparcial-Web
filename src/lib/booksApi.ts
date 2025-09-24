import type { Book } from "@/lib/authorsApi";

export type Review = {
  id: number | string;
  reviewer?: string;
  rating?: number;
  comment?: string;
  date?: string;
};

export type ReviewInput = {
  reviewer?: string;
  rating?: number;
  comment: string;
  date?: string;
};

const API = "";

async function parseError(r: Response) {
  const t = await r.text().catch(() => "");
  try { const j = JSON.parse(t); return typeof j === "string" ? j : j?.message ?? JSON.stringify(j); }
  catch { return t || r.statusText || "Error"; }
}
async function expectOk(r: Response) { if (!r.ok) throw new Error(`[${r.status}] ${await parseError(r)}`); return r; }

export async function fetchBooks(): Promise<Book[]> {
  const r = await fetch(`${API}/api/books`, { cache: "no-store" });
  await expectOk(r);
  return r.json();
}

export async function fetchBook(id: number | string): Promise<Book & { reviews?: Review[] }> {
  const r = await fetch(`${API}/api/books/${id}`, { cache: "no-store" });
  await expectOk(r);
  return r.json();
}

export async function createReview(bookId: number | string, data: ReviewInput): Promise<Review> {
  const r = await fetch(`${API}/api/books/${bookId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await expectOk(r);
  return r.json();
}
