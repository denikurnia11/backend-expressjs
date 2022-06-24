import MoviesModel from "../models/MoviesModel.js";
import fs from "fs";
import { fileHandling } from "../utils/FileHandling.js";
// INSERT
export const insertMovies = async (req, res) => {
    try {
        const { title, year, runtime, genre, actors, plot } = req.body;

        // Cek mengupload file atau tidak
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }

        // File Handling
        const fileName = fileHandling(req.files.posterFile);

        // Insert to database
        const insertedMovies = await MoviesModel.create({
            title,
            year,
            runtime,
            genre,
            actors,
            plot,
            poster: fileName,
        });

        res.status(201).json(insertedMovies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// UPDATE
export const updateMovies = async (req, res) => {
    try {
        const { title, year, runtime, genre, actors, plot } = req.body;
        let option = {};
        // Cek mengupload file atau tidak
        if (!req.files || Object.keys(req.files).length === 0) {
            option = { title, year, runtime, genre, actors, plot };
        } else {
            // Delete Old File
            const movies = await MoviesModel.findById(req.params.id);
            fs.unlinkSync("./public/uploads/" + movies.poster);

            // File Handling
            const fileName = fileHandling(req.files.posterFile);

            option = { title, year, runtime, genre, actors, plot, poster: fileName };
        }

        const updatedMovies = await MoviesModel.updateOne(
            { _id: req.params.id },
            { $set: option, $currentDate: { lastModified: true } }
        );
        res.status(201).json(updatedMovies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// DELETE
export const deleteMovies = async (req, res) => {
    try {
        // Delete Old File
        const movies = await MoviesModel.findById(req.params.id);
        fs.unlinkSync("./public/uploads/" + movies.poster);
        // Delete data
        const deletedMovies = await MoviesModel.deleteOne({ _id: req.params.id });
        res.status(201).json(deletedMovies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// GET ALL
export const getMovies = async (req, res) => {
    try {
        const movies = await MoviesModel.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// GET
export const getMoviesById = async (req, res) => {
    try {
        const movies = await MoviesModel.findById(req.params.id);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
