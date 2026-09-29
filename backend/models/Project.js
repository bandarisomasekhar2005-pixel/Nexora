import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["planning", "active", "completed", "archived"], default: "planning" },
  color: { type: String, default: "#7c5cff" },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model("Project", schema);
