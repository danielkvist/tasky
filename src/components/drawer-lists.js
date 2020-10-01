import React from 'react';
import { Trans } from 'react-i18next';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const DrawerLists = () => {
	return (
		<List>
			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<AddIcon color="inherit" />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.add">Add list</Trans>
				</ListItemText>
			</ListItem>
		</List>
	);
};

export default DrawerLists;
