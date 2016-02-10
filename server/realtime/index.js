import socketio from "socket.io";

export default function (server) {
    const io = socketio(server);

    io.on("connection", (socket) => {
        socket.on("follow-number", number => {
            socket.emit("follow-number-ok", number);
        });
    });
}
