import {GameState} from "./GameRoom";
import {ReadyPlayerInfo} from "../../types";


export const generateReadyPlayers = (game: GameState): ReadyPlayerInfo => {
    const result: ReadyPlayerInfo = [];
    game.players.forEach(player => {
        result.push({username: player.username, ready: player.ready})
    });
    return result;
}