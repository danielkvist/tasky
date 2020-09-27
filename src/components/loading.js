import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'grid',
		height: '100vh',
		placeItems: 'center',
		width: '100%',
	},
}));

const Loading = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
};

export default Loading;
