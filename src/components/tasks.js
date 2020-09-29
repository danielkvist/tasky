import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { makeStyles, List } from '@material-ui/core';

import { fetchTasks, updateTask, deleteTask } from '../firebase';
import {
	currentUserState,
	tasksState,
	fetchTasksErrorState,
} from '../recoil/atoms';
import Task from './task';
import TasksEmpty from './tasks-empty';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		height: '100%',
		overflowX: 'hidden',
		width: '100%',
	},
}));

const Tasks = () => {
	const currentUser = useRecoilValue(currentUserState);
	const [tasks, setTasks] = useRecoilState(tasksState);
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

	if (!tasks.length) {
		return <TasksEmpty />;
	}

	return (
		<div className={classes.root}>
			<List>
				{tasks.map((task) => (
					<Task
						key={task.id}
						task={task}
						onUpdate={updateHandler}
						onDelete={deleteHandler}
					/>
				))}
			</List>
		</div>
	);
};

export default Tasks;
