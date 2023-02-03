import React from 'react';
import { PlayersListInfo } from '@rps-game/server/src/types';

import './PlayerList.css';

import { Badge } from '../badge';
import { LoaderDots } from '../loader-dots/LoaderDots';

type PlayerListProps = {
	players: PlayersListInfo;
};

export const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
	return (
		<div>
			<div className="player-list-main-container">
				<p>Player list:</p>
				{players.map((p) => (
					<div key={p.username} className="player-list-item-container">
						<div>
							{p.username}
							{p.isAdmin ? ' 👑 ' : null}
						</div>
						<Badge
							color={p.ready ? 'GREEN' : 'RED'}
							label={p.ready ? 'Ready' : 'Not Ready'}
						/>
					</div>
				))}
				{players.length === 1 && (
					<p style={{ textAlign: 'center' }}>
						Waiting for more players <LoaderDots />
					</p>
				)}
			</div>
		</div>
	);
};
