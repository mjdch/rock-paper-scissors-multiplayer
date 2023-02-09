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
		roomId: 'Asda12',
		roomName: 'RoomName1',
		metadata: {
			roundLimit: 10,
		},
		clients: 12,
	},
	{
		roomId: 'chwr2137',
		roomName: 'roomName2',
		metadata: {
			roundLimit: 5,
		},
		clients: 65,
	},
];

export const WithData = Template.bind({});
WithData.args = {
	onJoin,
	rooms: roomsMock,
};
