import { GameState } from '../gameState';
import { Decision, GameResults, Winners } from '../types';

const compareDecision = (decisionA: Decision, decisionB: Decision): number => {
	if (decisionA === 'PAPER' && decisionB === 'ROCK') return 1;
	if (decisionA === 'SCISSORS' && decisionB === 'PAPER') return 1;
	if (decisionA === 'ROCK' && decisionB === 'SCISSORS') return 1;
	return 0;
};

const prepareTotalPointsObject = (gameState: GameState) => {
	const userPoints = {};
	gameState.players.forEach((v, k) => {
		userPoints[k] = {
			username: v.username,
			points: 0,
		};
	});
	return userPoints;
};

const findWinners = (
	userPoints: Record<string, { points: number; username: string }>
): Winners => {
	const winners = [];
	const highestValue = Math.max(
		...Object.values(userPoints).map((u) => u.points)
	);
	for (const [key, value] of Object.entries(userPoints)) {
		if (value.points === highestValue) {
			winners.push({
				userId: key,
				username: value.username,
				points: value.points,
			});
		}
	}
	return winners;
};

export const calculateResults = (game: GameState): GameResults => {
	const roundsResult = [];
	const userPoints = prepareTotalPointsObject(game);

	for (let i = 0; i < game.roundLimit; i++) {
		roundsResult.push([]);
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

			const roundWinner =
				playerRoundPoints > 0 && playerRoundPoints >= roundWinnerPoints;

			if (roundWinner) {
				userPoints[k1].points += 1;
			}
			const playerRoundResult = {
				userId: k1,
				username: v1.username,
				decision: v1.decisions[i],
				roundPoints: playerRoundPoints,
				winner: roundWinner,
			};
			roundsResult[i].push(playerRoundResult);
		});
	}

	const winners = findWinners(userPoints);

	return {
		rounds: roundsResult,
		userPoints,
		winners,
	};
};
