import React from 'react';

import AppBar from './appbar';
import TaskForm from './task-form';
import Tasks from './tasks';
import AddTask from './add-btn';

const Layout = ({ children }) => {
	return (
		<>
			<AppBar />
			<TaskForm />
			<Tasks />
			<AddTask />
			{children}
		</>
	);
};

export default Layout;
