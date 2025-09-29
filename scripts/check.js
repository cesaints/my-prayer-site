import "dotenv/config";
import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect.js";
import Collection from "../models/Collection.js";
import Prayer from "../models/Prayer.js";

(async () => {
  await dbConnect();
  const cols = await Collection.find().lean();
  for (const c of cols) {
    const n = await Prayer.countDocuments({ collection: c._id });
    console.log(`${c.name} (${c.slug}): ${n} orações`);
  }
  await mongoose.disconnect();
})();
