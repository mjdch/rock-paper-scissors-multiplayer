import { GameRoom } from "./rooms/GameRoom";
import express from "express";
import { createServer } from "http";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport"

export const PORT = Number(process.env.PORT) || 8080;

const app = express();
app.use(express.static('dist'));

const server = createServer(app); // create the http server manually

const gameServer = new Server({
    transport: new WebSocketTransport({
        server // provide the custom server for `WebSocketTransport`
    })
});

gameServer.define("GameRoom", GameRoom)
    .on("create", (room) => console.log("room created:", room.roomId))
    .on("dispose", (room) => console.log("room disposed:", room.roomId))
    .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
    .on("leave", (room, client) => console.log(client.id, "left", room.roomId));

gameServer.listen(PORT, '0.0.0.0');

