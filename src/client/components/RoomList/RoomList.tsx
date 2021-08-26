import React, {useEffect, useState} from "react";
import { Client, Room, RoomAvailable } from "colyseus.js";

import './RoomList.scss';

type Props = {
    client: Client;
    setRoom: (arg: Room) => void;
    username: string;
}

export const RoomList = ({client, setRoom, username}: Props) => {
    const [roomList, setRoomList] = useState([]);

    const createRoom = (): void => {
        client.create("GameRoom", {username: username})
            .then(setRoom)
            .catch((e: Error) => console.error(e))
    }

    const joinRoom = (id: string): void => {
        client.joinById(id, {username: username}).then((room: Room) => setRoom(room))
    }

    const getAvailableRooms = (): void => {
        client.getAvailableRooms('GameRoom')
            .then(setRoomList)
            .catch((e: Error) => console.error(e));
    }

    useEffect(() => {
        getAvailableRooms();
    }, [])

    return (
        <div>
            <h2>Room List:</h2>
            {roomList.length === 0 && <div className="room-list-no-room">No rooms available.</div>}
            {roomList.length > 0 && (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Players</th>
                </tr>
                </thead>
                <tbody>
                {roomList.map(room => (
                    <tr onClick={() => joinRoom(room.roomId)}>
                        <th scope="row">{room.roomId}</th>
                        <td>{room.clients}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
            <div className="room-list-controls">
                <button type="button" className="btn btn-info" onClick={() => getAvailableRooms()}>Refresh</button>
                <button disabled={!username} type="button" className="btn btn-success" onClick={() => createRoom()}>Create</button>
            </div>
        </div>
    )
}