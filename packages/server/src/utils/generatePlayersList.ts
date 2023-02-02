import { GameState } from '../gameState';
import { PlayersListInfo } from '../types';

export const generatePlayersList = (game: GameState): PlayersListInfo => {
	const result: PlayersListInfo = [];
	game.players.forEach((player, key) => {
		result.push({
			username: player.username,
			ready: player.ready,
			isAdmin: key === game.ownerId,
		});
	});
	return result;
};
