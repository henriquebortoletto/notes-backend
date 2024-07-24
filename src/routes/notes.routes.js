import { Router } from "express";
const router = Router();

import { NotesController } from "../controllers/NotesController.js";
const notesController = new NotesController();

router.get("/", notesController.index);
router.get("/:id", notesController.show);
router.post("/:user_id", notesController.create);
router.delete("/:id", notesController.delete);

export { router };
