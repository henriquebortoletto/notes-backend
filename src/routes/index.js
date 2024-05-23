import { Router } from "express";

import { router as usersRoutes } from "./users.routes.js";
import { router as notesRoutes } from "./notes.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);

export { routes };
