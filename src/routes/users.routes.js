import { Router } from "express";
const usersRoutes = Router();

import { UsersController } from "../controllers/UsersController.js";
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

export { usersRoutes };
