import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';

import app, { authGoogleProvider, AuthContext } from '../firebase';

const Login = ({ history }) => {
	const handleLogin = useCallback(async () => {
		try {
			await app.auth().signInWithPopup(authGoogleProvider);
			history.push('/');
		} catch (error) {
			//TODO: Improve error handling
			console.error(error);
		}
	}, [history]);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<h1>Log in</h1>
			<button type="submit" onClick={handleLogin}>
				Log in
			</button>
		</div>
	);
};

export default withRouter(Login);
