import React, { useState, useEffect } from 'react';
import { Client, Room } from 'colyseus.js';

import { RoomList } from './components/RoomList/RoomList';
import { GameRoom } from './components/GameRoom/GameRoom';
import { RoomCreator } from './components/RoomCreator/RoomCreator';
import { Logo } from '@rps-game/ui-kit';
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
			console.log('JOINING ROOM FROM URL: ', getRoomIdFromSearchParams());
			client
				.joinById(roomId, { username })
				.then((r: Room) => setRoom(r))
				.catch((e: Error) => console.error(e))
				.finally(() => {
					clearQueryParamsFromUrl();
				});
		}
	}, [client]);

	return (
		<div className="app">
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'nowrap',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: '10px',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'nowrap',
						alignContent: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '5px',
					}}
				>
					<Logo width={'30%'} />
					<div>
						<h1>RPS Game</h1>
						<p>
							Rock, Paper, Scissors multplayer game for 2+ players. Free for all
							formula.
						</p>
					</div>
				</div>
				<button style={{ width: '50%' }}>Game Rules</button>
			</div>
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
				<>
					<RoomList client={client} setRoom={setRoom} username={username} />
					<RoomCreator username={username} setRoom={setRoom} client={client} />
				</>
			)}
			{room && <GameRoom room={room} />}
		</div>
	);
};

export default App;
