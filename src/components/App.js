import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useMediaQuery, ThemeProvider, CssBaseline } from '@material-ui/core';

import { PrivateRoute } from '../firebase';
import { materialThemeTypeState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';
import { main, mainDark } from '../theme';
import Index from '../pages/Index';
import Login from '../pages/Login';

const ThemeWrapper = ({ children }) => {
	const [themeType, setThemeType] = useRecoilState(materialThemeTypeState);
	const [lsTheme] = useLocalStorage('theme', themeType);
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	useEffect(() => {
		if (prefersDarkMode || lsTheme === 'dark') {
			setThemeType('dark');
		}
	});

	return (
		<ThemeProvider theme={themeType === 'light' ? main : mainDark}>
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
					<PrivateRoute exact path="/" component={Index} />
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		</ThemeWrapper>
	);
};

export default App;
