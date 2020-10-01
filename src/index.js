import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';

import { AuthProvider } from './firebase';
import App from './components/App';
import Loading from './components/loading';
import './i18n/i18n';
import * as serviceWorker from './serviceWorker';

render(
	<RecoilRoot>
		<AuthProvider>
			<Suspense fallback={Loading}>
				<App />
			</Suspense>
		</AuthProvider>
	</RecoilRoot>,
	document.getElementById('root')
);

serviceWorker.register();
