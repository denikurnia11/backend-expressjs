import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hash = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const passwordCompare = async (pass, encryptedPass) => {
    return await bcrypt.compare(pass, encryptedPass);
};

export const generateToken = (id, name, username) => {
    const secretKey = process.env.JWT_SECRET;
    const refreshKey = process.env.JWT_REFRESH;
    const token = jwt.sign({ id, name, username }, secretKey, { expiresIn: "10s" });
    const refreshToken = jwt.sign({ id, name, username }, refreshKey, { expiresIn: "1d" });
    return { token, refreshToken };
};
