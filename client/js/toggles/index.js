import $ from "jquery";
import socketio from "socket.io-client";

let socket = socketio();
socket.on("follow-number-ok", result => console.log(result));
socket.on("error", error => console.error(error));
socket.on("unfollow-number-ok", result => console.log(result));

function numberClick(event) {
    event.preventDefault();

    let element = $(event.target);
    element.toggleClass("toggle-active");

    if (element.hasClass("toggle-active")) {
        socket.emit("follow-number", element.data("number"));
    } else {
        socket.emit("unfollow-number", element.data("number"));
    }
}

export function initToggles(selector) {
    $(selector).on("click", "a", numberClick);
}
