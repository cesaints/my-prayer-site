import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("prayers");

  const idx = await col.indexes();
  console.log("Índices atuais:", idx);

  // tente dropar pelo nome padrão
  try {
    await col.dropIndex("slug_1");
    console.log("✅ dropIndex('slug_1') OK");
  } catch (e) {
    console.error("Falha dropIndex('slug_1'):", e.message);
  }

  await mongoose.disconnect();
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
