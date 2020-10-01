import React from 'react';
import { Trans } from 'react-i18next';
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
				<ListItemText>
					<Trans i18nKey="drawer.inbox">Inbox</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<StarBorderIcon color="inherit" />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.important">Important</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<ListIcon color="inherit" />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.all">All tasks</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<TodayIcon color="inherit" />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.today">Today</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<WbSunnyIcon color="inherit" />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.tomorrow">Tomorrow</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => {}}>
				<ListItemIcon>
					<ViewWeekIcon color="inherit" />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.week">Week</Trans>
				</ListItemText>
			</ListItem>
		</List>
	);
};

export default DrawerFilters;
