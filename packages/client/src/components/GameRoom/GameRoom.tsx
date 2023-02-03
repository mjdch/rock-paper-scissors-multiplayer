import React, { useEffect, useState } from 'react';
import type { Room } from 'colyseus.js';
import { GameResults } from '../GameResults/GameResults';
import {
	PlayerList as PlayerListUI,
	Decision as DecisionUI,
	Alert,
	Button,
} from '@rps-game/ui-kit';

import './GameRoom.scss';
import { PlayersListInfo, Decision } from '@rps-game/server/src/types';
import { TOPICS } from '@rps-game/server/src/consts';
import { ResultsModal } from '../ResultsModal/ResultsModal';

type Props = {
	room: Room;
};

export const GameRoom = ({ room }: Props) => {
	const [decisions, setDecisions] = useState<Decision[]>([]);
	const [playerList, setPlayerList] = useState<PlayersListInfo>([]);
	const [results, setResults] = useState(null);
	const [lock, setLock] = useState(false);
	const [showResultsModal, setShowResultsModal] = useState(false);

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
			setShowResultsModal(true);
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
		listenToResults();
		listenToReadyPlayers();
		listenToRoomReset();
		requestPlayerList();

		return () => room.removeAllListeners();
	}, [room]);

	return (
		<div>
			<div>
				<h2>Room: {room.id}</h2>
				{IS_ADMIN && (
					<div className="gamer-room-share-link">
						Send link for invite
						<button
							onClick={() => {
								const base = new URL(window.location.href);
								base.searchParams.set('roomId', room.id);
								navigator.clipboard.writeText(base.toString());
							}}
						>
							Copy link
						</button>
					</div>
				)}
			</div>
			<PlayerListUI players={playerList} />
			{lock && everyoneReady() && !IS_ADMIN && !results && (
				<Alert type={'INFO'}>
					<p className="alert-wait-start-game">
						⏳ Wait for game master 👑 to start game
					</p>
				</Alert>
			)}
			{lock && !everyoneReady() && !IS_ADMIN && !results && (
				<Alert type={'INFO'}>
					<p className="alert-wait-start-game">
						⏳ Wait for other players to decide
					</p>
				</Alert>
			)}
			{everyoneReady() && IS_ADMIN && !results && (
				<Alert type={'WARNING'}>
					<div className="alert-admin-start-game">
						<p>Everyone ready start game</p>
						<Button
							buttonType="GREEN"
							onClick={() => startGame()}
							label="Start Game"
						/>
					</div>
				</Alert>
			)}
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
			{!lock && (
				<div>
					<h3>Select:</h3>
					<div>
						<div className="game-room-select-decision-container">
							<div
								onClick={() => {
									pushToDecisions('PAPER');
								}}
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

			{results && <GameResults results={results} />}
			{results && IS_ADMIN && (
				<Button
					customStyles={{ float: 'right' }}
					buttonType="RED"
					label="Reset room"
					onClick={requestRoomReset}
				/>
			)}
			{results && showResultsModal && (
				<ResultsModal
					winners={results.winners}
					closeModal={setShowResultsModal}
				/>
			)}
		</div>
	);
};
