import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const DrawerLists = () => {
	return (
		<List>
			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<AddIcon color="inherit" />
				</ListItemIcon>
				<ListItemText primary="Add list" />
			</ListItem>
		</List>
	);
};

export default DrawerLists;
