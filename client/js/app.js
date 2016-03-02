import $ from "jquery";
import { toggleActive } from "./toggle";
import { getResults } from "./api";

getResults((error, results) => {
    if (error) {
        return console.error(error);
    }

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

toggleActive("#toggles");
