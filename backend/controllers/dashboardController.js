import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Goal from "../models/Goal.js";
import Decision from "../models/Decision.js";
import Activity from "../models/Activity.js";

export async function dashboard(req, res) {
  const user = req.user._id;
  const [projects, tasks, goals, decisions, recentActivity] = await Promise.all([
    Project.countDocuments({ user }),
    Task.countDocuments({ user }),
    Goal.countDocuments({ user }),
    Decision.countDocuments({ user }),
    Activity.find({ user }).sort({ createdAt: -1 }).limit(8)
  ]);

  const [doneTasks, openTasks, urgentTasks] = await Promise.all([
    Task.countDocuments({ user, status: "done" }),
    Task.countDocuments({ user, status: { $ne: "done" } }),
    Task.countDocuments({ user, priority: "urgent", status: { $ne: "done" } })
  ]);

  res.json({ counts: { projects, tasks, goals, decisions }, tasks: { done: doneTasks, open: openTasks, urgent: urgentTasks }, recentActivity });
}
