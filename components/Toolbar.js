import { useMemo, useState } from "react";

export default function Toolbar({ items, onRenderItem }) {
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(
      (p) =>
        p.title.toLowerCase().includes(t) ||
        (p.content || "").toLowerCase().includes(t)
    );
  }, [items, q]);

  return (
    <>
      <div className="glass p-3 md:p-4 rounded-2xl mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          placeholder="Buscar por título ou conteúdo…"
          className="w-full md:max-w-md px-4 py-3 rounded-xl bg-white/90 text-gray-900 outline-none focus:ring-2 focus:ring-cyan-300"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => setExpanded((v) => !v)}
            aria-pressed={expanded}
          >
            {expanded ? "Recolher tudo" : "Expandir tudo"}
          </button>
        </div>
      </div>

      <div>
        {filtered.length === 0 && (
          <p className="muted">Nada encontrado para “{q}”.</p>
        )}
        {filtered.map((p) => onRenderItem(p, expanded))}
      </div>
    </>
  );
}
