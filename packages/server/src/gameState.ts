import { Schema, MapSchema, type } from '@colyseus/schema';
import { Player } from './player';

export class GameState extends Schema {
	constructor(roundTime = 15, roundLimit = 5) {
		super();
		this.roundLimit = roundLimit;
		this.roundTime = roundTime;
	}

	@type('number')
	roundLimit: number;

	@type({ map: Player })
	players = new MapSchema<Player>();

	@type('string')
	roomName: string;

	@type('number')
	roundTime: number;
}
