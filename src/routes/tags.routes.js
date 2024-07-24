import { Router } from "express";
const router = Router();

import { TagsController } from "../controllers/TagsController.js";
const tagsController = new TagsController();

router.get("/:user_id", tagsController.index);

export { router };
