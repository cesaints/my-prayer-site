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
  // Coleção adicional contendo orações tradicionais cristãs
  {
    name: "Orações Tradicionais",
    slug: "oracoes-tradicionais",
    description: "Orações clássicas de devoção cristã.",
    cover: "/covers/traditional.jpg",
    accent1: "#facc15",
    accent2: "#fb7185",
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

  // Define orações tradicionais com seus textos completos.
  const prayers = [
    {
      title: "Pai Nosso",
      content: `Pai nosso, que estais nos céus, santificado seja o vosso nome;\nVenha o vosso reino; seja feita a vossa vontade, assim na terra como no céu.\nO pão nosso de cada dia nos dai hoje;\nPerdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido;\nE não nos deixeis cair em tentação; mas livrai-nos do mal. Amém.`,
      category: "oração",
      collectionSlug: "oracoes-tradicionais",
      tags: ["pai-nosso", "oração do senhor"],
    },
    {
      title: "Ave Maria",
      content: `Ave, Maria, cheia de graça, o Senhor é convosco.\nBendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus!\nSanta Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.`,
      category: "oração",
      collectionSlug: "oracoes-tradicionais",
      tags: ["ave-maria", "mariana"],
    },
    {
      title: "Glória ao Pai",
      content: `Glória ao Pai, ao Filho e ao Espírito Santo,\ncomo era no princípio, agora e sempre. Amém.`,
      category: "oração",
      collectionSlug: "oracoes-tradicionais",
      tags: ["doxologia"],
    },
    {
      title: "Credo (Símbolo dos Apóstolos)",
      content: `Creio em Deus Pai todo‑poderoso, criador do céu e da terra;\nE em Jesus Cristo, seu único Filho, nosso Senhor,\nque foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria;\nPadeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado;\nDesceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus;\nEstá sentado à direita de Deus Pai todo‑poderoso, de onde há de vir a julgar os vivos e os mortos.\nCreio no Espírito Santo; na santa Igreja Católica; na comunhão dos santos;\nNa remissão dos pecados; na ressurreição da carne;\nE na vida eterna. Amém.`,
      category: "oração",
      collectionSlug: "oracoes-tradicionais",
      tags: ["credo", "símbolo"],
    },
    {
      title: "Salve Rainha",
      content: `Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!\nA vós bradamos, os degredados filhos de Eva.\nA vós suspiramos, gemendo e chorando neste vale de lágrimas.\nEia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei.\nE depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre.\nÓ clemente, ó piedosa, ó doce sempre Virgem Maria!\nRogai por nós, santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.`,
      category: "oração",
      collectionSlug: "oracoes-tradicionais",
      tags: ["salve-rainha", "mariana"],
    },
    {
      title: "Santo Anjo do Senhor",
      content: `Santo Anjo do Senhor, meu zeloso guardador,\nse a ti me confiou a piedade divina, sempre me rege, me guarde, me governe e ilumine. Amém.`,
      category: "oração",
      collectionSlug: "oracoes-tradicionais",
      tags: ["anjo-da-guarda", "anjo"],
    },
  ];

  // Insere ou atualiza cada oração
  for (const p of prayers) {
    const collectionId = ids[p.collectionSlug];
    if (!collectionId) continue;
    await Prayer.updateOne(
      { title: p.title },
      {
        $set: {
          title: p.title,
          content: p.content,
          category: p.category,
          collection: collectionId,
          tags: p.tags,
        },
      },
      { upsert: true }
    );
  }

  console.log("✅ Seed concluído sem erros.");
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ Seed falhou:", e);
  process.exit(1);
});
