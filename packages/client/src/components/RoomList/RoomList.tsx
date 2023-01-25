import React, { useEffect, useState } from 'react';
import { Client, Room } from 'colyseus.js';

import './RoomList.scss';
import { ROOM_NAME } from '@rps-game/server/src/consts';

type Props = {
	client: Client;
	setRoom: (arg: Room) => void;
	username: string;
};

export const RoomList = ({ client, setRoom, username }: Props) => {
	const [roomList, setRoomList] = useState([]);
	const [, setRoomName] = useState('');

	const createRoom = (): void => {
		client
			.create(ROOM_NAME, { username })
			.then(setRoom)
			.catch((e: Error) => console.error(e));
	};

	const joinRoom = (id: string): void => {
		client.joinById(id, { username }).then((room: Room) => setRoom(room));
	};

	const getAvailableRooms = (): void => {
		client
			.getAvailableRooms(ROOM_NAME)
			.then(setRoomList)
			.catch((e: Error) => console.error(e));
	};

	useEffect(() => {
		getAvailableRooms();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			getAvailableRooms();
		}, 2 * 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<h2>Room List:</h2>
			{roomList.length === 0 && (
				<div className="room-list-no-room">No rooms available.</div>
			)}
			{roomList.length > 0 && (
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">Id</th>
							<th scope="col">Name</th>
							<th scope="col">Owner</th>
							<th scope="col">Players</th>
						</tr>
					</thead>
					<tbody>
						{roomList.map((room) => (
							<tr onClick={() => joinRoom(room.roomId)}>
								<th scope="row">{room.roomId}</th>
								<th>{room.name}</th>
								<th>{}</th>
								<td>{room.clients}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<div className="room-list-controls" style={{ flexDirection: 'column' }}>
				<div className="form-group app-username-controls">
					<label className="form-label" htmlFor="username">
						Room Name:{' '}
					</label>
					<input
						className="form-control"
						onChange={(event) => setRoomName(event.target.value)}
						id="roomname"
						type="text"
						name="roomname"
					/>
				</div>
				<div>
					<button
						disabled={!username}
						type="button"
						className="btn btn-success"
						onClick={() => createRoom()}
					>
						Create
					</button>
				</div>
			</div>
		</div>
	);
};
