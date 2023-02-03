import React from 'react';
import { Button } from '../Button';

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
			<h2>Room List</h2>
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
								<Button
									customStyles={{
										fontSize: '16px',
										padding: '5px 15px',
										borderRadius: '1em',
									}}
									buttonType="GREEN"
									label="Join"
									onClick={() => onJoin(room.roomId)}
								/>
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
