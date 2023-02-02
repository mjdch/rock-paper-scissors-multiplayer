import React, { useEffect, useState } from 'react';
import type { Room } from 'colyseus.js';
import { GameResults } from '../GameResults/GameResults';
import {
	PlayerList as PlayerListUI,
	Decision as DecisionUI,
} from '@rps-game/ui-kit';

import './GameRoom.scss';
import { PlayersListInfo, Decision } from '@rps-game/server/src/types';
import { TOPICS } from '@rps-game/server/src/consts';

type Props = {
	room: Room;
};

export const GameRoom = ({ room }: Props) => {
	const [decisions, setDecisions] = useState<Decision[]>([]);
	const [playerList, setPlayerList] = useState<PlayersListInfo>([]);
	const [results, setResults] = useState(null);
	const [lock, setLock] = useState(false);

	const LIMIT = room.state.roundLimit;
	const IS_ADMIN = room.sessionId === room.state.ownerId;

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
		room.onMessage(TOPICS.RESULTS, (message) => {
			console.log('message received from server');
			console.log(message);
			setResults(message);
		});
	};

	const listenToReadyPlayers = (): void => {
		room.onMessage(TOPICS.PLAYERS_LIST, (message: PlayersListInfo) => {
			console.log('player', message);
			setPlayerList(message);
		});
	};

	const listenToRoomReset = (): void => {
		room.onMessage(TOPICS.ROOM_RESET, () => {
			console.log('Room reset message received');
			setDecisions([]);
			setLock(false);
		});
	};

	const requestRoomReset = (): void => {
		room.send(TOPICS.REQUEST_ROOM_RESET);
	};

	const requestPlayerList = (): void => {
		room.send(TOPICS.REQUEST_PLAYER_LIST);
	};

	const everyoneReady = (): boolean => {
		return playerList.every((p) => p.ready);
	};

	useEffect(() => {
		room.onMessage('test', (message) => console.log('m:', message));
		listenToResults();
		listenToReadyPlayers();
		listenToRoomReset();
		requestPlayerList();
	}, [room]);

	return (
		<div>
			<h1>Room: {room.id}</h1>
			<PlayerListUI players={playerList} />
			{!lock && (
				<div className="card mb-3">
					<h3 className="card-header">Select:</h3>
					<div className="card-body">
						<div className="game-room-decision-wrapper">
							<div
								onClick={() => pushToDecisions('PAPER')}
								className="game-room-decision"
							>
								<DecisionUI decision="PAPER" />
							</div>
							<div
								onClick={() => pushToDecisions('SCISSORS')}
								className="game-room-decision"
							>
								<DecisionUI decision="SCISSORS" />
							</div>
							<div
								onClick={() => pushToDecisions('ROCK')}
								className="game-room-decision"
							>
								<DecisionUI decision="ROCK" />
							</div>
						</div>
					</div>
				</div>
			)}
			{lock && !IS_ADMIN && <h2>Wait for admin 👑 to start game</h2>}
			{everyoneReady() && IS_ADMIN && <h2>Everyone ready start game</h2>}
			<div className="card mb-3">
				<h3 className="card-header">
					Decisions {decisions.length}/{LIMIT}:
				</h3>
				<div className="card-body">
					<div className="game-room-decision-wrapper">
						{decisions.map((d, idx) => (
							<div key={idx} className="game-room-decision">
								<DecisionUI decision={d} />
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="room-list-controls">
				{IS_ADMIN && (
					<button
						disabled={!everyoneReady()}
						type="button"
						className="btn btn-danger"
						onClick={() => startGame()}
					>
						Start
					</button>
				)}
			</div>
			{results && <GameResults results={results} />}
			{results && <button onClick={requestRoomReset}>Reset room</button>}
		</div>
	);
};
