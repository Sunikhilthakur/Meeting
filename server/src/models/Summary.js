import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema(
  {
    instruction: { type: String, required: true },
    transcript: { type: String }, // optional (can be large)
    summary: { type: String, required: true },
    recipients: [{ type: String }],
    emailedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Summary", SummarySchema);
