import dbConnect from "@/lib/dbConnect";
import Prayer from "@/models/Prayer";
import Head from "next/head";

export default function Oracoes({ prayers }) {
  return (
    <>
      <Head>
        <title>Orações | Portal</title>
      </Head>
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6 text-purple-800">Orações</h1>
          {prayers.length === 0 && (
            <p className="text-gray-600">Nenhuma oração cadastrada ainda.</p>
          )}
          {prayers.map((p) => (
            <details
              key={p._id}
              className="mb-4 border-b border-gray-200 group"
            >
              <summary className="cursor-pointer py-3 text-xl font-medium text-purple-800 hover:text-purple-900">
                {p.title}
              </summary>
              <div className="pb-4 pl-2 text-gray-800 whitespace-pre-line">
                {p.content}
              </div>
            </details>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const docs = await Prayer.find({ category: "oração" })
    .sort({ createdAt: -1 })
    .lean();

  const prayers = docs.map((d) => ({
    ...d,
    _id: d._id.toString(),
    createdAt: d.createdAt ? d.createdAt.toISOString() : null,
    updatedAt: d.updatedAt ? d.updatedAt.toISOString() : null,
  }));

  return { props: { prayers } };
}
