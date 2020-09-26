import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthProvider, PrivateRoute } from '../firebase';
import Index from '../pages/Index';
import Login from '../pages/Login';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<PrivateRoute exact path="/" component={Index} />
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
