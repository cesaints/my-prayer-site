import Head from "next/head";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Mantra from "../../models/Mantra";

export default function MantraView({ mantra }) {
  if (!mantra) {
    return (
      <section className="section">
        <div className="container-max max-w-3xl mx-auto text-center">
          <p className="muted">Mantra não encontrado.</p>
          <Link
            href="/mantras"
            className="inline-block mt-6 underline text-cyan-300"
          >
            ← Voltar aos mantras
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{mantra.title}</title>
        <meta name="description" content={mantra.excerpt || mantra.title} />
      </Head>

      <section className="section">
        <div className="container-max max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <div className="halo mx-auto mb-4" />
            <h1 className="title-xl">{mantra.title}</h1>
            {mantra.excerpt && (
              <p className="subtitle mt-2">{mantra.excerpt}</p>
            )}
          </header>

          <article className="prayer-card">
            <div className="prayer-ornament" />
            {mantra.script && (
              <p
                className="prayer-text text-center whitespace-pre-line mb-4"
                style={{ fontSize: "1.25rem" }}
              >
                {mantra.script}
              </p>
            )}
            {mantra.translit && (
              <p className="prayer-text text-center whitespace-pre-line mb-3">
                {mantra.translit}
              </p>
            )}
            {mantra.meaning && (
              <p className="prayer-text whitespace-pre-line mb-3 text-white/85">
                {mantra.meaning}
              </p>
            )}

            {mantra.audioUrl ? (
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
                <audio
                  controls
                  preload="none"
                  src={mantra.audioUrl}
                  className="w-full"
                />
                {mantra.reps ? (
                  <p className="text-xs text-white/70 mt-2">
                    Sugestão: {mantra.reps} repetições.
                  </p>
                ) : null}
              </div>
            ) : null}
          </article>

          <div className="mt-10 text-center">
            <Link
              href="/mantras"
              className="inline-block underline text-cyan-300"
            >
              ← Voltar aos mantras
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Pre‑build each mantra page.  Next.js will generate the HTML for every
 * existing mantra at build time, falling back to on‑demand generation for
 * any new slugs encountered after deployment.  Each page is revalidated
 * hourly to pick up updates from the database.
 */
export async function getStaticPaths() {
  await dbConnect();
  const docs = await Mantra.find({}).select("slug").lean();
  const paths = docs.map((d) => ({ params: { slug: d.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const doc = await Mantra.findOne({ slug: params.slug })
    .select(
      "title slug excerpt script translit meaning audioUrl reps createdAt updatedAt"
    )
    .lean();
  if (!doc) {
    return { props: { mantra: null }, revalidate: 3600 };
  }
  const mantra = {
    _id: doc._id.toString(),
    title: doc.title || "",
    slug: doc.slug || "",
    excerpt: doc.excerpt || "",
    script: doc.script || "",
    translit: doc.translit || "",
    meaning: doc.meaning || "",
    audioUrl: doc.audioUrl || "",
    reps: doc.reps ?? null,
    createdAt: doc.createdAt?.toISOString?.() ?? null,
    updatedAt: doc.updatedAt?.toISOString?.() ?? null,
  };
  return { props: { mantra }, revalidate: 3600 };
}
