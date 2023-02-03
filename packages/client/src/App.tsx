import React, { useState, useEffect } from 'react';
import { Client, Room } from 'colyseus.js';

import { RoomList } from './components/RoomList/RoomList';
import { GameRoom } from './components/GameRoom/GameRoom';
import { RoomCreator } from './components/RoomCreator/RoomCreator';
import { Header } from './components/Header/Header';
import { Logo, Button, Modal, Spinner } from '@rps-game/ui-kit';
import {
	getRoomIdFromSearchParams,
	clearQueryParamsFromUrl,
} from './utils/roomIdSearchParams';

import './App.scss';
import { useUsername } from './hooks/useUsername';

const getHost = (): string => {
	// return 'ws://localhost:3000';
	return 'wss://rps-game.up.railway.app';
};

const App = () => {
	const [username, setUsername] = useUsername();
	const [client, setClient] = useState<Client>(null);
	const [room, setRoom] = useState<Room>(null);
	const [showDirectConnectModal, setDirectConnectModal] = useState(false);

	useEffect(() => {
		const setUpClient = async () => {
			if (!client) {
				const colyseusClient = new Client(getHost());
				setClient(colyseusClient);
			}
		};
		setUpClient();
	}, []);

	useEffect(() => {
		const roomId = getRoomIdFromSearchParams();
		if (client && roomId) {
			setDirectConnectModal(true);
			client
				.joinById(roomId, { username })
				.then((r: Room) => setRoom(r))
				.catch((e: Error) => console.error(e))
				.finally(() => {
					clearQueryParamsFromUrl();
					setDirectConnectModal(false);
				});
		}
	}, [client]);

	return (
		<div className="app">
			<Header
				setUsername={setUsername}
				username={username}
				disableChange={!!room}
			/>
			<div className="app-main-container">
				<div className="app-main-description-container">
					<div className="app-main-description-logo-container">
						<Logo width={'30%'} />
						<div>
							<h1>RPS Game</h1>
							<p>
								Rock, Paper, Scissors multplayer game for 2+ players. Free for
								all formula.
							</p>
						</div>
					</div>
					<Button
						customStyles={{ width: '40%' }}
						buttonType="GREEN"
						label={'Game Rules'}
					></Button>
				</div>
				{client && !room && (
					<>
						<RoomList client={client} setRoom={setRoom} username={username} />
						<RoomCreator
							username={username}
							setRoom={setRoom}
							client={client}
						/>
					</>
				)}
				{room && <GameRoom room={room} />}
			</div>
			{showDirectConnectModal && (
				<Modal setIsOpen={setDirectConnectModal} showCloseButton={false}>
					<div>
						<Spinner></Spinner>
						<p>Joining room</p>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default App;
