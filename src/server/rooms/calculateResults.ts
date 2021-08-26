import type { GameState} from "./GameRoom";
import {GameResults, Decision} from "../../types";


const initResultsObject = (game: GameState):GameResults => {
    const results: GameResults = [];
    game.players.forEach((v,k) => {
        results.push({
            id: k,
            username: v.username,
            rounds: []
        })
    })
    return results;
}

const findIndex = (results: GameResults, playerKey: string): number => {
    return results.findIndex((ur => ur.id === playerKey))
}

const compareDecision = (decisionA: string, decisionB: string): number => {
    if (decisionA === '✋' && decisionB === '🪨') return 1;
    if (decisionA === '✂️' && decisionB === '✋') return 1;
    if (decisionA === '🪨' && decisionB === '✂️') return 1;
    return 0;
}

export const calculateResults = (game: GameState) => {
    const roundsNumber = game.roundLimit;
    const results = initResultsObject(game);

    for (let i = 0; i < roundsNumber; i++) {
        let roundWinnerPoints = 0;
        let roundWinner: string | undefined;

        console.log('ROUND: ', i)
        game.players.forEach((v1, k1) => {
            console.log('PLAYER: ', k1)
            let playerRoundPoints = 0;
            game.players.forEach((v2, k2) => {
                if (k1 !== k2) {
                    playerRoundPoints += compareDecision(v1.decisions[i], v2.decisions[i])
                }
            })

            if(playerRoundPoints === roundWinnerPoints) {
                roundWinner = undefined;
            }

            if(playerRoundPoints > roundWinnerPoints) {
                console.log('comparison: ', roundWinner, k1, roundWinner === k1)
                roundWinner = k1;
                roundWinnerPoints = playerRoundPoints;
            }

            const playerRoundResult = {
                index: i,
                decision: v1.decisions[i] as Decision,
                roundPoints: playerRoundPoints,
                winner: roundWinner === k1
            }
            const index = findIndex(results, k1);
            results[index].rounds.push(playerRoundResult)
        })
    }
    console.log(JSON.stringify(results, undefined, 4));

    return results;
}
