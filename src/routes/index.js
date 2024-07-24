import { Router } from "express";

import { router as usersRoutes } from "./users.routes.js";
import { router as notesRoutes } from "./notes.routes.js";
import { router as tagsRoutes } from "./tags.routes.js";
import { router as sessionsRoutes } from "./sessions.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes);

export default routes;
