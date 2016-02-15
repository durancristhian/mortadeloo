import sharedsession from "express-socket.io-session";
import socketio from "socket.io";
import User from "../models/user";

export default function (server, session) {
    const io = socketio(server);

    io.use(sharedsession(session));

    io.on("connection", (socket) => {
        socket.on("follow-number", number => {
            User.findByIdAndUpdate(
                socket.handshake.session.passport.user,
                {
                    $push: {
                        numbers: number
                    }
                },
                {
                    safe  : true,
                    upsert: true
                },
                (err, doc) => {
                    if (err) {
                        socket.emit("follow-number-error", err);
                        return;
                    }

                    socket.emit("follow-number-ok", { doc });
                }
            );
        });
    });
}
