import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { UsersController } from "../controllers/UsersController.js";
import { UsersAvatarController } from "../controllers/UsersAvatarController.js";

import config from "../configs/upload.js";

const router = Router();

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

router.post("/", usersController.create);
router.put("/", [ensureAuthenticated], usersController.update);
router.patch(
  "/avatar",
  [ensureAuthenticated, config.UPLOAD.single("avatar")],
  usersAvatarController.update
);

export { router };
