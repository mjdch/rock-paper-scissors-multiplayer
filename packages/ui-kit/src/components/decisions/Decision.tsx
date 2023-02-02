import React from 'react';
import { Decision as DecisionType } from '@rps-game/server/src/types';

import paper from '../../assets/paper.png';
import scissors from '../../assets/scissors.png';
import rock from '../../assets/rock.png';

type DecisionUIProps = {
	decision: DecisionType;
	width?: string;
};

const map: Record<DecisionType, string> = {
	PAPER: paper,
	ROCK: rock,
	SCISSORS: scissors,
};

export const Decision: React.FC<DecisionUIProps> = ({
	decision,
	width = '60px',
}) => {
	const imgSrc = map[decision];

	return (
		<>
			<img width={width} src={imgSrc} />
		</>
	);
};
