import { Room } from 'colyseus';
import type { Client } from 'colyseus';
import { calculateResults } from './utils/calculateResults';
import { generatePlayersList } from './utils/generatePlayersList';
import { GameRoomJoinOptions } from './types';
import { TOPICS } from './consts';
import { Player } from './player';
import { GameState } from './gameState';

export class GameRoom extends Room<GameState> {
	onCreate(options) {
		this.setPrivate(options.privateRoom);
		this.setState(new GameState(options.roundLimit));
		this.setMetadata({ roundLimit: options.roundLimit });

		this.onMessage(TOPICS.MAKE_DECISION, (client, data) => {
			const player = this.state.players.get(client.sessionId);
			player.decisions = data;
			player.ready = true;
			console.log('State', JSON.stringify(this.state));
			this.broadcast(TOPICS.PLAYERS_LIST, generatePlayersList(this.state));
		});

		this.onMessage(TOPICS.START_GAME, () => {
			this.setPrivate(true);
			const results = calculateResults(this.state);
			this.broadcast(TOPICS.RESULTS, results);
		});

		this.onMessage(TOPICS.REQUEST_PLAYER_LIST, () => {
			this.broadcast(TOPICS.PLAYERS_LIST, generatePlayersList(this.state));
		});

		this.onMessage(TOPICS.REQUEST_ROOM_RESET, () => {
			this.state.players.forEach((p) => {
				p.decisions = [];
				p.ready = false;
			});
			this.broadcast(TOPICS.PLAYERS_LIST, generatePlayersList(this.state));
			this.broadcast(TOPICS.RESULTS, null);
			this.broadcast(TOPICS.ROOM_RESET);
		});
	}

	onJoin(client: Client, options: GameRoomJoinOptions) {
		if (this.state.players.size === 0) this.state.ownerId = client.sessionId;
		this.state.players.set(client.sessionId, new Player(options.username));
		this.broadcast(TOPICS.PLAYERS_LIST, generatePlayersList(this.state));
	}

	onLeave(client: Client): void | Promise<void> {
		this.state.players.delete(client.sessionId);
		this.broadcast(TOPICS.PLAYERS_LIST, generatePlayersList(this.state));
	}
}
