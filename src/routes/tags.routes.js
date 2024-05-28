import { Router } from "express";
import { TagsController } from "../controllers/TagsController.js";

const router = Router();
const tagsController = new TagsController();

router.get("/:user_id", tagsController.index);

export { router };
