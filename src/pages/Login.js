import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { makeStyles, Typography, Button } from '@material-ui/core';

import app, { authGoogleProvider, AuthContext } from '../firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	header: {
		alignContent: 'end',
		justifyContent: 'center',
		display: 'grid',
		minHeight: '40vh',
	},
	main: {
		display: 'grid',
		placeItems: 'center',
		minHeight: '20vh',
	},
	btn: {
		background: `linear-gradient(95deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[700]} 90%)`,
	},
}));

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
	const classes = useStyles();

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<Typography variant="h1" component="h1">
					Tasky
				</Typography>
			</header>
			<main className={classes.main}>
				<Button
					className={classes.btn}
					variant="contained"
					color="primary"
					onClick={handleLogin}
				>
					Log in with Google
				</Button>
			</main>
		</div>
	);
};

export default withRouter(Login);
