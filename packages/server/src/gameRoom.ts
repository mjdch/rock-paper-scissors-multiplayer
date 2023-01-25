import { Room } from 'colyseus';
import type { Client } from 'colyseus';
import { calculateResults } from './utils/calculateResults';
import { generateReadyPlayers } from './utils/generateReadyPlayer';
import { GameRoomOptions } from './types';
import { TOPICS } from './consts';
import { Player } from './player';
import { GameState } from './gameState';

export class GameRoom extends Room<GameState> {
	onCreate() {
		this.setState(new GameState());

		this.onMessage(TOPICS.MAKE_DECISION, (client, data) => {
			const player = this.state.players.get(client.sessionId);
			player.decisions = data;
			player.ready = true;
			console.log('State', JSON.stringify(this.state));
			this.broadcast(TOPICS.PLAYERS_LIST, generateReadyPlayers(this.state));
		});

		this.onMessage(TOPICS.START_GAME, () => {
			const results = calculateResults(this.state);
			this.broadcast(TOPICS.RESULTS, results);
		});

		this.onMessage(TOPICS.REQUEST_PLAYER_LIST, () => {
			this.broadcast(TOPICS.PLAYERS_LIST, generateReadyPlayers(this.state));
		});
	}

	onJoin(client: Client, options: GameRoomOptions) {
		this.state.players.set(client.sessionId, new Player(options.username));
		this.broadcast(TOPICS.PLAYERS_LIST, generateReadyPlayers(this.state));
	}

	onLeave(client: Client): void | Promise<void> {
		this.state.players.delete(client.sessionId);
		this.broadcast(TOPICS.PLAYERS_LIST, generateReadyPlayers(this.state));
	}
}
