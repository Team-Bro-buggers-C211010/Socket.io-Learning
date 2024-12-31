import express from 'express';
import {Server} from "socket.io";
import {createServer} from "http";

const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    }
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on("connection", (socket)=> {
    console.log("User connected", socket.id);
    socket.emit("welcome", `Welcome to the socket server`);
    socket.broadcast.emit("welcome", `${socket.id} is joined the server`);
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
})

server.listen(port, ()=> {
    console.log(`Socket server app listening on port ${port}`);
});