import React, { useEffect, useRef } from 'react';
import { GameResults as BackendGameResults } from '@rps-game/server/src/types';

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
		<div className="card mt-2" ref={refContainer}>
			<h3>Results:</h3>
			<div className="card-body">
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">Player</th>
							<th scope="col"></th>
							<th scope="col"></th>
							<th scope="col"></th>
							<th scope="col"></th>
							<th scope="col"></th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{results.map((ur) => {
							return (
								<tr key={ur.id}>
									<td>{ur.username}</td>
									{ur.rounds.map((r) => {
										return (
											<td key={`${ur.id}-${r.index}`}>
												{r.decision} {r.roundPoints}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
