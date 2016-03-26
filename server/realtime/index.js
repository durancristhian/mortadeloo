import { isValidInt } from "../lib/is-valid-int";
import sharedsession from "express-socket.io-session";
import socketio from "socket.io";
import User from "../models/user";

const queryOptions = {
    new   : true,
    safe  : true,
    upsert: true
};

function getInvalidIntMessage(number) {
    return `'${number}' no es un entero entre 0 y 100`;
}

function queryCallback(error, doc, socket) {
    if (error) {
        return socket.emit("notificate", {
            message: "No se pudo completar la operación",
            ok     : false
        });
    }

    socket.emit("notificate", {
        message: "Operación exitosa",
        ok     : true
    });
}

export default function (server, session) {
    const io = socketio(server);

    io.use(sharedsession(session));

    io.on("connection", (socket) => {
        socket.on("follow-number", number => {
            if (!isValidInt(number)) {
                return socket.emit("notificate", {
                    message: getInvalidIntMessage(number),
                    ok     : false
                });
            }

            User.findByIdAndUpdate(
                socket.handshake.session.passport.user,
                { $push: { numbers: number } },
                queryOptions,
                (error, doc) => queryCallback(error, doc, socket)
            );
        });

        socket.on("unfollow-number", number => {
            if (!isValidInt(number)) {
                return socket.emit("notificate", {
                    message: getInvalidIntMessage(number),
                    ok     : false
                });
            }

            User.findByIdAndUpdate(
                socket.handshake.session.passport.user,
                { $pull: { numbers: number } },
                queryOptions,
                (error, doc) => queryCallback(error, doc, socket)
            );
        });
    });
}
