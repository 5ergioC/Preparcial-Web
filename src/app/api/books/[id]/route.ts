const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";
export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const r = await fetch(`${BACKEND_URL}/books/${params.id}`, { cache: "no-store" });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "application/json" } });
}
