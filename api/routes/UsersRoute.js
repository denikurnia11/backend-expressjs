import express from "express";
// import page controller
import {
    deleteUsers,
    getUserById,
    getUsers,
    insertUsers,
    updateUsers,
} from "../controllers/UsersController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
const routes = express.Router();

routes.get("/", verifyToken, getUsers);
routes.get("/:id", verifyToken, getUserById);
routes.post("/", verifyToken, insertUsers);
routes.put("/:id", verifyToken, updateUsers);
routes.delete("/:id", verifyToken, deleteUsers);

export default routes;
