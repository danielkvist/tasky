import React from 'react';
import { useRecoilState } from 'recoil';
import { Trans } from 'react-i18next';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import TodayIcon from '@material-ui/icons/Today';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import { currentListState, currentFilterState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const DrawerFilters = () => {
	const [filter, setFilter] = useRecoilState(currentFilterState);
	const [list, setList] = useRecoilState(currentListState);
	const [, setLcFilter] = useLocalStorage('filter', 'today');
	const [, setLcList] = useLocalStorage('list', '');

	const handleSelectFilter = (filter = '', list = '') => {
		setFilter(filter);
		setLcFilter(filter);
		setList(list);
		setLcList(list);
	};

	return (
		<List>
			<ListItem button onClick={() => handleSelectFilter('list', 'inbox')}>
				<ListItemIcon>
					<InboxIcon
						color={
							filter === 'list' && list === 'inbox' ? 'primary' : 'inherit'
						}
					/>
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.inbox">Inbox</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => handleSelectFilter('important')}>
				<ListItemIcon>
					<StarBorderIcon
						color={filter === 'important' ? 'primary' : 'inherit'}
					/>
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.important">Important</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => handleSelectFilter()}>
				<ListItemIcon>
					<ListIcon color={!filter && !list ? 'primary' : 'inherit'} />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.all">All tasks</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => handleSelectFilter('today')}>
				<ListItemIcon>
					<TodayIcon color={filter === 'today' ? 'primary' : 'inherit'} />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.today">Today</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => handleSelectFilter('tomorrow')}>
				<ListItemIcon>
					<WbSunnyIcon color={filter === 'tomorrow' ? 'primary' : 'inherit'} />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.tomorrow">Tomorrow</Trans>
				</ListItemText>
			</ListItem>

			<ListItem button onClick={() => handleSelectFilter('week', '')}>
				<ListItemIcon>
					<ViewWeekIcon color={filter === 'week' ? 'primary' : 'inherit'} />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.week">Week</Trans>
				</ListItemText>
			</ListItem>
		</List>
	);
};

export default DrawerFilters;
