import React, { useState } from 'react';
import { Client, Room } from 'colyseus.js';

import { ROOM_NAME } from '@rps-game/server/src/consts';
import { Spinner, Modal } from '@rps-game/ui-kit';

import './RoomCreator.css';

type RoomCreatorProps = {
	username: string;
	client: Client;
	setRoom: (arg: Room) => void;
};

export const RoomCreator: React.FC<RoomCreatorProps> = ({
	username,
	client,
	setRoom,
}) => {
	const [roomRoundsLimit, setRoomRoundsLimit] = useState(5);
	const [privateRoom, setPrivateRoom] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const createRoom = (): void => {
		setLoading(true);
		client
			.create(ROOM_NAME, {
				username,
				roundLimit: Number(roomRoundsLimit),
				privateRoom,
			})
			.then(setRoom)
			.catch((e: Error) => console.error(e))
			.finally(() => setLoading(false));
	};

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Create room</button>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					{!loading ? (
						<>
							<input
								id="room-private"
								type="checkbox"
								value="false"
								onChange={(event) => setPrivateRoom(event.target.checked)}
							></input>
							<label htmlFor="room-private">Private room</label>
							<input
								type="range"
								min="1"
								max="15"
								step="1"
								className="slider"
								value={roomRoundsLimit}
								onChange={({ target: { value } }) =>
									setRoomRoundsLimit(Number(value))
								}
								id="myRange"
							/>
							<p>Round limit: {roomRoundsLimit}</p>
							<button
								disabled={!username}
								type="button"
								className="btn btn-success"
								onClick={() => createRoom()}
							>
								Create
								{!username && ' (Set Username) '}
							</button>
						</>
					) : (
						<>
							<Spinner />
							<p>Creating Room...</p>
						</>
					)}
				</Modal>
			)}
		</div>
	);
};
