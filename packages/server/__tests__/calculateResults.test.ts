import { GameState } from '../src/gameState';
import { Player } from '../src/player';
import { calculateResults } from '../src/utils/calculateResults';

describe('calculateResults', () => {
	const gameState = new GameState();

	//Player 1
	const player1SessionId = 'sessionId1';
	const player1Username = 'username1';
	const player1 = new Player(player1Username);
	player1.decisions = ['✋', '✂️', '🪨', '✋', '✂️'];

	//Player 2
	const player2SessionId = 'sessionId2';
	const player2Username = 'username2';
	const player2 = new Player(player2Username);
	player2.decisions = ['🪨', '✋', '✂️', '🪨', '✋'];

	//Player 3
	const player3SessionId = 'sessionId3';
	const player3Username = 'username3';
	const player3 = new Player(player3Username);

	player3.decisions = ['🪨', '✂️', '✂️', '🪨', '✋'];

	gameState.players
		.set(player1SessionId, player1)
		.set(player2SessionId, player2)
		.set(player3SessionId, player3);

	const result = calculateResults(gameState);

	const [player1Results, player2Results, player3Results] = result;

	describe('Player 1', () => {
		const [round1, round2] = player1Results.rounds;

		it('should map sessionId and username properly', () => {
			expect(player1Results.id).toEqual(player1SessionId);
			expect(player1Results.username).toEqual(player1Username);
		});
		it('should have 2 points for round 1', () => {
			expect(round1.roundPoints).toEqual(2);
		});
		it('should be marked as winner for round 1', () => {
			expect(round1.winner).toEqual(true);
		});
		it('should have 1 point for round 2', () => {
			expect(round2.roundPoints).toEqual(1);
		});
		it('should be marked as winner', () => {
			expect(round2.winner).toEqual(true);
		});
	});

	describe('Player 2', () => {
		const [round1, round2] = player2Results.rounds;

		it('should map sessionId and username properly', () => {
			expect(player2Results.id).toEqual(player2SessionId);
			expect(player2Results.username).toEqual(player2Username);
		});
		it('should have 0 points for round 1', () => {
			expect(round1.roundPoints).toEqual(0);
		});
		it('should not be marked as winner for round 1', () => {
			expect(round1.winner).toEqual(false);
		});
		it('should have 0 points for round 2', () => {
			expect(round1.roundPoints).toEqual(0);
		});
		it('should not have be marked as winner for round 2', () => {
			expect(round2.winner).toEqual(false);
		});
	});

	describe('Player 3', () => {
		const [round1, round2] = player3Results.rounds;

		it('should map sessionId and username properly', () => {
			expect(player3Results.id).toEqual(player3SessionId);
			expect(player3Results.username).toEqual(player3Username);
		});
		it('should have 0 points for round 1', () => {
			expect(round1.roundPoints).toEqual(0);
		});
		it('should not be marked as winner for round 1', () => {
			expect(round1.winner).toEqual(false);
		});
		it('should have 1 point for round 2', () => {
			expect(round2.roundPoints).toEqual(1);
		});
		it('should be marked as winner for round 2', () => {
			expect(round2.winner).toEqual(true);
		});
	});
});
