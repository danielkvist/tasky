import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.register();
