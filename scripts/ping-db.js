import "dotenv/config";
import mongoose from "mongoose";

async function run() {
  console.log(
    "URI:",
    process.env.MONGODB_URI?.replace(/\/\/.*@/, "//***:***@")
  ); // mascara user:pass
  await mongoose.connect(process.env.MONGODB_URI);
  const admin = mongoose.connection.db.admin();
  console.log("Ping:", await admin.ping());
  console.log("DB name:", mongoose.connection.db.databaseName);
  await mongoose.disconnect();
  console.log("OK desconectado");
}
run().catch((e) => {
  console.error("Falhou:", e);
  process.exit(1);
});
