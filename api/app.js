import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/UsersRoute.js";
import moviesRouter from "./routes/MoviesRoute.js";
import authRouter from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Database Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
    console.log(err);
});
mongoose.connection.once("open", () => {
    console.log("Database Connected!");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movies", moviesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
