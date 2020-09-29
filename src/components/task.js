import React, { useState } from 'react';
import { format } from 'date-fns';
import {
	makeStyles,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Checkbox,
	IconButton,
	Slide,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
	done: {},
	due: {},
}));

const Task = ({ task, onUpdate, onDelete }) => {
	const [done] = useState(task.done);

	const classes = useStyles();
	const dueDate = task && task.dueDate ? new Date(task.dueDate) : null;

	return (
		<Slide direction="left" in={!task.done} mountOnEnter unmountOnExit>
			<ListItem button className={classes.root}>
				<ListItemIcon>
					<Checkbox
						edge="start"
						color="primary"
						tabIndex={-1}
						inputProps={{ 'aria-labelledby': task.id }}
						onChange={() => {
							onUpdate({ ...task, done: !done });
						}}
					/>
				</ListItemIcon>
				<ListItemText
					id={task.id}
					primary={task.title}
					secondary={dueDate ? format(dueDate, 'PPPP') : ''}
				/>
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						aria-label="delete"
						onClick={() => onDelete({ ...task })}
					>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</Slide>
	);
};

export default Task;
