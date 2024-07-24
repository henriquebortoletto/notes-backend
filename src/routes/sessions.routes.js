import { Router } from "express";
const router = Router();

import { SessionsController } from "../controllers/SessionsController.js";
const sessionsController = new SessionsController();

router.post("/", sessionsController.create);

export { router };
