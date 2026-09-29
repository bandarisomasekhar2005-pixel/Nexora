import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  context: { type: String, default: "" },
  choice: { type: String, default: "" },
  alternatives: [{ type: String }],
  reasoning: { type: String, default: "" },
  outcome: { type: String, default: "" },
  status: { type: String, enum: ["open", "resolved"], default: "open" },
  decidedAt: Date
}, { timestamps: true });

export default mongoose.model("Decision", schema);
