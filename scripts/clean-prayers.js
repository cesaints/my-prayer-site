import "dotenv/config";
import mongoose from "mongoose";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const col = mongoose.connection.db.collection("prayers");

  console.log("Antes:", await col.countDocuments());
  // remove docs sem slug
  const del = await col.deleteMany({
    $or: [{ slug: null }, { slug: { $exists: false } }],
  });
  console.log("Removidos sem slug:", del.deletedCount);

  // tenta derrubar índice antigo se existir
  try {
    const idx = await col.indexes();
    const has = idx.find((i) => i.name === "slug_1");
    if (has) {
      await col.dropIndex("slug_1");
      console.log("dropIndex('slug_1'): OK");
    } else {
      console.log("Índice slug_1 não existe, ok.");
    }
  } catch (e) {
    console.log("Aviso ao dropar index:", e.message);
  }

  console.log("Depois:", await col.countDocuments());
  await mongoose.disconnect();
  console.log("Limpeza concluída.");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
