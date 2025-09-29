// pages/oracoes/index.js
import Head from "next/head";
import dbConnect from "../../lib/dbConnect";
import Collection from "../../models/Collection";
import Prayer from "../../models/Prayer";
import FeaturedCollectionCard from "../../components/FeaturedCollectionCard";

export const dynamic = "force-dynamic";

export default function CollectionsPage({ collections = [], error = "" }) {
  return (
    <>
      <Head>
        <title>Coleções | Portal de Orações</title>
      </Head>

      <section className="container-max pt-10 md:pt-14">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Coleções
          </h1>
          <p className="mt-2 text-white/70">
            Escolha um tema e explore orações curadas.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
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
      </section>
    </>
  );
}

export async function getServerSideProps() {
  try {
    await dbConnect();

    const collections = await Collection.find({}).lean();
    const counts = await Prayer.aggregate([
      { $group: { _id: "$collection", total: { $sum: 1 } } },
    ]);
    const mapCount = new Map(counts.map((c) => [String(c._id), c.total]));

    const data = collections
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        description: c.description || "",
        cover: c.cover || null,
        count: mapCount.get(String(c._id)) || 0,
      }))
      .sort((a, b) => b.count - a.count);

    return { props: { collections: data } };
  } catch (e) {
    console.error("[/oracoes] gSSP error:", e);
    return {
      props: { collections: [], error: e.message || "Erro inesperado" },
    };
  }
}
