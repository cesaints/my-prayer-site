import dbConnect from "@/lib/dbConnect";
import Prayer from "@/models/Prayer";
import Head from "next/head";

export default function Mantras({ prayers }) {
  return (
    <>
      <Head>
        <title>Mantras | Portal</title>
      </Head>
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6 text-purple-800">Mantras</h1>
          {prayers.length === 0 && (
            <p className="text-gray-600">Nenhum mantra cadastrado ainda.</p>
          )}
          {prayers.map((p) => (
            <details key={p._id} className="mb-4 border-b border-gray-200">
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
  const docs = await Prayer.find({ category: "mantra" }).lean();
  const prayers = docs.map((d) => ({
    ...d,
    _id: d._id.toString(),
  }));
  return { props: { prayers } };
}
