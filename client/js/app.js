import $ from "jquery";
import { getResults } from "./api";

getResults(results => {
    $("#loading").addClass("hide");
    $("#nacional-primera").html(results.nacional.laPrimera);
    $("#nacional-matutina").html(results.nacional.matutina);
    $("#nacional-vespertina").html(results.nacional.vespertina);
    $("#nacional-nocturna").html(results.nacional.nocturna);
    $("#provincia-matutina").html(results.provincia.matutina);
    $("#provincia-vespertina").html(results.provincia.vespertina);
    $("#provincia-nocturna").html(results.provincia.nocturna);
    $("#provincia-primera").html(results.provincia.laPrimera);
    $("#table").removeClass("hide");
});
