import React from 'react';
import {
	GameResults,
	GameUsersRoundResult,
	Winners,
} from '@rps-game/server/src/types';
import { DecisionWithBadge } from '../decisions/DecisionWithBadge';

type ResultsProps = {
	results: GameResults;
};

const renderTableDataRow = (
	roundResults: GameUsersRoundResult,
	index: number
) => {
	return (
		<tr key={index}>
			<td>{index + 1}</td>
			{roundResults.map((pr) => (
				<>
					<td>
						<DecisionWithBadge
							decision={pr.decision}
							winner={pr.winner}
						></DecisionWithBadge>
					</td>
				</>
			))}
		</tr>
	);
};

const renderWinners = (winners: Winners) => {
	return (
		<>
			<h1>Winner</h1>
			{winners.length > 1 ? 'DRAW' : null}
			{winners.map((w) => (
				<div>
					{w.username} with: {w.points} points
				</div>
			))}
		</>
	);
};

export const Results: React.FC<ResultsProps> = ({ results }) => {
	return (
		<div className="results">
			<>
				<h1>Results</h1>
				<table className={'room-list-table'}>
					<thead>
						<tr>
							<th>Round no.</th>
							{Object.values(results.userPoints).map((u) => (
								<th>{u.username}</th>
							))}
						</tr>
					</thead>
					<tbody>{results.rounds.map(renderTableDataRow)}</tbody>
				</table>
			</>
			{renderWinners(results.winners)}
		</div>
	);
};
