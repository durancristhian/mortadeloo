import $ from "jquery";
import socketio from "socket.io-client";

let socket = socketio();

function numberClick(event) {
    event.preventDefault();

    let element = $(event.target);
    element.toggleClass("toggle-active");

    socket.emit("follow-number", element.data("number"));
}

export function toggleActive(selector) {
    $(selector).on("click", "a", numberClick);

    socket.on("follow-number-error", (err) => {
        console.log(err);
    });

    socket.on("follow-number-ok", result => {
        console.log(result);
    });
}
