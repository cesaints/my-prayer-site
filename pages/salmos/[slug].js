import Head from "next/head";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Psalm from "../../models/Psalm";

export default function PsalmView({ psalm }) {
  if (!psalm) {
    return (
      <section className="section">
        <div className="container-max max-w-3xl mx-auto text-center">
          <p className="muted">Salmo não encontrado.</p>
          <Link
            href="/salmos"
            className="inline-block mt-6 underline text-cyan-300"
          >
            ← Voltar aos salmos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{psalm.title}</title>
        <meta name="description" content={psalm.excerpt || psalm.title} />
      </Head>

      <section className="section">
        <div className="container-max max-w-3xl mx-auto">
          <header className="text-center mb-10">
            <div className="halo mx-auto mb-4" />
            <h1 className="title-xl">{psalm.title}</h1>
            {psalm.excerpt && <p className="subtitle mt-2">{psalm.excerpt}</p>}
          </header>

          <article className="prayer-card">
            <div className="prayer-ornament" />
            <p className="prayer-text whitespace-pre-line">{psalm.content}</p>
          </article>

          <div className="mt-10 text-center">
            <Link
              href="/salmos"
              className="inline-block underline text-cyan-300"
            >
              ← Voltar aos salmos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Pre‑build individual psalm pages.  All existing salmos are generated at
 * build time.  Pages fallback to on‑demand generation for slugs not found
 * during build (useful when new salmos are added).  Revalidation ensures
 * updated content is picked up hourly.
 */
export async function getStaticPaths() {
  await dbConnect();
  const docs = await Psalm.find({}).select("slug").lean();
  const paths = docs.map((d) => ({ params: { slug: d.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const doc = await Psalm.findOne({ slug: params.slug })
    .select("number title slug excerpt content createdAt updatedAt")
    .lean();
  if (!doc) {
    return { props: { psalm: null }, revalidate: 3600 };
  }
  const psalm = {
    _id: doc._id.toString(),
    number: doc.number ?? null,
    title: doc.title || "",
    slug: doc.slug || "",
    excerpt: doc.excerpt || "",
    content: doc.content || "",
    createdAt: doc.createdAt?.toISOString?.() ?? null,
    updatedAt: doc.updatedAt?.toISOString?.() ?? null,
  };
  return { props: { psalm }, revalidate: 3600 };
}
