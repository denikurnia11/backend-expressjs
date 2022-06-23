import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send("Not Authenticated");

    const secretKey = process.env.JWT_SECRET;
    const token = req.headers.authorization.split(" ")[1];

    try {
        const verify = jwt.verify(token, secretKey);
        if (verify) return next();
        return res.send("Token Invalid");
    } catch (err) {
        return res.send(err);
    }
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const refreshKey = process.env.JWT_REFRESH;
    jwt.verify(refreshToken, refreshKey, (err, decode) => {
        if (err) return res.sendStatus(403);

        const id = decode.id;
        const name = decode.name;
        const username = decode.username;
        const secretKey = process.env.JWT_SECRET;

        const accessToken = jwt.sign({ id, name, username }, secretKey, { expiresIn: "10s" });
        res.json({ accessToken });
    });
};
