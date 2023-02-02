import { Schema, MapSchema, type } from '@colyseus/schema';
import { Player } from './player';

export class GameState extends Schema {
	constructor(roundLimit = 5) {
		super();
		this.roundLimit = roundLimit;
	}

	@type('number')
	roundLimit: number;

	@type('string')
	ownerId: string;

	@type({ map: Player })
	players = new MapSchema<Player>();

	@type('string')
	customRoomName: string;
}
