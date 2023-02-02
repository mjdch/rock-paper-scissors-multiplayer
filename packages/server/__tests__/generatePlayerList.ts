import { GameState } from '../src/gameState';
import { Player } from '../src/player';
import { generatePlayersList } from '../src/utils/generatePlayersList';

const mockState = new GameState();

mockState.players.set('sessionId1', new Player('username1'));

const readyPlayer = new Player('username2');
readyPlayer.ready = true;

mockState.players.set('sessionId2', readyPlayer);
mockState.players.set('sessionId3', new Player('username3'));

mockState.ownerId = 'sessionId1';

describe('generatePlayersList', () => {
	it('should map properly game state to ready players info', () => {
		const result = generatePlayersList(mockState);
		const expected = [
			{
				username: 'username1',
				ready: false,
				isAdmin: true,
			},
			{
				username: 'username2',
				ready: true,
				isAdmin: false,
			},
			{
				username: 'username3',
				ready: false,
				isAdmin: false,
			},
		];

		expect(result).toEqual(expected);
	});
});
