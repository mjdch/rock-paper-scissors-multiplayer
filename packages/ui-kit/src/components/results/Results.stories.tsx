import React from 'react';

import { Results } from './Results';

export default {
	title: 'Components/Results',
	component: Results,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
};

const Template = (args) => <Results {...args} />;

const results = {
	rounds: [
		[
			{
				userId: 'sessionId1',
				username: 'username1',
				decision: 'PAPER',
				roundPoints: 2,
				winner: true,
			},
			{
				userId: 'sessionId2',
				username: 'username2',
				decision: 'ROCK',
				roundPoints: 0,
				winner: false,
			},
			{
				userId: 'sessionId3',
				username: 'username3',
				decision: 'ROCK',
				roundPoints: 0,
				winner: false,
			},
		],
		[
			{
				userId: 'sessionId1',
				username: 'username1',
				decision: 'SCISSORS',
				roundPoints: 1,
				winner: true,
			},
			{
				userId: 'sessionId2',
				username: 'username2',
				decision: 'PAPER',
				roundPoints: 0,
				winner: false,
			},
			{
				userId: 'sessionId3',
				username: 'username3',
				decision: 'SCISSORS',
				roundPoints: 1,
				winner: true,
			},
		],
		[
			{
				userId: 'sessionId1',
				username: 'username1',
				decision: 'ROCK',
				roundPoints: 2,
				winner: true,
			},
			{
				userId: 'sessionId2',
				username: 'username2',
				decision: 'SCISSORS',
				roundPoints: 0,
				winner: false,
			},
			{
				userId: 'sessionId3',
				username: 'username3',
				decision: 'SCISSORS',
				roundPoints: 0,
				winner: false,
			},
		],
		[
			{
				userId: 'sessionId1',
				username: 'username1',
				decision: 'PAPER',
				roundPoints: 2,
				winner: true,
			},
			{
				userId: 'sessionId2',
				username: 'username2',
				decision: 'ROCK',
				roundPoints: 0,
				winner: false,
			},
			{
				userId: 'sessionId3',
				username: 'username3',
				decision: 'ROCK',
				roundPoints: 0,
				winner: false,
			},
		],
		[
			{
				userId: 'sessionId1',
				username: 'username1',
				decision: 'SCISSORS',
				roundPoints: 2,
				winner: true,
			},
			{
				userId: 'sessionId2',
				username: 'username2',
				decision: 'PAPER',
				roundPoints: 0,
				winner: false,
			},
			{
				userId: 'sessionId3',
				username: 'username3',
				decision: 'PAPER',
				roundPoints: 0,
				winner: false,
			},
		],
	],
	userPoints: {
		sessionId1: {
			username: 'username1',
			points: 5,
		},
		sessionId2: {
			username: 'username2',
			points: 0,
		},
		sessionId3: {
			username: 'username3',
			points: 1,
		},
	},
	winners: [
		{
			userId: 'sessionId1',
			username: 'username1',
			points: 5,
		},
	],
};

export const ThreePlayersFiveRounds = Template.bind({});
ThreePlayersFiveRounds.args = {
	results,
};
