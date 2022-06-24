import mongoose from "mongoose";

const MoviesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        runtime: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        actors: {
            type: String,
            required: true,
        },
        plot: {
            type: String,
            required: true,
        },
        poster: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("movies", MoviesSchema);
