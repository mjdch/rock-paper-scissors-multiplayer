import { Server } from "colyseus";
import { GameRoom } from "./rooms/GameRoom";
import express from "express";

const gameServer = new Server();

const STATICSERVER_PORT = 8080;
const GAMESERVER_PORT = 8888;
const HOST = '0.0.0.0';



gameServer.define("GameRoom", GameRoom)
    .on("create", (room) => console.log("room created:", room.roomId))
    .on("dispose", (room) => console.log("room disposed:", room.roomId))
    .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
    .on("leave", (room, client) => console.log(client.id, "left", room.roomId));


if(!process.env.DEV){
    const app = express();
    app.use(express.static('dist'))
    app.listen(STATICSERVER_PORT, HOST);
    console.log('Static server listening on: ', STATICSERVER_PORT, HOST);
}

gameServer.listen(GAMESERVER_PORT, HOST);
console.log('Game Server listening on:', GAMESERVER_PORT, HOST)


