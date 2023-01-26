/* eslint-disable no-console */
import { Server } from 'colyseus';
import { ROOM_NAME } from './consts';
import { GameRoom } from './gameRoom';

export { ROOM_NAME, TOPICS } from './consts';

const port = parseInt(process.env.PORT) || 3000;
const gameServer = new Server();

gameServer
	.define(ROOM_NAME, GameRoom)
	.on('create', (room) => console.log('room created:', room.roomId))
	.on('dispose', (room) => console.log('room disposed:', room.roomId))
	.on('join', (room, client) => console.log(client.id, 'joined', room.roomId))
	.on('leave', (room, client) => console.log(client.id, 'left', room.roomId));

console.log('Starting backend server');

gameServer.listen(port, '0.0.0.0');

gameServer.listen(port);
