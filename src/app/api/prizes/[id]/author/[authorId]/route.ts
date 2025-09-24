const B = process.env.BACKEND_URL ?? "http://localhost:8080";
export const dynamic = "force-dynamic";

export async function POST(_: Request, { params }: { params: { prizeId: string; authorId: string } }) {
  const r = await fetch(`${B}/prizes/${params.prizeId}/author/${params.authorId}`, { method: "POST" });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": "application/json" } });
}
