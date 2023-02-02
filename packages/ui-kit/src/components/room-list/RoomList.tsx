import React from 'react';

import './RoomList.css';

type RoomRowProps = {
	roomId: string;
	roomName: string;
	clients: number;
	metadata: {
		roundLimit: number;
	};
};

type RoomListProps = {
	rooms: RoomRowProps[];
	onJoin: (id: string) => void;
};

export const RoomList: React.FC<RoomListProps> = ({ rooms, onJoin }) => {
	return (
		<>
			<h1>Room List</h1>
			<table className={'room-list-table'}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Rounds</th>
						<th>Players</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{rooms.map((room, index) => (
						<tr key={index}>
							<td>{room.roomId}</td>
							<td>{room.metadata.roundLimit}</td>
							<td>{room.clients}</td>
							<td>
								<button onClick={() => onJoin(room.roomId)}>Join</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{rooms.length === 0 && (
				<p className={'room-list-empty'}>No rooms found, create one.</p>
			)}
		</>
	);
};
