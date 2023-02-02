import React from 'react';

import { PlayerList } from './PlayerList';

export default {
	title: 'Components/PlayerList',
	component: PlayerList,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
};

const Template = (args) => <PlayerList {...args} />;

export const Single = Template.bind({});
Single.args = {
	players: [
		{
			username: 'username1',
			ready: false,
		},
	],
};

const players = [
	{
		username: 'username1',
		ready: false,
	},
	{
		username: 'usernam2',
		ready: true,
		isAdmin: true,
	},
	{
		username: 'username3',
		ready: true,
	},
];

export const WithData = Template.bind({});
WithData.args = {
	players,
};
