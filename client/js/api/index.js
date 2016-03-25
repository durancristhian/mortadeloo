import $ from "jquery";

export function api(resource, callback) {
    $.ajax(`/api/${resource}`, {
        error  : error => callback(error),
        success: results => callback(null, results)
    });
}
