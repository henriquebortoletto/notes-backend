import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js";

const router = Router();
const notesController = new NotesController();

router.get("/:id", notesController.show);
router.post("/:user_id", notesController.create);
router.delete("/:id", notesController.delete);

export { router };
