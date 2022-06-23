import MoviesModel from "../models/MoviesModel.js";
// INSERT
export const insertMovies = async (req, res) => {
    const movies = new MoviesModel(req.body);
    try {
        const insertedMovies = await movies.save();
        res.status(201).json(insertedMovies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// UPDATE
export const updateMovies = async (req, res) => {
    try {
        const updatedMovies = await MoviesModel.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(201).json(updatedMovies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// DELETE
export const deleteMovies = async (req, res) => {
    try {
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
