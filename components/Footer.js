// components/Footer.js
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const NAV = [
    { href: "/oracoes", label: "Orações" },
    { href: "/salmos", label: "Salmos" },
    { href: "/mantras", label: "Mantras" },
    { href: "/", label: "Início" },
  ];

  const [email, setEmail] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // TODO: integrar com sua API /service
    setEmail("");
  }

  return (
    <footer className="relative bg-[#0b1020] text-white mt-20">
      {/* Fade para “soldar” com o conteúdo acima */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-[#0b1020]" />

      {/* Hairline com gradiente */}
      <div
        className="absolute inset-x-0 -top-px h-px opacity-80"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,.7), rgba(34,211,238,.7), transparent)",
        }}
      />

      <div className="container-max py-12">
        {/* Card de vidro com halo elegante */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 shadow-[0_18px_60px_-25px_rgba(0,0,0,.85)]">
          {/* anel/halo sutil */}
          <div
            className="pointer-events-none absolute -inset-[1px] rounded-[18px] p-[1px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,.22), rgba(255,255,255,.06) 28%, color-mix(in oklab, #8b5cf6 40%, transparent) 60%, color-mix(in oklab, #22d3ee 40%, transparent))",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand + pitch + sociais */}
            <div className="relative">
              <Link
                href="/"
                className="no-underline text-2xl md:text-3xl font-extrabold tracking-tight"
              >
                Portal de Orações
              </Link>
              <p className="mt-2 text-sm text-white/75 max-w-sm">
                Inspiração diária com orações, salmos e mantras. Simples, leve e
                sem ruído — focado em leitura e serenidade.
              </p>

              {/* sociais */}
              <div className="mt-4 flex items-center gap-2">
                <IconButton aria="Instagram">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                  </svg>
                </IconButton>
                <IconButton aria="YouTube">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2C0 9.1 0 12 0 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 14.9 24 12 24 12s0-2.9-.5-4.8ZM9.5 15.5V8.5L16 12l-6.5 3.5Z" />
                  </svg>
                </IconButton>
                <IconButton aria="X">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M18.9 2H22l-7 8 8 12h-6.2L12.8 14l-6.8 8H2l7.5-8.6L2 2h6.3l4.7 6 5.9-6Z" />
                  </svg>
                </IconButton>
              </div>
            </div>

            {/* Navegação enxuta (pílulas) */}
            <nav className="grid grid-cols-2 gap-3 md:gap-2">
              {NAV.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="no-underline rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition"
                >
                  {i.label}
                </Link>
              ))}
            </nav>

            {/* Mini newsletter — discreta e útil */}
            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-semibold text-white">
                Receba novidades
              </p>
              <p className="mt-1 text-xs text-white/70">
                Conteúdo novo e seleções enviadas ocasionalmente.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <button
                  type="submit"
                  className="rounded-xl px-4 py-2 font-semibold text-white"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#7c3aed,#22d3ee)",
                  }}
                >
                  Enviar
                </button>
              </div>
              <p className="mt-2 text-[10px] text-white/60">
                Sem spam. Você pode sair quando quiser.
              </p>
            </form>
          </div>

          {/* divisor sutil */}
          <div className="my-8 h-px bg-white/10" />

          {/* Barra inferior */}
          <div className="flex flex-col gap-3 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/85 shadow-[0_0_20px_-2px_rgba(16,185,129,.9)]" />
              <span>Online e gratuito</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/termos" className="hover:text-white no-underline">
                Termos
              </Link>
              <span className="opacity-30">•</span>
              <Link
                href="/privacidade"
                className="hover:text-white no-underline"
              >
                Privacidade
              </Link>
              <span className="opacity-30">•</span>
              <span>© {year} Portal de Orações</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ————— Botão de ícone (vidro) ————— */
function IconButton({ children, aria }) {
  return (
    <button
      type="button"
      aria-label={aria}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85 transition hover:bg-white/10"
    >
      {children}
    </button>
  );
}
