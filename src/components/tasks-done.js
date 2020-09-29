import React from 'react';
import { makeStyles, List } from '@material-ui/core';

import Task from './task';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		height: '100%',
		overflowX: 'hidden',
		width: '100%',
	},
}));

const TasksDone = ({ tasks, onUpdate, onDelete }) => {
	const classes = useStyles();

	if (!tasks.length) {
		return null;
	}

	return (
		<div className={classes.root}>
			<List>
				{tasks
					.filter((task) => task.done)
					.map((task) => (
						<Task
							key={task.id}
							task={task}
							onUpdate={onUpdate}
							onDelete={onDelete}
						/>
					))}
			</List>
		</div>
	);
};

export default TasksDone;
