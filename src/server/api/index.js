import cheerio from "cheerio";
import express from "express";
import request from "request";

const router = express.Router();

router.get("/results", (req, res) => {
    request("http://www.dejugadas.com/quinielas/datospizarra.php", (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(body, { normalizeWhitespace: true });
            let result = {
                nacional : {},
                provincia: {}
            };
            result.nacional.laPrimera = $("#t_datos tr").first().children().eq(2).text();
            result.nacional.matutina = $("#t_datos tr").first().children().eq(3).text();
            result.nacional.vespertina = $("#t_datos tr").first().children().eq(4).text();
            result.nacional.nocturna = $("#t_datos tr").first().children().eq(5).text();
            result.provincia.laPrimera = $("#t_datos tr").first().next().children().eq(2).text();
            result.provincia.matutina = $("#t_datos tr").first().next().children().eq(3).text();
            result.provincia.vespertina = $("#t_datos tr").first().next().children().eq(4).text();
            result.provincia.nocturna = $("#t_datos tr").first().next().children().eq(5).text();
            res.status(200).json(result);
        } else {
            res.status(500).json({
                error, response
            });
        }
    });
});

export default router;
