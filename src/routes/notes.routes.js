import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { NotesController } from "../controllers/NotesController.js";

const router = Router();
const notesController = new NotesController();

router.use(ensureAuthenticated);
router.get("/", notesController.index);
router.get("/:id", notesController.show);
router.post("/", notesController.create);
router.delete("/:id", notesController.delete);

export { router };
