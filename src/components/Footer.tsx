export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto w-full px-4 py-6 text-sm" style={{ color: "var(--muted)" }}>
        © {year} Preparcial Web · Autores
      </div>
    </footer>
  );
}
