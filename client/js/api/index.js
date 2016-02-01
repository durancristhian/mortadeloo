import $ from "jquery";

export function getResults(callback) {
    $.ajax("/api/results", {
        success: results => callback(results)
    });
}
