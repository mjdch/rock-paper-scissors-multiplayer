import React from 'react';

import './Alert.css';

type AlertType = 'WARNING' | 'DANGER' | 'SUCCESS' | 'INFO';

type AlertProps = {
	type: AlertType;
	children?: JSX.Element;
};

export const Alert: React.FC<AlertProps> = ({ type, children }) => {
	return (
		<div className={`alert alert-${type.toLowerCase()}`} role="alert">
			{children}
		</div>
	);
};
