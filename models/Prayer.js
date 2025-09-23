import mongoose from "mongoose";

const PrayerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // "oração" | "salmo" | "mantra"
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);
