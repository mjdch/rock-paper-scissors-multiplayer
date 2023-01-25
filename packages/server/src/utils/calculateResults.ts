import { GameState } from '../gameState';
import { GameResults, Decision } from '../types';

const initResultsObject = (game: GameState): GameResults => {
	const results: GameResults = [];
	game.players.forEach((v, k) => {
		results.push({
			id: k,
			username: v.username,
			rounds: [],
		});
	});
	return results;
};

const findIndex = (results: GameResults, playerKey: string): number => {
	return results.findIndex((ur) => ur.id === playerKey);
};

const compareDecision = (decisionA: Decision, decisionB: Decision): number => {
	if (decisionA === 'paper' && decisionB === 'rock') return 1;
	if (decisionA === 'scissors' && decisionB === 'paper') return 1;
	if (decisionA === 'rock' && decisionB === 'scissors') return 1;
	return 0;
};

export const calculateResults = (game: GameState): GameResults => {
	const roundsNumber = game.roundLimit;
	const results = initResultsObject(game);

	for (let i = 0; i < roundsNumber; i++) {
		let roundWinnerPoints = 0;

		game.players.forEach((v1, k1) => {
			let playerRoundPoints = 0;
			game.players.forEach((v2, k2) => {
				if (k1 !== k2) {
					playerRoundPoints += compareDecision(
						v1.decisions[i],
						v2.decisions[i]
					);
				}
			});

			if (playerRoundPoints > roundWinnerPoints) {
				roundWinnerPoints = playerRoundPoints;
			}

			const playerRoundResult = {
				index: i,
				decision: v1.decisions[i],
				roundPoints: playerRoundPoints,
				winner: playerRoundPoints >= roundWinnerPoints,
			};
			const index = findIndex(results, k1);
			results[index].rounds.push(playerRoundResult);
		});
	}
	return results;
};
