import React, { useEffect, useState } from 'react';
import { Client, Room } from 'colyseus.js';

import './RoomList.scss';

import { RoomList as RoomListUI, Modal, Spinner } from '@rps-game/ui-kit';
import { ROOM_NAME } from '@rps-game/server/src/consts';

type Props = {
	client: Client;
	setRoom: (arg: Room) => void;
	username: string;
};

export const RoomList = ({ client, setRoom, username }: Props) => {
	const [roomList, setRoomList] = useState([]);
	const [joining, setJoining] = useState(false);

	const joinRoom = (id: string): void => {
		if (!username) return window.alert('set username');
		setJoining(true);
		client
			.joinById(id, { username })
			.then((room: Room) => setRoom(room))
			.finally(() => setJoining(false));
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
			{joining && (
				<Modal setIsOpen={setJoining} showCloseButton={false}>
					<div>
						<Spinner></Spinner>
						<p>Joining room</p>
					</div>
				</Modal>
			)}
		</div>
	);
};
