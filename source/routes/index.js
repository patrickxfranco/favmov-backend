import { Router } from "express";

import movieRoutes from "./movies.routes.js";
import userRoutes from "./users.routes.js";
import sessionRoutes from "./session.routes.js";

const routes = Router();

routes.use("/movies", movieRoutes);
routes.use("/user", userRoutes);
routes.use("/login", sessionRoutes);

export default routes;
