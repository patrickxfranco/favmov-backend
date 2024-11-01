import { Router } from "express";
import UserServices from "../services/users.services.js";
import checkAuthentication from "../middleware/checkAuthentication.js";

const userRoutes = Router();
const userServices = new UserServices();

userRoutes.post("/register", userServices.create);
userRoutes.delete("/", checkAuthentication, userServices.delete);
userRoutes.get("/", checkAuthentication, userServices.read);
userRoutes.put("/", checkAuthentication,userServices.update);

export default userRoutes;
