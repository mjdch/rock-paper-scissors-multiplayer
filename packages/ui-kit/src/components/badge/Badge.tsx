import React from 'react';

import './Badge.css';

type BadgeProps = {
	color: 'RED' | 'GREEN' | 'ORANGE';
	label: string;
};

export const Badge: React.FC<BadgeProps> = ({ color, label }) => (
	<span style={{ backgroundColor: color }} className="badge">
		{label}
	</span>
);
