import $ from "jquery";
import socketio from "socket.io-client";

let socket = socketio();
socket.on("notificate", result => {
    if (result.ok) {
        console.log(result);
    } else {
        console.error(result);
    }
});

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

export function initToggles(selector) {
    $(selector).on("click", "a", numberClick);
}
