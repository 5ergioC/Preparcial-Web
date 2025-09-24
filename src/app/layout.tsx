declare module '*.css';
import "./globals.css";

import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import { AuthorsProvider } from "@/contexts/AuthorsProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col">
        <AuthorsProvider>
          <Header />
          <main className="max-w-5xl mx-auto w-full flex-1 px-4 py-6">{children}</main>
          <Footer />
        </AuthorsProvider>
      </body>
    </html>
  );
}

