import { Router } from "express";

import SessionServices from "../services/session.services.js";

const sessionRoutes = Router();
const sessionServices = new SessionServices();

sessionRoutes.post("/", sessionServices.create);

export default sessionRoutes;
