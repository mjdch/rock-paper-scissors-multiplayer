import React from 'react';

import './Button.css';

type ButtonProps = {
	buttonType: 'GREEN' | 'BLUE' | 'RED';
	label: string;
	onClick?: () => void;
	customStyles?: Record<string, string>;
};

export const Button: React.FC<ButtonProps> = ({
	buttonType,
	label,
	onClick,
	customStyles,
}) => {
	return (
		<button
			onClick={onClick}
			style={customStyles}
			className={`button button-${buttonType.toLowerCase()}`}
		>
			{label}
		</button>
	);
};
