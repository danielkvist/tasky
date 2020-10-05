import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { useMediaQuery, ThemeProvider, CssBaseline } from '@material-ui/core';

import { PrivateRoute } from '../firebase';
import { materialThemeTypeState } from '../recoil/atoms';
import { materialThemeSelector } from '../recoil/selectors';
import useLocalStorage from '../hooks/use-local-storage';
import LocalStoage from './local-storage';
import Index from '../pages/Index';
import Login from '../pages/Login';

const ThemeWrapper = ({ children }) => {
	const setThemeType = useSetRecoilState(materialThemeTypeState);
	const theme = useRecoilValue(materialThemeSelector);
	const [lsTheme] = useLocalStorage('theme', 'light');
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	useEffect(() => {
		if (prefersDarkMode || lsTheme === 'dark') {
			setThemeType('dark');
		}
	});

	return (
		<ThemeProvider theme={createMuiTheme(theme)}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

const App = () => {
	return (
		<ThemeWrapper>
			<Router>
				<div>
					<LocalStoage>
						<PrivateRoute exact path="/" component={Index} />
					</LocalStoage>
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		</ThemeWrapper>
	);
};

export default App;
