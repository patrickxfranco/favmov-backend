import { Router } from "express";

import sessionRoutes from "./session.routes.js";
import movieRoutes from "./movies.routes.js";
import userRoutes from "./users.routes.js";

const routes = Router();

routes.use("/login", sessionRoutes);
routes.use("/movies", movieRoutes);
routes.use("/user", userRoutes);

export default routes;
