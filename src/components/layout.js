import React from 'react';

import AppBar from './appbar';
import TaskForm from './task-form';
import ListForm from './list-form';
import Config from './config';
import Tasks from './tasks';
import AddTask from './add-btn';

const Layout = ({ children }) => {
	return (
		<>
			<AppBar />
			<TaskForm />
			<ListForm />
			<Config />
			<Tasks />
			<AddTask />
			{children}
		</>
	);
};

export default Layout;
