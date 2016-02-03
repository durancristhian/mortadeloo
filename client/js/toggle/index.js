import $ from "jquery";

export function toggleActive(selector) {
    $(selector).on("click", (event) => {

        event.preventDefault();

        $(event.target).toggleClass("toggle-active");
    });
}
