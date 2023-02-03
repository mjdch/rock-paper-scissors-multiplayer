import React from 'react';

import './Header.css';

type HeaderProps = {
	setUsername: (name: string) => void;
	username: string;
	disableChange: boolean;
};

export const Header: React.FC<HeaderProps> = ({
	setUsername,
	username,
	disableChange,
}) => {
	return (
		<nav className="header">
			<label className="form-label" htmlFor="username">
				Username:{' '}
			</label>
			<input
				className="form-control"
				onChange={(event) => setUsername(event.target.value)}
				id="username"
				type="text"
				value={username}
				name="username"
				disabled={disableChange}
			/>
		</nav>
	);
};
