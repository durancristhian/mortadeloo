import $ from "jquery";
import socketio from "socket.io-client";

let socket = socketio();

function numberClick(event) {
    event.preventDefault();

    let element = $(event.target);
    element.toggleClass("toggle-active");

    if (element.hasClass("toggle-active")) {
        socket.emit("follow-number", parseInt(element.data("number")));
    } else {
        socket.emit("unfollow-number", parseInt(element.data("number")));
    }
}

export function toggleActive(selector) {
    $(selector).on("click", "a", numberClick);

    socket.on("follow-number-ok", result => console.log(result));
    socket.on("number-error", err => {
        console.log(err);
        location.result();
    });
    socket.on("unfollow-number-ok", result => console.log(result));
}
