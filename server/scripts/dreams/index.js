import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import request from "request";

const dreamsFile = path.join("server", "resources", "dreams.json");
const options = {
    url     : "http://mundodesuenos.com/tabla_numeros.php",
    encoding: "binary"
};
const resourcesDir = path.join("server", "resources");

request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        let $ = cheerio.load(body, {
            normalizeWhitespace: true,
            decodeEntities     : true
        });
        let results = {
            dreams: []
        };

        for (let i = 0; i < 25; i++) {
            results.dreams.push($("tr").eq(i).children().eq(1).text());
            results.dreams.push($("tr").eq(i).children().eq(3).text());
            results.dreams.push($("tr").eq(i).children().eq(5).text());
            results.dreams.push($("tr").eq(i).children().eq(7).text());
        }

        if (!fs.existsSync(resourcesDir)) {
            fs.mkdirSync(resourcesDir);
        }

        fs.writeFile(dreamsFile, JSON.stringify(results), "binary", error => {
            if (error) {
                return console.error(error);
            }
        });
    } else {
        console.log(error);
    }
});
