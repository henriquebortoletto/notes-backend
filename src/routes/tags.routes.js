import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { TagsController } from "../controllers/TagsController.js";

const router = Router();
const tagsController = new TagsController();

router.get("/", [ensureAuthenticated], tagsController.index);

export { router };
