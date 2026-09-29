import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Goal from "../models/Goal.js";
import Note from "../models/Note.js";
import Decision from "../models/Decision.js";
import { logActivity } from "../utils/activity.js";

const models = { projects: Project, tasks: Task, goals: Goal, notes: Note, decisions: Decision };

export async function list(req, res) {
  const Model = models[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });
  const docs = await Model.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("project", "name");
  res.json(docs);
}

export async function create(req, res) {
  const Model = models[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });
  const doc = await Model.create({ ...req.body, user: req.user._id });
  await logActivity(req.user._id, `Created ${req.params.resource.slice(0, -1)}`, req.params.resource, doc._id);
  res.status(201).json(doc);
}

export async function update(req, res) {
  const Model = models[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });
  const doc = await Model.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
}

export async function remove(req, res) {
  const Model = models[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });
  const doc = await Model.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
}
