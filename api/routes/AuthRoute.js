import express from "express";
// import page controller
import { register, login, logout } from "../controllers/AuthController.js";
import { refreshToken } from "../middlewares/AuthMiddleware.js";
const routes = express.Router();

routes.post("/login", login);
routes.post("/register", register);
routes.get("/token", refreshToken);
routes.delete("/logout", logout);

export default routes;
