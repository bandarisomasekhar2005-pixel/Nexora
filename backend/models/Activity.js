import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: String,
  entityType: String,
  entityId: String
}, { timestamps: true });

export default mongoose.model("Activity", schema);
