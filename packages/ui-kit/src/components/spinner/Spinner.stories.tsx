import React from 'react';

import { Spinner } from './Spinner';

export default {
	title: 'Components/Spinner',
	component: Spinner,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
};

const Template = () => <Spinner />;

export const Basic = Template.bind({});
Basic.args = {
	rooms: [],
};
