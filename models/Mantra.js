import mongoose from "mongoose";

const MantraSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: "" }, // texto curto do card
    script: { type: String, default: "" }, // devanagari, tibetano etc. (opcional)
    translit: { type: String, default: "" }, // transliteração
    meaning: { type: String, default: "" }, // tradução/explicação
    cover: { type: String }, // /covers/mantras/<slug>.png
    audioUrl: { type: String }, // /audio/<slug>.mp3 (opcional)
    reps: { type: Number, default: 108 }, // sugestão de repetições
  },
  { timestamps: true }
);

MantraSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Mantra || mongoose.model("Mantra", MantraSchema);
