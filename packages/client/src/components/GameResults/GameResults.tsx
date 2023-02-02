import React, { useEffect, useRef } from 'react';
import { GameResults as BackendGameResults } from '@rps-game/server/src/types';
import { Results } from '@rps-game/ui-kit';

type Props = {
	results: BackendGameResults;
};

export const GameResults = ({ results }: Props) => {
	const refContainer = useRef(null);

	useEffect(() => {
		if (refContainer) {
			refContainer.current.scrollIntoView({ behavior: 'smooth' });
		}
	});

	return (
		<div ref={refContainer}>
			<Results results={results} />
		</div>
	);
};
