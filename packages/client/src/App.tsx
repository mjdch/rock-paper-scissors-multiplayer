import React from 'react';
import { TOPICS } from '@rps-game/server/src/consts';

const App: React.FC = () => (
	<>
		<h1>Rendered H</h1>
		<p>{JSON.stringify(TOPICS)}</p>
	</>
);

export default App;
