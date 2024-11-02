import checkAuthentication from "../middleware/checkAuthentication.js";
import UserServices from "../services/users.services.js";
import { Router } from "express";

const userRoutes = Router();
const userServices = new UserServices();

userRoutes.post("/register", userServices.create);
userRoutes.get("/", checkAuthentication, userServices.read);
userRoutes.put("/", checkAuthentication, userServices.update);
userRoutes.delete("/", checkAuthentication, userServices.delete);

export default userRoutes;
