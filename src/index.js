import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';

import { AuthProvider } from './firebase';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

render(
	<RecoilRoot>
		<AuthProvider>
			<App />
		</AuthProvider>
	</RecoilRoot>,
	document.getElementById('root')
);

serviceWorker.register();