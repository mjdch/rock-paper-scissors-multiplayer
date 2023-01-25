import { Schema, type } from '@colyseus/schema';
import { Decision } from './types';

export class Player extends Schema {
	constructor(username: string) {
		super();
		this.username = username;
		this.ready = false;
	}

	@type('string')
	username = '';

	@type(['string'])
	decisions: Decision[] = [];

	@type('boolean')
	ready = false;
}
