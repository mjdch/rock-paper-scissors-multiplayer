import { Decision } from '@rps-game/server/src/types';

export const mapDecisionToEmoji = (decision: Decision): string => {
	const map = {
		scissors: '✂️',
		paper: '📄',
		rock: '🪨',
	};
	return map[decision] || '';
};
