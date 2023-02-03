import React from 'react';

import './Modal.css';

type ModalProps = {
	children: JSX.Element;
	setIsOpen?: (value: boolean) => void;
	showCloseButton?: boolean;
};

export const Modal: React.ElementType<ModalProps> = ({
	children,
	setIsOpen,
	showCloseButton = true,
}) => {
	return (
		<div className="modal">
			<div className="modal-content">
				{children}
				{showCloseButton && (
					<button onClick={() => setIsOpen(false)}>Close</button>
				)}
			</div>
		</div>
	);
};
