import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchTasks } from '../firebase';
import {
	currentUserState,
	tasksState,
	fetchTasksErrorState,
} from '../recoil/atoms';
import TasksEmpty from './tasks-empty';

const Tasks = () => {
	const currentUser = useRecoilValue(currentUserState);
	const [tasks, setTasks] = useRecoilState(tasksState);
	const setTasksError = useSetRecoilState(fetchTasksErrorState);

	useEffect(() => {
		fetchTasks(currentUser)
			.then((data) => setTasks(data))
			.catch((e) => setTasksError(e));
	}, [currentUser, setTasks, setTasksError]);

	console.log(tasks);

	if (!tasks.length) {
		return <TasksEmpty />;
	}

	return 'Tasks';
};

export default Tasks;
