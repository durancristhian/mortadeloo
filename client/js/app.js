import $ from "jquery";
import { toggleActive } from "./toggle";
import { getResults } from "./api";
import { currentRoute } from "./current-route";

getResults((error, results) => {
    $("#loading").addClass("hide");

    if (error) {
        console.log(error);
    } else {
        $("#nacional-primera").html(results.nacional.laPrimera);
        $("#nacional-matutina").html(results.nacional.matutina);
        $("#nacional-vespertina").html(results.nacional.vespertina);
        $("#nacional-nocturna").html(results.nacional.nocturna);
        $("#provincia-matutina").html(results.provincia.matutina);
        $("#provincia-vespertina").html(results.provincia.vespertina);
        $("#provincia-nocturna").html(results.provincia.nocturna);
        $("#provincia-primera").html(results.provincia.laPrimera);
        $("#table").removeClass("hide");
    }
});

if (currentRoute === "/app") {
    toggleActive("#toggles");
}
