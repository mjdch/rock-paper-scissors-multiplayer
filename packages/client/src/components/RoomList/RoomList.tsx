import React, { useEffect, useState } from 'react';
import { Client, Room } from 'colyseus.js';

import './RoomList.scss';

import { RoomList as RoomListUI } from '@rps-game/ui-kit';
import { ROOM_NAME } from '@rps-game/server/src/consts';

type Props = {
	client: Client;
	setRoom: (arg: Room) => void;
	username: string;
};

export const RoomList = ({ client, setRoom, username }: Props) => {
	const [roomList, setRoomList] = useState([]);
	const [createRoomRoundLimit, setCreateRoomRoundLimit] = useState(5);

	const createRoom = (): void => {
		client
			.create(ROOM_NAME, { username, roundLimit: Number(createRoomRoundLimit) })
			.then(setRoom)
			.catch((e: Error) => console.error(e));
	};

	const joinRoom = (id: string): void => {
		if (!username) return window.alert('set username');
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

	console.log('room list', roomList);

	return (
		<div>
			<RoomListUI rooms={roomList} onJoin={joinRoom} />
			<div className="room-list-controls" style={{ flexDirection: 'column' }}>
				<div className="room-list-create-room-controls">
					<input
						type="range"
						min="1"
						max="15"
						step="1"
						className="slider"
						value={createRoomRoundLimit}
						onChange={({ target: { value } }) =>
							setCreateRoomRoundLimit(Number(value))
						}
						id="myRange"
					/>
					<p>Round limit: {createRoomRoundLimit}</p>
					<button
						disabled={!username}
						type="button"
						className="btn btn-success"
						onClick={() => createRoom()}
					>
						Create
						{!username && ' (Set Username) '}
					</button>
				</div>
			</div>
		</div>
	);
};
