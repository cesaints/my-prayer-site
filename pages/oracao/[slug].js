// pages/oracao/[slug].js
import Head from "next/head";
import dbConnect from "@/lib/dbConnect";
import Prayer from "@/models/Prayer";

/**
 * Gera sob demanda (quando a rota é acessada) e guarda em cache (ISR).
 * Isso evita quebrar build quando existir registro sem slug
 * e também evita depender do banco durante o build na Vercel.
 */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

function serialize(doc) {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id?.toString?.() ?? String(doc._id),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null,
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug;

  if (typeof slug !== "string" || !slug.trim()) {
    return { notFound: true };
  }

  await dbConnect();

  const doc = await Prayer.findOne({ slug }).lean();

  if (!doc) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: { prayer: serialize(doc) },
    // Revalida a cada 1h (ajuste se quiser)
    revalidate: 3600,
  };
}

export default function PrayerPage({ prayer }) {
  if (!prayer) return null;

  return (
    <>
      <Head>
        <title>{prayer.title || "Oração"}</title>
        {prayer.excerpt ? (
          <meta name="description" content={prayer.excerpt} />
        ) : null}
      </Head>

      <main className="container-max section">
        <header className="text-center mb-8">
          <h1 className="title-xl">{prayer.title}</h1>
          {prayer.excerpt ? (
            <p className="subtitle mt-2">{prayer.excerpt}</p>
          ) : null}
        </header>

        <article className="prayer-card">
          <div className="prayer-ornament" aria-hidden />
          <div className="prayer-text whitespace-pre-line">
            {prayer.content || ""}
          </div>
        </article>
      </main>
    </>
  );
}
