import React from 'react';

import AppBar from './appbar';
import Tasks from './tasks';
import AddTask from './add-btn';

const Layout = ({ children }) => {
	return (
		<>
			<AppBar />
			<Tasks />
			<AddTask />
			{children}
		</>
	);
};

export default Layout;
