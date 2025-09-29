// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const mensagens = [
    "Orações que acalmam e fortalecem.",
    "Salmos para guiar o seu dia.",
    "Mantras para elevar sua vibração.",
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % mensagens.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Head>
        <title>Portal de Orações</title>
        <meta
          name="description"
          content="Orações, salmos e mantras — inspiração diária, leitura fluida e sem anúncios invasivos."
        />
      </Head>

      <main className="page">
        {/* HERO */}
        <section className="hero">
          <div className="hero__bg" />
          <div className="container-max hero__inner">
            <div className="hero__card">
              <span className="hero__chip">
                🌙 Inspiração diária • sem anúncios invasivos
              </span>
              <h1 className="hero__title">{mensagens[i]}</h1>
              <p className="hero__subtitle">
                Um lugar para respirar, orar e se conectar.
              </p>

              {/* ações: responsivo de verdade */}
              <div className="hero__actions flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  href="/oracoes"
                  className="btn btn-primary w-full sm:w-auto justify-center"
                >
                  Explorar Orações
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="-mr-1"
                  >
                    <path fill="currentColor" d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                  </svg>
                </Link>

                <Link
                  href="/salmos"
                  className="btn btn-ghost w-full sm:w-auto justify-center"
                  title="Coleção de salmos selecionados"
                >
                  Ver Salmos
                </Link>

                <Link
                  href="/mantras"
                  className="btn btn-ghost w-full sm:w-auto justify-center"
                  title="Mantras para ouvir/recitar"
                >
                  Ouvir/Recitar Mantras
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES PÍLULAS */}
        <section className="section">
          <div className="container-max">
            <div className="feature-row">
              <div className="feature-pill">+300 textos curados</div>
              <div className="feature-pill">Leitura fluida</div>
              <div className="feature-pill">Sem cadastro obrigatório</div>
              <div className="feature-pill">Monte o seu guia de orações</div>
            </div>
          </div>
        </section>

        {/* COLEÇÕES */}
        <section className="section">
          <div className="container-max">
            <div className="section-head">
              <h2 className="section-title">Coleções</h2>
              <Link href="/oracoes" className="link-muted">
                Ver tudo →
              </Link>
            </div>

            {/* grid elástica: 1 → N colunas automaticamente */}
            <div
              className="grid gap-4 sm:gap-5 lg:gap-6"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              }}
            >
              {CARDS.map((c) => (
                <Card key={c.title} {...c} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ---------- dados dos cards ---------- */
const CARDS = [
  {
    title: "Orações",
    desc: "Clássicas e contemporâneas para cada momento.",
    href: "/oracoes",
    sw1: "#7c3aed",
    sw2: "#22d3ee",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M12 3a6 6 0 0 1 6 6v2h1a2 2 0 0 1 0 4h-1v6h-2v-6H8v6H6v-6H5a2 2 0 1 1 0-4h1V9a6 6 0 0 1 6-6Z"
        />
      </svg>
    ),
  },
  {
    title: "Salmos",
    desc: "Versos para ler, meditar e compartilhar.",
    href: "/salmos",
    sw1: "#22d3ee",
    sw2: "#60a5fa",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M12 3l7 4v10l-7 4-7-4V7l7-4Zm0 2.2L7 7.5v8.9l5 2.9 5-2.9V7.5l-5-2.3Z"
        />
      </svg>
    ),
  },
  {
    title: "Mantras",
    desc: "Repetição consciente para elevar sua energia.",
    href: "/mantras",
    sw1: "#fb7185",
    sw2: "#f472b6",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path fill="currentColor" d="M12 4a8 8 0 1 1-8 8h2a6 6 0 1 0 6-6V4Z" />
      </svg>
    ),
  },
];

/* ---------- componente de card ---------- */
function Card({ title, desc, href, sw1, sw2, icon }) {
  return (
    <article style={{ "--sw1": sw1, "--sw2": sw2 }} className="collection-card">
      <div className="cc-glow" />
      <header className="cc-head">
        <span className="cc-icon">{icon}</span>
        <div className="cc-title">
          <h3 className="cc-h3">{title}</h3>
          <p className="cc-sub">{desc}</p>
        </div>
      </header>
      <footer className="cc-foot">
        <span className="cc-meta">Atualizado semanalmente</span>
        <Link href={href} className="cc-cta">
          Acessar
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
          </svg>
        </Link>
      </footer>
    </article>
  );
}
