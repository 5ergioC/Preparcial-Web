export type Editorial = { id: number | string; name: string };
export type Book = { id: number | string; name: string; isbn?: string; image?: string;
  publishingDate?: string; description?: string; editorial?: Editorial; };
export type PrizeOrg = { id: number | string; name: string; tipo?: string };
export type Prize = { id: number | string; premiationDate?: string; name: string;
  description?: string; organization?: PrizeOrg; };
export type Author = { id: number | string; birthDate?: string; name: string;
  description?: string; image?: string; books?: Book[]; prizes?: Prize[]; };
export type AuthorInput = { birthDate?: string; name: string; description?: string; image?: string; };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8080";

export async function fetchAuthors(): Promise<Author[]> {
  const r = await fetch(`${API_BASE_URL}/api/authors`, { cache: "no-store" });
  if (!r.ok) throw new Error("No se pudo obtener la lista de autores");
  return r.json();
}
