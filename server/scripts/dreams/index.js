import cheerio from "cheerio";
import fs from "fs";
import request from "request";

const options = {
    url     : "http://mundodesuenos.com/tabla_numeros.php",
    encoding: "binary"
};
const resourcesDir = "server/resources/";

function init() {
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(body, { normalizeWhitespace: true, decodeEntities: true });
            let results = [];

            for (let i = 0; i < 25; i++) {
                results.push($("tr").eq(i).children().eq(1).text());
                results.push($("tr").eq(i).children().eq(3).text());
                results.push($("tr").eq(i).children().eq(5).text());
                results.push($("tr").eq(i).children().eq(7).text());
            }

            if (fs.existsSync(resourcesDir)) {
                fs.writeFile(resourcesDir + "/dreams.json", results, err => {
                    if (err) { return console.log(err); }
                });

                fs.readFile(resourcesDir + "/dreams.json", "utf8", (err, data) => {
                    console.log(data);
                });
            }
        } else {
            console.log(error);
        }
    });
}

init();
