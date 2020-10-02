import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { Trans } from 'react-i18next';
import {
	List as MaterialList,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {
	currentUserState,
	listFormState,
	listsState,
	currentFilterState,
	currentListState,
} from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';
import { fetchLists, deleteLists } from '../firebase';
import List from './list';

const DrawerLists = () => {
	const currentUser = useRecoilValue(currentUserState);
	const setListForm = useSetRecoilState(listFormState);
	const [lists, setLists] = useRecoilState(listsState);
	const setCurrentList = useSetRecoilState(currentListState);
	const setFilter = useSetRecoilState(currentFilterState);
	const [, setLcFilter] = useLocalStorage('filter', 'today');
	const [, setLcList] = useLocalStorage('list', '');

	useEffect(() => {
		fetchLists(currentUser)
			.then((data) => setLists(data))
			.catch((e) => console.error(e));
	}, [currentUser, setLists]);

	const deleteHandler = (list) => {
		const filteredLists = lists.filter((l) => l.id !== list.id);
		setLists([...filteredLists]);
		deleteLists(currentUser, list).catch((e) => console.error(e));
	};

	return (
		<MaterialList>
			<ListItem button onClick={() => setListForm(true)}>
				<ListItemIcon>
					<AddIcon color="inherit" />
				</ListItemIcon>
				<ListItemText>
					<Trans i18nKey="drawer.add">Add list</Trans>
				</ListItemText>
			</ListItem>
			{lists
				? lists.map((list) => {
						return (
							<List
								key={list.id}
								list={list}
								onSelect={() => {
									setFilter('list');
									setLcFilter('list');
									setCurrentList(list.id);
									setLcList(list.id);
								}}
								onDelete={deleteHandler}
							/>
						);
				  })
				: null}
		</MaterialList>
	);
};

export default DrawerLists;
