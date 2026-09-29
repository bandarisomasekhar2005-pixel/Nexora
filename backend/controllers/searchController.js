import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Note from "../models/Note.js";
import Decision from "../models/Decision.js";

export async function search(req, res) {
  const q = String(req.query.q || "").trim();
  if (!q) return res.json([]);
  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const user = req.user._id;

  const [projects, tasks, notes, decisions] = await Promise.all([
    Project.find({ user, $or: [{ name: regex }, { description: regex }]}).limit(8),
    Task.find({ user, $or: [{ title: regex }, { description: regex }]}).limit(8),
    Note.find({ user, $or: [{ title: regex }, { content: regex }]}).limit(8),
    Decision.find({ user, $or: [{ title: regex }, { context: regex }, { choice: regex }]}).limit(8)
  ]);

  res.json([
    ...projects.map(x => ({ type: "Project", id: x._id, title: x.name })),
    ...tasks.map(x => ({ type: "Task", id: x._id, title: x.title })),
    ...notes.map(x => ({ type: "Note", id: x._id, title: x.title })),
    ...decisions.map(x => ({ type: "Decision", id: x._id, title: x.title }))
  ]);
}
