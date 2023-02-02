import { GameState } from '../src/gameState';
import { Player } from '../src/player';
import { calculateResults } from '../src/utils/calculateResults';

describe('calculateResults', () => {
	const gameState = new GameState();

	//Player 1
	const player1SessionId = 'sessionId1';
	const player1Username = 'username1';
	const player1 = new Player(player1Username);
	player1.decisions = ['PAPER', 'SCISSORS', 'ROCK', 'PAPER', 'SCISSORS'];

	//Player 2
	const player2SessionId = 'sessionId2';
	const player2Username = 'username2';
	const player2 = new Player(player2Username);
	player2.decisions = ['ROCK', 'PAPER', 'SCISSORS', 'ROCK', 'PAPER'];

	//Player 3
	const player3SessionId = 'sessionId3';
	const player3Username = 'username3';
	const player3 = new Player(player3Username);

	player3.decisions = ['ROCK', 'SCISSORS', 'SCISSORS', 'ROCK', 'PAPER'];

	gameState.players
		.set(player1SessionId, player1)
		.set(player2SessionId, player2)
		.set(player3SessionId, player3);

	const result = calculateResults(gameState);
	console.log(JSON.stringify(result, undefined, 2));

	describe('Player 1', () => {
		describe('Round 1', () => {
			describe('Player 1', () => {
				const player1Round1 = result.rounds[0][0];
				it('should have marked decision corretcly', () => {
					expect(player1Round1.decision).toEqual('PAPER');
				});
				it('should have 2 points', () => {
					expect(player1Round1.roundPoints).toEqual(2);
				});
				it('should be marked as winner', () => {
					expect(player1Round1.winner).toEqual(true);
				});
			});
			describe('Player 2', () => {
				const player2Round1 = result.rounds[0][1];
				it('should have marked decision corretcly', () => {
					expect(player2Round1.decision).toEqual('ROCK');
				});
				it('should have 0 points', () => {
					expect(player2Round1.roundPoints).toEqual(0);
				});
				it('should be marked as winner', () => {
					expect(player2Round1.winner).toEqual(false);
				});
			});
			describe('Player 3', () => {
				const player3Round1 = result.rounds[0][2];
				it('should have marked decision corretcly', () => {
					expect(player3Round1.decision).toEqual('ROCK');
				});
				it('should have 0 points', () => {
					expect(player3Round1.roundPoints).toEqual(0);
				});
				it('should be marked as winner', () => {
					expect(player3Round1.winner).toEqual(false);
				});
			});
		});
		describe('Round 2', () => {
			describe('Player 1', () => {
				const player1Round2 = result.rounds[1][0];
				it('should have marked decision corretcly', () => {
					expect(player1Round2.decision).toEqual('SCISSORS');
				});
				it('should have 2 points', () => {
					expect(player1Round2.roundPoints).toEqual(1);
				});
				it('should be marked as winner', () => {
					expect(player1Round2.winner).toEqual(true);
				});
			});
			describe('Player 2', () => {
				const player2Round2 = result.rounds[1][1];
				it('should have marked decision corretcly', () => {
					expect(player2Round2.decision).toEqual('PAPER');
				});
				it('should have 0 points', () => {
					expect(player2Round2.roundPoints).toEqual(0);
				});
				it('should be marked as winner', () => {
					expect(player2Round2.winner).toEqual(false);
				});
			});
			describe('Player 3', () => {
				const player3Round2 = result.rounds[1][2];
				it('should have marked decision corretcly', () => {
					expect(player3Round2.decision).toEqual('SCISSORS');
				});
				it('should have 0 points', () => {
					expect(player3Round2.roundPoints).toEqual(1);
				});
				it('should be marked as winner', () => {
					expect(player3Round2.winner).toEqual(true);
				});
			});
		});
		describe('Winners', () => {
			it('Should mark properly user1 as winner', () => {
				expect(result.winners).toEqual([
					{
						userId: player1SessionId,
						username: player1Username,
						points: 5,
					},
				]);
			});
		});
		describe('Total points', () => {
			it('should calculate total points properly for each of players', () => {
				expect(result.userPoints).toEqual({
					sessionId1: {
						points: 5,
						username: 'username1',
					},
					sessionId2: {
						points: 0,
						username: 'username2',
					},
					sessionId3: {
						points: 1,
						username: 'username3',
					},
				});
			});
		});
	});
});
