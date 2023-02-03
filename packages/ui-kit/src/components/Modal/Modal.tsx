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
				{showCloseButton && (
					<span className="modal-close" onClick={() => setIsOpen(false)}>
						&times;
					</span>
				)}
				<div className="modal-content-container">{children}</div>
			</div>
		</div>
	);
};
