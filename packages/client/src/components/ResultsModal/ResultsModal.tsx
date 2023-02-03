import React from 'react';

import { Winners } from '@rps-game/server/src/types';
import { Modal } from '@rps-game/ui-kit';

import './ResultsModal.css';

type ResultsModalProps = {
	winners: Winners;
	closeModal: (show: boolean) => void;
};

export const ResultsModal: React.FC<ResultsModalProps> = ({
	winners,
	closeModal,
}) => {
	const heading = winners.length > 1 ? 'Winners (DRAW):' : 'Winner:';

	return (
		<Modal setIsOpen={closeModal}>
			<div className="results-modal">
				<div className="results-modal-prize">🏆</div>
				<div className="results-modal-winners-list">
					<h2>{heading}</h2>
					{winners.map((w) => (
						<div className="results-modal-winner-card">
							{w.username} with: {w.points} points
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
};
