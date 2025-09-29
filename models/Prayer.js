import mongoose from "mongoose";

const PrayerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, default: "oração" },
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },

    // ⬇️ torne obrigatório e indexado
    slug: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

// helper simples
function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// pre-validate: se não veio slug, derive de title+collection
PrayerSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    // Use title + collection para evitar colisão entre coleções diferentes
    const col = this.collection?.toString?.() || "";
    this.slug = slugify(`${this.title}-${col}`);
  }
  next();
});

export default mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);
