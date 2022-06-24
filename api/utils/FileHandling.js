import { random } from "./RandomString.js";

export const fileHandling = (posterFile) => {
    // Extention
    const allowedExt = ["image/jpeg", "image/jpg", "image/png"];

    // Cek Size
    if (posterFile.size > 5242880) return res.status(400).send("Maksimal 5mb.");
    // Cek Ekstensi
    if (!allowedExt.includes(posterFile.mimetype)) {
        return res.status(400).send("Harap inputkan image.");
    }

    // Unique File Name
    const randomStr = random(24);
    const split = posterFile.name.split(".");
    const fileExtention = split[split.length - 1];
    const fileName = randomStr + "." + fileExtention;

    // Move file
    const uploadPath = "./public/uploads/" + fileName; // Cara akses http://localhost:8000/uploads/QJO6WJn5uZSTvboOnQdWWztf.jpg
    posterFile.mv(uploadPath);
    // Ubah nama file

    return fileName;
};
