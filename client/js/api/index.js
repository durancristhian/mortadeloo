import $ from "jquery";

export function getResults(callback) {
    $.ajax("/api/results", {
        error  : error => callback(error),
        success: results => callback(null, results)
    });
}
