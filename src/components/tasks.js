import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Trans } from 'react-i18next';
import { makeStyles, List, Button } from '@material-ui/core';

import { fetchTasks, updateTask, deleteTask } from '../firebase';
import {
	currentUserState,
	tasksState,
	tasksDoneState,
	fetchTasksErrorState,
} from '../recoil/atoms';
import Task from './task';
import TasksDone from './tasks-done';
import TasksEmpty from './tasks-empty';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		height: '100%',
		overflowX: 'hidden',
		width: '100%',
	},
	done: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		display: 'grid',
		placeItems: 'center',
	},
}));

const ToggleDoneBtn = ({ show, text, onClick, disabled }) => (
	<Button size="small" onClick={onClick} disabled={disabled}>
		<Trans i18nKey={show ? 'tasks.hideDone' : 'tasks.showDone'}>{text}</Trans>
	</Button>
);

const Tasks = () => {
	const currentUser = useRecoilValue(currentUserState);
	const [tasks, setTasks] = useRecoilState(tasksState);
	const [showDone, setDone] = useRecoilState(tasksDoneState);
	const setTasksError = useSetRecoilState(fetchTasksErrorState);

	const classes = useStyles();

	useEffect(() => {
		fetchTasks(currentUser)
			.then((data) => setTasks(data))
			.catch((e) => setTasksError(e));
	}, [currentUser, setTasks, setTasksError]);

	const updateHandler = (task) => {
		const filteredTasks = tasks.filter((t) => t.id !== task.id);
		setTasks([...filteredTasks, task]);
		updateTask(currentUser, task).catch((e) => console.error(e));
	};

	const deleteHandler = (task) => {
		const filteredTasks = tasks.filter((t) => t.id !== task.id);
		setTasks([...filteredTasks]);
		deleteTask(currentUser, task).catch((e) => console.error(e));
	};

	if (!tasks.filter((t) => !t.done).length) {
		return <TasksEmpty />;
	}

	return (
		<div className={classes.root}>
			<List>
				{tasks
					.filter((t) => !t.done)
					.map((task) => (
						<Task
							key={task.id}
							task={task}
							onUpdate={updateHandler}
							onDelete={deleteHandler}
						/>
					))}
			</List>
			{showDone ? (
				<>
					<div className={classes.done}>
						<ToggleDoneBtn
							show={showDone}
							onClick={() => setDone(!showDone)}
							text="Hide done"
							disabled={false}
						/>
					</div>
					<TasksDone
						tasks={tasks.filter((t) => t.done)}
						onUpdate={updateHandler}
						onDelete={deleteHandler}
					/>
				</>
			) : (
				<div className={classes.done}>
					<ToggleDoneBtn
						show={showDone}
						onClick={() => setDone(!showDone)}
						text="Show done"
						disabled={!tasks.filter((t) => t.done).length}
					/>
				</div>
			)}
		</div>
	);
};

export default Tasks;
