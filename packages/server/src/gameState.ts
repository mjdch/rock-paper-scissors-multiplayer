import { Schema, MapSchema, type } from '@colyseus/schema';
import { Player } from './player';

export class GameState extends Schema {
	constructor(roundLimit = 5) {
		super();
		this.roundLimit = roundLimit;
	}

	@type('number')
	roundLimit = 5;

	@type({ map: Player })
	players = new MapSchema<Player>();
}
