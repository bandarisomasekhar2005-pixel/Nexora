import Activity from "../models/Activity.js";

export async function logActivity(user, action, entityType, entityId = "") {
  await Activity.create({ user, action, entityType, entityId });
}
