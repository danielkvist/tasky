import React from 'react';

import AppBar from './appbar';

const Layout = ({ children }) => {
	return (
		<>
			<AppBar />
			{children}
		</>
	);
};

export default Layout;
