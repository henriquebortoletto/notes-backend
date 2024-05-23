import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js";

const router = Router();
const notesController = new NotesController();

router.get("/:id", notesController.show);
router.post("/:user_id", notesController.create);

export { router };
