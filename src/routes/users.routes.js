import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";

const router = Router();
const usersController = new UsersController();

router.post("/", usersController.create);
router.put("/:id", usersController.update);

export { router };
