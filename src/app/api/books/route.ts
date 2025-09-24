import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";
export const dynamic = "force-dynamic";

export async function GET() {
  const r = await fetch(`${BACKEND_URL}/books`, { cache: "no-store" });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "application/json" } });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const r = await fetch(`${BACKEND_URL}/books`, { method: "POST", headers: { "content-type": "application/json" }, body });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "application/json" } });
}
