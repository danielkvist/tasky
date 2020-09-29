import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import TodayIcon from '@material-ui/icons/Today';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const DrawerFilters = () => {
	return (
		<List>
			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<InboxIcon color="inherit" />
				</ListItemIcon>
				<ListItemText primary="Inbox" />
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<StarBorderIcon color="inherit" />
				</ListItemIcon>
				<ListItemText primary="Important" />
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<ListIcon color="inherit" />
				</ListItemIcon>
				<ListItemText primary="All tasks" />
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<TodayIcon color="inherit" />
				</ListItemIcon>
				<ListItemText primary="Today" />
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<WbSunnyIcon color="inherit" />
				</ListItemIcon>
				<ListItemText primary="Tomorrow" />
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<ViewWeekIcon color="inherit" />
				</ListItemIcon>
				<ListItemText primary="Week" />
			</ListItem>
		</List>
	);
};

export default DrawerFilters;
