// components/FeaturedCollectionCard.jsx
import Link from "next/link";
import Image from "next/image";

export default function FeaturedCollectionCard({
  slug,
  name,
  description,
  count = 0,
  cover,
}) {
  const img = cover || `/covers/${slug}.png`;
  const badge = `${count} ${count === 1 ? "oração" : "orações"}`;

  return (
    <div
      className="
        group relative rounded-2xl overflow-hidden
        ring-1 ring-white/10 bg-black/20
        transition-transform duration-300
        hover:-translate-y-0.5 hover:ring-white/20
      "
      // ⬇️ cartão em formato pôster
      style={{ aspectRatio: "2 / 3" }}
    >
      {/* mídia */}
      <Image
        src={img}
        alt={name}
        fill
        sizes="(min-width:1280px) 32vw, (min-width:1024px) 36vw, (min-width:640px) 54vw, 72vw"
        className="object-cover"
        priority={false}
      />

      {/* véu/gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />

      {/* contagem */}
      <span className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur">
        {badge}
      </span>

      {/* corpo */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="text-white font-extrabold tracking-tight text-lg sm:text-xl">
          {name}
        </h3>
        {description && (
          <p className="mt-1 text-white/80 text-sm leading-snug line-clamp-2">
            {description}
          </p>
        )}
        <div className="mt-3">
          <Link
            href={`/oracoes/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur hover:bg-white/15"
          >
            Explorar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
