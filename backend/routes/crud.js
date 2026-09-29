import { Router } from "express";
import { create, list, remove, update } from "../controllers/crudController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);
router.get("/:resource", list);
router.post("/:resource", create);
router.put("/:resource/:id", update);
router.delete("/:resource/:id", remove);
export default router;
