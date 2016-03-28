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
    return `'${number}' no es un entero entre 0 y 100.`;
}

function queryCallback(error, doc, socket, socketData) {
    if (error) {
        socket.emit("notificate", {
            message: `Ha ocurrido un error al seguir el ${socketData.number}. Inténtalo de nuevo.`,
            number : socketData.number,
            ok     : false
        });
    } else {
        socket.emit("notificate", {
            message: "Operación exitosa.",
            number : socketData.number,
            ok     : true
        });
    }
}

export default function (server, session) {
    const io = socketio(server);

    io.use(sharedsession(session));

    io.on("connection", (socket) => {
        socket.on("follow-number", socketData => {
            const number = socketData.number;

            if (!isValidInt(number)) {
                socket.emit("notificate", {
                    message: getInvalidIntMessage(number),
                    number : number,
                    ok     : false
                });
            } else {
                User.findByIdAndUpdate(
                    socket.handshake.session.passport.user,
                    { $push: { numbers: socketData.number } },
                    queryOptions,
                    (error, doc) => queryCallback(error, doc, socket, socketData)
                );
            }
        });

        socket.on("unfollow-number", socketData => {
            const number = socketData.number;

            if (!isValidInt(number)) {
                socket.emit("notificate", {
                    message: getInvalidIntMessage(number),
                    number : number,
                    ok     : false
                });
            } else {
                User.findByIdAndUpdate(
                    socket.handshake.session.passport.user,
                    { $pull: { numbers: socketData.number } },
                    queryOptions,
                    (error, doc) => queryCallback(error, doc, socket, socketData)
                );
            }
        });
    });
}
