import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import {
	materialThemePaletteState,
	currentFilterState,
	currentListState,
	userAvatarClassState,
	dateFormatState,
} from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const LocalStorage = ({ children }) => {
	const setPalette = useSetRecoilState(materialThemePaletteState);
	const setFilter = useSetRecoilState(currentFilterState);
	const setList = useSetRecoilState(currentListState);
	const setDateFormat = useSetRecoilState(dateFormatState);
	const setAvatarClass = useSetRecoilState(userAvatarClassState);

	const [lsPalette] = useLocalStorage('palette', 'main');
	const [lsAvatarClass] = useLocalStorage('avatarClass', 'fenix');
	const [lsDateFormat] = useLocalStorage('dateFormat', 'MM/dd/yyyy');
	const [lsFilter] = useLocalStorage('filter', 'today');
	const [lsList] = useLocalStorage('list', '');

	useEffect(() => {
		setPalette(lsPalette);
		setAvatarClass(lsAvatarClass);
		setDateFormat(lsDateFormat);
		setFilter(lsFilter);
		setList(lsList);
	});

	return <>{children}</>;
};

export default LocalStorage;
