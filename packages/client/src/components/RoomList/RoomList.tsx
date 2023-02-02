import React, { useEffect, useState } from 'react';
import { Client, Room } from 'colyseus.js';

import './RoomList.scss';

import { RoomList as RoomListUI } from '@rps-game/ui-kit';
import { ROOM_NAME } from '@rps-game/server/src/consts';
import { RoomCreator } from '../RoomCreator/RoomCreator';

type Props = {
	client: Client;
	setRoom: (arg: Room) => void;
	username: string;
};

export const RoomList = ({ client, setRoom, username }: Props) => {
	const [roomList, setRoomList] = useState([]);

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

	return (
		<div>
			<RoomListUI rooms={roomList} onJoin={joinRoom} />
			<RoomCreator username={username} setRoom={setRoom} client={client} />
		</div>
	);
};
