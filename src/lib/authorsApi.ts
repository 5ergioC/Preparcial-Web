export type Editorial = { id: number | string; name: string };
export type Book = { id: number | string; name: string; isbn?: string; image?: string; publishingDate?: string; description?: string; editorial?: Editorial; };
export type PrizeOrg = { id: number | string; name: string; tipo?: string };
export type Prize = { id: number | string; premiationDate?: string; name: string; description?: string; organization?: PrizeOrg; };
export type Author = { id: number | string; birthDate?: string; name: string; description?: string; image?: string; books?: Book[]; prizes?: Prize[]; };
export type AuthorInput = { birthDate?: string; name: string; description?: string; image?: string; };

const API = ""; // mismo origen: /api/authors

async function parseError(r: Response) {
  const text = await r.text().catch(() => "");
  try { const j = JSON.parse(text); return typeof j === "string" ? j : j?.message ?? JSON.stringify(j); }
  catch { return text || r.statusText || "Error desconocido"; }
}
async function expectOk(r: Response) { if (!r.ok) throw new Error(`[${r.status}] ${await parseError(r)}`); return r; }

export async function fetchAuthors(): Promise<Author[]> {
  const r = await fetch(`${API}/api/authors`, { cache: "no-store" });
  await expectOk(r); return r.json();
}
export async function fetchAuthor(id: number | string): Promise<Author> {
  const r = await fetch(`${API}/api/authors/${id}`, { cache: "no-store" });
  await expectOk(r); return r.json();
}
export async function createAuthor(data: AuthorInput): Promise<Author> {
  const r = await fetch(`${API}/api/authors`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  await expectOk(r); return r.json();
}
export async function updateAuthor(id: number | string, data: AuthorInput): Promise<Author | null> {
  const r = await fetch(`${API}/api/authors/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (r.status === 204) return null; await expectOk(r); return r.json();
}
export async function deleteAuthor(id: number | string): Promise<void> {
  const r = await fetch(`${API}/api/authors/${id}`, { method: "DELETE" });
  await expectOk(r);
}
