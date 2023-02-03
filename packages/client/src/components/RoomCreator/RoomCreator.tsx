import React, { useState } from 'react';
import { Client, Room } from 'colyseus.js';

import { ROOM_NAME } from '@rps-game/server/src/consts';
import { Spinner, Modal, Button } from '@rps-game/ui-kit';

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
		<div className="room-creator-controls">
			<Button
				buttonType="GREEN"
				onClick={() => setIsOpen(true)}
				label={'Create room'}
			/>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					{!loading ? (
						<>
							<label htmlFor="room-private">Private room</label>
							<input
								id="room-private"
								type="checkbox"
								value="false"
								onChange={(event) => setPrivateRoom(event.target.checked)}
							></input>
							<p>Round limit: {roomRoundsLimit}</p>
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

							<Button
								customStyles={{ marginTop: '50px' }}
								buttonType="GREEN"
								onClick={() => createRoom()}
								label="Create"
							/>
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
