// pages/oracao/[slug].js
import Head from "next/head";
import dbConnect from "@/lib/dbConnect";
import Prayer from "@/models/Prayer";
import { serialize } from "@/lib/serialize";

export default function Oracao({ prayer }) {
  if (!prayer) return null;

  return (
    <>
      <Head>
        <title>{prayer.title} | Orações</title>
      </Head>

      <section className="section">
        <article className="glass p-6 rounded-2xl">
          <h1 className="headline text-3xl md:text-4xl">{prayer.title}</h1>
          <p className="muted mt-2">{prayer.category}</p>

          <div className="mt-6 whitespace-pre-line leading-relaxed">
            {prayer.content}
          </div>
        </article>
      </section>
    </>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const doc = await Prayer.findOne({ slug: params.slug }).lean();
  return { props: { prayer: doc ? serialize(doc) : null } };
}
