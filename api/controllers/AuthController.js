import UsersModel from "../models/UsersModel.js";
import { hash, passwordCompare, generateToken } from "../utils/Auth.js";

export const register = async (req, res) => {
    const { name, username, password } = req.body;
    const hashedPassword = await hash(password);
    try {
        const insertedUsers = await UsersModel.create({
            name,
            username,
            password: hashedPassword,
        });
        res.status(201).json(insertedUsers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await UsersModel.findOne({ username });
    if (!user) {
        return res.json({ msg: "User Not Found!" });
    }
    // Cek password
    const cek = await passwordCompare(password, user.password);
    if (!cek) {
        return res.json({ msg: "Wrong Password!" });
    }

    // Generate token
    const { token, refreshToken } = generateToken(user._id, user.name, user.username);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.send({ token });
};

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};
