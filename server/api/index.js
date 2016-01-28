import cheerio from "cheerio";
import express from "express";
import request from "request";

const router = express.Router();
const options = {
    url : "http://www.dejugadas.com/quinielas/datospizarra.php",
    form: {
        fecha: "2016/001/27"
    }
};

router.get("/results", (req, res) => {
    request.post(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(body, { normalizeWhitespace: true });
            let results = {
                nacional : {},
                provincia: {}
            };
            results.nacional.laPrimera = $("#t_datos tr").first().children().eq(2).text();
            results.nacional.matutina = $("#t_datos tr").first().children().eq(3).text();
            results.nacional.vespertina = $("#t_datos tr").first().children().eq(4).text();
            results.nacional.nocturna = $("#t_datos tr").first().children().eq(5).text();
            results.provincia.laPrimera = $("#t_datos tr").first().next().children().eq(2).text();
            results.provincia.matutina = $("#t_datos tr").first().next().children().eq(3).text();
            results.provincia.vespertina = $("#t_datos tr").first().next().children().eq(4).text();
            results.provincia.nocturna = $("#t_datos tr").first().next().children().eq(5).text();
            res.status(200).json(results);
        } else {
            res.status(500).json({
                error, response
            });
        }
    });
});

export default router;
