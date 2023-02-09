import React from 'react';

import { GameRules } from './GameRules';

export default {
	title: 'Components/GameRules',
	component: GameRules,
};

const Template = (args) => <GameRules {...args} />;

export const Rock = Template.bind({});
