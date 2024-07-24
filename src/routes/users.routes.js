import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { UsersController } from "../controllers/UsersController.js";

const router = Router();
const usersController = new UsersController();

router.post("/", usersController.create);
router.put("/", [ensureAuthenticated], usersController.update);

export { router };
