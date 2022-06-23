import UsersModel from "../models/UsersModel.js";
import { hash } from "../utils/Auth.js";

// GET ALL
export const getUsers = async (req, res) => {
    try {
        const users = await UsersModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ONE
export const getUserById = async (req, res) => {
    try {
        const user = await UsersModel.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// INSERT
export const insertUsers = async (req, res) => {
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

// UPDATE
export const updateUsers = async (req, res) => {
    try {
        const updatedUsers = await UsersModel.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(updatedUsers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    // const { name, username, password } = req.body;
    // if (password) {
    //     const hashedPassword = await hash(password);
    //     try {
    //         const updatedUsers = await UsersModel.updateOne(
    //             { _id: req.params.id },
    //             { $set: { name, username, password: hashedPassword } }
    //         );
    //         res.status(201).json(updatedUsers);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // } else {

    // }
};

// DELETE
export const deleteUsers = async (req, res) => {
    try {
        const deletedUsers = await UsersModel.deleteOne({ _id: req.params.id });
        res.status(201).json(deletedUsers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
