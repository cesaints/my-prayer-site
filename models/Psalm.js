// models/Psalm.js
import mongoose from "mongoose";

const PsalmSchema = new mongoose.Schema(
  {
    number: { type: Number, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    cover: { type: String }, // ex: "/covers/salmos/salmo-23.png"
  },
  { timestamps: true }
);

// fallback: gera slug a partir do número/título se faltar
PsalmSchema.pre("validate", function (next) {
  if (!this.slug) {
    const base = this.number ? `salmo-${this.number}` : this.title || "";
    this.slug = slugify(base, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Psalm || mongoose.model("Psalm", PsalmSchema);
