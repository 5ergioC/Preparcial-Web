import { NextRequest } from "next/server";
const B = process.env.BACKEND_URL ?? "http://localhost:8080";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const r = await fetch(`${B}/prizes`, { method: "POST", headers: { "content-type": "application/json" }, body });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "application/json" } });
}
