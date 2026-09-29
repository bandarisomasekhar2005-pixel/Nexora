import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Note", schema);
