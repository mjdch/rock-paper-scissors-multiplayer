import React, {useEffect, useState} from "react";
import type {Room} from "colyseus.js";
import {GameResults} from "../GameResults/GameResults";

import "./GameRoom.scss";
import {ReadyPlayerInfo} from "../../../types";


type Decision = '✋' | '✂️' | '🪨'
type Props = {
    room: Room
}

const renderPlayersList = (readyPlayers: ReadyPlayerInfo) => {
    const renderBadge = (ready: boolean) => {
        if (ready) return <span className="badge bg-success rounded-pill">Ready</span>
        return <span className="badge bg-primary rounded-pill">Not Ready</span>
    }

    return (
        <ul className="list-group mb-1">
            {readyPlayers.map(player => (
                <li key={player.username} className="list-group-item d-flex justify-content-between align-items-center">
                    {player.username}
                    {renderBadge(player.ready)}
                </li>
            ))}
        </ul>
    )
}

export const GameRoom = ({room}: Props) => {
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [readyPlayers, setReadyPlayers] = useState<ReadyPlayerInfo>([]);
    const [results, setResults] = useState([])
    const [lock, setLock] = useState(false);

    const LIMIT = 5;

    const clearDecisions = (): void => {
        setDecisions([])
    };

    const acceptDecisions = (): void => {
        room.send('makeDecision', decisions);
        setLock(true);
    }

    const startGame = (): void => {
        room.send('startGame')
    }

    const pushToDecisions = (selected: Decision): void => {
        const clone = [...decisions];
        if (clone.length > 4) return;
        clone.push(selected)
        setDecisions(clone);
    };

    const listenToResults = (): void => {
        console.log('Listening to results');
        room.onMessage("results", (message) => {
            console.log("message received from server");
            console.log(message);
            setResults(message);
        });
    }

    const listenToReadyPlayers = (): void => {
        console.log('Listening to players');
        room.onMessage("readyPlayers", ((message: ReadyPlayerInfo) => {
            console.log("player", message);
            setReadyPlayers(message)
        }))
    }


    const requestPlayerList = (): void => {
        room.send('requestPlayers');
    }

    const everyoneReady = (): boolean => {
        return readyPlayers.every(p => p.ready);
    }


    useEffect(() => {
        room.onMessage('test', (message => console.log('m:', message)));
        listenToResults();
        listenToReadyPlayers();
        requestPlayerList();
    }, [room])

    return (
        <div>
            <h1>Room: {room.id}</h1>
            {renderPlayersList(readyPlayers)}
            <div className="card mb-3">
                <h3 className="card-header">Select:</h3>
                <div className="card-body">
                    <div className="game-room-decision-wrapper">
                        <div onClick={() => pushToDecisions("✋")} className="game-room-decision">✋</div>
                        <div onClick={() => pushToDecisions("✂️")} className="game-room-decision">✂️</div>
                        <div onClick={() => pushToDecisions("🪨")} className="game-room-decision">🪨</div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <h3 className="card-header">Decisions {decisions.length}/{LIMIT}:</h3>
                <div className="card-body">
                    <div className="game-room-decision-wrapper">
                        {decisions.map((d, idx) => (
                            <div key={idx} className="game-room-decision">{d}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="room-list-controls">
                <button disabled={!!lock} type="button" className="btn btn-primary" onClick={() => clearDecisions()}>Clear</button>
                <button disabled={!!lock} type="button" className="btn btn-success" onClick={() => acceptDecisions()}>Accept</button>
                <button disabled={!everyoneReady()} type="button" className="btn btn-danger" onClick={() => startGame()}>Start</button>
            </div>
            {results.length > 0 && <GameResults results={results}/>}
        </div>
    )
}

