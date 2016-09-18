import $ from "jquery";
import * as notificate from "../notifications";
import socketio from "socket.io-client";

let socket = socketio();

function numberClick (event) {
    event.preventDefault();

    let $element = $(event.target);
    $element.toggleClass("toggle-active");

    const socketData = { number: parseInt($element.data("number")) };

    if ($element.hasClass("toggle-active")) {
        socket.emit("follow-number", socketData);
    } else {
        socket.emit("unfollow-number", socketData);
    }
}

socket.on("notificate", resultData => {
    if (!resultData.ok) {
        $(`[data-number='${resultData.number}']`).toggleClass("toggle-active");
        notificate.error(resultData.message);
    }
});

export function initToggles (selector) {
    $(selector).on("click", "a", numberClick);
}
