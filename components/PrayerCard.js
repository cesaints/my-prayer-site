export default function PrayerCard({ doc, forceOpen = false }) {
  return (
    <details className="card mb-4" open={forceOpen}>
      <summary className="card-header">{doc.title}</summary>
      <div className="card-body">
        <div className="flex items-center gap-3 mb-3 text-sm text-white/60">
          <button
            className="btn px-3 py-2"
            onClick={() => navigator.clipboard.writeText(doc.content || "")}
            title="Copiar"
          >
            Copiar
          </button>
          <a
            className="btn px-3 py-2"
            href={`https://wa.me/?text=${encodeURIComponent(
              `${doc.title}\n\n${doc.content || ""}`
            )}`}
            target="_blank"
            rel="noreferrer"
            title="Compartilhar no WhatsApp"
          >
            Compartilhar
          </a>
        </div>
        <div className="whitespace-pre-line">{doc.content}</div>
      </div>
    </details>
  );
}
