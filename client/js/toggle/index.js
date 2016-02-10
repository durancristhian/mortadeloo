import $ from "jquery";
import socketio from "socket.io-client";

let linksSelector;
let socket = socketio();

function numberClick(event) {
    event.preventDefault();

    $(linksSelector).off("click", numberClick);

    $(event.target).toggleClass("toggle-active");

    socket.emit("follow-number", $(event.target).data("number"));
}

export function toggleActive(selector) {
    linksSelector = selector;
    $(linksSelector).on("click", numberClick);

    socket.on("follow-number-ok", result => {
        console.log(result);
        $(linksSelector).on("click", numberClick);
    });
}
