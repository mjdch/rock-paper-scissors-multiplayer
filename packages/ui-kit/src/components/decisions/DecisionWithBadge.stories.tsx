import React from 'react';

import { DecisionWithBadge } from './DecisionWithBadge';

export default {
	title: 'Components/DecisionWithBadge',
	component: DecisionWithBadge,
};

const Template = (args) => <DecisionWithBadge {...args} />;

export const Rock = Template.bind({});
Rock.args = {
	decision: 'ROCK',
	number: 5,
	winner: false,
};

export const RockWinner = Template.bind({});
RockWinner.args = {
	decision: 'ROCK',
	number: 5,
	winner: true,
};
