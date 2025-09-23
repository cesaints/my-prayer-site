// scripts/seed.js
import mongoose from "mongoose";

const PrayerSchema = new mongoose.Schema(
  { title: String, category: String, content: String },
  { timestamps: true }
);
const Prayer = mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI não definido");
  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });

  const base = [
    {
      title: "Pai Nosso",
      category: "oração",
      content:
        "Pai nosso que estais no céu, santificado seja o Vosso nome; venha a nós o Vosso reino; seja feita a Vossa vontade, assim na Terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
    },
  ];

  for (const doc of base) {
    await Prayer.updateOne({ title: doc.title }, doc, { upsert: true });
  }
  console.log("✅ Seed concluído");
  await mongoose.disconnect();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
