import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model("Task", schema);
