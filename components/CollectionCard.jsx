// components/CollectionCard.jsx
import Link from "next/link";
import Image from "next/image";

export default function CollectionCard({
  slug,
  name,
  description,
  count = 0,
  cover,
}) {
  const img = cover || `/covers/${slug}.png`;
  const badge = `${count} ${count === 1 ? "oração" : "orações"}`;

  return (
    <Link
      href={`/oracoes/${slug}`}
      className="no-underline group relative block rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0b1020]/70 hover:bg-[#0b1020]/80 transition"
    >
      <div className="relative h-44">
        <Image
          src={img}
          alt={name}
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />
        <span className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white/90 ring-1 ring-white/15 bg-black/35 backdrop-blur">
          {badge}
        </span>
      </div>

      <div className="p-5">
        <h3 className="no-underline text-lg font-extrabold tracking-tight text-white">
          {name}
        </h3>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-white/75 line-clamp-2">
            {description}
          </p>
        ) : null}

        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-white bg-white/10 ring-1 ring-white/10 group-hover:bg-white/15 transition">
            Abrir coleção
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="opacity-80 group-hover:translate-x-0.5 transition-transform"
              fill="currentColor"
            >
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
