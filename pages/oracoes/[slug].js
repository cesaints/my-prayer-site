// pages/oracoes/[slug].js
import Head from "next/head";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Collection from "../../models/Collection";
import Prayer from "../../models/Prayer";

// Use static generation for better performance.  See getStaticProps and
// getStaticPaths below for implementation details.

export default function CollectionView({ collection, prayers }) {
  if (!collection) {
    return (
      <section className="section">
        <div className="container-max max-w-3xl mx-auto text-center">
          <p className="muted">Coleção não encontrada.</p>
          <Link
            href="/oracoes"
            className="inline-block mt-6 underline text-cyan-300"
          >
            ← Voltar para coleções
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{collection.name} | Orações</title>
        <meta
          name="description"
          content={collection.description || "Coleção de orações"}
        />
      </Head>

      <section className="section">
        <div className="container-max max-w-3xl mx-auto">
          {/* Cabeçalho */}
          <header className="text-center mb-10">
            <div className="halo mx-auto mb-4" />
            <h1 className="title-xl">{collection.name}</h1>
            {collection.description && (
              <p className="subtitle mt-2">{collection.description}</p>
            )}
          </header>

          {/* Lista de orações */}
          {prayers.length === 0 ? (
            <p className="muted text-center">Ainda não há orações aqui.</p>
          ) : (
            <div className="space-y-8">
              {prayers.map((p) => (
                <article key={p._id} className="prayer-card">
                  <div className="prayer-ornament" />
                  <h3 className="prayer-title">{p.title}</h3>
                  <p className="prayer-text whitespace-pre-line">{p.content}</p>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/oracoes"
              className="inline-block underline text-cyan-300"
            >
              ← Voltar para coleções
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  await dbConnect();
  const cols = await Collection.find({}).select("slug").lean();
  const paths = cols.map((c) => ({ params: { slug: c.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const colDoc = await Collection.findOne({ slug: params.slug })
    .select("name slug description createdAt updatedAt")
    .lean();
  if (!colDoc) {
    return { props: { collection: null, prayers: [] }, revalidate: 3600 };
  }
  const docs = await Prayer.find({ collection: colDoc._id })
    .select("title content collection createdAt updatedAt")
    .sort({ createdAt: -1 })
    .lean();
  const collection = {
    _id: colDoc._id.toString(),
    name: colDoc.name || "",
    slug: colDoc.slug || "",
    description: colDoc.description ?? null,
    createdAt: colDoc.createdAt?.toISOString?.() ?? null,
    updatedAt: colDoc.updatedAt?.toISOString?.() ?? null,
  };
  const prayers = docs.map((d) => ({
    _id: d._id.toString(),
    title: d.title || "",
    content: d.content || "",
    collection: d.collection?.toString?.() ?? null,
    createdAt: d.createdAt?.toISOString?.() ?? null,
    updatedAt: d.updatedAt?.toISOString?.() ?? null,
  }));
  return { props: { collection, prayers }, revalidate: 3600 };
}
