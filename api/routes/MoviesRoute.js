import express from "express";
// import page controller
import {
    getMovies,
    getMoviesById,
    insertMovies,
    updateMovies,
    deleteMovies,
} from "../controllers/MoviesController.js";
const routes = express.Router();

routes.get("/", getMovies);
routes.get("/:id", getMoviesById);
routes.post("/", insertMovies);
routes.put("/:id", updateMovies);
routes.delete("/:id", deleteMovies);

export default routes;
