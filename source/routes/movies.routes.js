import checkAuthentication from "../middleware/checkAuthentication.js";
import MoviesServices from "../services/movies.services.js";
import { Router } from "express";

const movieRoutes = Router();
const moviesServices = new MoviesServices();

movieRoutes.use(checkAuthentication);

movieRoutes.get("/list/", moviesServices.index);
movieRoutes.post("/new", moviesServices.create);
movieRoutes.get("/:id", moviesServices.read);
movieRoutes.put("/:id", moviesServices.update);
movieRoutes.delete("/:id", moviesServices.delete);

export default movieRoutes;
