import {Room, Client} from "colyseus";
import {Schema, MapSchema, type} from "@colyseus/schema";
import {calculateResults} from "./calculateResults";
import {generateReadyPlayers} from "./handleReadyPlayers";


export class Player extends Schema {
    constructor(username: string) {
        super();
        this.username = username;
    }

    @type('string')
    username = "";

    @type(['string'])
    decisions: string[] = [];

    @type("boolean")
    ready = false;
}

export class GameState extends Schema {
    constructor(roundLimit = 5) {
        super();
        this.roundLimit = roundLimit;
    }

    @type('number')
    roundLimit = 5;

    @type({map: Player})
    players = new MapSchema<Player>();
}

export class GameRoom extends Room<GameState> {
    onCreate(options: any) {
        this.setState(new GameState());

        this.onMessage("makeDecision", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            // @ts-ignore
            player.decisions = data;
            // @ts-ignore
            player.ready = true;
            console.log('State', JSON.stringify(this.state));
            this.broadcast('readyPlayers', generateReadyPlayers(this.state));
        });

        this.onMessage("startGame", (client, message) => {
            const results = calculateResults(this.state);
            this.broadcast("results", results);
        })

        this.onMessage('requestPlayers', ((client, message) => {
            this.broadcast('readyPlayers', generateReadyPlayers(this.state));
        }))
    }

    onJoin(client: Client, options: any) {
        this.state.players.set(client.sessionId, new Player(options.username));
        this.broadcast('readyPlayers', generateReadyPlayers(this.state));
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        this.state.players.delete(client.sessionId);
        this.broadcast('readyPlayers', generateReadyPlayers(this.state));
    }
}