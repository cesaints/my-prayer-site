import "dotenv/config";
import dbConnect from "../lib/dbConnect.js";
import Collection from "../models/Collection.js";
import Prayer from "../models/Prayer.js";

const COLLECTIONS = [
  {
    name: "Orações da Manhã",
    slug: "oracoes-da-manha",
    description: "Inicie o dia com serenidade e presença.",
    cover: "/covers/morning.jpg",
    accent1: "#22d3ee",
    accent2: "#60a5fa",
  },
  {
    name: "Orações da Tarde",
    slug: "oracoes-da-tarde",
    description: "Recolha-se no meio do dia.",
    cover: "/covers/afternoon.jpg",
    accent1: "#f59e0b",
    accent2: "#f472b6",
  },
  {
    name: "Orações da Noite",
    slug: "oracoes-da-noite",
    description: "Encerre em confiança e gratidão.",
    cover: "/covers/night.jpg",
    accent1: "#7c3aed",
    accent2: "#22d3ee",
  },
  {
    name: "Orações aos Santos",
    slug: "oracoes-aos-santos",
    description: "Com a intercessão dos santos.",
    cover: "/covers/saints.jpg",
    accent1: "#10b981",
    accent2: "#60a5fa",
  },
  {
    name: "Orações aos Anjos",
    slug: "oracoes-aos-anjos",
    description: "Anjos e Arcanjos: auxílio e proteção.",
    cover: "/covers/angels.jpg",
    accent1: "#a78bfa",
    accent2: "#22d3ee",
  },
];

async function ensureCollections() {
  const ids = {};
  for (const c of COLLECTIONS) {
    let doc = await Collection.findOne({ slug: c.slug });
    if (!doc) doc = await Collection.create(c); // <- garante name
    ids[c.slug] = doc._id;
  }
  return ids;
}

async function run() {
  await dbConnect();
  const ids = await ensureCollections();

  // Insere 1 oração de teste na "manhã" para validar pipeline
  await Prayer.updateOne(
    { title: "Oração de Teste da Manhã" },
    {
      $set: {
        title: "Oração de Teste da Manhã",
        content: "Senhor, abençoai este novo dia.",
        category: "oração",
        collection: ids["oracoes-da-manha"],
        tags: ["manhã", "teste"],
      },
    },
    { upsert: true }
  );

  console.log("✅ Seed concluído sem erros.");
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ Seed falhou:", e);
  process.exit(1);
});
