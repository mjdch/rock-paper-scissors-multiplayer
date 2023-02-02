import React, { useState, useEffect } from 'react';
import { Client, Room } from 'colyseus.js';

import { RoomList } from './components/RoomList/RoomList';
import { GameRoom } from './components/GameRoom/GameRoom';

import './App.scss';
import { useUsername } from './hooks/useUsername';

const getHost = (): string => {
	// return 'ws://localhost:3000';
	return 'wss://rps-game.up.railway.app';
};

const App = () => {
	// const [username, setUsername] = useState<string>(null);
	const [username, setUsername] = useUsername();
	const [client, setClient] = useState<Client>(null);
	const [room, setRoom] = useState<Room>(null);

	useEffect(() => {
		const setUpClient = async () => {
			if (!client) {
				const colyseusClient = new Client(getHost());
				setClient(colyseusClient);
			}
		};
		setUpClient();
	}, []);

	return (
		<div className="app">
			{!room && <h1>Rock, paper, scissors</h1>}
			{!room && (
				<div className="form-group app-username-controls">
					<label className="form-label" htmlFor="username">
						Username:{' '}
					</label>
					<input
						className="form-control"
						onChange={(event) => setUsername(event.target.value)}
						id="username"
						type="text"
						value={username}
						name="username"
					/>
				</div>
			)}
			{client && !room && (
				<RoomList client={client} setRoom={setRoom} username={username} />
			)}
			{room && <GameRoom room={room} />}
		</div>
	);
};

export default App;
