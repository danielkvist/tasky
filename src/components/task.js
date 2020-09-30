import React, { useState } from 'react';
import { format } from 'date-fns';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
import StarIcon from '@material-ui/icons/Star';
import StartBorder from '@material-ui/icons/StarBorder';

import { taskFormState, tasksDoneState } from '../recoil/atoms';

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
	const setTaskForm = useSetRecoilState(taskFormState);
	const showDone = useRecoilValue(tasksDoneState);

	const classes = useStyles();
	const dueDate = task && task.dueDate ? new Date(task.dueDate) : null;

	return (
		<Slide
			direction="left"
			in={!task.done || showDone}
			mountOnEnter
			unmountOnExit
		>
			<ListItem
				button
				className={classes.root}
				onClick={() => setTaskForm(task)}
			>
				<ListItemIcon>
					<Checkbox
						edge="start"
						color="primary"
						tabIndex={-1}
						inputProps={{ 'aria-labelledby': task.id }}
						defaultChecked={done}
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
					{task.fav ? (
						<IconButton
							edge="end"
							aria-label="Mark off as important"
							onClick={() => {
								onUpdate({ ...task, fav: false });
							}}
						>
							<StarIcon />
						</IconButton>
					) : (
						<IconButton
							edge="end"
							aria-label="Mark as important"
							onClick={() => {
								onUpdate({ ...task, fav: true });
							}}
						>
							<StartBorder />
						</IconButton>
					)}

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
