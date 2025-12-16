// pages/oracoes/index.js
import Head from "next/head";
import dbConnect from "../../lib/dbConnect";
import Collection from "../../models/Collection";
import Prayer from "../../models/Prayer";
import FeaturedCollectionCard from "../../components/FeaturedCollectionCard";

// Convert server-side rendering to static generation with incremental revalidation.
// This improves performance by pre-building the collections page at build time
// and revalidating the data on a regular interval.  See `getStaticProps` below.

export default function CollectionsPage({ collections = [], error = "" }) {
  return (
    <>
      <Head>
        <title>Coleções | Portal de Orações</title>
      </Head>

      <section className="section">
        <div className="container-max">
          {/* Título/subtítulo centralizados (padrão Mantras/Salmos) */}
          <header className="text-center mb-8">
            <h1 className="title-xl">Coleções</h1>
            <p className="subtitle mt-2">
              Escolha um tema e explore orações curadas.
            </p>
          </header>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-700">
              Erro ao carregar coleções: {error}
            </div>
          )}

          {/* grid responsiva 1→N colunas */}
          <div
            className="grid gap-4 sm:gap-5 lg:gap-6"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            }}
          >
            {collections.map((c) => (
              <FeaturedCollectionCard
                key={c.slug}
                slug={c.slug}
                name={c.name}
                description={c.description}
                count={c.count}
                cover={c.cover}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Build the collections list statically. The data is fetched at build time
 * and cached. Whenever a request comes in after the `revalidate` period
 * (here 1 hour), Next.js will regenerate the page in the background.
 */
export async function getStaticProps() {
  try {
    await dbConnect();

    // Fetch all collections and prayer counts concurrently
    const [collections, counts] = await Promise.all([
      Collection.find({}).lean(),
      Prayer.aggregate([
        { $group: { _id: "$collection", total: { $sum: 1 } } },
      ]),
    ]);

    const mapCount = new Map(counts.map((c) => [String(c._id), c.total]));

    const data = collections
      // Não exibir a coleção "oracoes-outras-tradicoes" caso ela ainda exista no banco.
      .filter((c) => c.slug !== "oracoes-outras-tradicoes")
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        description: c.description || "",
        cover: c.cover || null,
        count: mapCount.get(String(c._id)) || 0,
      }))
      .sort((a, b) => b.count - a.count);

    return { props: { collections: data }, revalidate: 3600 };
  } catch (e) {
    console.error("[/oracoes] static generation error:", e);
    return {
      props: { collections: [], error: e.message || "Erro inesperado" },
      revalidate: 3600,
    };
  }
}
