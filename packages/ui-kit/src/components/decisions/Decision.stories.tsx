import React from 'react';

import { Decision } from './Decision';

export default {
	title: 'Components/Decision',
	component: Decision,
};

const Template = (args) => <Decision {...args} />;

export const Rock = Template.bind({});
Rock.args = {
	decision: 'ROCK',
};

export const Paper = Template.bind({});
Paper.args = {
	decision: 'PAPER',
};

export const Scissors = Template.bind({});
Scissors.args = {
	decision: 'SCISSORS',
};
