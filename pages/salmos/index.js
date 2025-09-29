import Head from "next/head";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Psalm from "../../models/Psalm";

export default function PsalmsIndex({ items }) {
  return (
    <>
      <Head>
        <title>Salmos</title>
        <meta
          name="description"
          content="Coleção de Salmos para ler e meditar."
        />
      </Head>

      <section className="section">
        <div className="container-max">
          <header className="text-center mb-8">
            <h1 className="title-xl">Salmos</h1>
            <p className="subtitle mt-2">
              Escolha um salmo e comece a leitura.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s) => (
              <Link
                key={s._id}
                href={`/salmos/${s.slug}`}
                className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/20 hover:ring-white/20 transition-transform hover:-translate-y-0.5"
                style={{ aspectRatio: "2 / 3" }}
              >
                <img
                  src={s.cover || `/covers/salmos/${s.slug}.png`}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-white font-extrabold tracking-tight text-lg sm:text-xl">
                    {s.title}
                  </h3>
                  {s.excerpt && (
                    <p className="mt-1 text-white/80 text-sm leading-snug line-clamp-2">
                      {s.excerpt}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur group-hover:bg-white/15">
                    Ler salmo
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const docs = await Psalm.find({})
    .select("number title slug excerpt cover createdAt updatedAt")
    .sort({ number: 1, createdAt: 1 })
    .lean();

  const items = docs.map((d) => ({
    _id: d._id.toString(),
    number: d.number ?? null,
    title: d.title || "",
    slug: d.slug || "",
    excerpt: d.excerpt || "",
    cover: d.cover || null,
    createdAt: d.createdAt?.toISOString?.() ?? null,
    updatedAt: d.updatedAt?.toISOString?.() ?? null,
  }));

  return { props: { items } };
}
