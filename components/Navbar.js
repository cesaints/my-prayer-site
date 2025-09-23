import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-purple-900/80 backdrop-blur text-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Portal de Orações
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded hover:bg-white/10"
          aria-label="Abrir menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <ul className="hidden lg:flex gap-6 font-medium">
          <li>
            <Link href="/" className="hover:underline">
              Início
            </Link>
          </li>
          <li>
            <Link href="/oracoes" className="hover:underline">
              Orações
            </Link>
          </li>
          <li>
            <Link href="/salmos" className="hover:underline">
              Salmos
            </Link>
          </li>
          <li>
            <Link href="/mantras" className="hover:underline">
              Mantras
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile */}
      {open && (
        <ul className="lg:hidden bg-purple-900/95 px-4 pb-4 space-y-2">
          <li>
            <Link
              href="/"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href="/oracoes"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Orações
            </Link>
          </li>
          <li>
            <Link
              href="/salmos"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Salmos
            </Link>
          </li>
          <li>
            <Link
              href="/mantras"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Mantras
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
