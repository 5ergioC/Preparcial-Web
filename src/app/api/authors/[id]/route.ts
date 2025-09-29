import { NextRequest } from "next/server";
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";
export const dynamic = "force-dynamic";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const r = await fetch(`${BACKEND_URL}/api/authors/${params.id}`, { cache: "no-store" });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "application/json" } });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.text();
  const r = await fetch(`${BACKEND_URL}/api/authors/${params.id}`, { method: "PUT", headers: { "content-type": "application/json" }, body });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "application/json" } });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const r = await fetch(`${BACKEND_URL}/api/authors/${params.id}`, { method: "DELETE" });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "application/json" } });
}

