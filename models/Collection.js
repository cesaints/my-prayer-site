// models/Collection.js
import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true }, // precisa existir
    description: { type: String, default: "" },
    cover: { type: String, default: "" },
    accent1: { type: String, default: "#7c3aed" },
    accent2: { type: String, default: "#22d3ee" },
  },
  { timestamps: true }
);

export default mongoose.models.Collection ||
  mongoose.model("Collection", CollectionSchema);
