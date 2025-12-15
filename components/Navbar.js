// components/Navbar.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/oracoes", label: "Orações" },
  { href: "/salmos", label: "Salmos" },
  { href: "/mantras", label: "Mantras" },
];

export default function Navbar() {
  const router = useRouter();
  const { pathname } = router;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeComplete", close);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      router.events.off("routeChangeComplete", close);
      window.removeEventListener("resize", onResize);
    };
  }, [router.events]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className={`container-max transition-all ${scrolled ? "mt-2" : "mt-4"}`}
      >
        {/* WRAPPER: sem overflow, com safe-area e largura fluida */}
        <div
          className="
            w-full max-w-full
            rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md
            shadow-[0_10px_40px_-10px_rgba(0,0,0,.65)]
            flex items-center gap-3
          "
          style={{
            paddingLeft: "max(env(safe-area-inset-left), 12px)",
            paddingRight: "max(env(safe-area-inset-right), 12px)",
            paddingTop: "10px",
            paddingBottom: "10px",
            minHeight: "var(--nav-h)",
          }}
        >
          {/* ESQUERDA: logo (não encolhe) */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 no-underline shrink-0"
          >
            <img
              src="/logo.png"
              alt="Portal de Orações"
              className="h-10 sm:h-12 md:h-14 w-auto select-none"
            />
          </Link>

          {/* CENTRO: spacer elástico */}
          <div className="flex-1 min-w-0" />

          {/* DIREITA: navegação desktop */}
          <ul className="hidden lg:flex items-center gap-1 mr-2">
            {NAV.map((i) => {
              const active = pathname === i.href;
              return (
                <li key={i.href} className="shrink-0">
                  <Link
                    href={i.href}
                    className={`relative px-3 py-2 rounded-xl no-underline transition ${
                      active ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {i.label}
                    <span
                      className={`pointer-events-none absolute left-3 right-3 -bottom-[3px] h-[2px] rounded-full bg-cyan-300 transition ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Toggle mobile (sempre visível, sem corte) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 text-white shrink-0"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* SHEET MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              mx-3 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-4
              shadow-[0_10px_40px_-10px_rgba(0,0,0,.65)]
            "
            style={{ marginTop: "calc(var(--nav-h) + 12px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <img
                src="/logo.png"
                alt="Portal de Orações"
                className="h-10 w-auto"
              />
              <button
                className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 text-white"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <ul className="mt-4 grid gap-2">
              {NAV.map((i) => {
                const active = pathname === i.href;
                return (
                  <li key={i.href}>
                    <Link
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-xl no-underline transition ${
                        active
                          ? "bg-white/20 text-white"
                          : "text-white/85 hover:bg-white/10"
                      }`}
                    >
                      {i.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/oracoes"
              onClick={() => setOpen(false)}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white no-underline"
              style={{ background: "linear-gradient(90deg,#8b5cf6,#22d3ee)" }}
            >
              Explorar agora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
