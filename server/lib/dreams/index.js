import path from "path";
import fs from "fs";

const dreamsFile = path.join("server", "resources", "dreams.json");

export default function (req, res, next) {
    fs.readFile(dreamsFile, "binary", (error, data) => {
        if (!error) {
            res.locals.dreams = JSON.parse(data);
        }
        next();
    });
}
