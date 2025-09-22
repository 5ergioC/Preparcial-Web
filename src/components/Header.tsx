"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/authors", label: "Autores" },
  { href: "/crear", label: "Crear" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b" style={{ borderColor: "var(--border)" }}>
      <nav className="max-w-5xl mx-auto w-full px-4 py-3 flex items-center gap-4">
        <Link href="/" className="text-base font-semibold">
          Autores App
        </Link>
        <div className="ml-auto flex gap-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-md text-sm ${
                  active ? "font-semibold underline underline-offset-4" : "hover:opacity-80"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
