import React from 'react';
import { Decision as DecisionType } from '@rps-game/server/src/types';

import './DecisionWithBadge.css';

import { Decision } from './Decision';

type DecisionWithBadgeProps = {
	decision: DecisionType;
	number: number;
	winner: boolean;
};

export const DecisionWithBadge: React.FC<DecisionWithBadgeProps> = ({
	decision,
	winner,
}) => {
	return (
		<div className="decision-badge-container">
			<Decision decision={decision} />
			{winner && <div className="decision-badge-notification ">🏅</div>}
		</div>
	);
};
