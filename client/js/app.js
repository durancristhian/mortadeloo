import $ from "jquery";
import { api } from "./api";
import { initToggles } from "./toggles";

api("results", (error, results) => {
    $("#loading").addClass("hide");

    if (error) {
        console.error(error);
    } else {
        $("#nacional-primera").html(results.nacional.laPrimera);
        $("#nacional-matutina").html(results.nacional.matutina);
        $("#nacional-vespertina").html(results.nacional.vespertina);
        $("#nacional-nocturna").html(results.nacional.nocturna);
        $("#provincia-matutina").html(results.provincia.matutina);
        $("#provincia-vespertina").html(results.provincia.vespertina);
        $("#provincia-nocturna").html(results.provincia.nocturna);
        $("#provincia-primera").html(results.provincia.laPrimera);

        $("#results").removeClass("hide");
    }
});

initToggles("#toggles");
