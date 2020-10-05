import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { format, isToday, isPast } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import {
	makeStyles,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Checkbox,
	IconButton,
	Slide,
	Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StartBorder from '@material-ui/icons/StarBorder';

import { taskFormState, tasksDoneState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
	done: {
		opacity: '0.7',
	},
	idle: {
		opacity: '0.7',
	},
	due: {
		color: 'red',
	},
}));

const Task = ({ task, onUpdate, onDelete }) => {
	const showDone = useRecoilValue(tasksDoneState);
	const setTaskForm = useSetRecoilState(taskFormState);
	const [lang] = useLocalStorage('i18nextLng', 'en');
	const { t } = useTranslation();
	const [done, setDone] = useState(task.done);

	const classes = useStyles();
	const dueDate = task && task.dueDate ? new Date(task.dueDate) : null;

	return (
		<Slide direction="left" in={!done || showDone} mountOnEnter unmountOnExit>
			<ListItem button className={(classes.root, done ? classes.done : '')}>
				<ListItemIcon>
					<Checkbox
						edge="start"
						color="primary"
						tabIndex={-1}
						inputProps={{ 'aria-labelledby': task.id }}
						checked={done}
						onChange={() => {
							setDone(!done);
							setTimeout(() => {
								onUpdate({ ...task, done: !done });
							}, 500);
						}}
					/>
				</ListItemIcon>
				<ListItemText
					id={task.id}
					onClick={() => setTaskForm(task)}
					primary={task.title}
					secondary={
						<Typography
							className={
								isPast(dueDate) && !isToday(dueDate)
									? classes.due
									: classes.idle
							}
						>
							{dueDate
								? isToday(dueDate)
									? t('tasks.today')
									: format(dueDate, 'PPPP', {
											locale: lang === 'es' ? es : enUS,
									  })
								: ''}
						</Typography>
					}
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
