import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  targetDate: Date,
  progress: { type: Number, min: 0, max: 100, default: 0 }
}, { timestamps: true });

export default mongoose.model("Goal", schema);
