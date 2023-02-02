import React from 'react';

import { RoomList } from './RoomList';

export default {
	title: 'Components/RoomList',
	component: RoomList,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
};

const Template = (args) => <RoomList {...args} />;

export const EmptyList = Template.bind({});
EmptyList.args = {
	rooms: [],
};

const onJoin = (id: string) => console.log('Joined Room: ', id);

const roomsMock = [
	{
		id: '1',
		roomName: 'RoomName1',
		rounds: 5,
		playerCount: 12,
	},
	{
		id: '2',
		roomName: 'roomName2',
		rounds: 3,
		playerCount: 65,
	},
];

export const WithData = Template.bind({});
WithData.args = {
	onJoin,
	rooms: roomsMock,
};
