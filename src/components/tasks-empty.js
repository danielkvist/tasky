import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		left: '50%',
		position: 'absolute',
		textAlign: 'center',
		top: '50%',
		transform: 'translate(-50%)',
	},
}));

const TasksEmpty = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="body1" component="p">
				Nothing to be done.
			</Typography>
		</div>
	);
};

export default TasksEmpty;
