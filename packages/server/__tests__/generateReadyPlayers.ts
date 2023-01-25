import { GameState } from '../src/gameState';
import { Player } from '../src/player';
import { generateReadyPlayers } from '../src/utils/generateReadyPlayer';

const mockState = new GameState();

mockState.players.set('sessionId1', new Player('username1'));

const readyPlayer = new Player('username2');
readyPlayer.ready = true;

mockState.players.set('sessionId2', readyPlayer);
mockState.players.set('sessionId3', new Player('username3'));

describe('generateReadyPlayers', () => {
	it('should map properly game state to ready players info', () => {
		const result = generateReadyPlayers(mockState);
		const expected = [
			{
				username: 'username1',
				ready: false,
			},
			{
				username: 'username2',
				ready: true,
			},
			{
				username: 'username3',
				ready: false,
			},
		];

		expect(result).toEqual(expected);
	});
});
