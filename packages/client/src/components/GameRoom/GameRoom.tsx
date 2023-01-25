import React, { useEffect, useState } from 'react';
import type { Room } from 'colyseus.js';
import { GameResults } from '../GameResults/GameResults';

import './GameRoom.scss';
import { ReadyPlayerInfo, Decision } from '@rps-game/server/src/types';
import { TOPICS } from '@rps-game/server/src/consts';
import { mapDecisionToEmoji } from '../utils/mapDecisionToEmoji';

type Props = {
	room: Room;
};

const renderPlayersList = (readyPlayers: ReadyPlayerInfo) => {
	const renderBadge = (ready: boolean) => {
		if (ready)
			return <span className="badge bg-success rounded-pill">Ready</span>;
		return <span className="badge bg-primary rounded-pill">Not Ready</span>;
	};

	return (
		<ul className="list-group mb-1">
			{readyPlayers.map((player) => (
				<li
					key={player.username}
					className="list-group-item d-flex justify-content-between align-items-center"
				>
					{player.username}
					{renderBadge(player.ready)}
				</li>
			))}
		</ul>
	);
};

export const GameRoom = ({ room }: Props) => {
	const [decisions, setDecisions] = useState<Decision[]>([]);
	const [readyPlayers, setReadyPlayers] = useState<ReadyPlayerInfo>([]);
	const [results, setResults] = useState([]);
	const [lock, setLock] = useState(false);

	const LIMIT = 5;

	const acceptDecisions = (): void => {
		console.log('Decisions', decisions);
		room.send(TOPICS.MAKE_DECISION, decisions);
		setLock(true);
	};

	const startGame = (): void => {
		room.send(TOPICS.START_GAME);
	};

	useEffect(() => {
		if (decisions.length === LIMIT) {
			acceptDecisions();
		}
	}, [decisions]);

	const pushToDecisions = (selected: Decision): void => {
		if (lock) return;
		const clone = [...decisions];
		clone.push(selected);
		setDecisions(clone);
	};

	const listenToResults = (): void => {
		console.log('Listening to results');
		room.onMessage(TOPICS.RESULTS, (message) => {
			console.log('message received from server');
			console.log(message);
			setResults(message);
		});
	};

	const listenToReadyPlayers = (): void => {
		console.log('Listening to players');
		room.onMessage(TOPICS.PLAYERS_LIST, (message: ReadyPlayerInfo) => {
			console.log('player', message);
			setReadyPlayers(message);
		});
	};

	const requestPlayerList = (): void => {
		room.send(TOPICS.REQUEST_PLAYER_LIST);
	};

	const everyoneReady = (): boolean => {
		return readyPlayers.every((p) => p.ready);
	};

	useEffect(() => {
		room.onMessage('test', (message) => console.log('m:', message));
		listenToResults();
		listenToReadyPlayers();
		requestPlayerList();
	}, [room]);

	return (
		<div>
			<h1>Room: {room.id}</h1>
			{renderPlayersList(readyPlayers)}
			<div className="card mb-3">
				<h3 className="card-header">Select:</h3>
				<div className="card-body">
					<div className="game-room-decision-wrapper">
						<div
							onClick={() => pushToDecisions('paper')}
							className="game-room-decision"
						>
							{mapDecisionToEmoji('paper')}
						</div>
						<div
							onClick={() => pushToDecisions('scissors')}
							className="game-room-decision"
						>
							{mapDecisionToEmoji('scissors')}
						</div>
						<div
							onClick={() => pushToDecisions('rock')}
							className="game-room-decision"
						>
							{mapDecisionToEmoji('rock')}
						</div>
					</div>
				</div>
			</div>
			<div className="card mb-3">
				<h3 className="card-header">
					Decisions {decisions.length}/{LIMIT}:
				</h3>
				<div className="card-body">
					<div className="game-room-decision-wrapper">
						{decisions.map((d, idx) => (
							<div key={idx} className="game-room-decision">
								{mapDecisionToEmoji(d)}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="room-list-controls">
				<button
					disabled={!everyoneReady()}
					type="button"
					className="btn btn-danger"
					onClick={() => startGame()}
				>
					Start
				</button>
			</div>
			{results.length > 0 && <GameResults results={results} />}
		</div>
	);
};
