import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Loja online feita com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* NAVBAR */}
        <Navbar />

        <main className="min-h-screen bg-zinc-100 p-6">{children}</main>

        {/* FOOTER */}
        <footer className="bg-zinc-900 text-zinc-300 p-6 text-center mt-10">
          <p>© {new Date().getFullYear()} Minha Loja — Todos os direitos reservados.</p>
        </footer>

      </body>
    </html>
  );
}
