import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const mensagens = [
    "Bem-vindo ao seu portal de orações.",
    "Encontre paz, força e presença.",
    "Orações, Salmos e Mantras em um só lugar.",
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % mensagens.length), 5000);
    return () => clearInterval(id);
  }, []);

  // AdSense: renderiza bloco ao montar
  useEffect(() => {
    try {
      // eslint-disable-next-line no-undef
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  // Newsletter simples (somente email)
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail("");
        setStatus("Obrigado por se inscrever!");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus(data?.error || "Falha ao inscrever. Tente novamente.");
      }
    } catch {
      setStatus("Erro de rede. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-animated text-white flex items-center justify-center">
      <Head>
        <title>Portal de Orações</title>
        <meta name="description" content="Orações, Salmos e Mantras" />
      </Head>

      <main className="w-full max-w-4xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-[0_2px_6px_rgba(0,0,0,.4)] transition-all">
          {mensagens[i]}
        </h1>
        <p className="mt-4 text-lg md:text-2xl opacity-90">
          Role, explore e encontre palavras que elevam a alma.
        </p>

        {/* Bloco de anúncio responsivo */}
        <div className="my-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXX"
            data-ad-slot="YYYY"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* Newsletter */}
        <form
          onSubmit={onSubmit}
          className="mx-auto max-w-md bg-white/15 backdrop-blur rounded-xl p-4 md:p-6"
        >
          <h2 className="text-xl font-semibold mb-2">Receba novidades</h2>
          <div className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-md text-gray-900 placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-white text-purple-700 font-semibold hover:opacity-90"
            >
              Inscrever
            </button>
          </div>
          {status && <p className="mt-2 text-sm">{status}</p>}
        </form>
      </main>
    </div>
  );
}
